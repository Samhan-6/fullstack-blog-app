import axios from "axios"
import { useState } from "react"
import useUser from "../hooks/useUser"

const AddCommentForm = ({articleName, onArticleUpdated}) => {

    const [name, setName] = useState('')
    const [commentText, setCommentText] = useState('')
    const { user } = useUser()

    // creating a function which will submit the form
    const addComment = async () => {
        const token = user && await user.getIdToken()
        const headers = token ? {authtoken: token} : {}
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        }, {headers})

        const updatedArticle = response.data
        onArticleUpdated(updatedArticle)

        // we need to reset name, commentText to empty string
        setName('')
        setCommentText('')

    }

    return(
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {user && <p>You are posting as {user.email}</p>}

            <textarea 
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                cols="30" 
                rows="5" 
            />

            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm