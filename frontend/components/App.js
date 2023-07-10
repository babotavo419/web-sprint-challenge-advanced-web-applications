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

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
    <Spinner spinnerOn={spinnerOn} />
    <Message message={message} />
    <button id="logout" onClick={logout}>Logout from app</button>
    <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
      {/* rest of JSX... */}
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} />
        <Route path="articles" element={
          <>
            <ArticleForm />
            <Articles />
          </>
        } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
