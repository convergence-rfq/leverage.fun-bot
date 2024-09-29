use crate::{context::AppContext, handlers::create_trade};
use axum::{routing::post, Router};
use std::sync::Arc;

pub fn trades_route(app_context: Arc<AppContext>) -> Router {
    Router::new()
        .route("/trade", post(create_trade))
        .with_state(app_context)
}
