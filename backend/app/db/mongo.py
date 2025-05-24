from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings

client = None
db = None

async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client.epty
    print("Connected to MongoDB")

async def get_db():
    return db