# app/services/cache.py
from app.db.redis import get_redis
from datetime import timedelta

class PropertyCache:
    def __init__(self):
        self.redis = get_redis()
        self.ttl = timedelta(hours=6)

    async def get_properties(self, municipality: str):
        cached = await self.redis.get(f"properties:{municipality}")
        if cached:
            return cached
        
        # Fallback to DB
        db = await get_db()
        properties = await db.properties.find(...).to_list(1000)
        
        # Cache with compression
        await self.redis.setex(
            f"properties:{municipality}",
            self.ttl,
            compress(properties)  # Use zlib/orjson
        )
        return properties

    async def invalidate_cache(self, municipality: str):
        await self.redis.delete(f"properties:{municipality}")