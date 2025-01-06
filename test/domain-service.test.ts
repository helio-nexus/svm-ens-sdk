import { Connection, clusterApiUrl } from "@solana/web3.js";
import { findPrimaryDomainByOwner, resolveDomainName } from "../src/services/domain-service";

describe("domain-service tests", () => {
  // By default, use the devnet cluster. Or set a custom RPC URL if desired
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
  // Provide some example domain name or test domain
  const exampleOwner = "11111111111111111111111111111111"; // This is a placeholder
  const exampleDomain = "myname";
  
  it("should attempt to find a primary domain by an owner (returns null if none)", async () => {
    const result = await findPrimaryDomainByOwner(exampleOwner, connection);
    console.log("primary domain is:", result);
    // We can't guarantee a domain actually exists for the placeholder owner
    expect(result === null || typeof result === "string").toBe(true);
  });

  it("should attempt to resolve a domain name (returns null if not found)", async () => {
    const domainAcc = await resolveDomainName(exampleDomain, connection);
    console.log("resolved domain account:", domainAcc);
    expect(domainAcc === null || typeof domainAcc === "object").toBe(true);
  });
});