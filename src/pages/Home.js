import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

// components
import PostCard from "../components/PostCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [posts, setPosts] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setPosts(prevPosts => {
      return prevPosts.filter(po => po.id !== id)
    })
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .order(orderBy, {ascending: false})

      if (error) {
        setFetchError('Could not fetch posts')
        setPosts(null)
        console.log(error)
      }
      if (data) {
        setPosts(data)
        setFetchError(null)
      }
    }

    fetchPosts()

  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {posts && (
        <div className="posts">
          <div className="order-by">
            <p>Order by: </p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('author')}>Author</button>
            {orderBy}
            </div>
          <div className="post-grid">
            {posts.map(post => (
              <PostCard 
              key={post.id} 
              post={post} 
              onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home