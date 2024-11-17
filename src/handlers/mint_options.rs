use crate::context::app_context::AppContext;
use crate::models::{MintOptionsBody, MintOptionsResponse};
use axum::{extract::State, http::StatusCode, Json};
use std::sync::Arc;

pub async fn mint_options(
    State(app_context): State<Arc<AppContext>>,
    Json(payload): Json<MintOptionsBody>,
) -> (StatusCode, Json<MintOptionsResponse>) {
    // Spawn a new task to handle minting in the background
    tokio::spawn(async move {
        // Your minting logic goes here
        process_mint_options(app_context, payload).await;
    });

    (
        StatusCode::ACCEPTED,
        Json(MintOptionsResponse {
            message: "Minting process started in the background".to_string(),
        }),
    )
}

async fn process_mint_options(app_context: Arc<AppContext>, payload: MintOptionsBody) {
    loop {
        println!("{payload:?} {app_context:?}");
        // Implement your actual minting logic here
        // This will run in the background
        tokio::time::sleep(std::time::Duration::from_secs(1)).await;
    }
}
