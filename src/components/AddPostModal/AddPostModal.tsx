import React, { useState } from 'react';
import {
    Button,
    Modal,
    TextField,
    TextareaAutosize,
} from '@mui/material';
import { NewPost } from '../../app/slices/postSlice';

import './AddPostModal.css';


type Props = {
    "open": boolean,
    "onClose": () => void,
    "onSubmit": (post: NewPost) => void
}

const AddPostModal = ({ open, onClose, onSubmit }: Props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = () => {
        onSubmit({ title, body });
        setTitle('');
        setBody('');
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setTitle('');
                setBody('');
                onClose()
            }}
        >
            <div className='paper'>
                <h2>Add Post</h2>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextareaAutosize
                    placeholder="Body"
                    value={body}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                    style={{ width: '100%' }}
                    className='textArea'
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleSubmit();
                        setTitle('');
                        setBody('');
                    }}
                    disabled={!title || !body}
                    style={{ marginTop: 16 }}
                >
                    Submit
                </Button>
            </div>
        </Modal >
    );
};

export default AddPostModal;