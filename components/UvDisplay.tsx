// app/components/UvDisplay.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchUvData } from "@/lib/api";
import { UvEntry } from "@/lib/type";

export default function UvDisplay() {
  const [entries, setEntries] = useState<UvEntry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUvData("Rouen");
      setEntries(data?.entries || null);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p>Chargement des données UV...</p>;
  if (!entries || entries.length === 0) return <p>Aucune donnée trouvée.</p>;

  return (
    <div>
      <h2>Prévisions UV - Rouen</h2>
      <ul>
        {entries.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.date}</strong> : UV {entry.uv} ({entry.libcarte})
          </li>
        ))}
      </ul>
    </div>
  );
}
