use crate::{context::AppContext, handlers::trades::create_trade};
use axum::{routing::post, Router};

pub fn trades_route(app_context: AppContext) -> Router {
    Router::new()
        .route("/trade", post(create_trade))
        .with_state(app_context)
}
