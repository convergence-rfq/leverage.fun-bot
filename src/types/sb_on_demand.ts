/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sb_on_demand.json`.
 */
export type SbOnDemand = {
  "address": "9AFubrzfJviduvNqXu3PAYPBGnCqmPGnmnAi8Bq3RQSB",
  "metadata": {
    "name": "sbOnDemand",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "pullSolEuroPrice",
      "discriminator": [
        46,
        250,
        208,
        1,
        174,
        63,
        196,
        107
      ],
      "accounts": [
        {
          "name": "solEuroFeed"
        }
      ],
      "args": []
    },
    {
      "name": "pullSolUsdcPrice",
      "discriminator": [
        214,
        141,
        253,
        184,
        89,
        1,
        239,
        19
      ],
      "accounts": [
        {
          "name": "solUsdcFeed"
        }
      ],
      "args": []
    }
  ]
};
