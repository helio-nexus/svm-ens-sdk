/**
 * DomainInfo structure to represent domain data resolved on-chain.
 */
export interface DomainInfo {
  mint: string;
  name: string;
  symbol: string;
  uri: string;
  domain: string;
  extension: string;
  owner: string;
  isPrimary: boolean;
  additionalMetadata: Record<string, string>;
  createdAt: number;
  updatedAt: number;
}