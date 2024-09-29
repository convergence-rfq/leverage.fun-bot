use dotenv::dotenv;
use mongodb::Client;
use std::env;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppContextError {
    #[error("Failed to connect to MongoDB: {0}")]
    ConnectionError(String),
}

#[derive(Clone)]
pub struct AppContext {
    pub db_client: Client,
}

impl AppContext {
    pub async fn new() -> Result<Self, AppContextError> {
        dotenv().ok();
        let uri = env::var("MONGODB_URI").expect("MONGODB_URI not set");
        let client = Client::with_uri_str(format!("{}/prod", uri))
            .await
            .map_err(|e| AppContextError::ConnectionError(e.to_string()))?;

        Ok(Self { db_client: client })
    }
}
