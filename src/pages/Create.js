import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
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

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, author, rating }])
      .select()

      if(error){
        console.log(error)
        setFormError("Please fill in all the fields correctly")
      }
      if(data){
        console.log(data)
        setFormError(null)
        navigate('/')
      }

  }

  return (
    <div className="page create">
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

        <button>Create new post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create