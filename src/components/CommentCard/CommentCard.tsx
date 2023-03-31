import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

import './CommentCard.css';

interface Props {
    nickname: string;
    email: string;
    body: string;
}

const CommentCard = ({ nickname, email, body }: Props) => {

    return (
        <Box className='comment__root'>
            <Avatar className='comment__avatar'>{nickname[0].toUpperCase()}</Avatar>
            <Box className='comment__content'>
                <Typography variant="subtitle1" component="span">
                    {nickname}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="span">
                    {email}
                </Typography>
                <Typography variant="body1" component="p">
                    {body}
                </Typography>
            </Box>
        </Box>
    );
};

export default CommentCard;