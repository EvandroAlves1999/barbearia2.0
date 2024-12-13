import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAdmin } from '../../contexts/AdminContext';
import { ProductModal } from './ProductModal';

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

interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (product: Product) => void;
}

export function ProductDetails({ product, isOpen, onClose, onEdit }: ProductDetailsProps) {
  const { isAdmin } = useAdmin();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [product.image, ...(product.additionalImages || [])];

  if (!isOpen) return null;

  const handleEdit = (updatedProduct: Omit<Product, 'id'>) => {
    onEdit?.({ ...updatedProduct, id: product.id });
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
          <div className="bg-black border border-blue-500/20 rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
              <h2 className="text-xl font-semibold text-white">{product.name}</h2>
              <button
                onClick={onClose}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={allImages[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 ${
                            currentImageIndex === index
                              ? 'border-blue-500'
                              : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} - Imagem ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      R$ {product.price.toFixed(2)}
                    </h3>
                    <p className="text-blue-100">{product.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-blue-300 mb-1">
                      Categoria
                    </h4>
                    <p className="text-white">{product.category}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-blue-300 mb-1">
                      Estoque
                    </h4>
                    <p className="text-white">{product.stock} unidades</p>
                  </div>

                  {isAdmin && (
                    <Button
                      variant="neon"
                      onClick={() => setIsEditModalOpen(true)}
                      fullWidth
                    >
                      Editar Produto
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAdmin && (
        <ProductModal
          product={product}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEdit}
        />
      )}
    </>
  );
}