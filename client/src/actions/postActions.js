import axios from "axios";
import { GET_POSTS, GET_POST, CREATE_POST } from "./types";
import { tokenConfig } from "./authActions";

export const getPosts = () => dispatch => {
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(`Error in postActions ${err}`);
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getPost = postId => dispatch => {
  axios
    .get(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(`Error in postActions ${err}`);
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const createPost = (title, content) => (dispatch, getState) => {
  const data = { title: title, content: content };
  const body = JSON.stringify(data);
  axios
    .post("/api/posts", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data
      });
      // console.log(res.data);
    })
    .catch(err => {
      console.log(err.response);
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};
