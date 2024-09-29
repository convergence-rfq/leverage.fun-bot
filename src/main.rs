use std::sync::Arc;

use context::AppContext;
mod app;
mod context;
mod handlers;
mod models;
mod routes;

#[tokio::main]
async fn main() {
    // initialize debug
    tracing_subscriber::fmt::init();
    let app_context = Arc::new(AppContext::new().await.unwrap());
    let app = app::App::new(app_context).await;
    app.run().await.unwrap();
}
