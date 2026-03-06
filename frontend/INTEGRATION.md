# Backend Integration Documentation

## Overview
This document describes the complete integration of the React frontend with the backend API using TanStack Query v5 and Fetch API.

## Architecture

### 1. TypeScript Interfaces (`types/api.types.ts`)
Strict type definitions matching the backend response structure:

```typescript
// Analysis Result
interface AnalysisResult {
  issues: Array<{ type, message, severity }>
  security_risks: Array<{ message }>
  performance_problems: Array<{ message }>
  complexity_score: { maintainability, security, performance }
}

// Refactor Result
interface RefactorResult {
  refactored_code: string
  improvements_summary: string[]
}

// Test Result
interface TestResult {
  test_code: string
  coverage_explanation: string
}

// Complete Response
interface AnalyzeCodeResponse {
  analysis: AnalysisResult
  refactor: RefactorResult
  test: TestResult
}
```

### 2. API Service Layer (`lib/api.ts`)
Handles all backend communication using native Fetch API:

```typescript
export async function analyzeCode(request: AnalyzeCodeRequest): Promise<AnalyzeCodeResponse>
```

**Features:**
- POST request to `http://localhost:4000/analyze`
- Automatic error handling and validation
- Response structure validation
- Consistent error formatting

### 3. Custom Hook (`hooks/useAnalyzeCode.ts`)
TanStack Query integration for state management:

```typescript
const { mutate, isPending, data, error, isSuccess } = useAnalyzeCode()
```

**Features:**
- Uses `useMutation` from TanStack Query v5
- Automatic retry logic (up to 2 retries)
- Loading state management
- Error state handling
- Data caching

### 4. Providers Setup (`components/providers.tsx`)
Wraps the entire application with required context providers:

```typescript
<QueryClientProvider>
  <I18nProvider>
    <SaaSProvider>
      {children}
    </SaaSProvider>
  </I18nProvider>
</QueryClientProvider>
```

**Configuration:**
- `staleTime`: 5 minutes
- `gcTime`: 10 minutes (garbage collection time)
- `mutation.retry`: 2 attempts

## Usage Example

### In the Analyze Page Component

```typescript
const { mutate, isPending, data, error } = useAnalyzeCode()

const handleAnalyze = () => {
  mutate({ code: userCodeInput })
}

// Access the data
const complexity = data?.analysis.complexity_score.performance
const refactored = data?.refactor.refactored_code
const issues = data?.analysis.issues
```

## Backend Response Structure

### Request
```json
{
  "code": "const foo = () => bar;"
}
```

### Response
```json
{
  "analysis": {
    "issues": [
      {
        "type": "performance|security|maintainability",
        "message": "Issue description",
        "severity": "low|medium|high"
      }
    ],
    "security_risks": [{ "message": "Risk description" }],
    "performance_problems": [{ "message": "Problem description" }],
    "complexity_score": {
      "maintainability": 75,
      "security": 85,
      "performance": 70
    }
  },
  "refactor": {
    "refactored_code": "const foo = () => { return bar; };",
    "improvements_summary": [
      "Added explicit return statement",
      "Improved code clarity"
    ]
  },
  "test": {
    "test_code": "describe('foo', () => { ... });",
    "coverage_explanation": "Basic unit testing coverage"
  }
}
```

## Environment Configuration

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Note:** The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser.

## Performance Optimizations

### 1. No Unnecessary Re-renders
- TanStack Query manages state efficiently
- Only components using the hook are updated
- Proper dependency arrays in useEffect

### 2. Memoization
- Heavy components can be wrapped with `React.memo()`
- Issue list component renders efficiently with keys

### 3. Code Splitting
- Lazy load code highlighting with Prism.js
- Prism highlighting only runs after data is available

## Error Handling

The hook provides error state:

```typescript
if (error) {
  console.error(error.message)
  // Display user-friendly error message
}
```

Error types include:
- Network errors
- HTTP errors (4xx, 5xx)
- Invalid response structure
- Parsing errors

## Caching Strategy

TanStack Query automatically caches:
- **Query Results**: Not applicable for mutations
- **Successful Mutations**: Data persists in memory
- **Error States**: Retained for retry attempts
- **Garbage Collection**: 10 minutes of inactivity

## Debugging

### Enable Query DevTools
Add to your layout:

```typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### Console Logging
Monitor all requests and responses in browser DevTools:

```typescript
// In lib/api.ts
console.log("Sending request:", request)
console.log("Received response:", data)
```

## Migration from Old Implementation

### Before
```typescript
const [result, setResult] = useState(null)
setResult({
  scores: {},
  refactoredCode: "",
  tests: ""
})
```

### After
```typescript
const { data } = useAnalyzeCode()

data?.analysis.complexity_score
data?.refactor.refactored_code
data?.test.test_code
```

## API Endpoint Reference

### Analyze Code
- **Method**: POST
- **URL**: `http://localhost:4000/analyze`
- **Content-Type**: application/json
- **Success Code**: 200
- **Request Body**: `{ code: string }`

## Dependencies

```json
{
  "@tanstack/react-query": "^5.90.21",
  "next": "^16.1.6",
  "react": "^19.2.3"
}
```

## Future Enhancements

1. **Query Caching**: Implement GET endpoint for analysis history
2. **Optimistic Updates**: Show UI before server response
3. **Batch Requests**: Analyze multiple code snippets
4. **WebSocket Integration**: Real-time analysis updates
5. **Offline Support**: Service Workers for analysis cache
6. **Request Timeout**: Configure timeout for long-running analyses

## Testing

### Unit Test Example
```typescript
import { renderHook, act } from "@testing-library/react"
import { useAnalyzeCode } from "@/hooks/useAnalyzeCode"

it("should analyze code successfully", async () => {
  const { result } = renderHook(() => useAnalyzeCode())
  
  act(() => {
    result.current.mutate({ code: "const x = 1;" })
  })
  
  expect(result.current.isPending).toBe(true)
})
```

## Troubleshooting

### Issue: "Cannot find module @tanstack/react-query"
**Solution**: Run `pnpm install @tanstack/react-query`

### Issue: API returns 404
**Solution**: Ensure backend is running on `http://localhost:4000/analyze`

### Issue: CORS errors
**Solution**: Configure CORS in backend or use proxy during development

```typescript
// next.config.ts
async rewrites() {
  return {
    beforeFiles: [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*'
      }
    ]
  }
}
```

### Issue: Data is undefined
**Solution**: Check if mutation was initiated and data is available:
```typescript
if (data?.analysis) {
  // Safe to use data
}
```

## Summary

The integration provides a robust, type-safe, and performant connection between the React frontend and the backend API using modern best practices with TanStack Query v5.
