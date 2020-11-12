import { Settings } from 'react-slick';

export const settings: Settings = {
  dots: false,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
  ],
};

interface IStyles {
  [propName: string]: React.CSSProperties;
}

export const styles: IStyles = {
  wrapper: {
    position: 'relative',
  },
  controls: {
    position: 'absolute',
    right: '5%',
  },
};
