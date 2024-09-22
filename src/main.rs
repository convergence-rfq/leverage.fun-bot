use app_context::AppContext;
use axum::{
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use chrono::Utc;
use mongodb::{
    bson::{doc, Document},
    Collection,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

mod app_context;

#[tokio::main]
async fn main() {
    // initialize debug
    tracing_subscriber::fmt::init();
    let app_context = AppContext::new().await.unwrap();
    app_context.db_client.database("prod");
    let database = app_context.db_client.database("sample_mflix");
    let my_coll: Collection<Document> = database.collection("movies");
    // Find a movie based on the title value
    let my_movie = my_coll
        .find_one(doc! { "title": "The Perils of Pauline" })
        .await;
    match my_movie {
        Ok(_) => println!("Found a movie"),
        Err(e) => println!("Error finding movie: {}", e),
    }

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
            created_at: Utc::now().timestamp(),
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
