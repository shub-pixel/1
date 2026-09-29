import { AI, SAMPLE } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";

async function main() {
  console.log(`[check-api] Testing connection to Gemini API with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("-----------------------------------------");
    console.log("[check-api] SUCCESS! Gemini API is working properly.");
    console.log("-----------------------------------------");
    console.log(`Roast: ${result.roast}`);
    console.log(`Issues detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [${issue.severity}] Line ${issue.line}: ${issue.title}`);
    });
    console.log(`Corrected code:\n${result.correctedCode}`);
    console.log(`Takeaway: ${result.takeaway}`);
    console.log("-----------------------------------------");
  } catch (error: any) {
    console.error("-----------------------------------------");
    console.error("[check-api] FAILED to analyze code with Gemini API:");
    console.error(error?.message || error);
    console.error("-----------------------------------------");
    process.exit(1);
  }
}

main();
