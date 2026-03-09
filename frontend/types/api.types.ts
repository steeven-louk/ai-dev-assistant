export type IssueType = "performance" | "security" | "maintainability"
export type SeverityLevel = "low" | "medium" | "high"

export interface Issue {
  type: IssueType
  message: string
  severity: SeverityLevel
}

export interface SecurityRisk {
  message: string
}

export interface PerformanceProblem {
  message: string
}

export interface ComplexityScore {
  maintainability: number
  security: number
  performance: number
}

export interface AnalysisResult {
  issues: Issue[]
  security_risks: SecurityRisk[]
  performance_problems: PerformanceProblem[]
  complexity_score: ComplexityScore
}

export interface RefactorResult {
  refactored_code: string
  improvements_summary: string[]
}

export interface TestResult {
  test_code: string
  coverage_explanation: string
}

export interface AnalyzeCodeResponse {
  analysis: AnalysisResult
  refactor: RefactorResult
  test: TestResult
}

export interface AnalyzeCodeRequest {
  code: string
}

export interface AnalyzeCodeError {
  message: string
  status?: number
}

/**
 * Test Generation Types
 */
export interface GenerateTestsRequest {
  code: string
}

export interface GenerateTestsResponse {
  test_code: string
  coverage_explanation: string
}

export interface GenerateTestsError {
  message: string
  status?: number
}
