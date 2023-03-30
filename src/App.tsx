import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchPosts, createPost, updatePost, deletePost } from './app/slices/postSlice';
import { fetchPostComments } from "./app/slices/commentSlice";

import './App.css';

const App = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchPostComments(3));
  }, [dispatch])


  return (
    <div className="App">
    </div>
  );
}

export default App;
