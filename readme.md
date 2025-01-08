# SVM ENS SDK

This repository contains the **Solana Virtual Machine (SVM)** ENS SDK (also referred to as *svm-ens-sdk*).  
Use it to resolve domain ownership, fetch on-chain metadata, and manage primary domains on Solana without relying on a separate backend.

## Installation

Install via npm or Yarn:
```bash
npm install @helio-nexus/svm-ens-sdk
# or
yarn add @helio-nexus/svm-ens-sdk
```

## Basic Usage

### Import the SDK Methods
```ts
import { resolveByDomainName, getPrimaryDomain } from "svm-ens-sdk";
```
### Initialize a Solana Connection
To interact with the Solana blockchain, provide a Connection object from @solana/web3.js:

```ts
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
```
### Resolve a Domain
You can fetch the on-chain record for a domain name:

```ts
(async () => {
  const { result: domainInfo, error } = await resolveByDomainName(connection, "example.eclipse");
  if (error) {
    console.error("Error resolving domain:", error);
  } else {
    console.log("Resolved Domain Info:", domainInfo);
  }
})();
```
### Get the Primary Domain for an Owner
To find the domain flagged as "primary" for a given wallet address:

```ts
(async () => {
  const ownerPubkey = "YourWalletPublicKeyHere";
  const { result: primaryDomainInfo, error } = await getPrimaryDomain(connection, ownerPubkey);
  if (error) {
    console.error("Error fetching primary domain:", error);
  } else {
    console.log("Primary Domain Info:", primaryDomainInfo);
  }
})();
```