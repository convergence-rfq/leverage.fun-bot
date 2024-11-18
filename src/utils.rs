use serde_json::Value;
use solana_sdk::signer::keypair::Keypair;

/// Converts a JSON keypair into a Solana Keypair
pub fn keypair_from_json(json_str: &str) -> Result<Keypair, Box<dyn std::error::Error>> {
    // Parse the JSON string
    let json_value: Value = serde_json::from_str(json_str)?;

    // Extract the bytes array
    if let Value::Array(bytes) = json_value {
        // Convert JSON values to u8 array
        let secret_key: Vec<u8> = bytes.iter().map(|v| v.as_u64().unwrap() as u8).collect();

        // Create keypair from secret key bytes
        return Ok(Keypair::from_bytes(&secret_key)?);
    }

    Err("Invalid keypair format".into())
}
