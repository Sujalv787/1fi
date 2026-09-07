import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import type { Category, LoadingState, Product } from '../types';

interface UseProductsReturn {
  products: Product[];
  loadingState: LoadingState;
  error: string | null;
  retry: () => void;
}

export function useProducts(category: Category = 'all'): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoadingState('loading');
    setError(null);
    try {
      const response = await getProducts(category);
      setProducts(response.products);
      setLoadingState('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load products';
      setError(message);
      setLoadingState('error');
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loadingState, error, retry: fetchProducts };
}
