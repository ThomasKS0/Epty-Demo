import redis.asyncio as redis
from config.settings import settings

redis_client = None

async def connect_to_redis():
    global redis_client
    redis_client = redis.from_url(settings.REDIS_URL)
    print("Connected to Redis")

async def get_redis():
    return redis_client