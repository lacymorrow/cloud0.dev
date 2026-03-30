"use client";

interface FileTreeMDXProps {
  files?: { path: string; type?: string }[];
  children?: React.ReactNode;
}

export function FileTree({ files, children }: FileTreeMDXProps) {
  if (!files || !Array.isArray(files)) {
    return <div className="font-mono text-sm">{children}</div>;
  }

  return (
    <div className="rounded-md border bg-muted/50 p-4 font-mono text-sm">
      {files.map((file) => (
        <div key={file.path} className="flex items-center gap-2 py-0.5">
          <span>{file.type === "file" ? "📄" : "📁"}</span>
          <span>{file.path}</span>
        </div>
      ))}
    </div>
  );
}
