import ArticlesList from "../components/ArticlesList"
import articles from "./article-content"

export default function ArticleListsPage() {
    return(
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles} />
        </>
    )
}