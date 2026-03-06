/**
 * API Service Layer
 * Handles all backend communication using Fetch API
 * Base URL: http://localhost:4000
 */

import {
  AnalyzeCodeRequest,
  AnalyzeCodeResponse,
  AnalyzeCodeError,
  GenerateTestsRequest,
  GenerateTestsResponse,
  GenerateTestsError,
} from "@/types/api.types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
const ANALYZE_ENDPOINT = `${API_BASE_URL}/analyze`
const TEST_ENDPOINT = `${API_BASE_URL}/test`


/**
 * Analyzes code by sending it to the backend
 * @param request - The code analysis request containing the code snippet
 * @returns Promise resolving to the complete analysis response
 * @throws AnalyzeCodeError if the request fails
 */
export async function analyzeCode(
  request: AnalyzeCodeRequest
): Promise<AnalyzeCodeResponse> {

   try {
    const response = await fetch(ANALYZE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(request),
    })

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message ||
          `HTTP Error: ${response.status} ${response.statusText}`
      )
    }

    // Parse and return the response
    const data: AnalyzeCodeResponse = await response.json()

    // Validate response structure
    if (!data.analysis || !data.refactor || !data.test) {
      throw new Error("Invalid response structure from server")
    }

    return data
  } catch (error) {
    // Wrap errors in consistent error format
    if (error instanceof Error) {
      throw {
        message: error.message,
        status: 500,
      } as AnalyzeCodeError
    }
    throw {
      message: "An unknown error occurred during code analysis",
      status: 500,
    } as AnalyzeCodeError
  }
}

/**
 * Generates tests for the provided code
 * @param request - The code generation request containing the code snippet
 * @returns Promise resolving to the test generation response
 * @throws GenerateTestsError if the request fails
 */
export async function generateTests(
  request: GenerateTestsRequest
): Promise<GenerateTestsResponse> {
  try {
    const response = await fetch(TEST_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(request),
    })

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message ||
          `HTTP Error: ${response.status} ${response.statusText}`
      )
    }

    // Parse and return the response
    const data: GenerateTestsResponse = await response.json()

    // Validate response structure
    if (!data.test_code || !data.coverage_explanation) {
      throw new Error("Invalid response structure from server")
    }
    console.log("data", data);
    return data
  } catch (error) {
    // Wrap errors in consistent error format
    if (error instanceof Error) {
      throw {
        message: error.message,
        status: 500,
      } as GenerateTestsError
    }
    throw {
      message: "An unknown error occurred during test generation",
      status: 500,
    } as GenerateTestsError
  }
}
