use crate::handlers::root;
use axum::{routing::get, Router};

pub fn health_route() -> Router {
    Router::new().route("/", get(root))
}
