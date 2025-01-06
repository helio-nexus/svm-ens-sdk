import { PublicKey, ParsedAccountData } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { connection, PROGRAM_ID_SOLNAME } from "../config";
import { findDomainPDA, findPrimaryDomainPDA } from "../utils";
// UPDATED: import DomainInfo from domain-info.ts
import { DomainInfo } from "../domain/domain-info";
// NEW: import interfaces from separate files
import { DomainAccount } from "../interfaces/domain-account";
import { PrimaryDomainAccount } from "../interfaces/primary-domain-account";
import * as anchor from "@coral-xyz/anchor";

import {
  getTokenMetadata,
  TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";

/**
 * Create an anchor Program instance for read-only usage.
 */
function getProgram(): Program {
  const dummyWallet = new anchor.Wallet(anchor.web3.Keypair.generate());
  const provider = new AnchorProvider(connection, dummyWallet, {});
  anchor.setProvider(provider);

  const idl = {
    version: "0.1.0",
    name: "solnames",
    instructions: [],
    accounts: [
      {
        name: "domain",
        type: {
          kind: "struct",
          fields: [
            { name: "name", type: "string" },
            { name: "expiresAt", type: "u64" },
            { name: "profile", type: { defined: "Profile" } },
            { name: "socials", type: { defined: "SocialMedia" } },
            { name: "textRecords", type: { vec: { defined: "TextRecord" } } },
            { name: "subdomains", type: { vec: { defined: "SubDomain" } } },
            { name: "mint", type: "publicKey" },
            { name: "authority", type: "publicKey" },
            { name: "metadata", type: "publicKey" }
          ]
        }
      },
      {
        name: "primaryDomain",
        type: {
          kind: "struct",
          fields: [
            { name: "name", type: "string" }
          ]
        }
      }
    ],
    types: [
      {
        name: "Profile",
        type: {
          kind: "struct",
          fields: [
            { name: "name", type: "string" },
            { name: "avatar", type: "string" },
            { name: "location", type: "string" },
            { name: "website", type: "string" },
            { name: "shortbio", type: "string" }
          ]
        }
      },
      {
        name: "SocialMedia",
        type: {
          kind: "struct",
          fields: [
            { name: "telegram", type: "string" },
            { name: "discord", type: "string" },
            { name: "twitter", type: "string" },
            { name: "medium", type: "string" },
            { name: "facebook", type: "string" },
            { name: "otherLink", type: "string" }
          ]
        }
      },
      {
        name: "TextRecord",
        type: {
          kind: "struct",
          fields: [
            { name: "nameValue", type: "string" },
            { name: "link", type: "string" }
          ]
        }
      },
      {
        name: "SubDomain",
        type: {
          kind: "struct",
          fields: [
            { name: "name", type: "string" },
            { name: "mint", type: "publicKey" },
            { name: "group", type: "publicKey" },
            { name: "groupMint", type: "publicKey" }
          ]
        }
      }
    ]
  };

  return new anchor.Program(idl as anchor.Idl, PROGRAM_ID_SOLNAME, provider);
}

// NEW HELPER: FETCH OWNER AND SPL TOKEN METADATA
async function fetchOwnerAndMetadata(
  mint: string
): Promise<{
  owner: string;
  symbol: string;
  uri: string;
  extension: string;
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
    createdAt,
    updatedAt
  };
}

/**
 * Resolve a domain by its name on-chain by fetching the domain account from the Solnames program.
 */
export async function resolveDomainName(domainName: string): Promise<DomainInfo | null> {
  try {
    const program = getProgram();
    const { pubkey } = findDomainPDA(domainName);
    const account = await program.account.domain.fetchNullable(pubkey) as DomainAccount | null;
    if (!account) {
      return null;
    }

    const tokenData = await fetchOwnerAndMetadata(account.mint.toBase58());

    const domainInfo: DomainInfo = {
      mint: account.mint.toBase58(),
      name: account.name,
      symbol: tokenData.symbol,
      uri: tokenData.uri,
      domain: account.name,
      extension: tokenData.extension,
      owner: tokenData.owner || account.authority.toBase58(),
      isPrimary: false,
      additionalMetadata: tokenData.additionalMetadata,
      createdAt: tokenData.createdAt,
      updatedAt: tokenData.updatedAt
    };

    return domainInfo;
  } catch (error) {
    console.error("Error resolving domain name:", error);
    return null;
  }
}

/**
 * Finds the primary domain for a given owner by reading the primaryDomain PDA.
 */
export async function getPrimaryDomain(ownerPubkey: string): Promise<DomainInfo | null> {
  try {
    const program = getProgram();
    const owner = new PublicKey(ownerPubkey);
    const { pubkey: primaryPDA } = findPrimaryDomainPDA(owner);
    const primaryAccount = await program.account.primaryDomain.fetchNullable(primaryPDA) as PrimaryDomainAccount | null;
    if (!primaryAccount) {
      return null;
    }

    const domainName = primaryAccount.name;
    const domainPDA = findDomainPDA(domainName);
    const domainAccount = await program.account.domain.fetchNullable(domainPDA.pubkey) as DomainAccount | null;
    if (!domainAccount) {
      return null;
    }

    const tokenData = await fetchOwnerAndMetadata(domainAccount.mint.toBase58());

    const domainInfo: DomainInfo = {
      mint: domainAccount.mint.toBase58(),
      name: domainAccount.name,
      symbol: tokenData.symbol,
      uri: tokenData.uri,
      domain: domainAccount.name,
      extension: tokenData.extension,
      owner: tokenData.owner || domainAccount.authority.toBase58(),
      isPrimary: true,
      additionalMetadata: tokenData.additionalMetadata,
      createdAt: tokenData.createdAt,
      updatedAt: tokenData.updatedAt
    };

    return domainInfo;
  } catch (error) {
    console.error("Error fetching primary domain:", error);
    return null;
  }
}