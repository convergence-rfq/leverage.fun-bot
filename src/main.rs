use axum::{
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[tokio::main]
async fn main() {
    // initialize debug
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/", get(root))
        .route("/trades", post(create_trade));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn root<'a>() -> Json<HealthResponse<'a>> {
    Json(HealthResponse { status: "Working" })
}

async fn create_trade(Json(payload): Json<CreateTrade>) -> (StatusCode, Json<CreateTradeResponse>) {
    println!("Creating trade: {}", payload.scrip);
    println!("Quantity: {}", payload.quantity);
    println!("Price: {}", payload.price);
    println!("Trade type: {:?}", payload.trade_type);

    (
        StatusCode::CREATED,
        Json(CreateTradeResponse {
            id: Uuid::new_v4(),
            scrip: payload.scrip,
            quantity: payload.quantity,
            price: payload.price,
            trade_type: payload.trade_type,
            created_at: chrono::Utc::now().timestamp(),
        }),
    )
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
    id: Uuid,
    scrip: String,
    quantity: i32,
    price: f32,
    trade_type: TradeType,
    created_at: i64,
}

#[derive(Debug, Serialize)]
struct HealthResponse<'a> {
    status: &'a str,
}
