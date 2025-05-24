from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import settings

app = FastAPI(title="Epty API", version="0.1.0")

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connections
@app.on_event("startup")
async def startup_db():
    from app.db.mongo import connect_to_mongo
    from app.db.redis import connect_to_redis
    await connect_to_mongo()
    await connect_to_redis()

@app.get("/")
async def root():
    return {"msg": "Welcome to Epty API"}

@app.post("/address")
async def get_address():
    return {"msg": "Welcome to Epty API"}

@app.get("/address")
async def post_address():
    return {
        "address":[ "Arendal", "Oslo", "Bergen"]
    }

# Include routers---- To be setup later----
#from app.api.v1 import properties, auth
#app.include_router(properties.router, prefix="/api/v1")
#app.include_router(auth.router, prefix="/api/v1")