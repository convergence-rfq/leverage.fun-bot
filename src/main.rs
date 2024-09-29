mod app;
mod context;
mod handlers;
mod models;
mod routes;

#[tokio::main]
async fn main() {
    // initialize debug
    tracing_subscriber::fmt::init();
    let app = app::App::new().await;
    app.run().await.unwrap();
}
