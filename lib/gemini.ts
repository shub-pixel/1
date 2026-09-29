import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import type { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status?: number | string, error?: unknown): string {
  const code = typeof status === "number" ? status : Number(status);
  const errMsg = error instanceof Error ? error.message : String(error);

  if (code === 400) {
    return `Invalid request to Gemini API (400): ${errMsg}. Please verify AI.model in config/app.config.ts.`;
  }
  if (code === 403) {
    return "Gemini API key is invalid or lacks required permissions (403). Please verify your key in .env.local.";
  }
  if (code === 404) {
    return `Requested Gemini model was not found (404). Please verify AI.model in config/app.config.ts.`;
  }
  if (code === 429) {
    return "Gemini API rate limit exceeded (429). Please wait a moment before roasting again.";
  }
  if (code === 503) {
    return "Gemini service is currently overloaded or temporarily unavailable (503). Automatic retries exhausted. Please try again shortly.";
  }
  return `Gemini API error: ${errMsg || "An unexpected error occurred during code evaluation."}`;
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const text = response.text;
      if (!text || !text.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      let parsed: any;
      try {
        parsed = JSON.parse(text);
      } catch {
        throw new Error("Failed to parse Gemini response as JSON.");
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: any) {
      const status =
        err?.status ??
        err?.statusCode ??
        err?.code ??
        err?.response?.status;

      if ((status === 503 || status === "503") && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error("Maximum retry attempts reached without response from Gemini.");
}
