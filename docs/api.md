# NexusAI API Documentation

FastAPI Gateway Endpoints Specification.

## Base URL
`http://localhost:8000`

---

### 1. GET `/health`
Returns system status, active database state, and document count.

**Response (200 OK)**:
```json
{
  "status": "ONLINE",
  "service": "NexusAI FastAPI Gateway",
  "vector_index_documents": 12482,
  "database": "PostgreSQL 16 + pgvector ONLINE"
}
```

---

### 2. POST `/api/v1/investigation/run`
Executes the 7-stage analytical pipeline.

**Request Body**:
```json
{
  "prompt": "Evaluate SiC multilevel inverter feasibility for 100 kW industrial applications.",
  "scope": ["Technical", "Literature"],
  "specialist_id": "agent-apex"
}
```

**Response (200 OK)**:
```json
{
  "investigation_id": "INV-0248",
  "status": "COMPLETED",
  "pipeline_stages": [
    { "stage": "01 Question", "status": "COMPLETED" },
    { "stage": "02 Scope", "status": "COMPLETED" },
    { "stage": "03 Research", "status": "COMPLETED" },
    { "stage": "04 Specialists", "status": "COMPLETED" },
    { "stage": "05 Check", "status": "COMPLETED" },
    { "stage": "06 Evidence", "status": "VERIFIED" },
    { "stage": "07 Conclusion", "status": "COMPLETED" }
  ]
}
```

---

### 3. POST `/api/v1/evidence/search`
Queries 12,482 vector indexed documents.

**Query Parameter**: `query=silicon+carbide`
