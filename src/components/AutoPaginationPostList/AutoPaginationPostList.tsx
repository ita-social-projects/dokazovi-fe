import React, { useEffect, useRef, useState } from 'react';
import { PostsList } from '../../old/lib/components/Posts/PostsList';
import { IPost } from '../../old/lib/types';

interface IAutoPaginationPostListProps {
  posts: IPost[];
}

export const AutoPaginationPostList: React.FC<IAutoPaginationPostListProps> = ({
  posts,
}) => {
  const [postsCount, setPostsCount] = useState(5);

  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const lastFivePosts = posts.slice(postsCount, postsCount + 5);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    if (lastElement.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPostsCount((p) => p + 5);
        }
      });
      observer.current.observe(lastElement.current);
    }
  }, []);

  return (
    <div>
      <PostsList postsList={posts.slice(0, postsCount)} />
      {Boolean(lastFivePosts.length) && (
        <div ref={lastElement}>
          <PostsList postsList={lastFivePosts} />
        </div>
      )}
    </div>
  );
};
