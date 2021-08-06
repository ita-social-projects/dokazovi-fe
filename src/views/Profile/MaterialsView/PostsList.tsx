import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableRow,
  Typography,
  Card,
  Box,
  Button,
  TableCell,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { ConfirmationModalWithButton } from '../../../old/lib/components/Modals/ConfirmationModalWithButton';
import { LOAD_POSTS_BY_STATUS_LIMIT } from '../../../old/lib/constants/posts';
import { AuthContext } from '../../../old/provider/AuthProvider/AuthContext';
import { langTokens } from '../../../locales/localizationInit';
import { formatDate } from '../../../utilities/formatDate';
import { IPost, PostStatus } from '../../../old/lib/types';
import { useStyles } from './styles/PostsList.styles';

export interface IPostsListProps {
  postsList: IPost[];
  status?: string;
  onDelete?: (arg0: number, arg1: string) => void;
}

export const PostsList: React.FC<IPostsListProps> = ({
  postsList,
  status,
  onDelete,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { authenticated } = useContext(AuthContext);
  const postIdxForScroll = postsList?.length - LOAD_POSTS_BY_STATUS_LIMIT;
  const postForScrollRef = useRef<HTMLDivElement>(null);
  const [prevPostsCount, setPrevPostsLength] = useState(postsList?.length);

  useEffect(() => {
    if (!postForScrollRef.current) return;
    if (
      postsList.length > LOAD_POSTS_BY_STATUS_LIMIT &&
      postsList.length !== prevPostsCount
    ) {
      postForScrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }

    setPrevPostsLength(postsList?.length);
  }, [postsList?.length]);

  return (
    <Table className={classes.container}>
      <TableBody>
        {postsList?.map((post, idx) => (
          <TableRow key={post.id}>
            <div
              className={classes.item}
              ref={postIdxForScroll === idx ? postForScrollRef : null}
            >
              <Card className={classes.card}>
                <TableCell
                  className={classes.cell}
                  style={{ minWidth: '480px' }}
                >
                  <Link to={`/posts/${post.id}`}>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="h3"
                      className={classes.title}
                    >
                      {post.title.length > 50
                        ? `${post.title.slice(0, 50)} ...`
                        : post.title}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell
                  className={classes.cell}
                  align="center"
                  style={{ minWidth: '280px' }}
                >
                  <Typography variant="caption" color="textSecondary">
                    {status === PostStatus.DRAFT
                      ? post.modifiedAt && formatDate(post.modifiedAt)
                      : post.publishedAt && formatDate(post.publishedAt)}
                  </Typography>
                </TableCell>
                {status === PostStatus.DRAFT && (
                  <>
                    {authenticated && (
                      <Box>
                        <Link to={`/edit-post?id=${post.id}`}>
                          <Edit className={classes.iconBlack} />
                        </Link>
                      </Box>
                    )}
                    {onDelete && (
                      <Box>
                        <ConfirmationModalWithButton
                          message={`${t(
                            langTokens.materials.needToDeleteMaterial,
                          )} '${post.title}'?`}
                          buttonIcon={<Delete className={classes.iconBlack} />}
                          onConfirmButtonClick={() =>
                            onDelete(post.id, post.title)
                          }
                        />
                      </Box>
                    )}
                  </>
                )}
                {status === PostStatus.PUBLISHED && (
                  <Link to={`/posts/${post.id}`}>
                    <Button className={classes.btn} variant="contained">
                      {`${t(langTokens.common.preview)}`}
                    </Button>
                  </Link>
                )}
              </Card>
            </div>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
