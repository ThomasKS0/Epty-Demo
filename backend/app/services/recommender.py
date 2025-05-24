# app/services/recommender.py
import pandas as pd
from sklearn.neighbors import NearestNeighbors

class PropertyRecommender:
    def __init__(self, db):
        self.db = db
        self.model = NearestNeighbors(n_neighbors=5, metric='cosine')

    async def generate_recommendations(self, user_id, locations, budget, types):
        # Get user history
        user = await self.db.users.find_one({"_id": user_id})
        
        # Get candidate properties
        query = {
            "location.municipality": {"$in": locations},
            "price_estimate": {"$gte": budget[0], "$lte": budget[1]},
            "type": {"$in": types}
        }
        properties = await self.db.properties.find(query).to_list(1000)
        
        # Convert to feature vectors
        df = pd.DataFrame([{
            'price': p['price_estimate'],
            'size': p.get('square_meters', 0),
            'location_score': self._location_score(p, user),
            'type': 1 if p['type'] in user.get('preferences', []) else 0
        } for p in properties])
        
        # Train model (in production, pre-train periodically)
        self.model.fit(df)
        
        # Get recommendations
        _, indices = self.model.kneighbors([user['preference_vector']])
        return [properties[i] for i in indices[0]]