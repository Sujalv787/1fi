import { useCallback, useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import type { LoadingState, Product } from '../types';

interface UseProductDetailReturn {
  product: Product | null;
  loadingState: LoadingState;
  error: string | null;
  retry: () => void;
}

export function useProductDetail(id: string): UseProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoadingState('loading');
    setError(null);
    try {
      const response = await getProductById(id);
      setProduct(response.product);
      setLoadingState('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load product details';
      setError(message);
      setLoadingState('error');
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loadingState, error, retry: fetchProduct };
}
