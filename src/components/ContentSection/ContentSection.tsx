/* eslint-disable react/no-danger */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import { useStyles } from './ContentSection.styles';
import {
  ConditionsContentSectionEnum,
  ConditionsContentSectionType,
  LoadingStatusEnum,
} from '../../old/lib/types';
import {
  fetchInfoById,
  selectInfoById,
  selectInfoLoadingById,
  updateInfo,
} from '../../models/info';
import { LoadingContainer } from '../../old/lib/components/Loading/LoadingContainer';
import { GeneralEditor } from '../Editor/GeneralEditor';
import { VideoEditorToolbar } from '../Editor/Editors/VideoEditorToolbar';
import { PostCreationButtons } from '../../views/postCreation/PostCreationButtons';

export default function ContentSection(prop: {
  type: ConditionsContentSectionType;
}): JSX.Element {
  const { type } = prop;
  const { authenticated } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const info = useSelector(selectInfoById(type));
  const loading = useSelector(selectInfoLoadingById(type));

  const openEditor = () => setEdit(true);
  const closeEditor = () => {
    setContent('');
    setEdit(false);
  };

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchInfoById({ id: type }));
  }, [type]);

  const saveContent = () => {
    if (content) {
      dispatch(
        updateInfo({
          id: info.id,
          text: content,
        }),
      );
    }
    closeEditor();
  };

  return (
    <div
      id={ConditionsContentSectionEnum[type].toLowerCase()}
      key={type}
      className={classes.section}
    >
      {loading === LoadingStatusEnum.pending && (
        <LoadingContainer loading={loading} />
      )}
      {loading === LoadingStatusEnum.succeeded && (
        <>
          <div className={classes.wrap}>
            <Typography className={classes.title} variant="h2">
              {info.title}
            </Typography>
            {authenticated && !edit && (
              <CreateIcon onClick={openEditor} className={classes.icon} />
            )}
          </div>

          {edit ? (
            <>
              <GeneralEditor
                toolbar={VideoEditorToolbar}
                initialHtmlContent={content || info.text}
                onHtmlContentChange={(s) => setContent(s)}
              />
              <PostCreationButtons
                action="updating"
                onCancelClick={closeEditor}
                onPublishClick={saveContent}
                onPreviewClick={() => setEdit(!edit)}
              />
            </>
          ) : (
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{ __html: content || info.text }}
            />
          )}
        </>
      )}
    </div>
  );
}
