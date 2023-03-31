import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './app/hooks';
import { fetchPosts } from './app/slices/postSlice';

import HomePage from "./pages/HomePage/HomePage";
import PostPage from "./pages/PostPage/PostPage";

import './App.css';

const App = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/post/:id' element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
