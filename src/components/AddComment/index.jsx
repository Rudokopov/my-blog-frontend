import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComments } from "../../redux/slices/posts";
import { useDispatch } from "react-redux";
import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";

export const Index = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { id } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(`/post/${id}/comment`, { text });
      if (!result) {
        alert("Ошибка при создании комментария");
      }
      setText("");
      dispatch(fetchComments(id));
    } catch (err) {
      console.log(err.message);
      alert("Ошибка при создании статьи");
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://images.unsplash.com/photo-1683115763606-43dd57a47712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        />
        <form onSubmit={onSubmit} className={styles.form}>
          <TextField
            type="text"
            value={text || ""}
            onChange={(e) => setText(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            required
            multiline
            fullWidth
            inputProps={{ minLength: 5 }}
            errorText={"Ошибка!"}
            helperText={"Минимальная длинна комментария 5 символов"}
          />
          <Button type="submit" variant="contained">
            Отправить
          </Button>
        </form>
      </div>
    </>
  );
};
