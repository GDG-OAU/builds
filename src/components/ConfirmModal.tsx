import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, LogOut, Trash2, X } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  icon?: 'logout' | 'delete' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  icon = 'warning',
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          {/* Backdrop dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onCancel}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-100 z-10 space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    variant === 'danger'
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : variant === 'warning'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-blue-50 text-gdg-blue border border-blue-200'
                  }`}
                >
                  {icon === 'logout' && <LogOut className="w-5 h-5" />}
                  {icon === 'delete' && <Trash2 className="w-5 h-5" />}
                  {icon === 'warning' && <AlertTriangle className="w-5 h-5" />}
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Please confirm before proceeding
                  </p>
                </div>
              </div>

              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              {message}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onCancel();
                }}
                style={
                  variant === 'danger'
                    ? { backgroundColor: '#EA4335', color: '#FFFFFF' }
                    : variant === 'warning'
                    ? { backgroundColor: '#D97706', color: '#FFFFFF' }
                    : { backgroundColor: '#188038', color: '#FFFFFF' }
                }
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer ${
                  variant === 'danger'
                    ? 'bg-gdg-red hover:bg-red-700 text-white'
                    : variant === 'warning'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-gdg-green hover:bg-emerald-700 text-white'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
