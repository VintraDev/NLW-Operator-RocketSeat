"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/ui/code-editor";
import type { SupportedLanguage } from "@/lib/syntax-highlighting";

const sampleCode = {
  javascript: `function calculateTotal(items) {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    if (items[i].price > 100) {
      // Apply 10% discount for expensive items
      total += items[i].price * 0.9;
    } else {
      total += items[i].price;
    }
  }
  
  return total;
}`,

  python: `def calculate_fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    
    return b

# Test the function
result = calculate_fibonacci(10)
print(f"The 10th Fibonacci number is: {result}")`,

  typescript: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      id: Date.now(),
      ...userData
    };
    
    this.users.push(newUser);
    return newUser;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}`,

  css: `/* Modern CSS Grid Layout */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}`,
};

export default function CodeEditorTestPage() {
  const [code, setCode] = useState(sampleCode.javascript);
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");

  const handleLanguageChange = (
    newLanguage: SupportedLanguage,
    confidence?: number,
  ) => {
    console.log(
      `Language changed to: ${newLanguage} (confidence: ${confidence?.toFixed(2) || "manual"})`,
    );
    setLanguage(newLanguage);
  };

  const loadSample = (lang: keyof typeof sampleCode) => {
    setCode(sampleCode[lang]);
    setLanguage(lang as SupportedLanguage);
  };

  return (
    <div className="min-h-screen bg-devroast-bg text-devroast-text-primary p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-mono">Code Editor Test</h1>
          <p className="text-devroast-text-secondary">
            Test the new syntax highlighting and language detection features
          </p>
        </div>

        {/* Sample Code Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => loadSample("javascript")}
            className="px-4 py-2 bg-devroast-green text-devroast-bg rounded font-mono text-sm hover:bg-devroast-green/90"
          >
            JavaScript
          </button>
          <button
            type="button"
            onClick={() => loadSample("typescript")}
            className="px-4 py-2 bg-devroast-green text-devroast-bg rounded font-mono text-sm hover:bg-devroast-green/90"
          >
            TypeScript
          </button>
          <button
            type="button"
            onClick={() => loadSample("python")}
            className="px-4 py-2 bg-devroast-green text-devroast-bg rounded font-mono text-sm hover:bg-devroast-green/90"
          >
            Python
          </button>
          <button
            type="button"
            onClick={() => loadSample("css")}
            className="px-4 py-2 bg-devroast-green text-devroast-bg rounded font-mono text-sm hover:bg-devroast-green/90"
          >
            CSS
          </button>
        </div>

        {/* Code Editor */}
        <div className="flex justify-center">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            onLanguageChange={handleLanguageChange}
            autoDetectLanguage={true}
            showLanguageSelector={true}
            showLineNumbers={true}
            showHeader={true}
            enableSyntaxHighlighting={true}
            height="adaptive"
            responsive={true}
            placeholder="// Paste your code here for automatic language detection..."
          />
        </div>

        {/* Info */}
        <div className="text-center space-y-2">
          <p className="text-sm text-devroast-text-muted">
            Current Language:{" "}
            <span className="text-devroast-green font-mono">{language}</span>
          </p>
          <p className="text-xs text-devroast-text-muted">
            Try pasting code from different languages to test auto-detection
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-devroast-surface border border-devroast-border rounded p-4">
            <h3 className="font-mono font-bold mb-2 text-devroast-green">
              ✨ Syntax Highlighting
            </h3>
            <p className="text-sm text-devroast-text-secondary">
              Real-time syntax highlighting using Shiki with custom DevRoast
              theme colors
            </p>
          </div>

          <div className="bg-devroast-surface border border-devroast-border rounded p-4">
            <h3 className="font-mono font-bold mb-2 text-devroast-green">
              🤖 Auto Detection
            </h3>
            <p className="text-sm text-devroast-text-secondary">
              Automatic language detection using VS Code's ML model with
              heuristic fallback
            </p>
          </div>

          <div className="bg-devroast-surface border border-devroast-border rounded p-4">
            <h3 className="font-mono font-bold mb-2 text-devroast-green">
              📱 Responsive
            </h3>
            <p className="text-sm text-devroast-text-secondary">
              Mobile-first responsive design with adaptive layout and
              touch-friendly controls
            </p>
          </div>

          <div className="bg-devroast-surface border border-devroast-border rounded p-4">
            <h3 className="font-mono font-bold mb-2 text-devroast-green">
              ⚡ Performance
            </h3>
            <p className="text-sm text-devroast-text-secondary">
              Lazy loading, debounced detection, and optimized highlighting for
              large code files
            </p>
          </div>

          <div className="bg-devroast-surface border border-devroast-border rounded p-4">
            <h3 className="font-mono font-bold mb-2 text-devroast-green">
              🔍 20+ Languages
            </h3>
            <p className="text-sm text-devroast-text-secondary">
              Support for JavaScript, TypeScript, Python, Java, Go, Rust, CSS,
              HTML, and more
            </p>
          </div>

          <div className="bg-devroast-surface border border-devroast-border rounded p-4">
            <h3 className="font-mono font-bold mb-2 text-devroast-green">
              🎨 DevRoast Theme
            </h3>
            <p className="text-sm text-devroast-text-secondary">
              Custom syntax colors matching the DevRoast design system for
              perfect consistency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
