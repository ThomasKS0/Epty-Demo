# app/api/v1/ai/recommend.py
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.services.recommender import PropertyRecommender
from app.db.mongo import get_db

router = APIRouter()

class RecommendationRequest(BaseModel):
    user_id: str
    location_preferences: list[str]
    budget_range: tuple[float, float]
    preferred_types: list[str]  # ["residential", "cabin"]

@router.post("/recommend")
async def get_recommendations(
    request: RecommendationRequest,
    db=Depends(get_db)
):
    recommender = PropertyRecommender(db)
    return await recommender.generate_recommendations(
        request.user_id,
        request.location_preferences,
        request.budget_range,
        request.preferred_types
    )