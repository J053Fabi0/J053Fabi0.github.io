import React from "react";

class ImageCard extends React.Component {
  render() {
    return (
      <div className="image-container">
        <img className="image-view" src={this.props.url} alt="" />
      </div>
    );
  }
}

export default ImageCard;
