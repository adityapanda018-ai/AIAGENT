# NexusAI Architecture Documentation

## 1. Master System & Life-Cycle Topology

```
                 NEXUSAI
                    │
       ┌────────────┴────────────┐
       │                         │
   PLATFORM                  RESEARCH
       │                         │
       ↓                         ↓
    React                    Retrieval
       ↓                    Documents
    FastAPI                     ↓
       ↓                    Specialists
    Database                     ↓
       ↓                   Quantitative
       │                         ↓
       └────────────┬────────────┘
                    ↓
              EVIDENCE ENGINE
                    ↓
             CLAIM VERIFICATION
                    ↓
             CONFLICT DETECTION
                    ↓
             DECISION SUPPORT
                    ↓
              RESEARCH DOSSIER
                    ↓
               AUDIT TRAIL
                    ↓
               VALIDATION
                    ↓
                DEPLOYMENT
                    ↓
              🏆 FINAL DEMO
```

## 2. Cloud Production Microservice Deployment Topology

```
                    INTERNET
                       │
                       ↓
              ┌────────────────┐
              │  Web Frontend  │ (Port 80/443 - Nginx + React Static Build)
              └───────┬────────┘
                      ↓
              ┌────────────────┐
              │  API Gateway   │ (Port 8000 - FastAPI ASGI)
              └───────┬────────┘
                      ↓
          ┌───────────┴───────────┐
          ↓                       ↓
   Research Engine          Specialist Engine (Celery Workers)
          │                       │
          └───────────┬───────────┘
                      ↓
              Evidence Engine
                      ↓
               PostgreSQL 16 (Port 5432)
                      ↓
                 pgvector (Vector Indexing across 12,482 docs)
```
