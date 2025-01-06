import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export interface DomainAccount {
  name: string;         // The domain name
  expiresAt: anchor.BN; // The domain's expiration date
  mint: PublicKey;      // The domain's mint
  authority: PublicKey; // The domain's owner authority
  // ... we omit other fields that might be in the full domain
}