#![allow(unused)]
use std::sync::Arc;

use crate::context::app_context::AppContext;
use crate::models::{MintOptionsBody, MintOptionsResponse};
use crate::utils::keypair_from_json;
use anchor_client::Cluster;
use anchor_client::{
    solana_sdk::{
        commitment_config::CommitmentConfig,
        pubkey::Pubkey,
        signature::{Keypair, Signer},
    },
    Client, Program,
};
use anchor_lang::pubkey;
use axum::{extract::State, http::StatusCode, Json};

pub async fn mint_options(
    State(app_context): State<Arc<AppContext>>,
    Json(payload): Json<MintOptionsBody>,
) -> (StatusCode, Json<MintOptionsResponse>) {
    // Spawn a new task to handle minting in the background
    tokio::spawn(async move {
        // Your minting logic goes here
        process_mint_options(app_context, payload).await;
    });

    (
        StatusCode::ACCEPTED,
        Json(MintOptionsResponse {
            message: "Minting process started in the background".to_string(),
        }),
    )
}

async fn process_mint_options(app_context: Arc<AppContext>, payload: MintOptionsBody) {
    let cluster = Cluster::Custom(
        "https://testnet.dev2.eclipsenetwork.xyz".to_string(),
        "".to_string(),
    );
    let client = Client::new_with_options(
        cluster,
        Arc::new(keypair_from_json(&app_context.admin_keypair).unwrap()),
        CommitmentConfig::confirmed(),
    );
    let program_id = pubkey!("LfunVKmPLfejpbCXPnrLbjZr693RrgKHdQub2ge1ZC9");
    let program = client.program(program_id).unwrap();
    // let accounts = vec![];
    loop {
        // let tx_hash = program.request().accounts(accounts);
        println!("{:?}", program.id());
        // Implement your actual minting logic here
        // This will run in the background
        tokio::time::sleep(std::time::Duration::from_secs(1000)).await;
    }
}
