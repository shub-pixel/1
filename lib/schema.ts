import { Type, type Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "The main witty critique in Hinglish with emojis.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of issues found in the code, ordered from most severe to least.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number of the issue.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short descriptive title of the issue.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact snippet of problematic code.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Hinglish explanation of what is wrong.",
          },
          expected: {
            type: Type.STRING,
            description: "Hinglish explanation of the expected or correct approach.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete corrected code in the same language without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Short key engineering takeaway or lesson in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
