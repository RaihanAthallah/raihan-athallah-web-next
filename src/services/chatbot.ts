// src/services/ChatbotService.ts

import { sendMessage, receiveMessage } from "@/cores/types/chat";
import { SuccessResponse, ErrorResponse } from "@/cores/types/api";

// Get API URL from environment variable
const API_CHABOT_BASE_URL = process.env.NEXT_PUBLIC_API_CHABOT_BASE_URL || "https://rag.raihanathallah.com";

// Define a union type for our possible return values
type ChatbotResponse = SuccessResponse<receiveMessage> | ErrorResponse;

export const ChatbotService = {
  // The function now returns a Promise of our union type
  async sendMessage(message: sendMessage): Promise<ChatbotResponse> {
    try {
      const response = await fetch(`${API_CHABOT_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_CHABOT_KEY || "",
        },
        body: JSON.stringify(message),
      });

      // The response.json() method returns a promise, so we await it.
      // The parsed body could be a success or error object from your backend.
      const data = await response.json();

      // If the HTTP response itself is not OK (e.g., 500 Internal Server Error, 404 Not Found),
      // we can assume it's an error. The 'data' variable likely contains an ErrorResponse payload.
      if (!response.ok) {
        // We return the structured error from the API body.
        // This is better than just throwing a generic error.
        return data as ErrorResponse;
      }

      // If we reach here, the HTTP status was OK (2xx).
      // The body could still represent a logical error (e.g., success: false).
      // However, we can trust the 'success' flag in the JSON body to be the source of truth.
      // We simply return the parsed data, and the caller will check the 'success' flag.
      return data as ChatbotResponse;
    } catch (error) {
      // This catch block handles network errors (e.g., server is down, no internet connection)
      // or if response.json() fails to parse.
      console.error("Network or parsing error in ChatbotService:", error);

      // We create and return a standardized ErrorResponse object for consistency.
      return new ErrorResponse(
        "A network error occurred. Please try again.",
        "NETWORK_ERROR",
        503 // Service Unavailable
      );
    }
  },
};
