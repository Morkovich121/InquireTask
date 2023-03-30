import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const apiLink = 'https://blog-api-t6u0.onrender.com/posts'

export type Post = {
    "id": number,
    "title": string,
    "body": string
}

export type NewPost = {
    "title": string;
    "body": string;
};

type PostState = {
    list: Post[];
    loading: boolean;
    error: string | null;
}

export const fetchPosts = createAsyncThunk<Post[], undefined, { rejectValue: string }>(
    'posts/fetchPosts',
    async function () {

        const response = await fetch(apiLink);

        if (!response.ok) {
            throw new Error('Server Error!');
        }

        const data = await response.json();

        return data;
    }
)

export const createPost = createAsyncThunk<Post, NewPost, { rejectValue: string }>(
    'posts/createPost',
    async function (newPost) {
        try {
            const response = await fetch(apiLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const createdPost = await response.json();

            return createdPost;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Server Error!');
            }
        }
    }
);

export const putPost = async (id: number, updatedPost: NewPost) => {
    const response = await fetch(`${apiLink}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
        throw new Error('Server Error!');
    }

    const data = await response.json();

    return data;
};

export const updatePost = createAsyncThunk<Post, { id: number, updatedPost: NewPost }, { rejectValue: string }>(
    'posts/updatePost',
    async function ({ id, updatedPost }, { rejectWithValue }) {
        try {
            const response = await putPost(id, updatedPost);
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const deletePost = createAsyncThunk<number, number, { rejectValue: string }>(
    'posts/deletePost',
    async function (id: number) {
        const response = await fetch(`${apiLink}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Server Error!');
        }
        return id;
    }
);

const initialState: PostState = {
    list: [],
    loading: false,
    error: null,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error occurred while fetching posts.';
            })
            .addCase(createPost.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error occurred while creating a post.';
            })
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.list.findIndex(post => post.id === action.payload.id);
                if (index >= 0) {
                    state.list[index] = action.payload;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error occurred while updating a post.';
            })
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.list = state.list.filter((post) => post.id !== action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error occurred while deleting a post.';
            });
    },
})

export default postSlice.reducer