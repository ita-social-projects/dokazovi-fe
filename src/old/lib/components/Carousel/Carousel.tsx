/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import { useStyles } from './Carousel.styles';
import { ScreenContext } from '../../../provider/MobileProvider/ScreenContext';

const Carousel: React.FC = ({ children }) => {
  const sliderRef = useRef<Slider>(null);
  const classes = useStyles();

  const { mobile } = useContext(ScreenContext);

  const settings: Settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 5000,
    dotsClass: `slick-dots ${mobile ? classes.dotsMobile : classes.dots}`,
  };
  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
    </>
  );
};

export default Carousel;
