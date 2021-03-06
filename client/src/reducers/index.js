import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import commentReducer from "./commentReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  posts: postReducer,
  comment: commentReducer
});
