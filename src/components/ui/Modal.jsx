import Button from './Button'

export default function Modal({
  open,
  title,
  children,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {title && <h2 id="modal-title" className="mb-2 text-lg font-bold text-gray-900">{title}</h2>}
        <div className="mb-6 text-sm text-gray-600">{children}</div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant="primary" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}
