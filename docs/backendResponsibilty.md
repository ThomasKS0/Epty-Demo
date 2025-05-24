

### **1. Core Backend Responsibilities**
#### **A. Property Data Management**
- **Fetch & Cache** property data from Matrikkelen API (Norway's property registry)
- **Store enriched data** in MongoDB (user favorites, custom tags, etc.)
- **Handle** residential/commercial/cabin property types

#### **B. AI Integration**
- **Recommendation Engine**: Suggest properties based on:
  ```python
  {
    "user_preferences": {
      "budget_range": [5000000, 8000000],
      "locations": ["Oslo", "Bergen"],
      "property_type": "cabin",
      "amenities": ["waterfront", "sauna"]
    },
    "market_trends": {}  # From external APIs
  }
  ```
- **Price Prediction**: ML model for valuation estimates

#### **C. User Services**
- **BankID authentication** (Norwegian e-ID)
- **Favorites/Collections**: Saved properties system
- **Search History**: Track user queries

#### **D. Transaction Services**
- **"Silent Bidding"**: Off-market offer system
  ```json
  {
    "property_id": "matrikkelen_123",
    "buyer_id": "user_456",
    "offer_amount": 7500000,
    "is_anonymous": true
  }
  ```

---

### **2. Confirmed Tech Stack**
| Component       | Choice                  | Purpose                          |
|-----------------|-------------------------|----------------------------------|
| Framework       | FastAPI                 | High-performance API routes      |
| Database        | MongoDB (Atlas/self-host)| Flexible property data storage   |
| Cache           | Redis                   | Matrikkelen API response caching |
| Auth            | BankID OIDC             | Norwegian e-ID integration       |
| Containerization| Docker + Compose        | Local/prod environment parity    |

---

### **3. Key API Endpoints (From Previous Planning)**
| Endpoint                | Method | Description                              |
|-------------------------|--------|------------------------------------------|
| `/api/v1/properties`    | GET    | Fetch properties (with filters)          |
| `/api/v1/ai/recommend`  | POST   | Get AI recommendations                   |
| `/api/v1/offers`        | POST   | Submit silent bids                       |
| `/api/v1/auth/bankid`   | GET    | Initiate BankID login                    |

---

### **4. MongoDB Collections Needed**
```javascript
// 1. Properties (Core dataset)
{
  _id: ObjectId,
  external_id: String,  // Matrikkelen ID
  type: "residential|commercial|cabin",
  location: {
    coordinates: [long, lat],
    address: String,
    municipality: String
  },
  price_estimate: Number,
  features: [String],
  last_updated: ISODate
}

// 2. Users
{
  _id: ObjectId,
  bankid_id: String,
  preferences: {
    saved_searches: [{
      filters: Object,
      last_notified: Date
    }]
  },
  favorites: [ObjectId]  // Property references
}

// 3. Off-Market Offers
{
  _id: ObjectId,
  property_id: ObjectId,
  buyer_id: ObjectId,
  amount: Number,
  status: "pending|rejected|accepted",
  created_at: ISODate
}
```

---

### **5. Docker Setup Confirmed**
```yaml
# docker-compose.yml (partial)
services:
  backend:
    build: ./backend
    ports: ["8000:8000"]
    env_file: .env
    depends_on:
      - mongodb
      - redis

  mongodb:
    image: mongo:6
    volumes: ["./data/db:/data/db"]
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS}

  redis:
    image: redis:7
    ports: ["6379:6379"]
```

---

### **Critical Questions Before We Start**
1. **BankID Integration**  
   - Are you using [BankID OIDC](https://www.bankid.com/en/utvecklare/guider/technische-anleitung-oidc) or need custom auth flow?

2. **Matrikkelen API**  
   - Should we implement webhook-based updates for property changes?

3. **AI Model**  
   - Will you:
     - Use pre-trained models (e.g., Scikit-learn for price prediction)?
     - Need custom training pipelines?

4. **Deployment**  
   - Target environment: AWS/GCP, or on-premise?

---

### **Suggested Starting Point**
Let's implement this sequence:

1. **Setup FastAPI Skeleton**  
   ```bash
   # Initial backend structure
   mkdir -p backend/{app,scripts}
   touch backend/app/{__init__.py,main.py,models.py}
   ```

2. **MongoDB Connection**  
   ```python
   # backend/app/db/mongo.py
   from motor.motor_asyncio import AsyncIOMotorClient

   client = AsyncIOMotorClient("mongodb://mongodb:27017")
   db = client.epty
   ```

3. **First Route (Property Fetch)**  
   ```python
   # backend/app/api/v1/properties.py
   from fastapi import APIRouter, Query
   from app.db.mongo import db

   router = APIRouter()

   @router.get("/properties")
   async def get_properties(
       limit: int = Query(50, gt=0),
       municipality: str = Query(None)
   ):
       query = {}
       if municipality:
           query["location.municipality"] = municipality
       
       properties = await db.properties.find(query).to_list(limit)
       return {"data": properties}
   ```

---
