import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/seperheroes");
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetched } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      enabled: true,
    }
  );

  console.log(isFetched);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{`${error}`}</h2>;
  }

  return (
    <div>
      <h2>RQSuperHeroesPage</h2>
      {data?.data.map(
        (hero: { id: number; name: string; alterEgo: string }) => {
          return (
            <div key={hero.id} style={{ display: "flex" }}>
              <h3 style={{ paddingRight: "20px" }}>{hero.name}</h3>
              <h3>{hero.alterEgo}</h3>
            </div>
          );
        }
      )}
    </div>
  );
};
