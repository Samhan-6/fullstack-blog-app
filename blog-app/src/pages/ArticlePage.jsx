import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import articles from "./article-content"
import axios from 'axios'
import NotFoundPage from "./NotFoundPage"
import CommentsList from "../components/CommentsList"
import AddCommentForm from "../components/AddCommentForm"
import useUser from "../hooks/useUser"

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
    const {canUpvote} = articleInfo
    const { articleId } = useParams();

    const {user, isLoading} = useUser()

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken()
            const headers = token ? {authtoken: token} : {}
            const response = await axios.get(`/api/articles/${articleId}`, {headers})
            const newArticleInfo = response.data
            setArticleInfo(newArticleInfo)
        }

        if(!isLoading) {
            loadArticleInfo()
        } 

    }, [isLoading, user])

    const article = articles.find(myArticle => myArticle.name === articleId)

    const addUpvote = async () => {
        const token = user && await user.getIdToken()
        const headers = token ? {authtoken: token} : {}
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers})
        const updatedArticle = response.data
        setArticleInfo(updatedArticle)
    }

    if(!article) {
        return <NotFoundPage />
    }

    return(
        <>
            <h1>{article.title}</h1>

            <div className="upvotes-section">
                {user
                    ?<button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
                    :<button>Please Login to upvote</button>
                }
                <p>This articles has {articleInfo.upvotes} upvote(s)</p>
            </div>

            {/* article contents goes here */}
            {
                article.content.map((paragraph, id) => {
                    return(
                        <p key={id}>{paragraph}</p>
                    )
                })
            }

            {/* comment form */}
            {user
                ?<AddCommentForm 
                    articleName={articleId}
                    onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
                :<button>Please login to see comments</button>
            }

            {/* Comments section */}
            <CommentsList comments={articleInfo.comments}/>
        </>
    )
}

export default ArticlePage