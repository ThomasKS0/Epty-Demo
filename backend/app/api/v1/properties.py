from fastapi import APIRouter, Depends, Query
from app.db.mongo import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter()

@router.get("/properties")
async def get_properties(
    db: AsyncIOMotorDatabase = Depends(get_db),
    limit: int = Query(50, gt=0),
    municipality: str = Query(None)
):
    query = {}
    if municipality:
        query["location.municipality"] = municipality
    
    properties = await db.properties.find(query).to_list(limit)
    return {"data": properties}

# app/api/v1/properties.py
@router.get("/properties")
async def get_properties(
    municipality: str,
    cache: PropertyCache = Depends()
):
    return await cache.get_properties(municipality)