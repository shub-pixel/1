import { NextResponse } from "next/server";
import {
  DEFAULTS,
  LANGUAGES,
  LIMITS,
  ROAST_LEVELS,
} from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import type { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const rawCode = typeof body?.code === "string" ? body.code : "";
  const rawErrorMessage =
    typeof body?.errorMessage === "string" ? body.errorMessage.trim() : "";

  // Validate code presence
  if (!rawCode || !rawCode.trim()) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  // Validate code length
  if (rawCode.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Validate error message length
  if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Language fallback
  const isKnownLanguage = LANGUAGES.some((l) => l.id === body?.language);
  const language: LanguageId = isKnownLanguage
    ? (body.language as LanguageId)
    : DEFAULTS.language;

  // Roast level fallback
  const isKnownRoastLevel = ROAST_LEVELS.some((r) => r.id === body?.roastLevel);
  const roastLevel: RoastLevel = isKnownRoastLevel
    ? (body.roastLevel as RoastLevel)
    : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code: rawCode,
      roastLevel,
      errorMessage: rawErrorMessage || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Roast analysis error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "An unexpected error occurred while analyzing the code.",
      },
      { status: 500 }
    );
  }
}
