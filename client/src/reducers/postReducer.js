import { GET_POSTS, GET_POST, CREATE_POST } from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  newPost: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    case CREATE_POST:
      return {
        ...state,
        newPost: action.payload
      };
    default:
      return state;
  }
}
