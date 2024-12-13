import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  additionalImages?: string[];
}

interface ProductModalProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
}

export function ProductModal({ product, isOpen, onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: product?.name || '',
    price: product?.price || 0,
    description: product?.description || '',
    image: product?.image || '',
    category: product?.category || '',
    stock: product?.stock || 0,
    additionalImages: product?.additionalImages || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <div className="bg-black border border-blue-500/20 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
            <h2 className="text-xl font-semibold text-white">
              {product ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            <button
              onClick={onClose}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Nome
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Preço
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
                required
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                URL da Imagem Principal
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                URLs das Imagens Adicionais (uma por linha)
              </label>
              <textarea
                value={formData.additionalImages?.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  additionalImages: e.target.value.split('\n').filter(url => url.trim())
                })}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Categoria
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Estoque
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
                required
                min="0"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="neon" type="submit">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}