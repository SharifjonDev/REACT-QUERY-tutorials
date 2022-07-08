import { useEffect, useState } from "react";
import axios from "axios";

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<[]>([]);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/seperheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [error]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2>SuperHeroesPage</h2>
      {data.map((hero: { id: number; name: string; alterEgo: string }) => {
        return (
          <div key={hero.id} style={{ display: "flex" }}>
            <h3 style={{ paddingRight: "10px" }}>{hero.name}</h3>
            <h3>{hero.alterEgo}</h3>
          </div>
        );
      })}
    </div>
  );
};
