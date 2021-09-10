import React, { useEffect, useRef, useState } from 'react';
import { PostsList } from '../../old/lib/components/Posts/PostsList';
import { IPost } from '../../old/lib/types';

interface IAutoPaginationPostListProps {
  posts: IPost[];
}

export const AutoPaginationPostList: React.FC<IAutoPaginationPostListProps> = ({
  posts,
}) => {
  const [page, setPage] = useState(4);

  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

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

  return (
    <div>
      <PostsList postsList={posts.slice(0, page)} />
      <div ref={lastElement} style={{ height: 1 }} />
    </div>
  );
};
