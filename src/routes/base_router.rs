use crate::context::app_context::AppContext;
use axum::Router;
use std::sync::Arc;

pub fn base_router(app_context: Arc<AppContext>) -> Router {
    Router::new().with_state(app_context)
}
