import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type Comment = {
    "postId": number,
    "id": number,
    "name": string,
    "email": string,
    "body": string
}

type NewComment = {
    "postId": number,
    "name": string,
    "email": string,
    "body": string
}

type CommentState = {
    list: Comment[];
    loading: boolean;
    error: string | null;
}

export const fetchPostComments = createAsyncThunk<Comment[], number, { rejectValue: string }>(
    'comments/fetchPostComments',
    async function (id) {

        const response = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}?_embed=comments`);

        if (!response.ok) {
            throw new Error('Server Error!');
        }

        const data = await response.json();

        return data.comments;
    }
)

export const createComment = createAsyncThunk<Comment, NewComment, { rejectValue: string }>(
    'comments/createComment',
    async function (newComment) {

        try {
            const response = await fetch('https://blog-api-t6u0.onrender.com/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const createdComment = await response.json();

            return createdComment;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Server Error!');
            }
        }
    }
)
const initialState: CommentState = {
    list: [],
    loading: false,
    error: null,
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostComments.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostComments.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchPostComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error occurred while fetching comments.';
            })
            .addCase(createComment.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error occurred while creating comment.';
            })
    },
})

export default commentSlice.reducer