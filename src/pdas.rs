#![allow(unused)]
use anchor_lang::prelude::*;

use crate::models::program_types::euro_meta::EuroMetaV2;

pub fn derive_pool_authority_pda(program_id: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[b"pool_authority"], program_id)
}

pub fn derive_expiration_data_pda(
    program_id: &Pubkey,
    underlying_mint: &Pubkey,
    expiration: i64,
    oracle: &Pubkey,
) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            underlying_mint.as_ref(),
            expiration.to_le_bytes().as_ref(),
            oracle.as_ref(),
        ],
        program_id,
    )
}

pub fn derive_euro_meta_pda(
    program_id: &Pubkey,
    underlying_mint: &Pubkey,
    stable_mint: &Pubkey,
    expiration: i64,
    option_type: u8,
    collateral_pool: &Pubkey,
    strike_prices: Vec<u64>,
) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            underlying_mint.as_ref(),
            stable_mint.as_ref(),
            expiration.to_le_bytes().as_ref(),
            option_type.to_le_bytes().as_ref(),
            collateral_pool.as_ref(),
            EuroMetaV2::get_serialized_prices(&strike_prices)
                .unwrap()
                .as_ref(),
        ],
        program_id,
    )
}

pub fn derive_option_mint_pda(program_id: &Pubkey, euro_meta: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[euro_meta.as_ref(), b"optionMint"], program_id)
}

pub fn derive_writer_mint_pda(program_id: &Pubkey, euro_meta: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[euro_meta.as_ref(), b"writerMint"], program_id)
}
