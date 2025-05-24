# app/services/matrikkelen.py
import httpx
from datetime import datetime
from app.db.mongo import get_db

class MatrikkelenSync:
    BASE_URL = "https://wfs.geonorge.no/skwms1/wfs.matrikkelen-bygningspunkt"

    async def sync_properties(self, municipality: str):
        params = {
            "service": "WFS",
            "version": "2.0.0",
            "request": "GetFeature",
            "typeName": "matrikkelen_bygning",
            "outputFormat": "application/json",
            "count": 1000,
            "cql_filter": f"kommunenummer='{municipality}'"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(self.BASE_URL, params=params)
            response.raise_for_status()
            return await self._process_features(response.json())

    async def _process_features(self, data):
        db = await get_db()
        for feature in data['features']:
            await db.properties.update_one(
                {"external_id": feature['id']},
                {"$set": {
                    "location": {
                        "coordinates": feature['geometry']['coordinates'],
                        "municipality": feature['properties']['kommunenummer']
                    },
                    "last_updated": datetime.utcnow(),
                    "raw_data": feature
                }},
                upsert=True
            )