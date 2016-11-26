import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import ImageGallery from 'react-image-gallery';
import "../../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";

let slider1 = require('../../../Content/images/slider1.jpg');
let slider2 = require('../../../Content/images/slider2.jpg');
let slider3 = require('../../../Content/images/slider3.jpg');

class MainSlider extends React.Component {
   handleImageLoad(event) {
    console.log('Image loaded ', event.target)
  }

  render() {

    const images = [
      {
        original: slider1,
        originalClass: 'featured-slide',
        originalAlt: 'original-alt',
        description: '选择我们，您可以获得更多...',
      },
      {
        original: slider2
      },
      {
        original: slider3
      }
    ]

    return (
      <ImageGallery
        ref={i => this._imageGallery = i}
        items={images}
        slideInterval={2000}
        showThumbnails={false}
        showBullets={true}
        onImageLoad={this.handleImageLoad}/>
    );
  }
}

module.exports = MainSlider;