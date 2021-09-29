import React, { useEffect, useRef } from 'react';
import { PostsList } from '../../old/lib/components/Posts/PostsList';
import { IPost } from '../../old/lib/types';

interface IAutoPaginationPostListProps {
  posts: IPost[];
  setPage: (prevState) => void;
}

export const AutoPaginationPostList: React.FC<IAutoPaginationPostListProps> = ({
  posts,
  setPage,
}) => {
  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    if (lastElement.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((p: number) => p + 1);
        }
      });
      observer.current.observe(lastElement.current);
    }
  }, []);

  return (
    <div>
      <PostsList postsList={posts.slice(0, posts.length - 1)} />
      <div ref={lastElement}>
        <PostsList postsList={posts.slice(-1)} />
      </div>
    </div>
  );
};
