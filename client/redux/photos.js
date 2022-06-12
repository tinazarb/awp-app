import axios from 'axios';

//INITAL STATE
const initialState = {
  allPhotos: [],
  selectedPhoto: {},
};

//ACTION TYPES
const SELECTED_PHOTO = 'SELECTED_PHOTO';
const GET_ALL_PHOTOS = 'GET_ALL_PHOTOS';
const GOT_ALL_PHOTOS = 'GOT_ALL_PHOTOS';

//ACTION CREATORS
const gotSinglePhoto = (photo) => ({
  type: SELECTED_PHOTO,
  photo,
});

const gettingAllPhotos = () => ({
  type: GET_ALL_PHOTOS,
});

const gotAllPhotos = (allPhotos) => ({
  type: GOT_ALL_PHOTOS,
  allPhotos,
});

//THUNK
export const getPhoto = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/photos/${id}`);
      dispatch(gotSinglePhoto(data));
    } catch (err) {
      throw err;
    }
  };
};

export const getAllPhotos = () => {
  console.log('HITTING THUNK');
  return async (dispatch) => {
    dispatch(gettingAllPhotos());
    const { data } = await axios.get('/api/photos');
    dispatch(gotAllPhotos(data));
  };
};

// export const getAllPhotos = () => async (dispatch) => {
//   const { data } = await axios.get('/api/photos');
//   dispatch(gotAllPhotos(data));
// };

//REDUCER
const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PHOTOS:
      return { ...state, loading: true };
    case GOT_ALL_PHOTOS:
      return { ...state, allPhotos: action.allPhotos };
    case SELECTED_PHOTO:
      return { ...state, selectedPhoto: action.photo };
    default:
      return state;
  }
};

export default photosReducer;
