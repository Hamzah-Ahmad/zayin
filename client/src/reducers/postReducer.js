import {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  GET_LIKES
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  newPost: null,
  topics: [
    "Science",
    "Politics",
    "Movies",
    "Video Games",
    "Music",
    "MCU",
    "Anime",
    "Misc"
  ],
  likes: []
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
    case EDIT_POST:
      return {
        ...state,
        newPost: action.payload
      };
    case DELETE_POST:
      return state;

    case GET_LIKES:
      return {
        ...state,
        likes: action.payload
      };
    default:
      return state;
  }
}
