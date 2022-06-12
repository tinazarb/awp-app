import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhoto } from '../redux/photos';
import { addToFavoritesThunk } from '../redux/favorites';

class SinglePhoto extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getPhoto();
  }

  handleClick = (photo) => {
    this.props.addToFavoritesThunk(photo);
  };

  render() {
    console.log('SINGLE PHOTO');
    const photo = this.props.selectedPhoto;
    return (
      <div id="container">
        <h1> {photo.name} </h1>
        <img src={photo.imgUrl} />
        <p>
          {' '}
          <b>Description:</b> {photo.description}{' '}
        </p>
        <p>
          <b>Category:</b> {photo.category}{' '}
        </p>
        <div>
          <button
            type="button"
            className="button"
            onClick={() => {
              this.handleClick(photo);
            }}>
            add to favorites
          </button>
        </div>
        <br />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selectedPhoto: state.Photos.selectedPhoto,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const photoId = Number(ownProps.match.params.id);
  return {
    getPhoto: () => dispatch(getPhoto(photoId)),
    addToFavorites: (photo) => dispatch(addToFavoritesThunk(photo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhoto);
