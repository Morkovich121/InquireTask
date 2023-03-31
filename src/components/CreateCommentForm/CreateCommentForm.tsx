import React, { useCallback, useState } from 'react';

import { Button, TextField, TextareaAutosize } from '@mui/material';

import './CreateCommentForm.css';
import { useAppDispatch } from '../../app/hooks';
import { createComment } from '../../app/slices/commentSlice';

type Props = {
    "postId": number
}

const CreateCommentForm = ({ postId }: Props) => {

    const dispatch = useAppDispatch();

    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setNickname('');
        setEmail('');
        setComment('');
        dispatch(createComment({ postId: postId, name: nickname, email: email, body: comment }))
    };

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (e.target.value.indexOf('@') > 0 && e.target.value.lastIndexOf('.') > e.target.value.lastIndexOf('@') + 1 && e.target.value[e.target.value.length - 1] !== '.') {
            setIsValidEmail(true);
        }
        else {
            setIsValidEmail(false);
        }
    }, [])

    return (
        <form className='form' onSubmit={handleSubmit}>
            <TextField
                required
                label="Nickname"
                variant="outlined"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
            />
            <TextField
                required
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={onEmailChange}
            />
            {!isValidEmail && email.length > 0 ? <span style={{ color: 'red' }}>Email must be valid</span> : null}
            <TextareaAutosize
                className='comment-textarea'
                required
                aria-label="Comment"
                placeholder="Write your comment here"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                disabled={!comment || !isValidEmail || !nickname}
                sx={{
                    fontSize: '12px',
                    fontWeight: '700',
                    backgroundColor: 'green',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'darkgreen'
                    }
                }}>
                Submit
            </Button>
        </form>
    )
}

export default CreateCommentForm