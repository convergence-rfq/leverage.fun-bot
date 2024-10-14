use crate::{
    context::AppContext,
    handlers::{create_trade, get_trade},
};
use axum::{
    routing::{get, post},
    Router,
};
use std::sync::Arc;

pub fn trades_route(app_context: Arc<AppContext>) -> Router {
    Router::new()
        .route("/trade", post(create_trade))
        .route("/get-trade", get(get_trade))
        .with_state(app_context)
}
