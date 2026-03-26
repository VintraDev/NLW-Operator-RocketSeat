"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import type { SupportedLanguage } from "@/lib/syntax-highlighting";

export default function TestManualSelectionPage() {
  const [code, setCode] = useState("");
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-9), `${timestamp}: ${message}`]);
  };

  const handleLanguageChange = (language: SupportedLanguage, conf?: number) => {
    setCurrentLanguage(language);
    setConfidence(conf || 0);
    addLog(
      `Language changed to: ${language} (confidence: ${Math.round((conf || 0) * 100)}%)`,
    );
  };

  const testCases = [
    {
      name: "JavaScript Function",
      code: `function calculateSum(a, b) {
  return a + b;
}

console.log(calculateSum(5, 3));`,
    },
    {
      name: "CSS Styles",
      code: `.container {
  display: flex;
  justify-content: center;
  background: #f0f0f0;
  padding: 20px;
}`,
    },
    {
      name: "Python Code",
      code: `def calculate_sum(a, b):
    return a + b

print(calculate_sum(5, 3))`,
    },
  ];

  const clearEditor = () => {
    setCode("");
    addLog("Editor cleared");
  };

  const loadTestCase = (testCase: any) => {
    setCode(testCase.code);
    addLog(`Loaded test case: ${testCase.name}`);
  };

  return (
    <div className="min-h-screen bg-devroast-bg text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-devroast-green mb-2">
            Manual Language Selection Test
          </h1>
          <p className="text-devroast-text-secondary">
            Test que o usuário pode escolher a linguagem manualmente e a
            detecção automática respeita a escolha.
          </p>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-devroast-border rounded">
          <div>
            <span className="text-sm text-devroast-text-muted">
              Current Language:
            </span>
            <div className="text-lg font-mono text-devroast-green">
              {currentLanguage || "none"}
            </div>
          </div>
          <div>
            <span className="text-sm text-devroast-text-muted">
              Confidence:
            </span>
            <div className="text-lg font-mono text-devroast-green">
              {Math.round(confidence * 100)}%
            </div>
          </div>
          <div>
            <span className="text-sm text-devroast-text-muted">
              Code Length:
            </span>
            <div className="text-lg font-mono text-devroast-green">
              {code.length} chars
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="space-y-4">
          <h2 className="text-lg font-mono text-devroast-text-primary">
            Test Controls
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={clearEditor}
              className="text-xs"
            >
              Clear Editor
            </Button>
            {testCases.map((testCase) => (
              <Button
                key={testCase.name}
                variant="secondary"
                onClick={() => loadTestCase(testCase)}
                className="text-xs"
              >
                Load {testCase.name}
              </Button>
            ))}
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(testCases[0].code);
                addLog(
                  "JavaScript code copied to clipboard - try pasting in editor",
                );
              }}
              className="text-xs"
            >
              Copy JS to Clipboard
            </Button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <h2 className="text-lg font-mono text-devroast-text-primary">
            Code Editor
          </h2>
          <CodeEditor
            value={code}
            onChange={setCode}
            autoDetectLanguage={true}
            showLanguageSelector={true}
            showLineNumbers={true}
            responsive={true}
            height="adaptive"
            onLanguageChange={handleLanguageChange}
            placeholder="// Cole ou digite código aqui para testar a detecção automática
// Ou use o seletor de linguagem para escolher manualmente
// Teste: A escolha manual deve ter prioridade sobre a detecção automática"
          />
        </div>

        {/* Instructions */}
        <div className="space-y-4 p-4 border border-devroast-border rounded">
          <h2 className="text-lg font-mono text-devroast-text-primary">
            Como Testar
          </h2>
          <div className="space-y-2 text-sm text-devroast-text-secondary">
            <p>
              <span className="text-devroast-green">
                1. Detecção Automática:
              </span>{" "}
              Cole ou digite código - a linguagem deve ser detectada
              automaticamente
            </p>
            <p>
              <span className="text-devroast-green">2. Teste de Paste:</span>{" "}
              Use o botão "Copy JS to Clipboard" e cole (Ctrl+V) no editor
            </p>
            <p>
              <span className="text-devroast-green">3. Seleção Manual:</span>{" "}
              Use o dropdown para escolher uma linguagem manualmente
            </p>
            <p>
              <span className="text-devroast-green">4. Prioridade Manual:</span>{" "}
              Após escolha manual, cole/digite código - a linguagem NÃO deve
              mudar
            </p>
            <p>
              <span className="text-devroast-green">5. Reset:</span> Limpe o
              editor completamente - a seleção manual é resetada
            </p>
            <p>
              <span className="text-devroast-green">6. Indicador Visual:</span>{" "}
              Seleção manual mostra ✓, detecção automática mostra %
            </p>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="space-y-4">
          <h2 className="text-lg font-mono text-devroast-text-primary">
            Activity Logs
          </h2>
          <div className="h-48 overflow-y-auto p-4 border border-devroast-border rounded bg-devroast-surface">
            {logs.length > 0 ? (
              <div className="space-y-1">
                {logs.map((log) => (
                  <div
                    key={log}
                    className="text-xs font-mono text-devroast-text-muted"
                  >
                    {log}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-devroast-text-muted">
                No activity yet. Start typing or selecting language to see logs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
