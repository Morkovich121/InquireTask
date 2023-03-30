import React, { useEffect } from "react";

import { useAppDispatch } from './app/hooks';
import { fetchPosts } from './app/slices/postSlice';

import HomePage from "./pages/HomePage/HomePage";

import './App.css';

const App = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])


  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
