type StatusBadgeProps = {
  online: boolean
}

/**
 * Estado da conexão. Antes, quando o dispositivo estava online, era exibido
 * apenas um ponto colorido sem texto (e sem rótulo acessível); agora o estado
 * é sempre legível e anunciado.
 */
export function StatusBadge({ online }: StatusBadgeProps) {
  return (
    <span
      role="status"
      aria-label={online ? "Device online" : "Device offline"}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        online
          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          online ? "animate-pulse bg-green-500" : "bg-red-500"
        }`}
      />
      {online ? "ONLINE" : "OFFLINE"}
    </span>
  );
}
