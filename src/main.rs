use app_context::AppContext;
use axum::{
    extract::State,
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use chrono::Utc;
use mongodb::{
    bson::{doc, oid::ObjectId},
    Collection,
};
use serde::{Deserialize, Serialize};

mod app_context;

#[tokio::main]
async fn main() {
    // initialize debug
    tracing_subscriber::fmt::init();
    let app_context = AppContext::new().await.unwrap();
    let app = Router::new()
        .route("/", get(root))
        .route("/trades", post(create_trade))
        .with_state(app_context);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn root<'a>() -> Json<HealthResponse<'a>> {
    Json(HealthResponse { status: "Working" })
}

#[axum::debug_handler]
async fn create_trade(
    State(app_context): State<AppContext>,
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

#[derive(Debug, Deserialize)]
struct CreateTrade {
    scrip: String,
    quantity: i32,
    price: f32,
    trade_type: TradeType,
}

#[derive(Debug, Deserialize, Serialize)]
enum TradeType {
    Buy,
    Sell,
}

#[derive(Debug, Serialize)]
struct CreateTradeResponse {
    #[serde(rename = "_id")]
    id: ObjectId,
    scrip: String,
    quantity: i32,
    price: f32,
    trade_type: TradeType,
    #[serde(rename = "createdAt")]
    created_at: i64,
    #[serde(rename = "updatedAt")]
    updated_at: i64,
}

#[derive(Debug, Serialize)]
struct HealthResponse<'a> {
    status: &'a str,
}
