const API_KEY = 'e23ab74a'

export const searchMovies = async ({ search }) => {
  if (search === '') return null
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    )
    const json = await res.json()

    const movies = json.Search

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }))
  } catch (error) {
    throw new Error('Error searching movies')
  }
}
