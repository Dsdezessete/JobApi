import React, { createContext, useContext, useEffect, useState } from "react";
import { getVagas } from "../services/api/vagas";

export interface Vaga {
  id: string;
  title: string;
  description: string;
}

interface VagasContextType {
  vagas: Vaga[];
  fetchVagas: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export const VagasContext = createContext<VagasContextType>({
  vagas: [],
  fetchVagas: async () => {},
  isLoading: false,
  error: null,
});

export const useVagas = () => useContext(VagasContext);

export const VagasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchVagas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getVagas();
      setVagas(response.data);
    } catch (err) {
      const error = err instanceof Error 
        ? err 
        : new Error(String(err));
      
      console.error("Failed to fetch vagas:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  const contextValue: VagasContextType = {
    vagas,
    fetchVagas,
    isLoading,
    error,
  };

  return (
    <VagasContext.Provider value={contextValue}>
      {children}
    </VagasContext.Provider>
  );
};