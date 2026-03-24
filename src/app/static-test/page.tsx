import { EditableCodeInput } from "@/components/ui/editable-code-input";

export default function StaticTestPage() {
  const sampleCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  
  if (total > 100) {
    total = total * 0.9; // 10% discount
    console.log("Discount applied");
  }
  
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  
  return total;
}`;

  return (
    <div className="min-h-screen bg-devroast-bg p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-devroast-text-primary font-mono">
            EditableCodeInput
          </h1>
          <p className="text-devroast-text-secondary">
            New interactive code input component with TypeScript syntax
            highlighting
          </p>
        </div>

        <div className="flex justify-center">
          <EditableCodeInput
            value={sampleCode}
            onChange={() => {}} // Static demo
            height="adaptive"
            language="typescript"
            showLineNumbers={true}
            showHeader={true}
            responsive={true}
          />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-devroast-text-primary font-mono">
            Key Features
          </h2>
          <ul className="text-sm text-devroast-text-secondary space-y-1">
            <li>• TypeScript/JavaScript syntax highlighting</li>
            <li>• Tab key support for indentation</li>
            <li>• Adaptive height with scrolling</li>
            <li>• Mobile-responsive design</li>
            <li>• Pixel-perfect match to Pencil design</li>
            <li>• Real-time highlighting as you type</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
