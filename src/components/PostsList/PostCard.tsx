import React, { useCallback } from 'react'
import { Card, CardContent, Typography, Button, Link } from "@mui/material";

import { deletePost, fetchPosts, Post } from '../../app/slices/postSlice';
import rightArrow from '../../images/rightArrow.png';

import './PostsList.css';
import { useAppDispatch } from '../../app/hooks';

type Props = {
    post: Post;
};

const PostCard = ({ post }: Props) => {

    const dispatch = useAppDispatch();

    const removePost = useCallback(() => {
        dispatch(deletePost(post.id));
        dispatch(fetchPosts());
    }, [dispatch, post.id])

    return (
        <Card className='post-card' key={post.id}>
            <CardContent className='post-card__content'>
                <Typography variant="h5" component="div" sx={{
                    fontWeight: '700', fontSize: '20px',
                    height: '100px', display: 'flex', alignItems: 'center'
                }}>
                    {post.title}
                </Typography>
                <Typography color="textSecondary" component='div' sx={{
                    display: 'flex', alignItems: 'center', textAlign: 'left'
                }}>
                    {post.body.substring(0, 130)}...
                </Typography>
                <div className="card-menu">
                    <Button onClick={removePost} variant="contained" sx={{
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: '#ff1744',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#d50000'
                        },
                    }}>
                        Delete
                    </Button>
                    <span className='link'>
                        <Link className='link' sx={{
                            textDecoration: 'none',
                            color: 'black',
                        }} href={`/post/${post.id}`}>Read more <img src={rightArrow} alt="" className='linkArrow' /></Link>
                    </span>
                </div>
            </CardContent>
        </Card >
    )
}

export default PostCard