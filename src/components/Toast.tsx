import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastData {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92vw] sm:w-auto shadow-2xl rounded-2xl pointer-events-auto"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl text-sm font-medium border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-gray-900/95 text-white border-emerald-500/50 shadow-emerald-950/20'
                : toast.type === 'warning'
                ? 'bg-gray-900/95 text-white border-amber-500/50 shadow-amber-950/20'
                : toast.type === 'error'
                ? 'bg-gray-900/95 text-white border-rose-500/50 shadow-rose-950/20'
                : 'bg-gray-900/95 text-white border-blue-500/50 shadow-blue-950/20'
            }`}
          >
            <div className="shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <p className="text-xs sm:text-sm font-semibold leading-snug flex-1 pr-1">
              {toast.message}
            </p>

            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss();
                }}
                className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-xs cursor-pointer"
              >
                {toast.action.label}
              </button>
            )}

            <button
              onClick={onDismiss}
              className="shrink-0 text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
