import { POST_COMMENT, DELETE_COMMENT } from "../actions/types";
const initialState = {
  comments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case DELETE_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };

    default:
      return state;
  }
}
