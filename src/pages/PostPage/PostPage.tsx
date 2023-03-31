import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography, Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { fetchPosts, NewPost, updatePost } from '../../app/slices/postSlice';
import { fetchPostComments } from '../../app/slices/commentSlice';

import UpdatePostModal from '../../components/AddPostModal/UpdatePostModal';

import home from '../../images/home.png';

import './PostPage.css';
import CreateCommentForm from '../../components/CreateCommentForm/CreateCommentForm';
import CommentCard from '../../components/CommentCard/CommentCard';

const PostPage = () => {

    const dispatch = useAppDispatch();
    const { id } = useParams();

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchPostComments(Number(id)));
        dispatch(fetchPosts());
    }, [dispatch, id])

    const post = useAppSelector(state => state.posts.list).filter(post => post.id === Number(id))[0];
    const comments = useAppSelector(state => state.comments.list);
    const loading = useAppSelector(state => state.posts.loading);

    const onOpenModal = useCallback(() => {
        setIsUpdating(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsUpdating(false);
    }, []);

    const onUpdatePost = useCallback((id: number, updatedPost: NewPost) => {
        dispatch(updatePost({ id, updatedPost }));
        console.log(updatePost);
        setIsUpdating(false);
    }, [dispatch]);

    return (
        <div className='home-page'>
            {loading ?
                <Typography variant="h2" component="div" sx={{
                    fontWeight: '700', fontSize: '30px',
                    height: '50px', display: 'flex', justifyContent: 'center', width: '100%'
                }}>
                    Loading...
                </Typography> :
                post ?
                    <>
                        <div className='post-info' style={{ paddingTop: '0px' }}>
                            <div className='post-section'>
                                <div style={{ width: '100%' }}>
                                    <Link sx={{ boxSizing: 'border-box' }} href='/' className='home-image'>
                                        <img src={home} alt='' />
                                    </Link>
                                    <Typography variant="h2" component="div" sx={{
                                        fontWeight: '700', fontSize: '30px',
                                        height: '50px', display: 'flex', justifyContent: 'center', width: '100%'
                                    }}>
                                        {post ? post.title : 'Loading...'}
                                    </Typography>
                                </div>
                                <Typography color="black" component='div' sx={{
                                    display: 'flex', alignItems: 'center', textAlign: 'left', width: '100%',
                                    fontSize: '22px'
                                }}>
                                    {post ? post.body : ''}
                                </Typography>
                            </div>
                            <div style={{
                                width: '100%', display: 'flex', justifyContent: 'flex-start',
                                boxSizing: 'border-box', padding: '0 30px', marginTop: '-20px'
                            }}>
                                <Button onClick={onOpenModal} variant="contained" sx={{
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    backgroundColor: 'blue',
                                    width: 'fit-content',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'darkblue'
                                    }
                                }}>Update Post</Button>
                            </div>
                            {post ?
                                <UpdatePostModal
                                    open={isUpdating}
                                    onClose={onCloseModal}
                                    onSubmit={onUpdatePost}
                                    id={Number(id)}
                                    prevTitle={post.title}
                                    prevBody={post.body}
                                /> :
                                null
                            }
                        </div>
                        <hr style={{ backgroundColor: 'black', height: '2px', width: '100%' }}></hr>
                        <div className="comment-info">
                            <Typography variant="h2" component="div" sx={{
                                fontWeight: '700', fontSize: '30px',
                                display: 'flex', justifyContent: 'flex-start', width: '100%'
                            }}>
                                Comments
                            </Typography>
                            <div className='create-comment'>
                                <div className='create-comment__inputs'>
                                    <CreateCommentForm postId={Number(id)} />
                                </div>
                            </div>
                            <div className='comment-list'>
                                {comments ? comments.map(comment =>
                                    <CommentCard
                                        nickname={comment.name}
                                        body={comment.body}
                                        email={comment.email}
                                        key={comment.id} />) :
                                    null}
                            </div>
                        </div>
                    </> :
                    <div style={{ width: '100%' }}>
                        <Link sx={{ boxSizing: 'border-box' }} href='/' className='home-image'>
                            <img src={home} alt='' />
                        </Link>
                        <Typography variant="h2" component="div" sx={{
                            fontWeight: '700', fontSize: '30px',
                            height: '50px', display: 'flex', justifyContent: 'center', width: '100%'
                        }}>
                            Unknown page
                        </Typography>
                    </div>
            }
        </div>
    )
}

export default PostPage