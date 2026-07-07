const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function fetchApi<T>(path: string): Promise<T> {
  // Garantir que a barra esteja correta
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${cleanPath}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erro ${response.status}: Falha ao buscar dados no endpoint ${cleanPath}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Erro ao fazer chamada para a API (${url}):`, error);
    throw error;
  }
}
