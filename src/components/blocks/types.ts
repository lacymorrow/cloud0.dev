export interface File {
  id: string
  name: string
  language: string
  content: string
}

export interface TabProps {
  file: File
  isActive: boolean
  onClick: () => void
}

export interface EditorTabsProps {
  files: File[]
  activeFile: string
  onSelectFile: (fileId: string) => void
}

export interface CodePanelProps {
  content: string
  language: string
  fileName: string
}

export interface ExplanationPanelProps {
  fileName: string
  content: string
}

export interface LineNumbersProps {
  count: number
}

export interface SyntaxHighlightedCodeProps {
  code: string
  language: string
}
