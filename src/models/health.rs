use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct HealthResponse<'a> {
    pub status: &'a str,
}
