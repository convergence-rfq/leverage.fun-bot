use axum::Json;

use crate::models::HealthResponse;

pub async fn root<'a>() -> Json<HealthResponse<'a>> {
    Json(HealthResponse { status: "Working" })
}
