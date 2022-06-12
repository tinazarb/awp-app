import axios from 'axios';

//INITAL STATE
const initialState = {
  favorites: [],
};

//ACTION TYPES
const GET_FAVORITES = 'GET_FAVORITES';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const DELETE_ITEM = 'DELETE_ITEM';

// ACTION CREATORS
const getFavoritesAction = (data) => ({
  type: GET_FAVORITES,
  data,
});

const addToFavorites = (photo) => ({
  type: ADD_TO_FAVORITES,
  photo,
});

const deleteItem = (id) => ({
  type: DELETE_ITEM,
  id,
});

//THUNK
export const getFavoritesThunk = (userId) => {
  if (userId) {
    return async (dispatch) => {
      const { data } = await axios.get(`/api/users/${userId}/favorites`);
      dispatch(getFavoritesAction(data));
    };
  } else {
    return async (dispatch) => {
      const { data } = await axios.get('/api/favorites');
      dispatch(getFavoritesAction(data));
    };
  }
};

export const addToFavoritesThunk = (photo, userId) => {
  if (userId) {
    return async (dispatch) => {
      const { data } = await axios.put(`/api/users/${userId}/favorites`, photo);
      dispatch(getFavoritesAction(data));
    };
  } else {
    return async (dispatch) => {
      const { data } = await axios.put('/api/favorites', photo);
      dispatch(addToFavorites(data));
    };
  }
};

export const deleteItemThunk = (itemId, userId) => {
  if (userId) {
    return async (dispatch) => {
      await axios.delete(`/api/users/${userId}/favorites/${itemId}`);
      dispatch(deleteItem(itemId));
    };
  } else {
    return async (dispatch) => {
      await axios.delete(`/api/favorites/${itemId}`);
      dispatch(deleteItem(itemId));
    };
  }
};

//REDUCER
const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (state.favorites.find((item) => item.id === action.photo.id)) {
        return state;
      } else {
        return { ...state, favorites: [...state.favorites, action.photo] };
      }
    case GET_FAVORITES:
      return { ...state, favorites: action.data };
    case DELETE_ITEM:
      return {
        ...state,
        favorites: state.favorites.filter(
          (current) => current.id !== action.id
        ),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
