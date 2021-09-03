import React from 'react';
import Slider, { Settings } from 'react-slick';
import { useTranslation } from 'react-i18next';
import { useStyles } from './NewestMobileStyle';
import { langTokens } from '../../locales/localizationInit';
import { MobilePostList } from '../MobilePostList/MobilePostList';

export const NewestMobile: React.FC = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const createCustomPaging = (index: number): JSX.Element => {
    if (index === 0) {
      return <p>{t(langTokens.experts.expertOpinion)}</p>;
    }
    if (index === 1) {
      return <p>{t(langTokens.common.translation)}</p>;
    }
    if (index === 2) {
      return <p>{t(langTokens.common.media)}</p>;
    }
    return <p>{t(langTokens.common.video)}</p>;
  };

  const settings: Settings = {
    customPaging: createCustomPaging,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    draggable: false,
    autoplay: false,
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    swipeToSlide: true,
    dotsClass: `slick-dots slick-thumb ${classes.dots}`,
    className: classes.root,
  };
  return (
    <>
      <Slider {...settings}>
        <MobilePostList type="expertOpinion" />
        <MobilePostList type="translation" />
        <MobilePostList type="media" />
        <MobilePostList type='video' />
      </Slider>
    </>
  );
};
