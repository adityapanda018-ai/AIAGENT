# Changelog - NexusAI Research Intelligence Workbench

All notable changes to this project are documented in this file.

---

## [1.0.0] - 2026-08-25 (Production Release)

### Added
- **7-Stage Analytical Pipeline**: Integrated Question ➔ Scope ➔ Research ➔ Specialists ➔ Check ➔ Evidence ➔ Dossier lifecycle.
- **Multi-Specialist Task Contracts**: Apex (Architecture), Nova (Research), DataPulse (Quantitative), Vortex (Synthesis).
- **Relational Evidence Store**: Mapped 38 indexed primary literature DOIs and datasets.
- **Evidence-to-Decision Traceability Tree**: Interactive slide-over Claim Trace drawer.
- **Algorithmic Conflict Resolution Engine**: Condition normalization for literature discrepancies ($\Delta = 0.9\% \rightarrow \eta = 97.8\%$).
- **Failure & Recovery Suite**: 8 scenario resilience suite (`SYSTEM STATUS: ✓ RESILIENT`).
- **Professional 16-Section Research Dossier**: Printable report with Digital Verification QR Reopen Badge (`INV-0248-SHA256`).
- **Python / FastAPI Microservices Backend**: Microservice gateway, orchestrator, RAG engine, and PostgreSQL 16 + pgvector setup.
- **Isolated Cloud Deployment Manifests**: Docker Compose manifest (`docker-compose.yml`) & multi-stage `Dockerfile.frontend`.
- **10 Real Technical Benchmark Investigations Dataset**: 10 distinct technical inquiry benchmark records.
- **Complete 14-Point System Verification Suite**: 86 assertion test runner.

### Security
- Excluded `.env` files from Git version control.
- Added `.env.example` template.
- AES-256 GCM key encryption & JWT authentication.
