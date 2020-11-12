/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { settings, styles } from '../constants/carousel-config';

const Carousel: React.FC = ({ children }) => {
  const sliderRef = useRef<Slider>(null);

  const prev = () => {
    sliderRef.current?.slickPrev();
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div style={styles.wrapper}>
      <Slider {...settings} ref={sliderRef}>
        {children}
      </Slider>
      <div style={styles.controls}>
        <button type="button" onClick={prev}>
          Previous
        </button>
        <button type="button" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

