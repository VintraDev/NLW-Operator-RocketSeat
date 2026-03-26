"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/ui/code-editor";
import type { SupportedLanguage } from "@/lib/syntax-highlighting";

const testCases = [
  {
    name: "JavaScript Object",
    code: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i];
  }
  
  if (total > 100) {
    total = total * 0.9;
    console.log("Discount applied");
  }
  
  return total;
}`,
    expected: "javascript",
  },
  {
    name: "CSS Rules",
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  margin: 20px auto;
  padding: 10px;
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
}`,
    expected: "css",
  },
  {
    name: "TypeScript Interface",
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(response => response.json());
}`,
    expected: "typescript",
  },
  {
    name: "Python Code",
    code: `def calculate_total(items):
    total = 0
    for item in items:
        total += item
    
    if total > 100:
        total = total * 0.9
        print("Discount applied")
    
    return total`,
    expected: "python",
  },
];

export default function TestDetectionPage() {
  const [results, setResults] = useState<
    Record<string, { language: SupportedLanguage | null; confidence: number }>
  >({});

  const handleLanguageChange =
    (testName: string) =>
    (language: SupportedLanguage, confidence?: number) => {
      setResults((prev) => ({
        ...prev,
        [testName]: { language, confidence: confidence || 0 },
      }));
    };

  return (
    <div className="min-h-screen bg-devroast-bg text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-devroast-green mb-2">
            Language Detection Test
          </h1>
          <p className="text-devroast-text-secondary">
            Testing the improved language detection algorithm
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testCases.map((testCase) => {
            const result = results[testCase.name];
            const isCorrect = result?.language === testCase.expected;

            return (
              <div key={testCase.name} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-mono text-devroast-text-primary">
                    {testCase.name}
                  </h2>
                  <div className="text-sm font-mono">
                    Expected:{" "}
                    <span className="text-devroast-green">
                      {testCase.expected}
                    </span>
                  </div>
                </div>

                <CodeEditor
                  value={testCase.code}
                  onChange={() => {}} // Read-only for testing
                  autoDetectLanguage={true}
                  showLanguageSelector={true}
                  showLineNumbers={true}
                  responsive={true}
                  height="fixed"
                  onLanguageChange={handleLanguageChange(testCase.name)}
                />

                {result && (
                  <div
                    className={`p-3 rounded border ${
                      isCorrect
                        ? "border-devroast-green bg-devroast-green/10"
                        : "border-red-500 bg-red-500/10"
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm font-mono">
                      <span>
                        Detected:{" "}
                        <span
                          className={
                            isCorrect ? "text-devroast-green" : "text-red-400"
                          }
                        >
                          {result.language || "none"}
                        </span>
                      </span>
                      <span className="text-devroast-text-muted">
                        Confidence: {Math.round(result.confidence * 100)}%
                      </span>
                    </div>
                    <div className="text-xs text-devroast-text-muted mt-1">
                      {isCorrect
                        ? "✅ Correct detection"
                        : "❌ Incorrect detection"}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 border border-devroast-border rounded">
          <h3 className="text-lg font-mono text-devroast-text-primary mb-2">
            Test Results Summary
          </h3>
          <div className="text-sm text-devroast-text-secondary">
            {Object.keys(results).length > 0 ? (
              <div>
                Tested: {Object.keys(results).length} / {testCases.length} cases
                <br />
                Correct:{" "}
                {
                  Object.values(results).filter(
                    (r, i) => r.language === testCases[i].expected,
                  ).length
                }
                <br />
                Accuracy:{" "}
                {Math.round(
                  (Object.values(results).filter(
                    (r, i) => r.language === testCases[i].expected,
                  ).length /
                    Object.keys(results).length) *
                    100,
                )}
                %
              </div>
            ) : (
              <div>
                Paste code into the editors above to test language detection
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
