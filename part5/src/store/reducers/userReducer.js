const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      const user = action.payload;
      return user;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export default userReducer;
