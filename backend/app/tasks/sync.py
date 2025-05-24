# app/tasks/sync.py
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.matrikkelen import MatrikkelenSync

scheduler = AsyncIOScheduler()

@scheduler.scheduled_job('cron', hour=3)  # Daily at 3 AM
async def nightly_sync():
    sync = MatrikkelenSync()
    await sync.sync_properties("0301")  # Oslo