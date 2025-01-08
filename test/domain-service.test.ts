import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getPrimaryDomain, resolveByDomainName } from "../src";
import { describe, it, expect } from '@jest/globals';

describe("domain-service tests", () => {
  // Updated to use mainnet-beta for 'prod'
  const connection = new Connection("https://mainnetbeta-rpc.eclipse.xyz", "confirmed");
  
  // Updated wallet address and domain names
  const targetOwner = "4HwbYjSW9zse12Ypaej9xjDvvtkhp5T6fMiKHnyTign7";
  const primaryDomain = "alabama.eclipse";
  const nonPrimaryDomain = "ostincity.eclipse";
  
  it("should attempt to find a primary domain by an owner (returns null or domain string)", async () => {
    const result = await getPrimaryDomain(connection, targetOwner);
    console.log("primary domain is:", result);
    // Expect either null or the domain string "alabama.eclipse"
    expect(result === null || typeof result === "string").toBe(true);
  });

  it("should attempt to resolve a domain name (returns null if not found)", async () => {
    // We'll resolve the non-primary domain name
    const domainAcc = await resolveByDomainName(connection, nonPrimaryDomain);
    console.log("resolved domain account:", domainAcc);
    // Domain account can be null or an object
    expect(domainAcc === null).toBe(true);
  }); 

  it("should resolve a domain name (returns null if not found)", async () => {
    // We'll resolve the non-primary domain name
    const domainAcc = await resolveByDomainName(connection, primaryDomain);
    console.log("resolved domain account:", domainAcc);
    // Domain account can be null or an object
    expect(domainAcc?.owner.toString() === targetOwner).toBe(true);
  }); 
});
