import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search) // -> useRef doesn't trigger a re-render when its value changes

  // useCallback is used to memoize the function so that it is only recreated when the dependencies change
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // useMemo is used to memoize the result of the function so that it is only recalculated when the dependencies change
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
