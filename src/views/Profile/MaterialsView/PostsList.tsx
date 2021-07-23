/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Table,
  TableBody,
  TableRow,
  Typography,
  Card,
  Box,
  TableCell,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { ConfirmationModalWithButton } from '../../../old/lib/components/Modals/ConfirmationModalWithButton';
import { AuthContext } from '../../../old/provider/AuthProvider/AuthContext';
import { deletePostById } from '../../../old/lib/utilities/API/api';
import { langTokens } from '../../../locales/localizationInit';
import { formatDate } from '../../../utilities/formatDate';
import { IPost } from '../../../old/lib/types';
import { LOAD_BY_STATUS_POSTS_LIMIT } from '../../../old/lib/constants/posts';
import { useStyles } from './styles/PostsList.styles';

export interface IPostsListProps {
  postsList: IPost[];
  status?: string;
}

export const PostsList: React.FC<IPostsListProps> = ({ postsList, status }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { authenticated } = useContext(AuthContext);
  const postIdxForScroll = postsList.length - LOAD_BY_STATUS_POSTS_LIMIT;
  const postForScrollRef = useRef<HTMLDivElement>(null);
  const [prevPostsCount, setPrevPostsLength] = useState(postsList.length);

  // const onDelete = useCallback(
  //   async (postId: number, postTitle: string) => {
  //     try {
  //       const response = await deletePostById(Number(postId));
  //       if (response.data.success) {
  //         toast.success(
  //           `${t(langTokens.materials.materialDeletedSuccess, {
  //             material: postTitle,
  //           })}!`,
  //         );
  //       }
  //     } catch (e) {
  //       toast.success(
  //         `${t(langTokens.materials.materialDeletedFail, {
  //           material: postTitle,
  //         })}.`,
  //       );
  //     }
  //   },
  //   [postsList.length],
  // );

  const onDelete = async (postId, postTitle) => {
    try {
      const response = await deletePostById(Number(postId));
      if (response.data.success) {
        toast.success(
          `${t(langTokens.materials.materialDeletedSuccess, {
            material: postTitle,
          })}!`,
        );
      }
    } catch (e) {
      toast.success(
        `${t(langTokens.materials.materialDeletedFail, {
          material: postTitle,
        })}.`,
      );
    }
  };

  useEffect(() => {
    if (!postForScrollRef.current) return;
    if (
      postsList.length > LOAD_BY_STATUS_POSTS_LIMIT &&
      postsList.length !== prevPostsCount
    ) {
      postForScrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }

    setPrevPostsLength(postsList.length);
  }, [postsList.length]);

  return (
    <Table className={classes.container}>
      <TableBody>
        {postsList.map((post, idx) => (
          <TableRow key={post.id}>
            <div
              className={classes.item}
              ref={postIdxForScroll === idx ? postForScrollRef : null}
            >
              <Card className={classes.card}>
                <Link to={`/posts/${post.id}`}>
                  <TableCell
                    className={classes.cell}
                    style={{ minWidth: '480px' }}
                  >
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="h3"
                      className={classes.title}
                    >
                      {post.title}
                    </Typography>
                  </TableCell>
                  <TableCell
                    className={classes.cell}
                    align="center"
                    style={{ minWidth: '300px' }}
                  >
                    <Typography variant="caption" color="textSecondary">
                      {post.modifiedAt && formatDate(post.modifiedAt)}
                    </Typography>
                  </TableCell>
                </Link>
                {status === 'DRAFT' && (
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
              </Card>
            </div>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
