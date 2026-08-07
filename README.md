# Grove

Grove is a developer tool that analyzes GitHub repositories and helps developers understand unfamiliar codebases through repository structure, file exploration, dependency visualization, and AI-powered explanations.

---

## Core Capabilities

- **Repository Analysis**: Automatically clones, parses, and extracts structural and architectural metadata from public GitHub repositories.
- **Repository Structure**: Identifies repository framework (React, Express, React + Express, or Unknown), folder distribution, and entry points.
- **Repository Statistics**: Calculates metrics including total files, total folders, total line counts, average lines per file, and maximum dependencies.
- **Repository Health**: Identifies health signals such as large files (>300 lines), most imported files, unused files, and orphan files.
- **Dependency Graph**: Generates an interactive visual graph using Dagre auto-layout and React Flow to render file dependencies and import connections.
- **File Explorer**: Presents a filterable file tree navigation with file type icons and path search.
- **Code Preview**: Displays full source code preview for selected repository files.
- **AI Repository Summary**: Produces a high-level summary of repository purpose, architecture, key components, and entry points using compact repository knowledge.
- **AI File Explanation**: Provides targeted explanations of purpose, responsibilities, functions, and file interactions for any selected file.
- **Repository Q&A**: Answers developer questions about the repository grounded strictly in available knowledge.
- **Source-Aware Q&A**: Deterministically selects up to 4 relevant source files when answering implementation-level questions.

---

## Architecture & Data Flow

```
GitHub Repository
       ↓
Repository Analysis
       ↓
Repository Index
       ↓
Repository Knowledge
       ↓
Frontend Repository Explorer
       ↓
AI Features
```

### Knowledge vs. Source Context Isolation

- **Repository Knowledge (`repository.knowledge`)**: A compact, structured metadata representation generated after repository analysis. It includes framework type, entry point, folder counts, compact file metadata (paths, names, types, line counts, dependency lists), dependency graph nodes/edges, statistics, and health metrics. **It contains zero raw source code contents.**
- **Selected Source Files (`selectedSourceFiles`)**: Used exclusively during Repository Q&A for implementation-oriented questions (e.g. *"What does ai.service.js do?"*). A deterministic relevance selector matches question tokens against file metadata, ranks candidates, retrieves direct dependencies, reads source contents from disk, and appends **at most 4 source files** to the prompt.
- **Metadata Questions**: Questions about high-level structure (e.g. *"What is the entry point?"*) select **0 source files**, using only `repository.knowledge`.

---

## Project Structure

```
Grove/
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── ai.controller.js
│       │   ├── analysis.controller.js
│       │   └── health.controller.js
│       ├── middleware/
│       │   └── error.middleware.js
│       ├── errors/
│       │   └── AppError.js
│       ├── prompts/
│       │   ├── explainFile.prompt.js
│       │   ├── repositoryQuestion.prompt.js
│       │   └── repositorySummary.prompt.js
│       ├── routes/
│       │   ├── ai.routes.js
│       │   ├── analysis.routes.js
│       │   └── health.routes.js
│       ├── services/
│       │   ├── ai.service.js
│       │   ├── analysis.service.js
│       │   └── health.service.js
│       ├── utils/
│       │   ├── ast.utils.js
│       │   ├── entryPoint.utils.js
│       │   ├── file.utils.js
│       │   ├── fileClassifier.utils.js
│       │   ├── git.utils.js
│       │   ├── github.utils.js
│       │   ├── graph.utils.js
│       │   ├── parser.utils.js
│       │   ├── relevantFileSelector.utils.js
│       │   ├── repositoryAnalyzer.utils.js
│       │   ├── repositoryHealth.utils.js
│       │   ├── repositoryIndex.utils.js
│       │   ├── repositoryKnowledge.utils.js
│       │   ├── repositoryStatistics.utils.js
│       │   └── repositoryStructure.utils.js
│       ├── app.js
│       └── server.js
│
└── frontend/
    └── src/
        ├── api/
        │   └── api.js
        ├── components/
        │   ├── layout/
        │   │   ├── Container.jsx
        │   │   └── Navbar.jsx
        │   ├── repository/
        │   │   ├── CodePreview.jsx
        │   │   ├── DependencyGraph.jsx
        │   │   ├── DetailsPanel.jsx
        │   │   ├── FileExplorer.jsx
        │   │   ├── FileTree.jsx
        │   │   ├── MainContent.jsx
        │   │   ├── RepositoryHeader.jsx
        │   │   ├── RepositoryPreview.jsx
        │   │   ├── RepositoryQuestion.jsx
        │   │   ├── RepositoryStatistics.jsx
        │   │   ├── RepositoryStructure.jsx
        │   │   ├── RepositorySummary.jsx
        │   │   ├── StatCard.jsx
        │   │   └── StatsBar.jsx
        │   ├── ui/
        │   │   ├── Button.jsx
        │   │   └── Input.jsx
        │   └── Hero.jsx
        ├── context/
        │   └── RepositoryContext.jsx
        ├── pages/
        │   ├── Home.jsx
        │   └── Repository.jsx
        ├── services/
        │   └── repository.service.js
        ├── utils/
        │   ├── buildFileTree.js
        │   └── layoutGraph.js
        ├── App.jsx
        └── main.jsx
```

---

## Technology Stack

### Frontend
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Visualization**: `@xyflow/react` (React Flow), `@dagrejs/dagre`
- **HTTP Client**: Axios

### Backend
- **Runtime & Server**: Node.js, Express 5
- **AI SDK**: `@google/genai` (Google Gemini 3.5 Flash)
- **AST Parsing**: `@babel/parser`, `@babel/traverse`
- **Utilities**: `dotenv`, `cors`

---

## Environment Variables

### Backend Environment Variables (`backend/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
CLIENT_URL=http://localhost:5173
```

> **CRITICAL SECURITY REQUIREMENT**: `GEMINI_API_KEY` is backend-only and must **NEVER** be placed in frontend environment variables or client-side bundles.

### Frontend Environment Variables (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

## Local Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gusainyashaswi/grove.git
cd grove
```

### 2. Configure Backend Environment

Create `backend/.env`:

```bash
cd backend
cp .env.example .env  # or create .env manually
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key
PORT=3000
```

### 3. Install Dependencies & Start Services

#### Backend:

```bash
cd backend
npm install
npm run dev
```

The backend server runs on `http://localhost:3000`.

#### Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend application runs on `http://localhost:5173`.

---

## API Endpoints

### `GET /api/health`
Health check endpoint.
- **Response**: `{ "status": "ok" }`

---

### `POST /api/analyze`
Clones and analyzes a GitHub repository.
- **Request Body**:
  ```json
  {
    "url": "https://github.com/owner/repository"
  }
  ```
- **Response Body**: Returns the complete `repositoryIndex` containing structural analysis, health, statistics, graph, and `knowledge` metadata object.

---

### `POST /api/ai/explain-file`
Generates an AI explanation for a selected file.
- **Request Body**:
  ```json
  {
    "repository": {
      "structure": { "framework": "Express" },
      "entryPoint": { "name": "server.js", "path": "src/server.js" }
    },
    "file": {
      "name": "server.js",
      "path": "src/server.js",
      "type": "javascript",
      "dependencies": ["src/app.js"],
      "dependents": [],
      "content": "..."
    }
  }
  ```
- **Response Body**:
  ```json
  {
    "success": true,
    "explanation": "..."
  }
  ```

---

### `POST /api/ai/repository-summary`
Generates an AI repository summary.
- **Request Body**:
  ```json
  {
    "repository": {
      "knowledge": { ... }
    }
  }
  ```
- **Response Body**:
  ```json
  {
    "success": true,
    "summary": "..."
  }
  ```

---

### `POST /api/ai/repository-question`
Answers a user question grounded in repository knowledge.
- **Request Body**:
  ```json
  {
    "repository": {
      "knowledge": { ... }
    },
    "question": "What does the AI service do?"
  }
  ```
- **Response Body**:
  ```json
  {
    "success": true,
    "answer": "..."
  }
  ```

---

## AI Behavior & Grounding Rules

- **Repository Summary**: Consumes `repository.knowledge` to produce a 4-part summary (Overview, Architecture, Key Components, Entry Point).
- **File Explanation**: Analyzes single-file context (name, path, type, imports, used-by list, full code) to produce a 5-part file breakdown.
- **Repository Q&A**: Answers user questions using structured metadata. For implementation questions, up to 4 relevant source files are attached.
- **Strict Grounding**: Gemini is instructed to rely strictly on provided repository context. If the requested information is absent, the model explicitly responds:
  > *"Cannot be determined from the available repository information."*

---

## Production Deployment Preparation

To deploy Grove to production platforms (e.g. Render, Railway, Vercel, Netlify):

1. **Backend Deployment**:
   - Set environment variable `GEMINI_API_KEY` to your Gemini API key.
   - Set `PORT` (assigned automatically by host platforms).
   - Set `CLIENT_URL` to your production frontend URL (e.g., `https://grove-app.vercel.app`).

2. **Frontend Deployment**:
   - Set `VITE_API_URL` to your production backend URL (e.g., `https://grove-api.onrender.com`).
   - Run build command: `npm run build` in `frontend/`.
