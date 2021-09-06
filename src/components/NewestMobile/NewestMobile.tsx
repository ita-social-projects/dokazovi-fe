import React, { useEffect, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { useTranslation } from 'react-i18next';
import { useStyles } from './NewestMobileStyle';
import { langTokens } from '../../locales/localizationInit';
import { MobilePostList } from '../MobilePostList/MobilePostList';
import { getNewestPosts } from '../../old/lib/utilities/API/api';
import { LoadingStatusEnum } from '../../old/lib/types';
import { PostsList } from '../../old/lib/components/Posts/PostsList';
import { NewestPostResponseType } from '../../old/lib/utilities/API/types';

export const NewestMobile: React.FC = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState<NewestPostResponseType[]>([]);

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
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 1000,
    draggable: false,
    autoplay: false,
    slidesToShow: 1,
    lazyLoad: 'progressive',
    swipeToSlide: true,
    dotsClass: `slick-dots slick-thumb ${classes.dots}`,
    className: classes.root,
  };
  useEffect(() => {
    getNewestPosts().then((res): void => {
      setPosts(res.data.content);
    });
  }, []);

  console.log(posts);

  return (
    <>
      <Slider {...settings}>
        {posts[0] && <PostsList postsList={posts[0].postDTOS} />}
        {posts[1] && <PostsList postsList={posts[2].postDTOS} />}
        {posts[2] && <PostsList postsList={posts[1].postDTOS} />}
        {posts[3] && <PostsList postsList={posts[3].postDTOS} />}

        {/*
        <MobilePostList type="expertOpinion" />
        <MobilePostList type="translation" />
        <MobilePostList type="media" />
        <MobilePostList type='video' />
        */}
      </Slider>
    </>
  );
};
