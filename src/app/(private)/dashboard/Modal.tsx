"use client"

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-4 shadow-xl dark:bg-gray-900">
        {children}
      </div>
    </div>
  )
}