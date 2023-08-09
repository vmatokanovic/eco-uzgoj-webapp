import { createContext, useReducer } from "react";

export const CommentsContext = createContext();

export const commentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        comments: action.payload,
      };
    case "CREATE_COMMENT":
      return {
        comments: [action.payload, ...state.comments],
      };

    case "UPDATE_COMMENT":
      return {
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
      };
    case "DELETE_COMMENT":
      return {
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const CommentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, {
    comments: null,
  });

  return (
    <CommentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommentsContext.Provider>
  );
};
