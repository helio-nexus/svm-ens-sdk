import { Connection, PublicKey } from "@solana/web3.js";

export const DEFAULT_ENDPOINT = process.env.SOLANA_RPC_URL || "https://mainnetbeta-rpc.eclipse.xyz";
export const COMMITMENT = "confirmed";

// For your local usage or tests, you can override the endpoint above
export const connection = new Connection(DEFAULT_ENDPOINT, COMMITMENT);

// The Solnames program ID
export const PROGRAM_ID_SOLNAME = new PublicKey("EDMNSE8CJd9j374sa1bUS2PaYJhCHbCzGeTnniLQuk3z");

// The Metaplex token metadata program ID
export const METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");