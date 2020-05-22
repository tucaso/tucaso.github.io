import actions from '../actions/user-actions';

const getInitialState = () => {
  return {
    currentUser: { id: '' }
  };
};

const UserReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_CURRENT_USER:
      let user = action.payload.user;
      if (user.teamEmails) {
        if (typeof user.teamEmails === 'string') {
          user.teamEmails = JSON.parse(user.teamEmails);
        }
      }
      return user;
    default:
      return state;
  }
};

export default UserReducer;
