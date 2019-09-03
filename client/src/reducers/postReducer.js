import { GET_POSTS, GET_POST } from "../actions/types";

const initialState = {
  posts: [],
  post: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        posts: action.payload
      };
    case GET_POST:
      return {
        post: action.payload
      };
    default:
      return state;
  }
}
