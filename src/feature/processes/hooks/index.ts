import { useState, useEffect, useCallback } from "react";
import { fetchApi } from "../api/client";
import { TceProcess, TjpbProcess, ProcessDetail, Movement } from "../types";

export function useTceProcesses() {
  const [data, setData] = useState<TceProcess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchApi<TceProcess[]>("/processes/tce");
      setData(response);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Executa em um microtask para evitar chamadas síncronas de setState dentro do Effect
    queueMicrotask(() => {
      fetchData();
    });
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
}

export function useTjpbProcesses() {
  const [data, setData] = useState<TjpbProcess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchApi<TjpbProcess[]>("/processes/tjpb");
      setData(response);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchData();
    });
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
}

export function useProcessDetail(id: string) {
  const [data, setData] = useState<ProcessDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchApi<ProcessDetail>(`/processes/${id}`);
      setData(response);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    queueMicrotask(() => {
      fetchData();
    });
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
}

export function useProcessMovements(id: string) {
  const [data, setData] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchApi<Movement[]>(`/processes/${id}/movements`);
      setData(response);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    queueMicrotask(() => {
      fetchData();
    });
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
}
