/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/option_auction.json`.
 */
export type OptionAuction = {
  "address": "BTxfkFZ7bGfse162Tz3hHpd9NxJJxYrFMj63iFmVDs7i",
  "metadata": {
    "name": "optionAuction",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "cancelAuction",
      "discriminator": [
        156,
        43,
        197,
        110,
        218,
        105,
        143,
        182
      ],
      "accounts": [
        {
          "name": "auction",
          "writable": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "highestBidderTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "assetHolder",
          "writable": true
        },
        {
          "name": "creatorAssetAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "closeAuction",
      "discriminator": [
        225,
        129,
        91,
        48,
        215,
        73,
        203,
        172
      ],
      "accounts": [
        {
          "name": "auction",
          "writable": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "creatorTokenAccount",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "creatorAssetAccount",
          "writable": true
        },
        {
          "name": "highestBidderTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "assetHolder",
          "writable": true
        },
        {
          "name": "winnerAssetAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "initializeAuction",
      "discriminator": [
        37,
        10,
        117,
        197,
        208,
        88,
        117,
        62
      ],
      "accounts": [
        {
          "name": "auction",
          "writable": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "assetHolder",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "creatorTokenAccount",
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
      "args": [
        {
          "name": "auctionNumber",
          "type": "u64"
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
      "name": "placeBid",
      "discriminator": [
        238,
        77,
        148,
        91,
        200,
        151,
        92,
        146
      ],
      "accounts": [
        {
          "name": "auction",
          "writable": true
        },
        {
          "name": "bidder",
          "writable": true,
          "signer": true
        },
        {
          "name": "bidderTokenAccount",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "highestBidderTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "bidAmount",
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
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "auctionNotActive",
      "msg": "Auction is not active."
    },
    {
      "code": 6001,
      "name": "auctionEnded",
      "msg": "Auction has already ended."
    },
    {
      "code": 6002,
      "name": "bidTooLow",
      "msg": "Your bid is too low."
    },
    {
      "code": 6003,
      "name": "auctionStillActive",
      "msg": "Auction is still active."
    },
    {
      "code": 6004,
      "name": "unauthorized",
      "msg": "Unauthorized action."
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
            "name": "auctionNumber",
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
    }
  ]
};
