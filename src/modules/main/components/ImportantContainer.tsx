import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from '../../../lib/components/Carousel';
import { PostCard } from '../../../lib/components/PostCard';

import { IRootState } from '../../../store/rootReducer';
import { MOCK_DATA } from '../../../lib/constants/mock-data';
import { loadImportant } from '../store/actions';

const selectImportant = (state: IRootState) => state.main.important;

const ImportantContainer: React.FC= () => {
  const posts = useSelector(selectImportant);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.resolve(Array(8).fill(MOCK_DATA)).then((d) => {
      dispatch(loadImportant(d));
    })
    .catch(console.log);
  }, []);

  return (
    <div>
      <Carousel>
        {posts.map((p, i) => 
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <PostCard post={p} />
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default ImportantContainer;
