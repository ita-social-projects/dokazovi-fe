import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostsList } from '../../old/lib/components/Posts/PostsList';
import { useActions } from '../../shared/hooks';
import {
  fetchNewestMobile,
  resetMobileMaterials,
  selectMobileMaterials,
} from '../../models/newestPostsMobile';

interface IMobilePostListProps {
  type: string;
}

export const MobilePostList: React.FC<IMobilePostListProps> = ({ type }) => {
  const [boundFetchMobileMaterials] = useActions([fetchNewestMobile]);
  const [boundClearMaterials] = useActions([resetMobileMaterials]);

  const content = useSelector(selectMobileMaterials);

  let materials = [];
  let isLastPage;

  switch (type) {
    case 'expertOpinion':
      materials = content.expertOpinion.data;
      isLastPage = content.expertOpinion.isLastPage;
      break;
    case 'translation':
      materials = content.translation.data;
      isLastPage = content.translation.isLastPage;
      break;
    case 'media':
      materials = content.media.data;
      isLastPage = content.media.isLastPage;
      break;
    case 'video':
      materials = content.video.data;
      isLastPage = content.video.isLastPage;
      break;
    default:
      materials = [];
      isLastPage = true;
  }

  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    if (lastElement.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      });
      observer.current.observe(lastElement.current);
    }
  }, []);

  useEffect(() => {
    if (!isLastPage) {
      boundFetchMobileMaterials({ page, type });
    }
  }, [page]);

  useEffect(() => {
    return () => {
      boundClearMaterials();
    };
  }, []);

  return (
    <>
      <PostsList postsList={materials} />
      <div ref={lastElement} style={{ height: 1 }}></div>
    </>
  );
};
