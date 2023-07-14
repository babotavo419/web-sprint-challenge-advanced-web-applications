import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles({ articles, getArticles, deleteArticle, setCurrentArticleId, currentArticleId }) {
  // Check if token exists
  const token = window.localStorage.getItem('token');

  // Fetch articles on first render
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const handleEdit = (article_id) => {
    setCurrentArticleId(article_id);
    setCurrentArticleId(null);
    setCurrentArticle(null);
  }

  const handleDelete = (article_id) => {
    deleteArticle(article_id);
  }

  if (!token) {
    // Navigate to login if no token exists
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
                    disabled={currentArticleId === art.article_id} 
                    onClick={() => handleEdit(art.article_id)}>Edit
                  </button>
                  <button 
                    disabled={currentArticleId === art.article_id} 
                    onClick={() => handleDelete(art.article_id)}>Delete
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
