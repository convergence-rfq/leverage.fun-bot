/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/euro_primitive.json`.
 */
export type EuroPrimitive = {
  "address": "",
  "metadata": {
    "name": "euroPrimitive",
    "version": "1.1.1",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "closeOptions",
      "discriminator": [
        164,
        233,
        228,
        52,
        10,
        204,
        181,
        163
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "euroMeta"
        },
        {
          "name": "collateralPool",
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
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
          "name": "optionSource",
          "writable": true
        },
        {
          "name": "writerSource",
          "writable": true
        },
        {
          "name": "collateralDestination",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "optionType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "closeOptionsV2",
      "discriminator": [
        171,
        116,
        142,
        55,
        21,
        58,
        56,
        164
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "euroMeta"
        },
        {
          "name": "collateralPool",
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
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
          "name": "optionSource",
          "writable": true
        },
        {
          "name": "writerSource",
          "writable": true
        },
        {
          "name": "collateralDestination",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createEuroMeta",
      "discriminator": [
        3,
        89,
        97,
        204,
        36,
        53,
        59,
        224
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "The wallet address signing the transaction"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "underlyingMint",
          "docs": [
            "The mint of the underlying asset. Calls will be settled in this asset."
          ]
        },
        {
          "name": "underlyingPool"
        },
        {
          "name": "stableMint",
          "docs": [
            "The mint of the stable asset. Puts will be settled in this asset.",
            "NOTE: This should match the oracle"
          ]
        },
        {
          "name": "stablePool"
        },
        {
          "name": "euroMeta",
          "writable": true
        },
        {
          "name": "expirationData"
        },
        {
          "name": "callOptionMint"
        },
        {
          "name": "callWriterMint"
        },
        {
          "name": "putOptionMint",
          "writable": true
        },
        {
          "name": "putWriterMint",
          "writable": true
        },
        {
          "name": "oracle",
          "docs": [
            "the oracle account is a seed for the ExpirationData PDA, you know this is the same oracle",
            "account on that strutcture that was previously checked. Thus all known appropriate checks for",
            "the oracle, given the derived ExpirationData, have been met."
          ]
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "underlyingAmountPerContract",
          "type": "u64"
        },
        {
          "name": "expiration",
          "type": "i64"
        },
        {
          "name": "strikePrice",
          "type": "u64"
        },
        {
          "name": "priceDecimals",
          "type": "u8"
        },
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "expirationDataBump",
          "type": "u8"
        },
        {
          "name": "oracleProviderId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createEuroMetaV2",
      "discriminator": [
        100,
        255,
        189,
        150,
        136,
        21,
        243,
        41
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "The wallet address signing the transaction"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "underlyingMint",
          "docs": [
            "The mint of the underlying asset"
          ]
        },
        {
          "name": "collateralPool",
          "docs": [
            "The token held in the pool depends on the collateral type in use: PUTs and PUT spreads",
            "use the stable asset, CALLs and CALL spreads use underlying. Some CALL Spreads can also",
            "use stable. For example, a SOL call spread market may trade in SOL, or USDC.",
            "",
            "The seeds are checked in access_control"
          ]
        },
        {
          "name": "stableMint",
          "docs": [
            "The mint of the stable asset.",
            "NOTE: This should match the oracle"
          ]
        },
        {
          "name": "euroMeta",
          "writable": true
        },
        {
          "name": "expirationData"
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
          "name": "oracle",
          "docs": [
            "the oracle account is a seed for the ExpirationData PDA, you know this is the same oracle",
            "account on that structure that was previously checked. Thus all known appropriate checks for",
            "the oracle, given the derived ExpirationData, have been met."
          ]
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "expiration",
          "type": "i64"
        },
        {
          "name": "strikePrices",
          "type": {
            "vec": "u64"
          }
        },
        {
          "name": "oracleProviderId",
          "type": "u8"
        },
        {
          "name": "optionType",
          "type": "u8"
        },
        {
          "name": "expirationDataBump",
          "type": "u8"
        },
        {
          "name": "underlyingAmountPerContract",
          "type": "u64"
        },
        {
          "name": "priceDecimals",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initExpirationData",
      "discriminator": [
        62,
        16,
        215,
        70,
        29,
        99,
        13,
        240
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "The wallet address signing the transaction"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "underlyingMint",
          "docs": [
            "The mint of the underlying asset"
          ]
        },
        {
          "name": "expirationData",
          "writable": true
        },
        {
          "name": "oracle"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "expiration",
          "type": "i64"
        },
        {
          "name": "priceDecimals",
          "type": "u8"
        },
        {
          "name": "oracleProviderId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initSerumMarket",
      "discriminator": [
        55,
        157,
        44,
        90,
        69,
        81,
        148,
        175
      ],
      "accounts": [
        {
          "name": "userAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "serumMarket",
          "writable": true
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "dexProgram",
          "docs": [
            "from https://github.com/mithraiclabs/openbook-psy"
          ]
        },
        {
          "name": "rent"
        },
        {
          "name": "pcMint"
        },
        {
          "name": "optionMint"
        },
        {
          "name": "requestQueue",
          "writable": true
        },
        {
          "name": "eventQueue",
          "writable": true
        },
        {
          "name": "bids",
          "writable": true
        },
        {
          "name": "asks",
          "writable": true
        },
        {
          "name": "coinVault"
        },
        {
          "name": "pcVault"
        },
        {
          "name": "vaultSigner"
        },
        {
          "name": "marketAuthority"
        }
      ],
      "args": [
        {
          "name": "marketSpace",
          "type": "u64"
        },
        {
          "name": "vaultSignerNonce",
          "type": "u64"
        },
        {
          "name": "coinLotSize",
          "type": "u64"
        },
        {
          "name": "pcLotSize",
          "type": "u64"
        },
        {
          "name": "pcDustThreshold",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeStablePool",
      "discriminator": [
        144,
        90,
        99,
        33,
        247,
        50,
        214,
        249
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "The wallet address signing the transaction"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "stableMint",
          "docs": [
            "The mint of the stable asset"
          ]
        },
        {
          "name": "stablePool",
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
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "initializeUnderlyingPool",
      "discriminator": [
        14,
        86,
        241,
        157,
        12,
        229,
        171,
        163
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "The wallet address signing the transaction"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "underlyingMint",
          "docs": [
            "The mint of the underlying asset. Calls will be settled in this asset."
          ]
        },
        {
          "name": "underlyingPool",
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
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "mintOptions",
      "discriminator": [
        48,
        123,
        197,
        59,
        160,
        199,
        75,
        150
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "euroMeta"
        },
        {
          "name": "expirationData"
        },
        {
          "name": "collateralPool",
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
          "name": "minterCollateral",
          "writable": true
        },
        {
          "name": "optionDestination",
          "writable": true
        },
        {
          "name": "writerDestination",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "optionType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "mintOptionsV2",
      "discriminator": [
        249,
        84,
        107,
        193,
        157,
        119,
        210,
        190
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "euroMeta"
        },
        {
          "name": "collateralPool",
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
          "name": "minterCollateral",
          "writable": true
        },
        {
          "name": "vaultCollateral",
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "writable": true
        },
        {
          "name": "optionDestination",
          "writable": true
        },
        {
          "name": "writerDestination",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "optionType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "preCreateEuroMeta",
      "discriminator": [
        144,
        161,
        76,
        176,
        227,
        97,
        81,
        174
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "stableMint"
        },
        {
          "name": "underlyingMint"
        },
        {
          "name": "euroMeta",
          "writable": true
        },
        {
          "name": "callOptionMint",
          "writable": true
        },
        {
          "name": "callWriterMint",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "underlyingAmountPerContract",
          "type": "u64"
        },
        {
          "name": "expiration",
          "type": "i64"
        },
        {
          "name": "strikePrice",
          "type": "u64"
        },
        {
          "name": "priceDecimals",
          "type": "u8"
        },
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "expirationDataBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "preInitSerumMarket",
      "discriminator": [
        76,
        6,
        159,
        50,
        147,
        186,
        193,
        223
      ],
      "accounts": [
        {
          "name": "userAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "pcMint"
        },
        {
          "name": "optionMint"
        },
        {
          "name": "vaultSigner"
        },
        {
          "name": "coinVault",
          "writable": true
        },
        {
          "name": "pcVault",
          "writable": true
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "rent"
        }
      ],
      "args": []
    },
    {
      "name": "setExpirationPrice",
      "discriminator": [
        83,
        210,
        157,
        170,
        44,
        1,
        80,
        109
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "expirationData",
          "writable": true
        },
        {
          "name": "priceOracle"
        }
      ],
      "args": []
    },
    {
      "name": "settleExpiredOptionV2",
      "discriminator": [
        93,
        152,
        134,
        107,
        97,
        15,
        215,
        218
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "euroMeta"
        },
        {
          "name": "expirationData"
        },
        {
          "name": "optionMint",
          "writable": true
        },
        {
          "name": "optionSource",
          "writable": true
        },
        {
          "name": "collateralPool",
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
        },
        {
          "name": "collateralDestination",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "settleExpiredOptions",
      "discriminator": [
        68,
        203,
        65,
        23,
        67,
        152,
        142,
        56
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "euroMeta"
        },
        {
          "name": "expirationData"
        },
        {
          "name": "optionMint",
          "writable": true
        },
        {
          "name": "collateralMint"
        },
        {
          "name": "optionSource",
          "writable": true
        },
        {
          "name": "collateralPool",
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
        },
        {
          "name": "collateralDestination",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "optionType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "settleExpiredWriters",
      "discriminator": [
        193,
        172,
        151,
        210,
        87,
        237,
        226,
        29
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "euroMeta"
        },
        {
          "name": "expirationData"
        },
        {
          "name": "writerMint",
          "writable": true
        },
        {
          "name": "collateralMint"
        },
        {
          "name": "writerSource",
          "writable": true
        },
        {
          "name": "collateralPool",
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
        },
        {
          "name": "collateralDestination",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "optionType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "settleExpiredWritersV2",
      "discriminator": [
        231,
        50,
        25,
        221,
        92,
        88,
        78,
        252
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "euroMeta"
        },
        {
          "name": "expirationData"
        },
        {
          "name": "writerMint",
          "writable": true
        },
        {
          "name": "writerSource",
          "writable": true
        },
        {
          "name": "collateralPool",
          "writable": true
        },
        {
          "name": "poolAuthority",
          "docs": [
            "The general pool authority for the protocol"
          ]
        },
        {
          "name": "collateralDestination",
          "writable": true
        },
        {
          "name": "tokenProgram"
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
      "name": "euroMeta",
      "discriminator": [
        143,
        142,
        75,
        68,
        96,
        251,
        84,
        36
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
      "name": "expirationData",
      "discriminator": [
        138,
        118,
        169,
        12,
        44,
        29,
        42,
        126
      ]
    }
  ],
  "types": [
    {
      "name": "euroMeta",
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "rust",
        "packed": true
      },
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
            "name": "stablePool",
            "docs": [
              "The stable pool's address"
            ],
            "type": "pubkey"
          },
          {
            "name": "underlyingPool",
            "docs": [
              "The TokenAccount that holds underlying asset deposits"
            ],
            "type": "pubkey"
          },
          {
            "name": "oracle",
            "docs": [
              "The key for the oracle mapping"
            ],
            "type": "pubkey"
          },
          {
            "name": "stableMint",
            "docs": [
              "The mint key for some stable coin that is pegged to the oracle"
            ],
            "type": "pubkey"
          },
          {
            "name": "callOptionMint",
            "docs": [
              "The mint for the CALL option tokens"
            ],
            "type": "pubkey"
          },
          {
            "name": "callWriterMint",
            "docs": [
              "The mint for the CALL writer tokens"
            ],
            "type": "pubkey"
          },
          {
            "name": "putOptionMint",
            "docs": [
              "The mint for the PUT option tokens"
            ],
            "type": "pubkey"
          },
          {
            "name": "putWriterMint",
            "docs": [
              "The mint for the PUT writer tokens"
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
            "name": "strikePrice",
            "docs": [
              "The strike price with decimals price_decimals"
            ],
            "type": "u64"
          },
          {
            "name": "expiration",
            "docs": [
              "The Unix Timestamp for the expiration"
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
              "The number of decimals on the underlying, read from the Mint on creation"
            ],
            "type": "u8"
          },
          {
            "name": "stableDecimals",
            "docs": [
              "The decimals of the stable mint"
            ],
            "type": "u8"
          },
          {
            "name": "priceDecimals",
            "docs": [
              "The number of decimals in the strike_price & price_at_expiration. This is",
              "required to normalize the strike price with the oracles."
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
              "An oracle provider identifier"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "euroMetaCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "euroMeta",
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
      "name": "expirationData",
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "rust",
        "packed": true
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "expiration",
            "docs": [
              "The expiration time"
            ],
            "type": "i64"
          },
          {
            "name": "oracle",
            "docs": [
              "The aggregate price oracle for pyth or switchboard"
            ],
            "type": "pubkey"
          },
          {
            "name": "priceAtExpiration",
            "docs": [
              "The price, in price_decimals, at the time of expiration"
            ],
            "type": "u64"
          },
          {
            "name": "priceSetAtTime",
            "docs": [
              "The time at which the price_at_expiration was set."
            ],
            "type": "i64"
          },
          {
            "name": "priceDecimals",
            "docs": [
              "The number of decimals in the strike_price & price_at_expiration. This is",
              "required to normalize the strike price with the oracles."
            ],
            "type": "u8"
          },
          {
            "name": "priceSet",
            "docs": [
              "Flag for easy memcmp filtering"
            ],
            "type": "bool"
          },
          {
            "name": "bump",
            "docs": [
              "bump seed"
            ],
            "type": "u8"
          },
          {
            "name": "oracleProviderId",
            "docs": [
              "An oracle provider identifier"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "expirationDataCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "expirationData",
            "type": "pubkey"
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
    },
    {
      "name": "stablePoolCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stablePool",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "underlyingPoolCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "underlyingPool",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
