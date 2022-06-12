import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, OverlayTrigger } from 'react-bootstrap';

class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const photo = this.props.photo;
    const popover = (
      <Popover id="popover-basic" title="Added To Favorites">
        Great taste!
      </Popover>
    );
    console.log('PHOTO');
    return (
      <div>
        <br />
        <div id="photolink">
          <Link to={`photos/${photo.id}`}>{photo.name}</Link>
        </div>
        <br />
        <Link to={`photos/${photo.id}`}>
          <img src={photo.imgUrl} />
        </Link>
        <br />
        <h1>Price: ${photo.price}</h1>
        <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
          <button
            type="button"
            className="button"
            onClick={() => {
              this.props.addToFavorites(photo);
            }}>
            Add to Favorites
          </button>
        </OverlayTrigger>
        <br />
        <br />
      </div>
    );
  }
}

export default Photo;
