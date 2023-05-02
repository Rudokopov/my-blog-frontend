import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useEffect, useState } from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const [post, setPost] = useState();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<FullPost />} />
          <Route path="/post/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/tags/:id" element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
