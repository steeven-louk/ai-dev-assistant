"use client"

import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  className?: string
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = "typescript", 
  placeholder,
  className 
}: CodeEditorProps) {
  const lineCount = value.split("\n").length

  return (
    <div className={cn("relative flex min-h-full bg-zinc-950/50 font-mono text-sm", className)}>
      {/* Line Numbers */}
      <div 
        className="flex flex-col items-end pr-4 py-6 text-zinc-600 bg-zinc-900/30 select-none border-r border-border/50 min-w-12"
        aria-hidden="true"
      >
        {Array.from({ length: Math.max(lineCount, 1) }).map((_, i) => (
          <div key={i} className="leading-6 h-6">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={code => Prism.highlight(code, Prism.languages[language] || Prism.languages.typescript, language)}
          padding={24}
          placeholder={placeholder}
          className="min-h-full outline-none"
          textareaClassName="focus:outline-none"
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            lineHeight: "1.5rem",
          }}
        />
      </div>
    </div>
  )
}