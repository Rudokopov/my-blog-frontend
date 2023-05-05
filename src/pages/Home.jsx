import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import moment from "moment";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags, fetchSortPosts } from "../redux/slices/posts";
import { IsMobileContext } from "../App";

export const Home = () => {
  const { isScreenMd } = useContext(IsMobileContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const sort = useSelector((state) => state.posts.posts.sortType);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchSortPosts(0));
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sort}
        aria-label="basic tabs example"
      >
        <Tab
          label="Новые"
          onClick={() => {
            dispatch(fetchSortPosts(0));
          }}
        />
        <Tab
          label="Популярные"
          onClick={() => {
            dispatch(fetchSortPosts(1));
          }}
        />
      </Tabs>

      {isScreenMd ? (
        <Grid container spacing={4}>
          <Grid xs={8} item>
            {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
              isPostsLoading ? (
                (console.log(obj), (<Post key={index} isLoading={true} />))
              ) : (
                <Post
                  _id={obj._id}
                  key={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl
                      ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                      : ""
                  }
                  user={{
                    avatarUrl: obj.owner.avatarUrl,
                    fullName: obj.owner.name,
                  }}
                  createdAt={moment(obj.createdAt).format("DD MMMM  HH:mm ")}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={
                    userData === null
                      ? false
                      : userData.userData?._id === obj.owner._id // нужно поправить, не появляется возможность редактирования
                  }
                />
              )
            )}
          </Grid>
          <Grid xs={4} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: "Леонид Каневский",
                    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  text: "Люблю оставлять комментарии - теперь и вы можете!",
                },
                {
                  user: {
                    fullName: "Иван Иванов",
                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                  },
                  text: "Для меня почетно быть на главной странице, оставляйте комментарии и однажды, когда админ отхаркодит здесь статику, ваш комментарий окажется на этом месте!",
                },
              ]}
              isLoading={false}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4} flexDirection={"column"}>
          <Grid xs={12} item>
            {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  _id={obj._id}
                  key={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl
                      ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                      : ""
                  }
                  user={{
                    avatarUrl: obj.owner.avatarUrl,
                    fullName: obj.owner.name,
                  }}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={
                    userData === null
                      ? false
                      : userData.userData?._id === obj.owner._id // Ломает прилу при обновлении страницы
                  }
                />
              )
            )}
          </Grid>
          <Grid xs={12} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: "Вася Пупкин",
                    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  text: "Здесь скоро будут актуальные комментарии",
                },
                {
                  user: {
                    fullName: "Иван Иванов",
                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                  },
                  text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                },
              ]}
              isLoading={false}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
