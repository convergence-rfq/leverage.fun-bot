use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct MintOptionsBody {
    pub strike_price: u64,
    pub price_decimals: u8,
    pub underlying_amount_per_contract: u64,
    pub expiration_timestamp: i64,
}

#[derive(Debug, Serialize)]
pub struct MintOptionsResponse {
    pub message: String,
}
