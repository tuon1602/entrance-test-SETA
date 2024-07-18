import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Edit } from "lucide-react";

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface PostsState {
  posts: Posts[];
  isLoading: boolean;
  isError: boolean;
}

export const fetchPostsData = createAsyncThunk<Posts[]>(
  "data/postsData",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  }
);

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  isError: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Posts>) {
      state.posts.unshift(action.payload);
    },
    removePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id != action.payload);
    },
    editPost(state,action: PayloadAction<Posts>){
        const currentPost = state.posts.find((post)=>post.id === action.payload.id)
        if(currentPost){
            currentPost.title = action.payload.title
            currentPost.body = action.payload.body
        }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsData.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      fetchPostsData.fulfilled,
      (state, action: PayloadAction<Posts[]>) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.isError = false;
      }
    );
    builder.addCase(fetchPostsData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { addPost,removePost,editPost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
