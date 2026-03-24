/**
 * Language detection for code syntax highlighting
 * Uses highlight.js and heuristic detection for reliable language identification
 */

import type { SupportedLanguage } from "@/lib/syntax-highlighting";

let hljs: any = null;

/**
 * Language detection result
 */
export interface LanguageDetectionResult {
  languageId: string;
  confidence: number;
}

/**
 * Lazy load highlight.js detection system
 */
async function loadHighlightJS() {
  if (!hljs) {
    try {
      const module = await import("highlight.js");
      hljs = module.default;
    } catch (error) {
      console.warn("Failed to load highlight.js:", error);
      hljs = null;
    }
  }
  return hljs;
}

/**
 * Map highlight.js language names to our supported languages
 */
const hljsToSupportedLanguage: Record<string, SupportedLanguage> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  java: "java",
  csharp: "csharp",
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
  // Additional common mappings
  js: "javascript",
  ts: "typescript",
  py: "python",
  rs: "rust",
  sh: "bash",
  yml: "yaml",
  rb: "ruby",
  cs: "csharp",
};

/**
 * Detect language using highlight.js auto-detection
 */
async function detectWithHighlightJS(
  code: string,
): Promise<{ language: SupportedLanguage; confidence: number } | null> {
  try {
    const highlightjs = await loadHighlightJS();
    if (!highlightjs || !highlightjs.highlightAuto) {
      return null;
    }

    const result = highlightjs.highlightAuto(code);
    if (!result || !result.language) {
      return null;
    }

    const supportedLanguage =
      hljsToSupportedLanguage[result.language.toLowerCase()];
    if (!supportedLanguage) {
      return null;
    }

    // Convert highlight.js relevance to confidence (0-1)
    // Typical relevance is 0-30, so normalize to 0-1
    const confidence = Math.min(Math.max(result.relevance / 20, 0.1), 0.95);

    return {
      language: supportedLanguage,
      confidence,
    };
  } catch (error) {
    console.warn("highlight.js detection failed:", error);
    return null;
  }
}

/**
 * Main language detection function with multiple fallbacks
 */
export async function detectLanguage(
  code: string,
): Promise<{ language: SupportedLanguage; confidence: number } | null> {
  try {
    // Don't detect for very short code snippets
    if (code.trim().length < 10) {
      return null;
    }

    // Check if running in browser
    if (typeof window === "undefined") {
      console.warn("Language detection not available on server");
      return null;
    }

    // Try highlight.js first
    try {
      const hljsResult = await detectWithHighlightJS(code);
      if (hljsResult && hljsResult.confidence > 0.3) {
        console.log(
          `Language detected by highlight.js: ${hljsResult.language} (${Math.round(hljsResult.confidence * 100)}%)`,
        );
        return hljsResult;
      }
    } catch (hljsError) {
      console.warn(
        "highlight.js detection failed, trying heuristic:",
        hljsError,
      );
    }

    // Try heuristic detection as fallback
    const heuristicResult = detectLanguageHeuristic(code);
    if (heuristicResult) {
      console.log(`Language detected by heuristic: ${heuristicResult}`);
      return {
        language: heuristicResult,
        confidence: 0.7, // Moderate confidence for heuristic detection
      };
    }

    // No detection succeeded
    return null;
  } catch (error) {
    console.warn("All language detection methods failed:", error);
    return null;
  }
}

/**
 * Enhanced heuristic-based language detection
 */
export function detectLanguageHeuristic(
  code: string,
): SupportedLanguage | null {
  const trimmed = code.trim();

  if (trimmed.length < 5) {
    return null;
  }

  // JSON detection (must be first to avoid false positives)
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      JSON.parse(trimmed);
      return "json";
    } catch {
      // Not valid JSON, continue checking
    }
  }

  // HTML detection
  if (
    trimmed.startsWith("<!DOCTYPE") ||
    trimmed.includes("<html>") ||
    /<\w+[^>]*>/g.test(trimmed)
  ) {
    return "html";
  }

  // CSS detection
  if (
    trimmed.includes("{") &&
    trimmed.includes("}") &&
    /[\w-]+\s*:\s*[^;]+;/.test(trimmed)
  ) {
    return "css";
  }

  // TypeScript detection (must come before JavaScript)
  if (
    trimmed.includes("interface ") ||
    trimmed.includes(": string") ||
    trimmed.includes(": number") ||
    trimmed.includes("type ") ||
    /<[A-Z]\w*>/.test(trimmed) ||
    trimmed.includes("extends ") ||
    trimmed.includes("implements ")
  ) {
    return "typescript";
  }

  // JavaScript detection
  if (
    trimmed.includes("function ") ||
    trimmed.includes("=>") ||
    trimmed.includes("const ") ||
    trimmed.includes("let ") ||
    trimmed.includes("var ") ||
    trimmed.includes("console.log") ||
    trimmed.includes("require(") ||
    trimmed.includes("import ")
  ) {
    return "javascript";
  }

  // Python detection
  if (
    trimmed.includes("def ") ||
    trimmed.includes("import ") ||
    trimmed.includes("from ") ||
    trimmed.includes("print(") ||
    /^\s*#/.test(trimmed) ||
    trimmed.includes("if __name__")
  ) {
    return "python";
  }

  // Java detection
  if (
    trimmed.includes("public class ") ||
    trimmed.includes("import java.") ||
    trimmed.includes("public static void main") ||
    trimmed.includes("System.out.println")
  ) {
    return "java";
  }

  // Go detection
  if (
    trimmed.includes("func ") ||
    trimmed.includes("package main") ||
    trimmed.includes('import "') ||
    trimmed.includes("fmt.Println")
  ) {
    return "go";
  }

  // Rust detection
  if (
    trimmed.includes("fn ") ||
    trimmed.includes("let mut ") ||
    trimmed.includes("println!") ||
    trimmed.includes("use std::")
  ) {
    return "rust";
  }

  // C# detection
  if (
    trimmed.includes("using System;") ||
    trimmed.includes("namespace ") ||
    trimmed.includes("public class ") ||
    trimmed.includes("Console.WriteLine")
  ) {
    return "csharp";
  }

  // PHP detection
  if (trimmed.startsWith("<?php") || trimmed.includes("$")) {
    return "php";
  }

  // Ruby detection
  if (
    trimmed.includes("def ") ||
    trimmed.includes("puts ") ||
    trimmed.includes('require "') ||
    trimmed.includes("class ") ||
    trimmed.includes("end")
  ) {
    return "ruby";
  }

  // SQL detection
  if (/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i.test(trimmed)) {
    return "sql";
  }

  // YAML detection
  if (
    trimmed.includes("---") ||
    /^\s*\w+:\s*/.test(trimmed) ||
    /^\s*-\s+/.test(trimmed)
  ) {
    return "yaml";
  }

  // XML detection
  if (
    trimmed.startsWith("<?xml") ||
    (trimmed.includes("<") && trimmed.includes("/>"))
  ) {
    return "xml";
  }

  // Bash/Shell detection
  if (
    trimmed.startsWith("#!/bin/bash") ||
    trimmed.startsWith("#!/bin/sh") ||
    trimmed.includes("echo ") ||
    /\$\{?\w+\}?/.test(trimmed)
  ) {
    return "bash";
  }

  // Default fallback
  return null;
}
