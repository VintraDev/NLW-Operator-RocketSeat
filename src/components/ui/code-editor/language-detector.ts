/**
 * Language detection for code syntax highlighting
 * Uses VS Code's language detection model for high accuracy
 */

import type { SupportedLanguage } from "@/lib/syntax-highlighting";

let modelPromise: Promise<any> | null = null;

/**
 * Language detection result from VS Code model
 */
export interface LanguageDetectionResult {
  languageId: string;
  confidence: number;
}

/**
 * Lazy load the VS Code language detection model
 */
async function loadLanguageModel() {
  if (!modelPromise) {
    modelPromise = import("@vscode/vscode-languagedetection").then(
      async (module) => {
        const ModelOperations = module.ModelOperations;
        const model = new ModelOperations();
        return model;
      },
    );
  }
  return modelPromise;
}

/**
 * Map VS Code language IDs to our supported languages
 */
const vscodeToSupportedLanguage: Record<string, SupportedLanguage> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  java: "java",
  csharp: "csharp",
  "c#": "csharp",
  go: "go",
  rust: "rust",
  css: "css",
  html: "html",
  json: "json",
  jsx: "jsx",
  tsx: "tsx",
  bash: "bash",
  shell: "bash",
  sql: "sql",
  yaml: "yaml",
  xml: "xml",
  php: "php",
  ruby: "ruby",
  swift: "swift",
  // Additional VS Code mappings
  js: "javascript",
  ts: "typescript",
  py: "python",
  rs: "rust",
  sh: "bash",
  yml: "yaml",
  rb: "ruby",
};

/**
 * Detect language using VS Code's ML model
 */
export async function detectLanguage(
  code: string,
): Promise<{ language: SupportedLanguage; confidence: number } | null> {
  try {
    // Don't detect for very short code snippets
    if (code.trim().length < 10) {
      return null;
    }

    const model = await loadLanguageModel();
    const results = await model.runModel(code);

    if (!results || results.length === 0) {
      return null;
    }

    // Get the highest confidence result
    const bestResult = results[0] as LanguageDetectionResult;

    // Map to our supported language
    const supportedLanguage =
      vscodeToSupportedLanguage[bestResult.languageId.toLowerCase()];

    if (!supportedLanguage) {
      return null;
    }

    return {
      language: supportedLanguage,
      confidence: bestResult.confidence,
    };
  } catch (error) {
    console.warn("Language detection failed:", error);
    return null;
  }
}

/**
 * Simple heuristic-based language detection as fallback
 */
export function detectLanguageHeuristic(
  code: string,
): SupportedLanguage | null {
  const trimmed = code.trim();

  if (trimmed.length < 5) {
    return null;
  }

  // Check for common patterns
  if (trimmed.startsWith("<!DOCTYPE") || trimmed.includes("<html>")) {
    return "html";
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return "json";
  }

  if (trimmed.includes("function") && trimmed.includes("=>")) {
    return "javascript";
  }

  if (trimmed.includes("interface") || trimmed.includes(": string")) {
    return "typescript";
  }

  if (trimmed.includes("def ") && trimmed.includes(":")) {
    return "python";
  }

  if (trimmed.includes("public class") || trimmed.includes("import java.")) {
    return "java";
  }

  if (trimmed.includes("func ") || trimmed.includes("package main")) {
    return "go";
  }

  if (trimmed.includes("fn ") || trimmed.includes("let mut")) {
    return "rust";
  }

  if (trimmed.includes("using System;") || trimmed.includes("namespace ")) {
    return "csharp";
  }

  // CSS patterns
  if (
    trimmed.includes("{") &&
    (trimmed.includes(":") || trimmed.includes(";"))
  ) {
    return "css";
  }

  return null;
}
