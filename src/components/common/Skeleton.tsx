import React from "react";

/**
 * Bloco de carregamento. Substitui o antigo "Loading..." com a logo gigante
 * (que usava classes inexistentes, como `w-100`, e por isso ocupava a tela).
 */
const Skeleton: React.FC<{ rows?: number; className?: string }> = ({
  rows = 3,
  className = "",
}) => (
  <div
    className={`animate-pulse space-y-3 ${className}`}
    role="status"
    aria-label="Loading"
  >
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <div className="h-3.5 w-1/3 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="mt-3 h-3 w-2/3 rounded-full bg-gray-100 dark:bg-gray-800" />
      </div>
    ))}
  </div>
);

export default Skeleton;
