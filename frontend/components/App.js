import React, { useState, useEffect, useCallback } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import Articles from './Articles';
import LoginForm from './LoginForm';
import Message from './Message';
import ArticleForm from './ArticleForm';
import Spinner from './Spinner';

export default function App() {
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)
  const [currentArticle, setCurrentArticle] = useState(null);

  const navigate = useNavigate();
  const redirectToLogin = () => navigate('/');
  const redirectToArticles = () => navigate('/articles');

  const logout = () => {
    localStorage.removeItem('token');
    setMessage('Goodbye!');
    redirectToLogin();
  };

  useEffect(() => {
    if (currentArticleId != null) {
      const article = articles.find(art => art.article_id === currentArticleId);
      setCurrentArticle(article);
    } else {
      setCurrentArticle(null);
    }
  }, [currentArticleId, articles]);

  const login = async ({ username, password }) => {
    setMessage(null);
    setSpinnerOn(true);
  
    try {
      const response = await axiosWithAuth.post('/login', {
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

  const getArticles = useCallback(async () => {
  setSpinnerOn(true);
  setMessage('');

  try {
    const response = await axiosWithAuth.get('/articles');
    if (response.data.articles && Array.isArray(response.data.articles)) {
      setArticles(response.data.articles);
      setMessage('Successfully retrieved articles!');
    } else {
      console.error('Invalid data type received:', response.data);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setMessage('Session expired. Please login again.');
      redirectToLogin();
    } else {
      setMessage('Error retrieving articles.');
    }
  }    

  setSpinnerOn(false);
}, []);
  
const postArticle = async (article) => {
  setSpinnerOn(true);
  setMessage('');

  try {
    const response = await axiosWithAuth.post('/articles', article);
    setMessage('Successfully posted new article!');
    await getArticles();
  } catch (error) {
    setMessage('Error posting new article.');
  }

  setSpinnerOn(false);
  return Promise.resolve();
};

const updateArticle = async ({ article_id, article }) => {
  setSpinnerOn(true);
  setMessage('');

  try {
    const response = await axiosWithAuth.put(`/articles/${article_id}`, article);
    setMessage('Successfully updated article!');
    await getArticles();
  } catch (error) {
    setMessage('Error updating article.');
  }

  setSpinnerOn(false);
  return Promise.resolve(); 
};

  
const deleteArticle = async (article_id) => {
  setSpinnerOn(true);
  setMessage('');

  try {
    await axiosWithAuth.delete(`/articles/${article_id}`);
    setMessage('Successfully deleted article!');
    await getArticles();
  } catch (error) {
    setMessage('Error deleting article.');
  }

  setSpinnerOn(false);
};  

  return (
    <React.StrictMode>
    <div>
      <div id="message">
        {message && <Message message={message} />}
      </div>
      <button id="logout" onClick={logout}>
        Logout from app
      </button>
      <div id="wrapper" style={{ opacity: spinnerOn ? '0.25' : '1' }}>
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink to="/" id="loginScreen" end>
            Login
          </NavLink>{' '}
          <NavLink to="/articles" id="articlesScreen">
            Articles
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" 
          element={<LoginForm login={login} 
          />
        } 
          />
          <Route
              path="/articles"
              element={
          <>
            <ArticleForm
                postArticle={postArticle}
                updateArticle={updateArticle}
                setCurrentArticleId={setCurrentArticleId}
                currentArticle={
                    Array.isArray(articles) 
                        ? articles.find((a) => a.article_id === currentArticleId) 
                        : undefined
                }
            />
            <Articles
                articles={articles}
                getArticles={getArticles}
                deleteArticle={deleteArticle}
                setCurrentArticleId={setCurrentArticleId}
                currentArticleId={currentArticleId}
            />
          </>
        }
          />

        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
        <Spinner on={spinnerOn} />
      </div>
    </div>
    </React.StrictMode>
  );}  
