/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solnames.json`.
 */
export type Solnames = {
  "address": "EDMNSE8CJd9j374sa1bUS2PaYJhCHbCzGeTnniLQuk3z",
  "metadata": {
    "name": "solnames",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addRoyalties",
      "docs": [
        "add royalties to mint"
      ],
      "discriminator": [
        195,
        251,
        126,
        230,
        187,
        134,
        168,
        210
      ],
      "accounts": [
        {
          "name": "dnsState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "updateRoyaltiesArgs"
            }
          }
        }
      ]
    },
    {
      "name": "expandDomain",
      "discriminator": [
        202,
        77,
        72,
        63,
        33,
        68,
        83,
        189
      ],
      "accounts": [
        {
          "name": "state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "priceUpdate"
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "receiverAta",
          "writable": true,
          "optional": true
        },
        {
          "name": "payerAta",
          "writable": true,
          "optional": true
        },
        {
          "name": "treasuryMint",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "period",
          "type": "u8"
        }
      ]
    },
    {
      "name": "extensionUpdate",
      "discriminator": [
        97,
        194,
        53,
        76,
        183,
        184,
        252,
        9
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "extensions",
          "type": {
            "vec": {
              "defined": {
                "name": "extensionState"
              }
            }
          }
        }
      ]
    },
    {
      "name": "forceClearDomain",
      "discriminator": [
        197,
        145,
        14,
        118,
        248,
        115,
        105,
        248
      ],
      "accounts": [
        {
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "relations": [
            "domain"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "newAuthority"
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "state"
          ]
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "forceUnregisterDomain",
      "discriminator": [
        114,
        42,
        28,
        145,
        150,
        154,
        155,
        45
      ],
      "accounts": [
        {
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mintAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "bumpSeed",
          "type": "u8"
        }
      ]
    },
    {
      "name": "forceUpdateUri",
      "discriminator": [
        121,
        164,
        69,
        145,
        41,
        89,
        70,
        15
      ],
      "accounts": [
        {
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "mintAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "masterEdition",
          "writable": true
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "state"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenMetadataProgram"
        },
        {
          "name": "sysvarInstruction"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "bumpSeed",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initDns",
      "discriminator": [
        7,
        128,
        77,
        244,
        70,
        185,
        198,
        150
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury"
        },
        {
          "name": "mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "group",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "groupExtensionProgram",
          "address": "5hx15GaPPqsYA61v6QpcGPpo125v7rfvEfZQ4dJErG5V"
        }
      ],
      "args": [
        {
          "name": "subDomainPrice",
          "type": "u64"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "royalties",
          "type": {
            "defined": {
              "name": "updateRoyaltiesArgs"
            }
          }
        },
        {
          "name": "registryAdmin",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "modifyRoyalties",
      "docs": [
        "modify royalties of mint"
      ],
      "discriminator": [
        199,
        95,
        20,
        107,
        136,
        161,
        93,
        137
      ],
      "accounts": [
        {
          "name": "dnsState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "updateRoyaltiesArgs"
            }
          }
        }
      ]
    },
    {
      "name": "payableTokenAdd",
      "discriminator": [
        110,
        70,
        4,
        42,
        112,
        13,
        249,
        89
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "payableToken",
          "type": {
            "defined": {
              "name": "payableToken"
            }
          }
        }
      ]
    },
    {
      "name": "payableTokenRemove",
      "discriminator": [
        93,
        151,
        177,
        201,
        128,
        169,
        41,
        201
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "mint",
          "type": "string"
        }
      ]
    },
    {
      "name": "payableTokenUpdate",
      "discriminator": [
        193,
        253,
        193,
        32,
        2,
        49,
        149,
        119
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "payableTokens",
          "type": {
            "vec": {
              "defined": {
                "name": "payableToken"
              }
            }
          }
        }
      ]
    },
    {
      "name": "registerDomain",
      "discriminator": [
        236,
        7,
        208,
        151,
        173,
        149,
        73,
        104
      ],
      "accounts": [
        {
          "name": "dnsState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "receiverAta",
          "writable": true,
          "optional": true
        },
        {
          "name": "payerAta",
          "writable": true,
          "optional": true
        },
        {
          "name": "treasuryMint",
          "writable": true
        },
        {
          "name": "priceUpdate"
        },
        {
          "name": "mintAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "group",
          "writable": true
        },
        {
          "name": "collectionMint",
          "writable": true
        },
        {
          "name": "member",
          "writable": true,
          "signer": true
        },
        {
          "name": "minter",
          "writable": true
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "groupExtensionProgram",
          "address": "5hx15GaPPqsYA61v6QpcGPpo125v7rfvEfZQ4dJErG5V"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "periodYear",
          "type": "u8"
        }
      ]
    },
    {
      "name": "registerSubdomain",
      "discriminator": [
        154,
        193,
        213,
        248,
        178,
        51,
        94,
        37
      ],
      "accounts": [
        {
          "name": "dnsState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "receiverAta",
          "writable": true,
          "optional": true
        },
        {
          "name": "payerAta",
          "writable": true,
          "optional": true
        },
        {
          "name": "treasuryMint",
          "writable": true
        },
        {
          "name": "priceUpdate"
        },
        {
          "name": "mintAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "mintSubdomain",
          "writable": true
        },
        {
          "name": "tokenAccountSubdomain",
          "writable": true
        },
        {
          "name": "group",
          "writable": true
        },
        {
          "name": "collectionMint",
          "writable": true
        },
        {
          "name": "member",
          "writable": true,
          "signer": true
        },
        {
          "name": "minter",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "groupExtensionProgram",
          "address": "5hx15GaPPqsYA61v6QpcGPpo125v7rfvEfZQ4dJErG5V"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "subDomain",
          "type": "string"
        }
      ]
    },
    {
      "name": "setPrimaryDomain",
      "discriminator": [
        18,
        2,
        170,
        172,
        190,
        140,
        242,
        27
      ],
      "accounts": [
        {
          "name": "dnsState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "primaryDomain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  105,
                  109,
                  97,
                  114,
                  121,
                  95,
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "transferDomain",
      "discriminator": [
        129,
        115,
        193,
        43,
        174,
        5,
        241,
        52
      ],
      "accounts": [
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "relations": [
            "domain"
          ]
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "senderAccount",
          "writable": true
        },
        {
          "name": "receiverAccount",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "ataProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "unregisterDomain",
      "discriminator": [
        28,
        190,
        39,
        122,
        49,
        163,
        14,
        182
      ],
      "accounts": [
        {
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "mintAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "masterEdition",
          "writable": true
        },
        {
          "name": "collectionMetadata",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenMetadataProgram"
        },
        {
          "name": "sysvarInstruction"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "unregisterSubdomain",
      "discriminator": [
        97,
        20,
        78,
        170,
        51,
        225,
        239,
        206
      ],
      "accounts": [
        {
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "subDomain",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateAdmin",
      "discriminator": [
        161,
        176,
        40,
        213,
        60,
        184,
        179,
        228
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "dnsState"
          ]
        },
        {
          "name": "newAdmin"
        }
      ],
      "args": []
    },
    {
      "name": "updatePriceRules",
      "discriminator": [
        240,
        236,
        149,
        186,
        243,
        84,
        144,
        126
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "priceRules",
          "type": {
            "vec": {
              "defined": {
                "name": "priceRule"
              }
            }
          }
        }
      ]
    },
    {
      "name": "updateProfile",
      "discriminator": [
        98,
        67,
        99,
        206,
        86,
        115,
        175,
        1
      ],
      "accounts": [
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "profile",
          "type": {
            "defined": {
              "name": "profile"
            }
          }
        }
      ]
    },
    {
      "name": "updateRegistryAdmin",
      "discriminator": [
        117,
        216,
        24,
        14,
        25,
        46,
        33,
        40
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "newRegistryAdmin",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateSocials",
      "discriminator": [
        157,
        64,
        216,
        65,
        136,
        251,
        126,
        148
      ],
      "accounts": [
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "socials",
          "type": {
            "defined": {
              "name": "socialMedia"
            }
          }
        }
      ]
    },
    {
      "name": "updateSubDomainPrice",
      "discriminator": [
        84,
        195,
        163,
        248,
        25,
        144,
        118,
        52
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "dnsState"
          ]
        }
      ],
      "args": [
        {
          "name": "subDomainPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateTextRecords",
      "discriminator": [
        241,
        162,
        65,
        31,
        118,
        176,
        102,
        112
      ],
      "accounts": [
        {
          "name": "domain",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "relations": [
            "domain",
            "tokenAccount"
          ]
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "textRecords",
          "type": {
            "vec": {
              "defined": {
                "name": "textRecord"
              }
            }
          }
        }
      ]
    },
    {
      "name": "updateTreasury",
      "discriminator": [
        60,
        16,
        243,
        66,
        96,
        59,
        254,
        131
      ],
      "accounts": [
        {
          "name": "dnsState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  110,
                  115,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "dnsState"
          ]
        },
        {
          "name": "treasury"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "dnsState",
      "discriminator": [
        212,
        184,
        33,
        18,
        41,
        35,
        205,
        88
      ]
    },
    {
      "name": "domain",
      "discriminator": [
        167,
        191,
        231,
        63,
        146,
        41,
        115,
        27
      ]
    },
    {
      "name": "priceUpdateV2",
      "discriminator": [
        34,
        241,
        35,
        99,
        157,
        126,
        244,
        205
      ]
    },
    {
      "name": "primaryDomain",
      "discriminator": [
        231,
        255,
        61,
        63,
        142,
        184,
        254,
        42
      ]
    }
  ],
  "events": [
    {
      "name": "expandDomainEvent",
      "discriminator": [
        39,
        110,
        213,
        60,
        144,
        200,
        210,
        192
      ]
    },
    {
      "name": "initDnsEvent",
      "discriminator": [
        16,
        118,
        118,
        223,
        73,
        226,
        19,
        181
      ]
    },
    {
      "name": "registerDomainEvent",
      "discriminator": [
        160,
        213,
        133,
        79,
        68,
        212,
        26,
        85
      ]
    },
    {
      "name": "registerSubDomainEvent",
      "discriminator": [
        118,
        151,
        162,
        105,
        13,
        235,
        158,
        224
      ]
    },
    {
      "name": "setPrimaryDomainEvent",
      "discriminator": [
        135,
        11,
        82,
        113,
        186,
        61,
        247,
        148
      ]
    },
    {
      "name": "unregisterDomainEvent",
      "discriminator": [
        53,
        32,
        182,
        6,
        195,
        60,
        40,
        3
      ]
    },
    {
      "name": "unregisterSubdomainEvent",
      "discriminator": [
        183,
        43,
        145,
        226,
        170,
        188,
        100,
        194
      ]
    },
    {
      "name": "updateAdminEvent",
      "discriminator": [
        225,
        152,
        171,
        87,
        246,
        63,
        66,
        234
      ]
    },
    {
      "name": "updateExtensionsEvent",
      "discriminator": [
        11,
        148,
        7,
        194,
        28,
        58,
        131,
        160
      ]
    },
    {
      "name": "updatePayableTokensEvent",
      "discriminator": [
        81,
        223,
        72,
        49,
        86,
        119,
        118,
        29
      ]
    },
    {
      "name": "updatePriceRulesEvent",
      "discriminator": [
        108,
        66,
        96,
        91,
        5,
        84,
        169,
        135
      ]
    },
    {
      "name": "updateProfileEvent",
      "discriminator": [
        15,
        250,
        133,
        11,
        68,
        57,
        250,
        45
      ]
    },
    {
      "name": "updateSocialsEvent",
      "discriminator": [
        81,
        64,
        185,
        148,
        10,
        32,
        220,
        179
      ]
    },
    {
      "name": "updateSubdomainPriceEvent",
      "discriminator": [
        19,
        236,
        130,
        208,
        255,
        109,
        86,
        36
      ]
    },
    {
      "name": "updateTextRecordsEvent",
      "discriminator": [
        31,
        33,
        36,
        241,
        110,
        113,
        249,
        254
      ]
    },
    {
      "name": "updateTreasuryEvent",
      "discriminator": [
        104,
        210,
        213,
        227,
        230,
        150,
        146,
        19
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "sizeExceedsMaxSize",
      "msg": "Collection size exceeds max size."
    },
    {
      "code": 6001,
      "name": "maxSizeBelowCurrentSize",
      "msg": "Max size cannot be reduced below current size."
    },
    {
      "code": 6002,
      "name": "creatorShareInvalid",
      "msg": "Creators shares must add up to 100."
    },
    {
      "code": 6003,
      "name": "missingApproveAccount",
      "msg": "Missing approve account."
    },
    {
      "code": 6004,
      "name": "expiredApproveAccount",
      "msg": "Approve account has expired."
    },
    {
      "code": 6005,
      "name": "invalidField",
      "msg": "Invalid field. You cannot use a public key as a field."
    },
    {
      "code": 6006,
      "name": "creatorAddressInvalid",
      "msg": "The Address you provided is invalid. Please provide a valid address."
    },
    {
      "code": 6007,
      "name": "royaltyBasisPointsInvalid",
      "msg": "Royalty basis points must be less than or equal to 10000."
    },
    {
      "code": 6008,
      "name": "platformFeeBasisPointsInvalid",
      "msg": "Platform fee basis points must be less than or equal to 10000."
    },
    {
      "code": 6009,
      "name": "recipientShareInvalid",
      "msg": "Recipient shares must add up to 100."
    },
    {
      "code": 6010,
      "name": "reservedField",
      "msg": "The provided field is invalid or reserved."
    },
    {
      "code": 6011,
      "name": "invalidNumberOfRecipients",
      "msg": "Invalid number of platform fee recipients. Exactly 5 recipients are required."
    }
  ],
  "types": [
    {
      "name": "creatorWithShare",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "dnsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "registryAdmin",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "extensions",
            "type": {
              "vec": {
                "defined": {
                  "name": "extensionState"
                }
              }
            }
          },
          {
            "name": "priceRules",
            "type": {
              "vec": {
                "defined": {
                  "name": "priceRule"
                }
              }
            }
          },
          {
            "name": "payableTokens",
            "type": {
              "vec": {
                "defined": {
                  "name": "payableToken"
                }
              }
            }
          },
          {
            "name": "subDomainPrice",
            "type": "u64"
          },
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "group",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "domain",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "expiresAt",
            "type": "u64"
          },
          {
            "name": "profile",
            "type": {
              "defined": {
                "name": "profile"
              }
            }
          },
          {
            "name": "socials",
            "type": {
              "defined": {
                "name": "socialMedia"
              }
            }
          },
          {
            "name": "textRecords",
            "type": {
              "vec": {
                "defined": {
                  "name": "textRecord"
                }
              }
            }
          },
          {
            "name": "subdomains",
            "type": {
              "vec": {
                "defined": {
                  "name": "subDomain"
                }
              }
            }
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "metadata",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "expandDomainEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "expandedYear",
            "type": "u8"
          },
          {
            "name": "expiresAt",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "extensionState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "treasuryAddress",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "treasuryShare",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "refShare",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "royaltiesAddress",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "royaltiesBps",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "initDnsEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "priceRules",
            "type": {
              "vec": {
                "defined": {
                  "name": "priceRule"
                }
              }
            }
          },
          {
            "name": "payableTokens",
            "type": {
              "vec": {
                "defined": {
                  "name": "payableToken"
                }
              }
            }
          },
          {
            "name": "subDomainPrice",
            "type": "u64"
          },
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "payableToken",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "priceFeedId",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "fixedPrice",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "priceFeedMessage",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feedId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "price",
            "type": "i64"
          },
          {
            "name": "conf",
            "type": "u64"
          },
          {
            "name": "exponent",
            "type": "i32"
          },
          {
            "name": "publishTime",
            "docs": [
              "The timestamp of this price update in seconds"
            ],
            "type": "i64"
          },
          {
            "name": "prevPublishTime",
            "docs": [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent."
            ],
            "type": "i64"
          },
          {
            "name": "emaPrice",
            "type": "i64"
          },
          {
            "name": "emaConf",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "priceRule",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "letterLength",
            "type": "u8"
          },
          {
            "name": "annualPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "priceUpdateV2",
      "docs": [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "writeAuthority",
            "type": "pubkey"
          },
          {
            "name": "verificationLevel",
            "type": {
              "defined": {
                "name": "verificationLevel"
              }
            }
          },
          {
            "name": "priceMessage",
            "type": {
              "defined": {
                "name": "priceFeedMessage"
              }
            }
          },
          {
            "name": "postedSlot",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "primaryDomain",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "avatar",
            "type": "string"
          },
          {
            "name": "location",
            "type": "string"
          },
          {
            "name": "website",
            "type": "string"
          },
          {
            "name": "shortbio",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "registerDomainEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "periodYear",
            "type": "u8"
          },
          {
            "name": "expiresAt",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "registerSubDomainEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "subdomain",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "setPrimaryDomainEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "socialMedia",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "telegram",
            "type": "string"
          },
          {
            "name": "discord",
            "type": "string"
          },
          {
            "name": "twitter",
            "type": "string"
          },
          {
            "name": "medium",
            "type": "string"
          },
          {
            "name": "facebook",
            "type": "string"
          },
          {
            "name": "otherLink",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "subDomain",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "mint",
            "docs": [
              "Check"
            ],
            "type": "pubkey"
          },
          {
            "name": "group",
            "docs": [
              "Check"
            ],
            "type": "pubkey"
          },
          {
            "name": "groupMint",
            "docs": [
              "Check"
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "textRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nameValue",
            "type": "string"
          },
          {
            "name": "link",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "unregisterDomainEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "unregisterSubdomainEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "subdomain",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateAdminEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newAdmin",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateExtensionsEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "extensions",
            "type": {
              "vec": {
                "defined": {
                  "name": "extensionState"
                }
              }
            }
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updatePayableTokensEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payableTokens",
            "type": {
              "vec": {
                "defined": {
                  "name": "payableToken"
                }
              }
            }
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updatePriceRulesEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceRules",
            "type": {
              "vec": {
                "defined": {
                  "name": "priceRule"
                }
              }
            }
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateProfileEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "profile",
            "type": {
              "defined": {
                "name": "profile"
              }
            }
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateRoyaltiesArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "royaltyBasisPoints",
            "type": "u16"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": {
                  "name": "creatorWithShare"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "updateSocialsEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "socials",
            "type": {
              "defined": {
                "name": "socialMedia"
              }
            }
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateSubdomainPriceEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "subDomainPrice",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateTextRecordsEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "textRecords",
            "type": {
              "vec": {
                "defined": {
                  "name": "textRecord"
                }
              }
            }
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateTreasuryEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "verificationLevel",
      "docs": [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "partial",
            "fields": [
              {
                "name": "numSignatures",
                "type": "u8"
              }
            ]
          },
          {
            "name": "full"
          }
        ]
      }
    }
  ]
};
