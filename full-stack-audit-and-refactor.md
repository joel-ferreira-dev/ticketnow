# Task: Full Stack Audit & Refactoring - Antigravity Protocol

> **Agents Involved:** `architecture`, `backend-specialist`, `penetration-tester`, `performance-optimizer`, `qa-automation-engineer`, `test-engineer`, `frontend-specialist`

---

## 📋 1. Analysis & Discovery (Phase 1)
- [x] **Codebase Mapping:** Use `explorer-agent` to identify core modules in `/backend` and `/frontend`.
- [x] **Dependency Audit:** Check for outdated or vulnerable packages.
- [x] **Performance Baseline:** Run initial `lighthouse_audit.py` if a URL is available (or analyze bundle sizes).

## 🏗️ 2. Architectural Alignment (Phase 2)
*Agent: `architecture` | Skill: `architecture`*
- [x] **Pattern Verification:** Ensure NestJS (backend) and Next.js (frontend) follow established Clean Architecture patterns.
- [x] **Cross-cutting Concerns:** Review how authentication and logging are shared between services.

## ⚙️ 3. Backend Hardening & Optimization (Phase 3)
*Agent: `backend-specialist` | Skill: `api-patterns`, `nodejs-best-practices`*
- [x] **Logic Refinement:** Optimize API routes and database queries in NestJS.
- [x] **Security Audit:** Initial scan using `security_scan.py`.

## 🎨 4. Frontend & UX Optimization (Phase 4)
*Agent: `frontend-specialist`, `performance-optimizer` | Skill: `frontend-design`, `react-patterns`, `performance-profiling`*
- [x] **React 19 Patterns:** Update components to use React 19 best practices (Actions, `use`, etc.).
- [x] **Performance:** Analyze Next.js bundle and optimize generic MUI usage.
- [x] **Storybook Sync:** Ensure `design-system` components are correctly consumed.

## 🛡️ 5. Testing & Security Verification (Phase 5)
*Agent: `test-engineer`, `qa-automation-engineer`, `penetration-tester` | Skill: `testing-patterns`, `webapp-testing`, `vulnerability-scanner`*
- [x] **Test Coverage:** Implement unit tests for backend logic and integration tests for frontend.
- [x] **End-to-End:** Setup/Run Playwright tests for critical user flows.
- [x] **Pentest:** Final security verification for OWASP vulnerabilities.

---

## ✅ Final Validation
- [x] `python .agent/scripts/checklist.py .` must return SUCCESS.
