import { collection, query } from "firebase/firestore";
import store from "../firebase/store";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./Movies.css";

interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  mainActor: string;
  description: string;
}

const movieCollection = collection(store, "movies").withConverter<Movie>({
  toFirestore(movie) {
    return movie;
  },
  fromFirestore(snap, options): Movie {
    const data = snap.data(options) as Omit<Movie, "id">;
    return {
      id: snap.id,
      ...data
    }
  }
})

const movieQuery = query(movieCollection);

function useMoviesCollection() {
  const [values, loading] = useCollectionData(movieQuery);
  return [values, loading] as const;
}

export default function Movies() {
  const [values, loading] = useMoviesCollection();

  if (loading) {
    return <div className="loading" />;
  }

  return (
    <div className="movies-page">
      <main>
        <header>
          <h1>Movies</h1>
        </header>
        <section>
          {values?.map((movie, index) => (
            <article key={index}>
              <header>
                <h2>{movie.title}</h2>
              </header>
              <p>{movie.description}</p>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Main Actor</th>
                    <th>Director</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.mainActor}</td>
                    <td>{movie.director}</td>
                  </tr>
                </tbody>
              </table>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
