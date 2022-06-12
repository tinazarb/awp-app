import React from 'react';
import { connect } from 'react-redux';
import { getAllPhotos } from '..redux/photos';
import Photo from './Photo';
import { addToFavoritesThunk } from '../redux/favorites';

export class AllPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  componentDidMount() {
    this.props.getAllPhotos();
  }

  addToFavorites = (photo) => {
    this.props.addToFavoritesThunk(photo, this.props.user);
  };

  render() {
    console.log('ALL PHOTOS');
    const { loading } = this.props;

    if (loading) return <div>loading...</div>;
    const allPhotos = this.props.allPhotos;
    return (
      <div id="container">
        <h1>All Photos</h1>
        <div id="photosgrid">
          {allPhotos.map((photo) => (
            <div id="item">
              <Photo
                photo={photo}
                key={photo.id}
                addToFavorites={this.addToFavorites}
              />{' '}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allphotos: state.Photos.allPhotos,
  user: state.Users.id,
});

const mapDispatchToProps = (dispatch) => ({
  getAllPhotos: () => dispatch(getAllPhotos()),
  addToFavorites: (photo, user) => dispatch(addToFavoritesThunk(photo, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllPhotos);
