from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb+srv://griffintechs:griffintechs@epty.hrqefti.mongodb.net/"
    REDIS_URL: str = "redis://localhost:6379"
    BANKID_CLIENT_ID: str = ""
    BANKID_SECRET: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()