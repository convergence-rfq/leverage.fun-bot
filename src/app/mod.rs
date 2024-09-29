#![allow(dead_code)]
use std::{error::Error, sync::Arc};

use crate::{context::AppContext, routes::build_routes};
use axum::Router;
pub struct App {
    pub context: Arc<AppContext>,
    pub router: Router,
}

impl App {
    pub async fn new(app_context: Arc<AppContext>) -> Self {
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
