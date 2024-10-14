use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct CreateTrade {
    pub scrip: String,
    pub quantity: i32,
    pub price: f32,
    pub trade_type: TradeType,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum TradeType {
    Buy,
    Sell,
}

#[derive(Debug, Serialize)]
pub struct CreateTradeResponse {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub scrip: String,
    pub quantity: i32,
    pub price: f32,
    pub trade_type: TradeType,
    #[serde(rename = "createdAt")]
    pub created_at: i64,
    #[serde(rename = "updatedAt")]
    pub updated_at: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GetTradeResponse {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub scrip: String,
    pub quantity: i32,
    pub price: f32,
    pub trade_type: TradeType,
    #[serde(rename = "createdAt")]
    pub created_at: i64,
    #[serde(rename = "updatedAt")]
    pub updated_at: i64,
}
