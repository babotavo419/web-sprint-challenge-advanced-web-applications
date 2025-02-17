import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles({ articles, getArticles, deleteArticle, setCurrentArticleId, setCurrentArticle, currentArticleId, username }) {
  const token = window.localStorage.getItem('token');
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const handleEdit = (article_id) => {
    setCurrentArticleId(article_id);

    const currentArticle = articles.find((article) => article.article_id === article_id);
    setCurrentArticle(currentArticle);
  }  
  
  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="articles">
      <h2>Articles</h2>
      {
        !articles.length
          ? 'No articles yet'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button
                    type="button" 
                    disabled={currentArticleId === art.article_id} 
                    onClick={() => handleEdit(art.article_id)}>Edit
                  </button>
                  <button 
                    type="button"
                    disabled={currentArticleId === art.article_id} 
                    onClick={() => deleteArticle(art.article_id, art.title)}>Delete
                  </button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
