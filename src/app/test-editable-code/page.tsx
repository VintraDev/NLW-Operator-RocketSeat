"use client";

import { useState } from "react";
import { EditableCodeInput } from "@/components/ui/editable-code-input";

const defaultCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  
  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }
  
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  
  return total;
}`;

export default function EditableCodeInputTestPage() {
  const [code, setCode] = useState(defaultCode);

  return (
    <div className="min-h-screen bg-devroast-bg p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-devroast-text-primary font-mono">
            EditableCodeInput Test
          </h1>
          <p className="text-devroast-text-secondary">
            Testing the new editable code input component with TypeScript syntax
            highlighting
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-devroast-text-primary font-mono mb-4">
              Adaptive Height (Default)
            </h2>
            <EditableCodeInput
              value={code}
              onChange={setCode}
              height="adaptive"
              showLineNumbers={true}
              showHeader={true}
              placeholder="// Digite seu código TypeScript aqui..."
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-devroast-text-primary font-mono mb-4">
              Fixed Height (360px like Pencil)
            </h2>
            <EditableCodeInput
              value={code}
              onChange={setCode}
              height="fixed"
              showLineNumbers={true}
              showHeader={true}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-devroast-text-primary font-mono mb-4">
              Auto Height (Minimal)
            </h2>
            <EditableCodeInput
              value={code}
              onChange={setCode}
              height="auto"
              showLineNumbers={true}
              showHeader={true}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-devroast-text-primary font-mono mb-4">
              Mobile-Friendly (No Line Numbers)
            </h2>
            <EditableCodeInput
              value={code}
              onChange={setCode}
              height="adaptive"
              showLineNumbers={false}
              showHeader={true}
              responsive={true}
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-devroast-surface border border-devroast-border rounded">
          <h3 className="text-lg font-semibold text-devroast-text-primary font-mono mb-2">
            Current Code Value:
          </h3>
          <pre className="text-sm text-devroast-text-secondary font-mono whitespace-pre-wrap">
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
}
