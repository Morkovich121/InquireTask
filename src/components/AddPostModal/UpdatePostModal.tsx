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
    "onSubmit": (id: number, updatedPost: NewPost) => void,
    "id": number,
    "prevTitle": string,
    "prevBody": string
}

const UpdatePostModal = ({ open, onClose, onSubmit, id, prevTitle, prevBody }: Props) => {
    const [title, setTitle] = useState(prevTitle);
    const [body, setBody] = useState(prevBody);

    const handleSubmit = () => {
        onSubmit(id, { title, body });
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                onClose()
            }}
        >
            <div className='paper'>
                <h2>Update Post</h2>
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
                    style={{
                        width: '100%', overflow: "auto", boxSizing: 'border-box'
                    }}
                    className='textArea'
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleSubmit();
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

export default UpdatePostModal;