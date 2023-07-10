import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => navigate('/');
  const redirectToArticles = () => navigate('/articles');  

  const logout = () => {
    localStorage.removeItem('token');
    setMessage('Goodbye!');
    redirectToLogin();
  };

  const login = async ({ username, password }) => {
    setMessage(null);
    setSpinnerOn(true);

    try {
      const response = await axios.post(loginUrl, {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setMessage(response.data.message);
        setSpinnerOn(false);
        redirectToArticles();
      }
    } catch (error) {
      setMessage('Login failed');
      setSpinnerOn(false);
    }
  };

  const getArticles = async () => {
    setSpinnerOn(true);
    setMessage('');
    try {
      const response = await axiosWithAuth().get(articlesUrl);
      setArticles(response.data);
      setMessage('Successfully retrieved articles!');
    } catch (error) {
      if (error.response.status === 401) {
        setMessage('Session expired. Please login again.');
        redirectToLogin();
      } else {
        setMessage('Error retrieving articles.');
      }
    }
    setSpinnerOn(false);
  }
  const postArticle = async article => {
    setSpinnerOn(true);
    setMessage('');
    try {
      await axiosWithAuth().post(articlesUrl, article);
      setMessage('Successfully posted new article!');
      getArticles();
    } catch (error) {
      setMessage('Error posting new article.');
    }
    setSpinnerOn(false);
  }
  
  const updateArticle = async ({ article_id, article }) => {
    setSpinnerOn(true);
    setMessage('');
    try {
      await axiosWithAuth().put(`${articlesUrl}/${article_id}`, article);
      setMessage('Successfully updated article!');
      getArticles();
    } catch (error) {
      setMessage('Error updating article.');
    }
    setSpinnerOn(false);
  }
  
  const deleteArticle = async article_id => {
    setSpinnerOn(true);
    setMessage('');
    try {
      await axiosWithAuth().delete(`${articlesUrl}/${article_id}`);
      setMessage('Successfully deleted article!');
      getArticles();
    } catch (error) {
      setMessage('Error deleting article.');
    }
    setSpinnerOn(false);
  }  

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
    <Spinner on={spinnerOn} />
    <Message message={message} />
    <button id="logout" onClick={logout}>Logout from app</button>
    <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} />
        <Route path="articles" element={
      <>
        <ArticleForm postArticle={postArticle}
          updateArticle={updateArticle}
          setCurrentArticleId={setCurrentArticleId}
          currentArticle={articles.find(a => a.article_id === currentArticleId)} />
        <Articles articles={articles}
          getArticles={getArticles}
          deleteArticle={deleteArticle}
          setCurrentArticleId={setCurrentArticleId}
          currentArticleId={currentArticleId} />
        </>
          } />
      </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
