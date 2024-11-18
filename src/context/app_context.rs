use dotenv::dotenv;
use mongodb::Client;
use solana_sdk::signature::Keypair;
use std::env;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppContextError {
    #[error("Failed to connect to MongoDB: {0}")]
    ConnectionError(String),
}

#[derive(Clone, Debug)]
pub struct AppContext {
    pub db_client: Client,
    pub admin_keypair: String,
    pub telegram_bot_token: String,
    pub telegram_channel_id: String,
}

impl AppContext {
    pub async fn new() -> Result<Self, AppContextError> {
        dotenv().ok();
        let uri = env::var("MONGODB_URI").expect("MONGODB_URI not set");
        let admin_keypair = env::var("ADMIN_KEYPAIR").expect("ADMIN_KEYPAIR not set");
        let telegram_bot_token =
            env::var("TELEGRAM_BOT_TOKEN").expect("TELEGRAM_BOT_TOKEN not set");
        let telegram_channel_id =
            env::var("TELEGRAM_CHANNEL_ID").expect("TELEGRAM_CHANNEL_ID not set");
        let client = Client::with_uri_str(format!("{}/prod", uri))
            .await
            .map_err(|e| AppContextError::ConnectionError(e.to_string()))?;

        Ok(Self {
            db_client: client,
            admin_keypair: admin_keypair,
            telegram_bot_token: telegram_bot_token,
            telegram_channel_id: telegram_channel_id,
        })
    }
}
