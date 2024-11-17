use crate::context::app_context::AppContext;
use crate::handlers::mint_options;
use axum::{routing::post, Router};
use std::sync::Arc;

pub fn bot_actions_route(app_context: Arc<AppContext>) -> Router {
    Router::new()
        .route("/mint-options", post(mint_options))
        .with_state(app_context)
}
