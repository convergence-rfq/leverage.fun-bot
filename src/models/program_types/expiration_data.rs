#![allow(unused)]
use anchor_lang::prelude::*;

use crate::errors;

pub const MAX_PRICE_DECIMALS: u8 = 15;

#[derive(Default)]
#[repr(packed)]
pub struct ExpirationData {
    /// The expiration time
    pub expiration: i64,
    /// The aggregate price oracle for pyth or switchboard
    pub oracle: Pubkey,
    /// The price, in price_decimals, at the time of expiration
    pub price_at_expiration: u64,
    /// The time at which the price_at_expiration was set.
    pub price_set_at_time: i64,
    /// The number of decimals in the strike_price & price_at_expiration. This is
    /// required to normalize the strike price with the oracles.
    pub price_decimals: u8,
    /// Flag for easy memcmp filtering
    pub price_set: bool,
    /// bump seed
    pub bump: u8,
    /// An oracle provider identifier
    pub oracle_provider_id: u8,
}

impl ExpirationData {
    pub const LEN: usize = std::mem::size_of::<ExpirationData>() + 600;

    pub fn set_time_delta_is_smaller_than_present(&self, clock_time: i64) -> Result<bool> {
        let cur_diff = self
            .price_set_at_time
            .checked_sub(self.expiration)
            .ok_or(errors::LeverageFunError::NumberOverflow)?
            .abs();
        let new_diff = clock_time
            .checked_sub(self.expiration)
            .ok_or(errors::LeverageFunError::NumberOverflow)?
            .abs();
        Ok(cur_diff < new_diff)
    }
}
