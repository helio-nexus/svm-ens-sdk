import { PublicKey, ParsedAccountData, Connection } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { connection, PROGRAM_ID_SOLNAME } from "../config";
import { findDomainPDA, findPrimaryDomainPDA, InterfaceSolnames } from "../utils";
// UPDATED: import DomainInfo from domain-info.ts
import { DomainInfo } from "../model/domain-info";
import * as anchor from "@coral-xyz/anchor";
import { Solnames } from "../idl/solnames";

import {
  getTokenMetadata,
  TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";

/**
 * Create an anchor Program instance for read-only usage.
 */
function getProgram(connection: Connection): Program<Solnames> {
  const dummyWallet = new anchor.Wallet(anchor.web3.Keypair.generate());
  const provider = new AnchorProvider(connection, dummyWallet, {});
  anchor.setProvider(provider);
  
  return new Program(InterfaceSolnames, provider);
}

// NEW HELPER: FETCH OWNER AND SPL TOKEN METADATA
async function fetchOwnerAndMetadata(
  connection: Connection,
  mint: string
): Promise<{
  owner: string;
  symbol: string;
  uri: string;
  extension: string;
  name: string;
  additionalMetadata: Record<string, any>;
  createdAt: number;
  updatedAt: number;
}> {
  // 1) Find the token's owner by retrieving the largest token account
  const largestAccounts = await connection.getTokenLargestAccounts(new PublicKey(mint));
  if (!largestAccounts.value || largestAccounts.value.length === 0) {
    throw new Error(`No largest accounts found for mint: ${mint}`);
  }
  const largestAccountInfo = await connection.getParsedAccountInfo(largestAccounts.value[0].address);
  if (!largestAccountInfo.value) {
    throw new Error(
      `No account info found for address: ${largestAccounts.value[0].address.toBase58()}`
    );
  }
  const parsedData = (largestAccountInfo.value.data as ParsedAccountData).parsed;
  const ownerPublicKey = parsedData.info.owner?.toString() || "";

  // 2) Fetch the token's metadata
  let symbol = "";
  let uri = "";
  let extension = "";
  let name = "";
  let additionalMetadata: Record<string, any> = {};
  let createdAt = Date.now();
  let updatedAt = Date.now();

  try {
    const metadata = await getTokenMetadata(
      connection,
      new PublicKey(mint),
      "confirmed",
      TOKEN_2022_PROGRAM_ID
    );
    if (metadata) {
      symbol = metadata.symbol || "";
      uri = metadata.uri || "";
      name = metadata.name || "";
      if (Array.isArray(metadata.additionalMetadata)) {
        for (const kv of metadata.additionalMetadata) {
          const [k, v] = kv;
          additionalMetadata[k] = v;
          if (k === "extension") extension = v;
          if (k === "created_at") createdAt = parseInt(v, 10);
          if (k === "updated_at") updatedAt = parseInt(v, 10);
        }
      }
    }
  } catch (err) {
    console.warn("Failed to fetch SPL token metadata or parse it:", err);
  }

  return {
    owner: ownerPublicKey,
    symbol,
    uri,
    extension,
    additionalMetadata,
    name,
    createdAt,
    updatedAt
  };
}

/**
 * Resolve a domain by its name on-chain by fetching the domain account from the Solnames program.
 */
export async function resolveByDomainName(
  connection: Connection,
  domainName: string
): Promise<DomainInfo | null> {
  try {
    // Initialize the Program
    const program = getProgram(connection);
    // Find the domain account on-chain
    const domainAccount =  findDomainPDA(domainName);

    // Fetch domain on-chain data
    let domainOnchainData;
    try {
      domainOnchainData = await program.account.domain.fetch(
        domainAccount.pubkey
      );
    } catch (err) {
      throw new Error(`No domain found on-chain for domain: ${domainName}`);
    }

    const mint = domainOnchainData.mint.toBase58();
    const tokenData = await fetchOwnerAndMetadata(connection, mint);

    // Fetch primary domain on-chain data
    const primaryDomainAccount = findPrimaryDomainPDA(
      new PublicKey(tokenData.owner)
    );
    let primaryDomainData;
    try {
      primaryDomainData = await program.account.primaryDomain.fetch(
        primaryDomainAccount.pubkey
      );
    } catch (err) {
      throw new Error(`No primary domain found for owner: ${tokenData.owner}`);
    }

    // Verify that the names match
    if (
      primaryDomainData.name.toString() !== domainOnchainData.name.toString()
    ) {
      throw new Error(`Name mismatch for mint: ${mint}`);
    }

    const domainInfo: DomainInfo = {
      mint: mint,
      name: tokenData.name,
      symbol: tokenData.symbol,
      uri: tokenData.uri,
      domain: tokenData.name,
      extension: tokenData.extension,
      owner: tokenData.owner,
      isPrimary: true,
      additionalMetadata: tokenData.additionalMetadata,
      createdAt: tokenData.createdAt,
      updatedAt: tokenData.updatedAt
    };

    return domainInfo;
  } catch (error: any) {
    throw error;
  }
}

 /**
   * Get the primary domain owned by a specific owner (on-chain).
   * @param ownerPubkey - Owner's public key as a string.
   * @returns The primary domain owned by the owner, or null if not found.
   */
 export async function getPrimaryDomain(
  connection: Connection,
  ownerPubkey: string
): Promise<DomainInfo | null> {
  try {
    // Validate owner public key format
    const publicKeyRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    if (!publicKeyRegex.test(ownerPubkey)) {
      throw new Error("Invalid owner public key format");
    }

    // 1) Find the primary domain account on-chain
    const primaryDomainAccount = findPrimaryDomainPDA(
      new PublicKey(ownerPubkey)
    );
    if (!primaryDomainAccount) {

      throw new Error(
        `Primary domain account not found for owner: ${ownerPubkey}`
      );
    }

    // 2) Initialize an Anchor Provider and Program instance
    const program = getProgram(connection);

    // 3) Fetch on-chain primary domain data
    let primaryDomainOnChainData;
    try {
      primaryDomainOnChainData = await program.account.primaryDomain.fetch(
        primaryDomainAccount.pubkey
      );
    } catch (err) {
      throw new Error(
        `No primary domain found on-chain for owner: ${ownerPubkey}`
      );
    }

    // Extract the domain's mint address and name
    const name = primaryDomainOnChainData.name.toString();
    let domainDataAccount = findDomainPDA(name);
    let domainDataOnChain = undefined;
    try {
      domainDataOnChain = await program.account.domain.fetch(
        domainDataAccount.pubkey
      );
    } catch (err) {
      throw new Error(
        `No primary domain found on-chain for owner: ${ownerPubkey}`
      );
    }
    const mint = domainDataOnChain.mint;
    const tokenData = await fetchOwnerAndMetadata(connection, mint.toBase58());
    // 4) Fetch the owner of the largest token account
    if (tokenData.owner.toString() !== ownerPubkey) {
      throw new Error(
        `On-chain owner (${tokenData.owner.toString()}) does not match provided pubkey (${ownerPubkey})`
      );
    }

    const domainInfo: DomainInfo = {
      mint: mint.toBase58(),
      name: tokenData.name,
      symbol: tokenData.symbol,
      uri: tokenData.uri,
      domain: tokenData.name,
      extension: tokenData.extension,
      owner: tokenData.owner,
      isPrimary: true,
      additionalMetadata: tokenData.additionalMetadata,
      createdAt: tokenData.createdAt,
      updatedAt: tokenData.updatedAt
    };

    return domainInfo;
  } catch (error: any) {
    throw error;
  }
}