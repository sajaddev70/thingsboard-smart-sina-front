# ThingsBoard API Architecture Review

This document outlines architectural findings, technical debt, and refactoring suggestions based on the end-to-end API audit.

## 1. Major Architectural Findings

### 1.1 Inconsistent Prefixing
While the majority of the API follows the `/api/` pattern, several legacy and transport-specific endpoints use `/api/v1/` or `/api/noauth/`. This creates fragmentation in the routing table and makes middleware configuration (like rate limiting) more complex.

### 1.2 POST for "Query" Operations
Several endpoints (e.g., in `EntityQueryController`) use `POST` for search and data retrieval. While this is often necessary for complex filters that exceed URL length limits, it prevents standard HTTP caching and makes it harder for automated security scanners to identify safe "Read" operations.

### 1.3 Underutilization of Hypermedia (HATEOAS)
The API returns flat IDs rather than self-describing links. This increases client-side complexity as the frontend must know exactly which endpoint to call for every related entity.

### 1.4 Heavy Controller Logic
Some controllers (like `BaseController`) contain significant helper logic that should be moved to a dedicated `AuthorizationService` or `EntityValidationService` to improve testability and modularity.

## 2. Technical Debt & Risks

### 2.1 Deprecated APIs
We found **19 deprecated endpoints** that are still active in the codebase. These should be phased out in favor of their V2 counterparts.
- Example: Old RPC endpoints vs the new RPC V2.

### 2.2 Security: Wide Permission Scopes
The use of `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')` on many endpoints requires very careful implementation of entity-level ownership checks inside the service layer. A centralized "Entity Access Evaluator" pattern would be more robust against "Broken Object Level Authorization" (BOLA).

### 2.3 Overfetching Risks
Many "Get Info" endpoints return large JSON objects when the UI often only needs 2-3 fields. This impacts mobile app performance and increases database load.

### 2.4 Pagination Consistency
While most list endpoints use `PageLink`, some internal or legacy ones return simple `List<T>`, which can cause memory issues as the data size grows.

## 3. Refactoring Suggestions

### 3.1 Unification of API Namespace
- Migrate `/api/v1/` endpoints to the standard `/api/` path (keeping aliases for backward compatibility if needed).
- Standardize on `/api/v2/` for all major entity operations to allow for breaking schema changes.

### 3.2 Introduction of GraphQL or Filter DSL
- For complex entity queries, consider a GraphQL layer or a unified filter DSL to solve the underfetching/overfetching problem and reduce the number of `POST` search endpoints.

### 3.3 Centralized Security Expressions
- Move complex `@PreAuthorize` strings into custom security expressions (e.g., `@PreAuthorize("@access.hasEntityReadPermission(#id)")`) to centralize security logic.

### 3.4 API Versioning Strategy
- Implement a clear header-based or path-based versioning strategy across the entire project, rather than the current ad-hoc controller naming (RpcV1 vs RpcV2).

## 4. Performance & Scalability

- **N+1 Queries:** Several "Info" endpoints fetch entity data and then perform additional calls for attributes/telemetry. These should be optimized with batch fetching or database joins.
- **WebSocket Scaling:** The custom WebSocket handler (`TbWebSocketHandler`) should be reviewed for its state management to ensure compatibility with horizontal scaling across multiple platform instances.
