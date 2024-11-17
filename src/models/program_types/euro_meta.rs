#![allow(unused)]
use anchor_lang::prelude::*;

use crate::errors;
#[derive(Debug, AnchorSerialize, AnchorDeserialize, PartialEq, Eq, Clone, Copy)]
pub enum OptionTypeV2 {
    Call = 0,
    Put = 1,
    LongCallSpread = 2,
    LongPutSpread = 3,
}
impl From<u8> for OptionTypeV2 {
    fn from(integer: u8) -> OptionTypeV2 {
        match integer {
            0 => OptionTypeV2::Call,
            1 => OptionTypeV2::Put,
            2 => OptionTypeV2::LongCallSpread,
            3 => OptionTypeV2::LongPutSpread,
            _ => panic!("Unknown value: {}", integer),
        }
    }
}

#[derive(Debug, AnchorSerialize, AnchorDeserialize, PartialEq, Eq, Clone, Copy)]
pub enum CollateralType {
    STABLE = 0,
    UNDERLYING = 1,
}

impl From<u8> for CollateralType {
    fn from(num: u8) -> CollateralType {
        match num {
            0 => CollateralType::STABLE,
            1 => CollateralType::UNDERLYING,
            _ => panic!("Unknown value: {}", num),
        }
    }
}

impl OptionTypeV2 {
    pub const NUM: u8 = 4;
    pub fn prices_size(&self) -> usize {
        match self {
            OptionTypeV2::Call => 1,
            OptionTypeV2::Put => 1,
            OptionTypeV2::LongCallSpread => 2,
            OptionTypeV2::LongPutSpread => 2,
        }
    }
    pub fn check_collateral_type(&self, collateral_type: CollateralType) -> Result<()> {
        match self {
            OptionTypeV2::Call => {
                if collateral_type == CollateralType::UNDERLYING {
                    Ok(())
                } else {
                    Err(errors::LeverageFunError::OptionAndCollateralTypeMismatch.into())
                }
            }
            OptionTypeV2::Put => {
                if collateral_type == CollateralType::STABLE {
                    Ok(())
                } else {
                    Err(errors::LeverageFunError::OptionAndCollateralTypeMismatch.into())
                }
            }
            OptionTypeV2::LongCallSpread => Ok(()),
            OptionTypeV2::LongPutSpread => {
                if collateral_type == CollateralType::STABLE {
                    Ok(())
                } else {
                    Err(errors::LeverageFunError::OptionAndCollateralTypeMismatch.into())
                }
            }
        }
    }
}

// 32 + 1 + 8 + 32 + 1 + 32 + 32 + 24 + 1 + 32 + 32 + 8 + 1 + 32 + 1 + 1 = 270
// Total size = 272 (Closest multiple of 8 > 270)

pub struct EuroMetaV2 {
    /// The mint of the underlying asset
    pub underlying_mint: Pubkey,

    /// The mint key for some stable coin. Oracle should use this token for pricing. Use of a
    /// different token is not recommended (e.g. USDT when Oracle uses USDT), as prices may deviate
    /// slightly even for stablecoins.
    pub stable_mint: Pubkey,

    /// The collateral pool's address.
    ///
    /// The token held in the pool depends on the collateral type in use: PUTs and PUT spreads
    /// use the stable asset, CALLs and CALL spreads use underlying. Some CALL Spreads can also
    /// use stable. For example, a SOL call spread market may trade in SOL, or USDC.
    pub collateral_pool: Pubkey,

    /// Oracle's address. Chainlink and Pyth oracles are supported at this time. Matches
    /// ExpirationData's oracle
    pub oracle: Pubkey,

    /// The mint for the writer tokens, initialized on creation
    pub writer_mint: Pubkey,

    /// The mint for the option tokens, initialized on creation
    pub option_mint: Pubkey,

    /// The address for the associated ExpirationData. Stored to make validations computationally
    /// efficient.
    pub expiration_data: Pubkey,

    /// Strike price(s). For Calls/Puts, a single value. For vertical spreads, two values. The
    /// lower strike price is first, followed by the higher price. Uses price_decimals
    pub strike_prices: Vec<u64>,

    /// The Unix Timestamp for the expiration, in seconds. Must match ExpirationData's
    pub expiration: i64,

    /// The amount of underlying assets per 1 OptionToken,
    /// denoted in the underlying assets decimals.
    pub underlying_amount_per_contract: u64,

    /// The number of decimals on the underlying, read from the mint on creation
    pub underlying_decimals: u8,

    /// The decimals of the stable mint, read from the mint on creation.
    pub stable_decimals: u8,

    /// The number of decimals in the strike_prices & price_at_expiration. This is
    /// required to normalize the strike price with oracles.
    pub price_decimals: u8,

    /// The bump seed for the EuroMeta
    pub bump_seed: u8,

    /// An oracle provider identifier. Pyth = 0, Switchboard = 1
    pub oracle_provider_id: u8,

    /// Option type of the euro meta: CALL, PUT, LongCallSpread, LongPutSpread
    pub option_type: OptionTypeV2,
}

impl EuroMetaV2 {
    // Size to initialize EuroMetaV2 to (includes buffer space).
    pub const LEN: usize = 272 /*size of EuroMeta */ + 600; // 872 total bytes

    pub fn get_serialized_prices(strike_prices: &[u64]) -> Result<Vec<u8>> {
        let mut serialized_strike_prices = Vec::new();
        for i in strike_prices {
            serialized_strike_prices.extend_from_slice(&i.to_le_bytes());
        }
        Ok(serialized_strike_prices)
    }
}

#[test]
fn check_serialized() {
    let new_vec: Vec<u64> = Vec::from([10_000, 15_000]);
    // Value calculated using the typescript corresponding function
    let res_vec: Vec<u8> = Vec::from([16, 39, 0, 0, 0, 0, 0, 0, 152, 58, 0, 0, 0, 0, 0, 0]);
    let value = EuroMetaV2::get_serialized_prices(&new_vec).unwrap();
    assert_eq!(res_vec, value)
}
