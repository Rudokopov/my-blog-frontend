import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const { data } = await axios.get("/post");
  console.log(data);
  return data;
});

export const fetchPostsCurrent = createAsyncThunk(
  "post/fetchPostsCurrent",
  async (name) => {
    const { data } = await axios.get(`/tags?tag=${name}`);
    return data;
  }
);

export const fetchSortPosts = createAsyncThunk(
  "post/fetchSortPosts",
  async (sortType) => {
    const { data } = await axios.get(`/post/sort/?sortType=${sortType}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("post/fetchTags", async () => {
  const { data } = await axios.get("/post/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk("post/fetchPost", async (id) =>
  axios.delete(`/post/${id}`)
);

const initialState = {
  posts: {
    items: [],
    sortType: 0,
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Получение статей по тегам
    [fetchPostsCurrent.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsCurrent.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsCurrent.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Сортировка статей
    [fetchSortPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.sortType = action.meta.arg;
      state.posts.status = "loading";
    },
    [fetchSortPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchSortPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    // Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    [fetchRemovePost.rejected]: (state) => {
      state.posts.status = "error";
    },
  },
});

export const { setSortType } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
