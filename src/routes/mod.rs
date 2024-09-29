mod base_router;
mod health;
mod trades;

use axum::Router;
use base_router::base_router;
pub use health::*;
pub use trades::*;

use crate::context::app_context::AppContext;

pub fn build_routes(app_context: AppContext) -> Router {
    base_router(app_context.clone())
        .merge(health_route())
        .merge(trades_route(app_context))
}
