import { UvApiResponse, UvEntry } from "./type";



  
  export async function fetchUvData(
    ville: string,
    pageSize = 3,
    tri = '-date'
  ): Promise<UvApiResponse | null> {
    try {
      const res = await fetch(
        `/api/soleil?ville=${encodeURIComponent(ville)}&page_size=${pageSize}&tri=${tri}`
      );
  
      if (!res.ok) {
        console.error('Erreur API Soleil:', res.statusText);
        return null;
      }
  
      const data: UvApiResponse = await res.json();
      return data;
    } catch (err) {
      console.error('Erreur réseau API Soleil:', err);
      return null;
    }
  }
  