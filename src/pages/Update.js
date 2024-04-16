import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !author || !rating) {
      setFormError("Please fill in all the fields correctly")
      return
    }

    const { data, error} = await supabase
    .from('posts')
    .update({title, author, rating})
    .eq('id', id)
    .select()

    if(error){
      console.log(error)
      setFormError('Please fill in all the fields correctly')
    }
    if(data){
      console.log(data)
      setFormError(null)
      navigate('/')
    }

  }

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setAuthor(data.author)
        setRating(data.rating)
        console.log()
      }
    }
    fetchPost()
  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="author">Author:</label>
        <textarea
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update