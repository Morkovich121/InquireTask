import React from 'react';

import { Post } from '../../app/slices/postSlice';
import PostCard from './PostCard';

import './PostsList.css';

type Props = {
    posts: Post[];
};

const PostsList = ({ posts }: Props) => {
    return (
        <div className='post-list'>
            {posts.map(post => (
                <PostCard post={post} key={post.id} />
            ))}
        </div>
    );
};

export default PostsList;
