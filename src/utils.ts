import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID_SOLNAME } from "./config";

// PDAs used in the original code
export const PREFIX_DNS_STATE = "dns_state";
export const PREFIX_DOMAIN = "domain";
export const PREFIX_PRIMARY_DOMAIN = "primary_domain";
export const PREFIX_MINT_AUTHORITY = "mint_authority";

/**
 * Finds the PDA for a domain account by name.
 */
export function findDomainPDA(domainName: string): { pubkey: PublicKey; bump: number } {
  const [pubkey, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from(PREFIX_DOMAIN), Buffer.from(domainName)],
    PROGRAM_ID_SOLNAME
  );
  return { pubkey, bump };
}

/**
 * Finds the PDA for a user's primary domain by authority (i.e. owner's pubkey).
 */
export function findPrimaryDomainPDA(authority: PublicKey): { pubkey: PublicKey; bump: number } {
  const [pubkey, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from(PREFIX_PRIMARY_DOMAIN), authority.toBuffer()],
    PROGRAM_ID_SOLNAME
  );
  return { pubkey, bump };
}