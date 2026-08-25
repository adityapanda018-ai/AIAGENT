# NexusAI Testing & Validation Guide

Full System Verification Suite and Assertion Test Runner Guide.

## Test Commands

### 1. Frontend Production Build & TypeScript Check
```bash
npm run build
```

### 2. E2E Browser & Subsystem Tests
```bash
npm test
```

### 3. Backend Unit & Integration Tests (pytest)
```bash
pytest backend/tests/
```

---

## 14-Point Ordered Verification Areas

1. **UI**: All view components render cleanly without layout distortion.
2. **Navigation**: 8 Feature Map routes & 4 Specialist routes active.
3. **Research**: Investigation objective prompt dispatch & streaming.
4. **Pipeline**: 7-stage state machine completion (`01 Question` ➔ `07 Conclusion`).
5. **Agents**: Task contract fulfillment for Apex, Nova, DataPulse, Vortex.
6. **RAG**: Vector search across 12,482 documents (38 sources, 12 primary DOIs).
7. **Evidence**: 5-tier relational evidence tree mapping.
8. **Conflicts**: Contradiction detection & algorithmic condition normalization.
9. **Database**: IndexedDB & PostgreSQL 16 schema persistence.
10. **Failure**: 8 scenario resilience test recovery suite.
11. **Dossier**: 16-section deliverable report compilation.
12. **PDF**: Clean `@media print` PDF generation.
13. **Security**: Zero client API key exposure, JWT auth, Pydantic v2 validation.
14. **E2E**: Complete 8-step judge demo script user journey.
