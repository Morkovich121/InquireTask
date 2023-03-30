import React, { useCallback, useState, useEffect } from 'react';

import { Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import useDebounce from '../../services/hooks';
import PostsList from '../../components/PostsList/PostsList';

import { Post } from '../../app/slices/postSlice';

import './HomePage.css';

const HomePage = () => {

    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce<string>(search, 500)

    const posts = useAppSelector(state => state.posts.list);
    const status = useAppSelector(state => state.posts.loading);
    const [filteredPost, setFilteredPost] = useState<Post[]>([]);

    const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, [])

    useEffect(() => {
        if (debouncedSearch !== '') {
            setFilteredPost(posts.filter(el => el.title.includes(debouncedSearch)));
        }
        else {
            setFilteredPost([]);
        }
    }, [debouncedSearch, posts])

    return (
        <div className='home-page'>
            <span className='blog-name'>My Blog</span>
            <div className='search-posts'>
                <input type='text' onChange={onSearchChange} placeholder='Search posts by title...'></input>
                <div className='found-posts'>
                    <span>Posts count:</span>
                    <span>{debouncedSearch.length > 0 ? filteredPost.length : posts.length}</span>
                </div>
            </div>
            {posts.length === 0 && !status ?
                <Typography variant="h3" component="h2">No posts yet</Typography> :
                posts.length === 0 && status ?
                    <Typography variant="h3" component="h2">Loading...</Typography> :
                    debouncedSearch !== '' && filteredPost.length === 0 ?
                        <Typography variant="h3" component="h2">No posts found</Typography> :
                        filteredPost.length > 0 ?
                            <PostsList posts={filteredPost} /> :
                            <PostsList posts={posts} />
            }

        </div>
    )
}

export default HomePage