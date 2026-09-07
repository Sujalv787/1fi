import { useCallback, useEffect, useState } from 'react';
import { getEmiPlans } from '../services/api';
import type { EmiPlan, LoadingState } from '../types';

interface UseEmiPlansReturn {
  plans: EmiPlan[];
  loadingState: LoadingState;
  error: string | null;
  selectedPlan: EmiPlan | null;
  selectPlan: (plan: EmiPlan) => void;
  retry: () => void;
}

export function useEmiPlans(price: number): UseEmiPlansReturn {
  const [plans, setPlans] = useState<EmiPlan[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);

  const fetchPlans = useCallback(async () => {
    if (price <= 0) return;
    setLoadingState('loading');
    setError(null);
    try {
      const response = await getEmiPlans(price);
      setPlans(response.plans);
      // Auto-select the 6-month plan (most popular) on load
      const defaultPlan = response.plans.find((p) => p.tenureMonths === 6) ?? response.plans[0];
      setSelectedPlan(defaultPlan ?? null);
      setLoadingState('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load EMI plans';
      setError(message);
      setLoadingState('error');
    }
  }, [price]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    loadingState,
    error,
    selectedPlan,
    selectPlan: setSelectedPlan,
    retry: fetchPlans,
  };
}
