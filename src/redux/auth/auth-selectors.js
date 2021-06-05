const getIsAuthenticated  = state => state.auth.isAuthenticated;

const getUser = state => state.auth?.user;

// const getUserId = state => state.auth?.user?.id;

const getUserEmail = state => state.auth?.user?.email;

const getUserName = state => state.auth?.user?.name;

const getToken = state => state.auth.accessToken;

const authSelectors = {
  getIsAuthenticated,
  getUser,
  getToken,
  // getUserId,
  getUserEmail,
  getUserName,
}


export default authSelectors;