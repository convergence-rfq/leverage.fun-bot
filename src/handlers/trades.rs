use crate::context::app_context::AppContext;
use crate::models::{CreateTrade, CreateTradeResponse};
use axum::{extract::State, http::StatusCode, Json};
use chrono::Utc;
use mongodb::bson::oid::ObjectId;
use mongodb::Collection;
use std::sync::Arc;
#[axum::debug_handler]
pub async fn create_trade(
    State(app_context): State<Arc<AppContext>>,
    Json(payload): Json<CreateTrade>,
) -> (StatusCode, Json<CreateTradeResponse>) {
    println!("Creating trade: {}", payload.scrip);
    println!("Quantity: {}", payload.quantity);
    println!("Price: {}", payload.price);
    println!("Trade type: {:?}", payload.trade_type);

    let db = app_context.db_client.database("prod");
    let collection: Collection<CreateTradeResponse> = db.collection("orders");

    let create_trade_response = CreateTradeResponse {
        id: ObjectId::new(),
        scrip: payload.scrip,
        quantity: payload.quantity,
        price: payload.price,
        trade_type: payload.trade_type,
        created_at: Utc::now().timestamp(),
        updated_at: Utc::now().timestamp(),
    };

    let trade = collection.insert_one(&create_trade_response).await.unwrap();
    println!("Trade created: {}", trade.inserted_id);

    (StatusCode::CREATED, Json(create_trade_response))
}
