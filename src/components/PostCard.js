import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

const PostCard = ({ post, onDelete }) => {

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', post.id)
            .select()

        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
            onDelete(post.id)
        }

    }

    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>{post.author}</p>
            <div className="rating">{post.rating}</div>
            <div className="buttons">
                <Link to={'/' + post.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default PostCard