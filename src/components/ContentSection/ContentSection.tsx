/* eslint-disable react/no-danger */
import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import { GeneralEditor } from '../Editor/GeneralEditor';
import { VideoEditorToolbar } from '../Editor/Editors/VideoEditorToolbar';
import { PostCreationButtons } from '../../views/postCreation/PostCreationButtons';
import i18n, { langTokens } from '../../locales/localizationInit';
import { useStyles } from './ContentSection.styles';
import getDefContent from './defContent';

export default function ContentSection(prop: { type: string }): JSX.Element {
  const { authenticated } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);

  const openEditor = () => setEdit(true);
  const closeEditor = () => setEdit(false);

  const classes = useStyles();
  const { type } = prop;

  useEffect(() => {
    switch (type) {
      case 'about':
        setContent(getDefContent(1));
        setTitle(i18n.t(langTokens.footer.aboutPlatform));
        break;
      case 'rules':
        setContent(getDefContent(2));
        setTitle(i18n.t(langTokens.footer.termsOfUse));
        break;
      case 'contacts':
        setContent(getDefContent(3));
        setTitle(i18n.t(langTokens.footer.contacts));
        break;
      default:
        break;
    }
  }, [type]);

  const saveContent = () => {
    // todo sendContent

    // eslint-disable-next-line no-console
    console.log(`type=${type}, content=${content}`);
  };

  return (
    <div id={type} key={type} className={classes.section}>
      <div className={classes.wrap}>
        <Typography className={classes.title} variant="h2">
          {title}
        </Typography>
        {authenticated && !edit && (
          <CreateIcon onClick={openEditor} className={classes.icon} />
        )}
      </div>

      {edit ? (
        <>
          <GeneralEditor
            toolbar={VideoEditorToolbar}
            initialHtmlContent={content}
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
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
