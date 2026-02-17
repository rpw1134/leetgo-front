import type {
  ProblemGenerationRequest,
  ProblemGenerationChunk,
} from "../../types";
import { API_URL } from "../constants";

export async function generateProblemStream(
  problemRequest: ProblemGenerationRequest,
  onData: (chunk: ProblemGenerationChunk) => void,
  onClose: () => void,
  onError: (error: Error) => void,
) {
  try {
    const response = await fetch(`${API_URL}/problems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(problemRequest),
    });

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onClose();
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      // Extract complete JSON objects from the buffer
      while (buffer.length > 0) {
        const trimmed = buffer.trimStart();
        if (!trimmed) break;

        let depth = 0;
        let inString = false;
        let escape = false;
        let endIndex = -1;

        // Find the end of the first complete JSON object
        for (let i = 0; i < trimmed.length; i++) {
          const char = trimmed[i];

          if (escape) {
            escape = false;
            continue;
          }

          if (char === "\\") {
            escape = true;
            continue;
          }

          if (char === '"') {
            inString = !inString;
            continue;
          }

          if (!inString) {
            if (char === "{") depth++;
            if (char === "}") {
              depth--;
              if (depth === 0) {
                endIndex = i + 1;
                break;
              }
            }
          }
        }

        if (endIndex === -1) {
          // Incomplete JSON object, wait for more data
          break;
        }

        const jsonStr = trimmed.substring(0, endIndex);
        buffer = trimmed.substring(endIndex);

        try {
          const parsedChunk: ProblemGenerationChunk = JSON.parse(jsonStr);
          onData(parsedChunk);
        } catch (e) {
          console.error("Failed to parse stream chunk:", jsonStr, e);
        }
      }
    }
  } catch (error) {
    console.error("Streaming error:", error);
    onError(error as Error);
  }
}
