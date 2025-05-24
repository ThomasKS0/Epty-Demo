# Epty Real Estates
![Logo](frontend/src/assets/Logo/Logo.png)

*Revolutionizing property discovery with AI-driven recommendations*

## Table of Contents

- [Project structure](#projectStructure)
- [Features](#features)
- [TechStack](#techstack)
- [Prerequisites](#Prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Setup Environment](#setUpEnvironment)
- [API Documentation](#apidocumentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Structure
```
epty/
├── .github/                   # GitHub workflows
│   ├── workflows/
│   │   ├── ci.yml             # CI pipeline
│   │   └── cd.yml             # Deployment
├── backend/                   # FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI app entrypoint
│   │   ├── api/               # All API routes
│   │   │   ├── v1/            # Versioned APIs
│   │   │   │   ├── properties.py
│   │   │   │   ├── users.py
│   │   │   │   └── ai/
│   │   │   │       └── recommendations.py
│   │   ├── core/              # Core application logic
│   │   │   ├── config.py      # App settings
│   │   │   ├── security.py    # Auth utils
│   │   │   └── errors.py      # Custom exceptions
│   │   ├── models/            # DB models
│   │   │   ├── property.py
│   │   │   └── user.py
│   │   ├── schemas/           # Pydantic models
│   │   │   ├── property.py
│   │   │   └── user.py
│   │   ├── services/          # External service integrations
│   │   │   ├── matrikkelen.py
│   │   │   └── bankid.py
│   │   ├── db/                # Database layer
│   │   │   ├── session.py     # MongoDB connection
│   │   │   └── repositories/  # DB operations
│   │   │       ├── property_repo.py
│   │   │       └── user_repo.py
│   │   └── utils/             # Helpers
│   │       ├── geocoding.py
│   │       └── cache.py
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── conftest.py
│   ├── requirements/
│   │   ├── base.txt
│   │   ├── dev.txt
│   │   └── prod.txt
│   ├── Dockerfile
│   └── alembic/               # DB migrations
│       ├── versions/
│       └── env.py
├── frontend/                  # React + Tailwind
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/        # Reusable UI
│   │   │   ├── property/
│   │   │   │   ├── PropertyCard.jsx
│   │   │   │   └── MapView.jsx
│   │   │   ├── search/
│   │   │   │   ├── Filters.jsx
│   │   │   │   └── AIWizard.jsx
│   │   │   └── ui/            # Base components
│   │   │       ├── Button.jsx
│   │   │       └── Dialog.jsx
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom hooks
│   │   │   ├── useProperties.js
│   │   │   └── useBankIDAuth.js
│   │   ├── pages/             # Next.js-style routing
│   │   │   ├── Search.jsx
│   │   │   ├── Property/
│   │   │   │   ├── [id].jsx   # Dynamic route
│   │   │   │   └── index.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/          # API clients
│   │   │   ├── api.js         # Axios instance
│   │   │   └── propertyService.js
│   │   ├── styles/
│   │   │   ├── globals.css    # Tailwind imports
│   │   │   └── theme.js       # Design tokens
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .storybook/            # Component stories
│   ├── tests/
│   │   ├── unit/
│   │   └── e2e/               # Cypress tests
│   ├── Dockerfile
│   ├── postcss.config.js
│   └── tailwind.config.js
├── database/                  # MongoDB configs
│   ├── init-mongo.js          # Initial setup scripts
│   └── mongo.conf             # Custom config
├── infrastructure/
│   ├── terraform/             # IaC
│   └── nginx/
│       └── nginx.conf         # Reverse proxy config
├── scripts/                   # Utility scripts
├── .env.example               # Environment template
├── docker-compose.yml
├── Makefile                   # Common commands
└── README.md

```

## Features
- **AI Property Matching**: ML-powered recommendations based on user preferences
- **Norway Property Data**: Real-time sync with Matrikkelen API
- **Silent Bidding**: Off-market property negotiation system
- **BankID Integration**: Secure Norwegian e-ID authentication

## TechStack
```
| Component               | Technology                          |
|-------------------------|-------------------------------------|
| Frontend                | React + Tailwind CSS                |
| Backend                 | FastAPI (Python)                    |
| Database                | MongoDB                             |
| Cache                   | Redis                               |
| Authentication          | BankID OIDC                         |
| Containerization        | Docker + Compose                    |

```
##  Prerequisites
- Docker Desktop ([Install](https://www.docker.com/products/docker-desktop))
- Node.js v18+ ([Install](https://nodejs.org/))
- Python 3.10+ ([Install](https://www.python.org/downloads/))


## Installation

```bash
git clone https://github.com/yourusername/Epty-Demo.git
cd Epty-Demo
cd frontend/
npm install

```

## Usage

```bash
#Frontend 
cd frontend/
npm run dev
access frontend @localhost 5173 port 
#Backend
cd backend
python -m venv venv
source venv/Scripts/activate  

pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Set Up Environment
```bash
# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit with your credentials
nano backend/.env
```

### Build & Run with Docker
```bash
docker-compose up -d --build
```

### Access Applications
| Service      | URL                          |
|--------------|------------------------------|
| Frontend     | http://localhost:3000        |
| Backend API  | http://localhost:8000        |
| MongoDB      | mongodb://localhost:27017    |
| Redis        | redis://localhost:6379       |

## API Documentation
After starting the backend:
- Swagger UI: http://localhost:8000/docs
- Redoc: http://localhost:8000/redoc


##  Development Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
source venv\Scripts\activate   # Windows

pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🐳 Docker Services
| Service       | Description                     | Image            |
|---------------|---------------------------------|------------------|
| epty-frontend | React application               | node:18-alpine   |
| epty-backend  | FastAPI server                  | python:3.10-slim |
| epty-mongodb  | Primary database                | mongo:6          |
| epty-redis    | Caching layer                   | redis:7          |

```

```
## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Your Name - your.email@example.com  
Project Link: [https://github.com/yourusername/Epty](https://github.com/yourusername/Epty)


* Developed with ❤️ for the Norwegian property market*  
   