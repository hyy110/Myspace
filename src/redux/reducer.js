import actions from './action';

const reducer = (state = {
  user: {
    username: "",
    id: 1,
    photo: "",
    followCount: -1,
    is_followed: false,
    access: "",
    refresh: "",
    is_login: false,
  }
}, action) => {
  switch(action.type) {
    case actions.UPDATEACCESS:
      return {
        ...state,
        user: {
          username: state.user.username,
          id: state.user.id,
          photo: state.user.photo,
          followCount: state.user.followCount,
          is_followed: state.user.is_followed,
          access: action.access,
          refresh: state.user.refresh,
          is_login: state.user.is_login,
        }
      }
    case actions.UPDATEUSER:
      return {
        ...state,
        user: {
          username: action.username,
          id: action.id,
          photo: action.photo,
          followCount: action.followCount,
          is_followed: action.is_followed,
          access: action.access,
          refresh: action.refresh,
          is_login: action.is_login,
        }
      }
    case actions.UPDATEUSERINFO:
      return {
        ...state,
        user: {
          username: action.username,
          id: action.id,
          photo: action.photo,
          followCount: action.followCount,
          is_followed: action.is_followed,
          access: state.user.access,
          refresh: state.user.refresh,
          is_login: state.user.is_login,
        }
      }
    case actions.UPDATEFOLLOW: 
      return {
        ...state,
        user: {
          username: state.user.username,
          id: state.user.id,
          photo: state.user.photo,
          followCount: state.user.followCount + action.value,
          is_followed: action.is_followed,
          access: state.user.access,
          refresh: state.user.refresh,
          is_login: state.user.is_login,
        }
      }
    default:
      return state;
  }
}

export default reducer