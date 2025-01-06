import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { connection, PROGRAM_ID_SOLNAME } from "../config";
import { findDomainPDA, findPrimaryDomainPDA } from "../utils";
import { DomainInfo } from "../domain/model";
import * as anchor from "@coral-xyz/anchor";

/**
 * We'll keep minimal IDL references. For advanced usage, you can import the full IDL.
 * However, in this example, we'll just define enough to parse data from the domain account.
 */

interface DomainAccount {
  name: string;         // The domain name
  expiresAt: anchor.BN; // The domain's expiration date
  mint: PublicKey;      // The domain's mint
  authority: PublicKey; // The domain's owner authority
  // ... we omit other fields that might be in the full domain
}

interface PrimaryDomainAccount {
  name: string; // The domain name
}

/**
 * Create an anchor Program instance for read-only usage.
 * If you only need to read from chain, you can use a dummy keypair or no wallet.
 */
function getProgram(): Program {
  const dummyWallet = new anchor.Wallet(anchor.web3.Keypair.generate());
  const provider = new AnchorProvider(connection, dummyWallet, {});
  anchor.setProvider(provider);

  // Minimal IDL usage for domain reading
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

/**
 * Resolve a domain by its name on-chain by fetching the domain account from the Solnames program.
 * @param domainName The domain name, e.g. "mydomain"
 */
export async function resolveDomainName(domainName: string): Promise<DomainInfo | null> {
  try {
    const program = getProgram();

    // Find the domain's PDA using domainName
    const { pubkey } = findDomainPDA(domainName);

    // Attempt to fetch the domain data
    const account = await program.account.domain.fetchNullable(pubkey) as DomainAccount | null;
    if (!account) {
      return null;
    }

    // Map the chain data to our DomainInfo structure
    const now = Date.now();
    const domainInfo: DomainInfo = {
      mint: account.mint.toBase58(),
      name: account.name,
      symbol: "",       // Not stored on chain, might parse from metadata if needed
      uri: "",          // Similarly, might parse from metadata if needed
      domain: account.name,
      extension: "",    // Not stored on chain
      owner: account.authority.toBase58(),
      isPrimary: false, // This would be known if you matched it with the primary domain pda
      additionalMetadata: {},
      createdAt: now,
      updatedAt: now
    };

    return domainInfo;
  } catch (error) {
    console.error("Error resolving domain name:", error);
    return null;
  }
}

/**
 * Fetch a domain's data from chain, for example to fill symbol and uri if you prefer.
 * But for now, we skip it or do partial logic.
 */

/**
 * Finds the primary domain for a given owner by reading the primaryDomain PDA.
 * Then it fetches the domain account to gather additional info.
 * @param ownerPubkey A base58 public key string of the owner
 */
export async function getPrimaryDomain(ownerPubkey: string): Promise<DomainInfo | null> {
  try {
    const program = getProgram();

    // parse the owner pubkey
    const owner = new PublicKey(ownerPubkey);

    // find primary domain pda
    const { pubkey: primaryPDA } = findPrimaryDomainPDA(owner);

    // fetch the primary domain data
    const primaryAccount = await program.account.primaryDomain.fetchNullable(primaryPDA) as PrimaryDomainAccount | null;
    if (!primaryAccount) {
      return null;
    }

    // we now have the domain name. let's fetch the domain account
    const domainName = primaryAccount.name;
    const domainPDA = findDomainPDA(domainName);
    const domainAccount = await program.account.domain.fetchNullable(domainPDA.pubkey) as DomainAccount | null;
    if (!domainAccount) {
      return null;
    }

    // build the DomainInfo structure
    const now = Date.now();
    const domainInfo: DomainInfo = {
      mint: domainAccount.mint.toBase58(),
      name: domainAccount.name,
      symbol: "",
      uri: "",
      domain: domainAccount.name,
      extension: "",
      owner: domainAccount.authority.toBase58(),
      isPrimary: true,
      additionalMetadata: {},
      createdAt: now,
      updatedAt: now
    };

    return domainInfo;
  } catch (error) {
    console.error("Error fetching primary domain:", error);
    return null;
  }
}