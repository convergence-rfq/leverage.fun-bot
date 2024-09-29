use std::error::Error;

use crate::{context::AppContext, routes::build_routes};
use axum::Router;
pub struct App {
    pub context: AppContext,
    pub router: Router,
}

impl App {
    pub async fn new() -> Self {
        let app_context = AppContext::new().await.unwrap();
        let router = build_routes(app_context.clone());

        App {
            context: app_context,
            router,
        }
    }

    pub async fn run(self) -> Result<(), Box<dyn Error>> {
        let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
        axum::serve(listener, self.router).await.unwrap();
        Ok(())
    }

    pub fn get_router(&self) -> &Router {
        &self.router
    }

    pub fn get_context(&self) -> &AppContext {
        &self.context
    }
}
