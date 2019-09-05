import axios from "axios";
import { POST_COMMENT, DELETE_COMMENT } from "../actions/types";
import { tokenConfig } from "../actions/authActions";

export const postComment = (postId, commentText) => (dispatch, getState) => {
  const body = JSON.stringify({ commentText });

  axios
    .post(`/api/posts/comments/${postId}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: POST_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteComment = (postId, commentId) => (dispatch, getState) => {
  axios
    .delete(`/api/posts/comments/${postId}/${commentId}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};
