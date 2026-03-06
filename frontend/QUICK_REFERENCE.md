# Backend API Integration - Quick Reference Guide

## 🎯 The Integrated System

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Next.js)                 │
├─────────────────────────────────────────────────────────────┤
│  AnalyzePage Component                                      │
│  ├─ Input: Code Editor (CodeEditor)                        │
│  ├─ Mutation: useAnalyzeCode()                            │
│  └─ Output: Results Display (Metrics, Code, Tests, Issues) │
├─────────────────────────────────────────────────────────────┤
│  State Management                                           │
│  └─ TanStack Query v5 (useMutation)                       │
├─────────────────────────────────────────────────────────────┤
│  API Layer                                                  │
│  └─ Fetch API → http://localhost:4000/analyze (POST)      │
├─────────────────────────────────────────────────────────────┤
│  Type Safety                                                │
│  └─ TypeScript Interfaces (analysis, refactor, test)       │
└─────────────────────────────────────────────────────────────┘
         ↓
    [Network Request]
         ↓
┌─────────────────────────────────────────────────────────────┐
│                   Express Backend                           │
├─────────────────────────────────────────────────────────────┤
│  POST /analyze                                              │
│  ├─ Analyzer Agent (complexity scores, issues)            │
│  ├─ Refactor Agent (improved code, improvements)          │
│  └─ Test Agent (unit tests, coverage)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 How to Use

### 1. Analyze Code
```typescript
const { mutate, isPending, data, error } = useAnalyzeCode()

// Trigger analysis
mutate({ code: "const x = 1;" })

// Check states
isPending → true (while loading)
data     → response object (when ready)
error    → error object (on failure)
```

### 2. Access Results
```typescript
// Complexity Scores (0-100)
data?.analysis.complexity_score.performance     // e.g., 75
data?.analysis.complexity_score.security        // e.g., 85
data?.analysis.complexity_score.maintainability // e.g., 70

// Refactored Code
data?.refactor.refactored_code    // string
data?.refactor.improvements_summary // string[]

// Generated Tests
data?.test.test_code           // string
data?.test.coverage_explanation // string

// Issues Found
data?.analysis.issues // Issue[]
data?.analysis.security_risks // SecurityRisk[]
data?.analysis.performance_problems // PerformanceProblem[]
```

### 3. Issue Details
```typescript
interface Issue {
  type: "performance" | "security" | "maintainability"
  message: string
  severity: "low" | "medium" | "high"
}

// Example
{
  type: "security",
  message: "Avoid eval() usage",
  severity: "high"
}
```

---

## 📋 API Reference

### Request
```json
POST http://localhost:4000/analyze

{
  "code": "const greet = () => console.log('hello');"
}
```

### Response (200 OK)
```json
{
  "analysis": {
    "issues": [
      {
        "type": "maintainability",
        "message": "Function can be simplified",
        "severity": "low"
      }
    ],
    "security_risks": [],
    "performance_problems": [],
    "complexity_score": {
      "maintainability": 72,
      "security": 88,
      "performance": 65
    }
  },
  "refactor": {
    "refactored_code": "const greet = () => console.log('hello');",
    "improvements_summary": [
      "Explicit semicolon added",
      "Consistent naming"
    ]
  },
  "test": {
    "test_code": "describe('greet', () => { ... });",
    "coverage_explanation": "20% coverage"
  }
}
```

### Error Response (4xx/5xx)
```json
{
  "message": "The snippet is too short.",
  "status": 400
}
```

---

## 🧩 File Structure

| File | Purpose |
|------|---------|
| `types/api.types.ts` | TypeScript interfaces |
| `lib/api.ts` | Fetch API service |
| `hooks/useAnalyzeCode.ts` | TanStack Query hook |
| `components/providers.tsx` | QueryClient setup |
| `app/layout.tsx` | Root layout with providers |
| `app/analyze/page.tsx` | Main component using hook |
| `.env.example` | Environment config template |

---

## 🔄 Component Data Flow

```typescript
// 1. User enters code
<CodeEditor onChange={setCode} />

// 2. Click analyze button
<Button onClick={handleAnalyze}>Analyze</Button>

// 3. Trigger mutation
const handleAnalyze = () => {
  mutate({ code })
}

// 4. Hook sends to API
useAnalyzeCode() → analyzeCode() → fetch(...) → backend

// 5. Receive response
data.analysis.complexity_score
data.refactor.refactored_code
data.test.test_code
data.analysis.issues

// 6. Display in UI
<div>{data?.analysis.complexity_score.performance}</div>
<div>{data?.refactor.refactored_code}</div>
// etc...
```

---

## ⚙️ Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### TanStack Query Settings
```typescript
// @/components/providers.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 minutes
      gcTime: 1000 * 60 * 10,        // 10 minutes garbage collection
    },
    mutations: {
      retry: 2,                        // 2 retry attempts
    },
  },
})
```

---

## 🎨 UI Components

### Metrics Display
```tsx
<div className="grid grid-cols-3 gap-4">
  <Card>Performance: {data?.analysis.complexity_score.performance}</Card>
  <Card>Security: {data?.analysis.complexity_score.security}</Card>
  <Card>Maintainability: {data?.analysis.complexity_score.maintainability}</Card>
</div>
```

### Refactor Tab (Two-Column)
```tsx
<div className="flex">
  <div className="flex-1">
    {/* Refactored Code */}
    <pre>{data?.refactor.refactored_code}</pre>
  </div>
  <div className="w-80">
    {/* Improvements List */}
    {data?.refactor.improvements_summary.map(i => <p>{i}</p>)}
  </div>
</div>
```

### Issues List
```tsx
{data?.analysis.issues.map((issue) => (
  <div key={issue.message}>
    <span className={issue.severity}>📌</span>
    <p>{issue.type}: {issue.message}</p>
  </div>
))}
```

---

## 🚀 Common Tasks

### Check if data is loading
```typescript
if (isPending) return <Spinner />
```

### Check if error occurred
```typescript
if (error) return <div>Error: {error.message}</div>
```

### Access specific metric
```typescript
const performanceScore = data?.analysis.complexity_score.performance ?? 0
```

### Display all issues
```typescript
data?.analysis.issues.forEach(issue => {
  console.log(`${issue.type} (${issue.severity}): ${issue.message}`)
})
```

### Copy code to clipboard
```typescript
navigator.clipboard.writeText(data?.refactor.refactored_code || "")
```

---

## 🔌 Integration Checklist

- [x] TanStack Query installed
- [x] TypeScript interfaces defined
- [x] API service created
- [x] Custom hook implemented
- [x] Providers configured
- [x] Layout updated
- [x] Component integrated
- [x] Environment config ready
- [x] Error handling working
- [x] UI displaying results

---

## 📊 Example Usage Flow

```typescript
export default function AnalyzePage() {
  const [code, setCode] = useState("")
  const { mutate, isPending, data, error } = useAnalyzeCode()

  const handleAnalyze = () => {
    mutate({ code })
  }

  return (
    <div>
      {/* Input */}
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleAnalyze} disabled={isPending}>
        {isPending ? "Analyzing..." : "Analyze"}
      </button>

      {/* Error */}
      {error && <div className="error">{error.message}</div>}

      {/* Results */}
      {data && (
        <div>
          <h2>Scores</h2>
          <p>Performance: {data.analysis.complexity_score.performance}</p>
          
          <h2>Refactored Code</h2>
          <pre>{data.refactor.refactored_code}</pre>
          
          <h2>Improvements</h2>
          <ul>
            {data.refactor.improvements_summary.map((imp) => (
              <li key={imp}>{imp}</li>
            ))}
          </ul>
          
          <h2>Issues</h2>
          {data.analysis.issues.map((issue) => (
            <div key={issue.message}>
              <strong>{issue.type}</strong> ({issue.severity}): {issue.message}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `data is undefined` | Check mutation was called and completed |
| `error.message` error | Ensure backend is running and accessible |
| Types not found | Run `pnpm install @tanstack/react-query` |
| Port 4000 not available | Change `NEXT_PUBLIC_API_URL` in `.env.local` |
| CORS error | Configure CORS in backend or use proxy |

---

## 📞 Support

For detailed documentation, see:
- `INTEGRATION.md` - Complete integration guide
- `IMPLEMENTATION_SUMMARY.md` - Full implementation details
- `.env.example` - Environment configuration example

---

## ✨ Key Features Summary

✅ **Type-Safe**: Full TypeScript coverage  
✅ **Efficient**: TanStack Query state management  
✅ **Reliable**: Automatic retry logic  
✅ **Fast**: Optimized rendering  
✅ **Beautiful**: Semantic UI with icons  
✅ **Well-Documented**: Comprehensive guides  
✅ **Production-Ready**: Error handling & validation  

---

**Last Updated**: March 5, 2026  
**Status**: ✅ Ready to Use
