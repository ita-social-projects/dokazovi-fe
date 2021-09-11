import React, { useEffect, useRef, useState } from 'react';
import { PostsList } from '../../old/lib/components/Posts/PostsList';
import { IPost } from '../../old/lib/types';

interface IAutoPaginationPostListProps {
  posts: IPost[];
}

export const AutoPaginationPostList: React.FC<IAutoPaginationPostListProps> = ({
  posts,
}) => {
  const [page, setPage] = useState(3);

  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const lastTwoPosts = posts.slice(page, page + 2);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    if (lastElement.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 4);
        }
      });
      observer.current.observe(lastElement.current);
    }
  }, []);

  return (
    <div>
      <PostsList postsList={posts.slice(0, page)} />
      {Boolean(lastTwoPosts.length) && (
        <div ref={lastElement}>
          <PostsList postsList={lastTwoPosts} />
        </div>
      )}
    </div>
  );
};
