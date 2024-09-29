use axum::Router;

use crate::context::app_context::AppContext;

pub fn base_router(app_context: AppContext) -> Router {
    Router::new().with_state(app_context)
}
