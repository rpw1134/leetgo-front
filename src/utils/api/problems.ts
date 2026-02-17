import type {
  ProblemGenerationRequest,
  ProblemGenerationChunk,
} from "../../types";
import { API_URL, axiosClient } from "../constants";
import axios from "axios";

async function createNewProblem(creationRequest: ProblemGenerationRequest) {
  try {
    const res = await axiosClient.post("/problems", creationRequest, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data; // a stream
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.detail || "Failed to login user";
      throw new Error(errorMessage);
    }
  }
}

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
        Accept: "application/json", // Expecting a stream of JSON objects
      },
      body: JSON.stringify(problemRequest),
    });

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onClose();
        break;
      }

      // Each chunk is a complete JSON object encoded as a string.
      const chunkString = decoder.decode(value);
      if (chunkString.trim()) {
        try {
          const parsedChunk: ProblemGenerationChunk = JSON.parse(chunkString);
          onData(parsedChunk);
        } catch (e) {
          console.error("Failed to parse stream chunk:", chunkString, e);
        }
      }
    }
  } catch (error) {
    console.error("Streaming error:", error);
    onError(error as Error);
  }
}
