import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useStyles } from '../styles/ImportantView.styles';
import PostPreviewWrapper from './PostPreviewWrapper';
import { RootStateType } from '../../../../../../models/rootReducer';
import FilterSection from './FilterSection';
import { LoadMoreButton } from '../../../LoadMoreButton/LoadMoreButton';
import { IPost, LoadMoreButtonTextType, ViewModsType } from '../../../../types';
import { LoadingContainer } from '../../../Loading/LoadingContainer';

interface IAddImportantMaterial {
  selectedPosts: number[];
  updateRemovedPosts: (post: IPost, status: ViewModsType) => void;
}

const AddImportantMaterial: React.FC<IAddImportantMaterial> = ({
  selectedPosts,
  updateRemovedPosts,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [isTouched, setTouchStatus] = useState(false);

  const { loading } = useSelector(
    (state: RootStateType) => state.materialsImportant,
  );
  const { posts: fetchedPosts, postIds: filteredPosts, meta } = useSelector(
    (state: RootStateType) => state.materialsImportant.data,
  );

  const posts = Object.values(fetchedPosts).filter((post) =>
    filteredPosts.includes(post.id),
  );
  const unselectedPosts = posts.filter(
    (post) => !selectedPosts.includes(post.id),
  );

  const loadMore = () => setPage(page + 1);
  const resetPage = () => setPage(1);

  const renderImportantMaterialsSelector = () => {
    let selector: JSX.Element | JSX.Element[] = <></>;

    if (unselectedPosts.length || !meta.isLastPage) {
      selector = unselectedPosts.map((post, index) => (
        <PostPreviewWrapper
          key={post.id}
          post={post}
          position={index + 1}
          viewMode="preview"
          postsAmount={selectedPosts.length}
          updateRemovedPosts={updateRemovedPosts}
        />
      ));
    } else if (
      loading === 'succeeded' &&
      !unselectedPosts.length &&
      meta.isLastPage
    ) {
      selector = (
        <Typography align="center">
          Не залишилось постів, доступних для додавання. Змініть параметри
          пошуку, аби побачити більше постів.
        </Typography>
      );
    }

    return selector;
  };

  return (
    <Accordion
      classes={{ root: classes.addMaterialsSection }}
      onChange={() => !isTouched && setTouchStatus(true)}
    >
      <AccordionSummary
        className={classes.addMaterialsHeader}
        expandIcon={<ExpandMore />}
      >
        <h2>Додати матеріали</h2>
      </AccordionSummary>
      <AccordionDetails className="sectionDetails">
        <>
          <FilterSection
            isTouched={isTouched}
            page={page}
            resetPage={resetPage}
          />
          <div
            className={`${classes.adminImportantSection} ${classes.addMaterialsBody}`}
          >
            {renderImportantMaterialsSelector()}
            {loading === 'pending' && (
              <LoadingContainer
                loading={loading}
                errorMsg="Виникла помилка при завантаженні матеріалів"
              />
            )}
          </div>
        </>
      </AccordionDetails>
      <LoadMoreButton
        clicked={loadMore}
        loading={loading}
        textType={LoadMoreButtonTextType.POST}
        isLastPage={meta.isLastPage}
        pageNumber={meta.pageNumber}
        totalElements={meta.totalElements}
        totalPages={meta.totalPages}
      />
    </Accordion>
  );
};

export default AddImportantMaterial;
