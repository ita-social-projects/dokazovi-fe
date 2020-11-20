/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Container, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
    <Container>
      <div style={styles.wrapper}>
        <Typography variant="h4">Важливе</Typography>
        <Slider {...settings} ref={sliderRef}>
          {children}
        </Slider>
        <div style={styles.controls}>
          <button type="button" onClick={prev} style={styles.buttons}>
            <ArrowBackIcon />
          </button>
          <button type="button" onClick={next} style={styles.buttons}>
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Carousel;
