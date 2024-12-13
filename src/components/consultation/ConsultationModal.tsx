import { X } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';
import { Button } from '../ui/Button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative w-full max-w-2xl bg-black border border-blue-500/20 rounded-lg shadow-xl">
          {/* Close button outside the form for better visibility */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 bg-black border border-blue-500/20 rounded-full text-blue-400 hover:text-blue-300 transition-colors shadow-lg hover:shadow-blue-500/20"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6 border-b border-blue-500/20">
            <h2 className="text-2xl font-semibold text-white">Solicitar Consultoria</h2>
            <p className="mt-2 text-blue-200">
              Conte-nos sobre seu projeto e entraremos em contato para discutir as melhores soluções.
            </p>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <ConsultationForm onSuccess={onClose} />
          </div>

          <div className="p-6 border-t border-blue-500/20 bg-black/60">
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}