/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/vaults.json`.
 */
export type Vaults = {
  "address": "doVLtcguouVHW5c6odaNrbcHAUEd2fkMGxq28efDptj",
  "metadata": {
    "name": "vaults",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "deposit",
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "coveredCallBaseVault",
          "writable": true
        },
        {
          "name": "vaultLpMint",
          "writable": true
        },
        {
          "name": "vaultMintAuthority"
        },
        {
          "name": "payerVaultLpMintAta",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true
        },
        {
          "name": "underlyingMint",
          "writable": true
        },
        {
          "name": "underlyingPool",
          "docs": [
            "Deposit pool for the underlying asset",
            "Should be initialized before calling this instruction"
          ],
          "writable": true
        },
        {
          "name": "payerUnderlyingAta",
          "writable": true
        },
        {
          "name": "quoteMint",
          "writable": true
        },
        {
          "name": "premiumPool",
          "docs": [
            "Deposit pool for the quote asset",
            "Should be initialized before calling this instruction"
          ],
          "writable": true
        },
        {
          "name": "payerQuoteAta",
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "depositAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "coveredCallBaseVault",
          "writable": true
        },
        {
          "name": "vaultLpMint",
          "writable": true
        },
        {
          "name": "vaultMintAuthority"
        },
        {
          "name": "authority",
          "writable": true
        },
        {
          "name": "underlyingMint",
          "writable": true
        },
        {
          "name": "underlyingPool",
          "docs": [
            "Deposit pool for the underlying asset",
            "Should be initialized before calling this instruction"
          ],
          "writable": true
        },
        {
          "name": "quoteMint",
          "writable": true
        },
        {
          "name": "premiumPool",
          "docs": [
            "Deposit pool for the quote asset",
            "Should be initialized before calling this instruction"
          ],
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "startCycle",
      "discriminator": [
        203,
        152,
        115,
        167,
        17,
        252,
        73,
        86
      ],
      "accounts": [
        {
          "name": "vaultAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "optionCycle",
          "writable": true
        },
        {
          "name": "vaultOptionTokenAccount",
          "docs": [
            "The vault's token account that will receive the minted options"
          ],
          "writable": true
        },
        {
          "name": "vaultWriterTokenAccount",
          "docs": [
            "The vault's token account that will receive the writer tokens"
          ],
          "writable": true
        },
        {
          "name": "collateralPool",
          "writable": true
        },
        {
          "name": "underlyingPool",
          "docs": [
            "this underlying pool is of the defi option vaults program, not leverage.fun engine"
          ],
          "writable": true
        },
        {
          "name": "vaultCollateral",
          "writable": true
        },
        {
          "name": "vaultPoolAuthority",
          "writable": true
        },
        {
          "name": "euroMeta",
          "writable": true
        },
        {
          "name": "optionMint",
          "writable": true
        },
        {
          "name": "writerMint",
          "writable": true
        },
        {
          "name": "auctionState",
          "writable": true
        },
        {
          "name": "euroPrimitiveProgram",
          "docs": [
            "Euro primitive program for minting options"
          ]
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "cycleNumber",
          "type": "u64"
        },
        {
          "name": "strikePrice",
          "type": "u64"
        },
        {
          "name": "underlyingAmountPerContract",
          "type": "u64"
        },
        {
          "name": "optionAmount",
          "type": "u64"
        },
        {
          "name": "priceDecimals",
          "type": "u8"
        },
        {
          "name": "optionType",
          "type": "u8"
        },
        {
          "name": "auctionType",
          "type": "u8"
        },
        {
          "name": "startingBid",
          "type": "u64"
        },
        {
          "name": "duration",
          "type": "i64"
        }
      ]
    },
    {
      "name": "withdraw",
      "discriminator": [
        183,
        18,
        70,
        156,
        148,
        109,
        161,
        34
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "coveredCallBaseVault",
          "writable": true
        },
        {
          "name": "vaultLpMint",
          "writable": true
        },
        {
          "name": "payerVaultLpMintAta",
          "writable": true
        },
        {
          "name": "vaultMintAuthority"
        },
        {
          "name": "authority",
          "writable": true
        },
        {
          "name": "underlyingMint",
          "writable": true
        },
        {
          "name": "quoteMint",
          "writable": true
        },
        {
          "name": "underlyingPool",
          "writable": true
        },
        {
          "name": "payerUnderlyingAta",
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "auction",
      "discriminator": [
        218,
        94,
        247,
        242,
        126,
        233,
        131,
        81
      ]
    },
    {
      "name": "coveredCallBaseVault",
      "discriminator": [
        138,
        80,
        190,
        45,
        22,
        116,
        53,
        30
      ]
    },
    {
      "name": "euroMetaV2",
      "discriminator": [
        235,
        100,
        34,
        74,
        90,
        205,
        244,
        43
      ]
    },
    {
      "name": "optionCycle",
      "discriminator": [
        57,
        38,
        196,
        146,
        11,
        164,
        132,
        183
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "vaultNotInitialized",
      "msg": "The expiration is in the past"
    },
    {
      "code": 6001,
      "name": "depositAmountZero",
      "msg": "The deposit amount is zero"
    },
    {
      "code": 6002,
      "name": "premiumZero",
      "msg": "The premium amount is zero"
    },
    {
      "code": 6003,
      "name": "insufficientVaultLp",
      "msg": "Insufficient vault lp"
    },
    {
      "code": 6004,
      "name": "withdrawAmountZero",
      "msg": "The withdraw amount is zero"
    },
    {
      "code": 6005,
      "name": "mathOverflow",
      "msg": "Math overflow"
    },
    {
      "code": 6006,
      "name": "someError",
      "msg": ""
    }
  ],
  "types": [
    {
      "name": "auction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "auctionType",
            "type": {
              "defined": {
                "name": "auctionType"
              }
            }
          },
          {
            "name": "startingBid",
            "type": "u64"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "highestBid",
            "type": "u64"
          },
          {
            "name": "highestBidder",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "assetHolder",
            "type": "pubkey"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          },
          {
            "name": "auctionBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "auctionType",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "english"
          },
          {
            "name": "dutch"
          },
          {
            "name": "sealedBid"
          }
        ]
      }
    },
    {
      "name": "coveredCallBaseVault",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalDepositedAssets",
            "docs": [
              "Total amount of underlying assets deposited in the vault"
            ],
            "type": "u64"
          },
          {
            "name": "totalIssuedShares",
            "docs": [
              "Total shares issued to depositors"
            ],
            "type": "u64"
          },
          {
            "name": "currentOptionStrikePrice",
            "docs": [
              "Current strike price of the options being sold (in smallest units, e.g., lamports)"
            ],
            "type": "u64"
          },
          {
            "name": "currentOptionExpiry",
            "docs": [
              "Expiration timestamp of the current options (Unix timestamp)"
            ],
            "type": "i64"
          },
          {
            "name": "totalPremiumCollected",
            "docs": [
              "Total option premiums collected (in smallest units)"
            ],
            "type": "u64"
          },
          {
            "name": "transferWindow",
            "type": "u64"
          },
          {
            "name": "startTransferTime",
            "docs": [
              "time at which withdrawals began"
            ],
            "type": "u64"
          },
          {
            "name": "endTransferTime",
            "docs": [
              "minimum time at which withdrawals end"
            ],
            "type": "u64"
          },
          {
            "name": "isInitialized",
            "docs": [
              "Indicates if the vault has been initialized, 0 - no, 1 - yes"
            ],
            "type": "u8"
          },
          {
            "name": "bumpSeed",
            "docs": [
              "The bump seed for the vault"
            ],
            "type": "u8"
          },
          {
            "name": "vaultLpMintBump",
            "docs": [
              "The bump for vault lp mint"
            ],
            "type": "u8"
          },
          {
            "name": "poolAuthorityBump",
            "docs": [
              "The bump for pool authority"
            ],
            "type": "u8"
          },
          {
            "name": "vaultMintAuthorityBump",
            "docs": [
              "The bump for vault mint authority"
            ],
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          },
          {
            "name": "manager",
            "docs": [
              "The authority or manager of the vault"
            ],
            "type": "pubkey"
          },
          {
            "name": "vaultLpMint",
            "docs": [
              "The vault's LP token mint"
            ],
            "type": "pubkey"
          },
          {
            "name": "underlyingMint",
            "docs": [
              "The SPL token mint of the underlying asset"
            ],
            "type": "pubkey"
          },
          {
            "name": "quoteMint",
            "docs": [
              "The SPL token mint for the vault shares issued to depositors"
            ],
            "type": "pubkey"
          },
          {
            "name": "underlyingPool",
            "docs": [
              "The SPL token account holding the underlying assets"
            ],
            "type": "pubkey"
          },
          {
            "name": "optionMint",
            "docs": [
              "The SPL token mint of the option token"
            ],
            "type": "pubkey"
          },
          {
            "name": "premiumPool",
            "docs": [
              "The SPL token account holding premiums collected from selling options"
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "euroMetaV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "underlyingMint",
            "docs": [
              "The mint of the underlying asset"
            ],
            "type": "pubkey"
          },
          {
            "name": "stableMint",
            "docs": [
              "The mint key for some stable coin. Oracle should use this token for pricing. Use of a",
              "different token is not recommended (e.g. USDT when Oracle uses USDT), as prices may deviate",
              "slightly even for stablecoins."
            ],
            "type": "pubkey"
          },
          {
            "name": "collateralPool",
            "docs": [
              "The collateral pool's address.",
              "",
              "The token held in the pool depends on the collateral type in use: PUTs and PUT spreads",
              "use the stable asset, CALLs and CALL spreads use underlying. Some CALL Spreads can also",
              "use stable. For example, a SOL call spread market may trade in SOL, or USDC."
            ],
            "type": "pubkey"
          },
          {
            "name": "oracle",
            "docs": [
              "Oracle's address. Chainlink and Pyth oracles are supported at this time. Matches",
              "ExpirationData's oracle"
            ],
            "type": "pubkey"
          },
          {
            "name": "writerMint",
            "docs": [
              "The mint for the writer tokens, initialized on creation"
            ],
            "type": "pubkey"
          },
          {
            "name": "optionMint",
            "docs": [
              "The mint for the option tokens, initialized on creation"
            ],
            "type": "pubkey"
          },
          {
            "name": "expirationData",
            "docs": [
              "The address for the associated ExpirationData. Stored to make validations computationally",
              "efficient."
            ],
            "type": "pubkey"
          },
          {
            "name": "strikePrices",
            "docs": [
              "Strike price(s). For Calls/Puts, a single value. For vertical spreads, two values. The",
              "lower strike price is first, followed by the higher price. Uses price_decimals"
            ],
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "expiration",
            "docs": [
              "The Unix Timestamp for the expiration, in seconds. Must match ExpirationData's"
            ],
            "type": "i64"
          },
          {
            "name": "underlyingAmountPerContract",
            "docs": [
              "The amount of underlying assets per 1 OptionToken,",
              "denoted in the underlying assets decimals."
            ],
            "type": "u64"
          },
          {
            "name": "underlyingDecimals",
            "docs": [
              "The number of decimals on the underlying, read from the mint on creation"
            ],
            "type": "u8"
          },
          {
            "name": "stableDecimals",
            "docs": [
              "The decimals of the stable mint, read from the mint on creation."
            ],
            "type": "u8"
          },
          {
            "name": "priceDecimals",
            "docs": [
              "The number of decimals in the strike_prices & price_at_expiration. This is",
              "required to normalize the strike price with oracles."
            ],
            "type": "u8"
          },
          {
            "name": "bumpSeed",
            "docs": [
              "The bump seed for the EuroMeta"
            ],
            "type": "u8"
          },
          {
            "name": "oracleProviderId",
            "docs": [
              "An oracle provider identifier. Pyth = 0, Switchboard = 1"
            ],
            "type": "u8"
          },
          {
            "name": "optionType",
            "docs": [
              "Option type of the euro meta: CALL, PUT, LongCallSpread, LongPutSpread"
            ],
            "type": {
              "defined": {
                "name": "optionTypeV2"
              }
            }
          }
        ]
      }
    },
    {
      "name": "optionCycle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTimestamp",
            "type": "i64"
          },
          {
            "name": "endTimestamp",
            "type": "i64"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "optionMint",
            "type": "pubkey"
          },
          {
            "name": "auctionState",
            "type": "pubkey"
          },
          {
            "name": "vaultAuthority",
            "type": "pubkey"
          },
          {
            "name": "cycleNumber",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "strikePrice",
            "type": "u64"
          },
          {
            "name": "underlyingAmountPerContract",
            "type": "u64"
          },
          {
            "name": "priceDecimals",
            "type": "u8"
          },
          {
            "name": "euroMeta",
            "type": "pubkey"
          },
          {
            "name": "optionType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "optionTypeV2",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "call"
          },
          {
            "name": "put"
          },
          {
            "name": "longCallSpread"
          },
          {
            "name": "longPutSpread"
          }
        ]
      }
    }
  ]
};
