import axios from "axios";
import { GET_POSTS, GET_POST } from "./types";

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
      console.log(`Error is postActions ${err}`);
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
      console.log(`Error is postActions ${err}`);
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};
