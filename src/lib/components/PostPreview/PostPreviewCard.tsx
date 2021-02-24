import React from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IPost } from '../../types';
import { useStyles } from '../../styles/PostPreviewCard.styles';
import { MAIN_THEME } from '../../theme/theme';

export interface IPostPreviewCardProps {
  data: IPost;
}

const PostPreviewCard: React.FC<IPostPreviewCardProps> = (props) => {
  const { data } = props;
  const history = useHistory();
  let authorFullName = '';

  if (data.author?.firstName && data.author?.lastName) {
    authorFullName = `${data.author?.firstName} ${data.author?.lastName}`;
  }

  const goPostView = () => {
    history.push(`/posts/${data.id}`);
  };

  const goExpertPage = () => {
    if (data.author) {
      history.push(`/experts/${data.author.id}`);
    }
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={MAIN_THEME}>
      <Card className={classes.root}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Box
            position="relative"
            display="flex"
            flexDirection="column"
            flexGrow="1"
          >
            <Box
              className={classes.header}
              display="flex"
              flexDirection="column"
              flexWrap="no-wrap"
              justifyContent="space-between"
              onClick={goExpertPage}
            >
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="no-wrap"
                justifyContent="space-between"
                mb={2}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  mt={2}
                  justifyContent="space-between"
                >
                  <Typography
                    style={{ color: '#3B6F95' }}
                    variant="subtitle1"
                    component="h3"
                  >
                    {data.postType.name.toUpperCase()}
                  </Typography>
                  <Typography
                    align="left"
                    variant="h4"
                    component="h4"
                    style={{ fontSize: '16px', lineHeight: '19px' }}
                  >
                    {authorFullName}
                  </Typography>
                </Box>
                <CardMedia
                  className={classes.media}
                  image={data.author?.avatar}
                  title={authorFullName}
                />
              </Box>
              <Typography
                color="textSecondary"
                align="left"
                variant="subtitle2"
                component="h3"
              >
                {data.author?.mainInstitution?.city.name},{' '}
                {data.author?.mainInstitution?.name}
              </Typography>
            </Box>
            <Box
              className={classes.body}
              display="flex"
              flexDirection="column"
              flexGrow="1"
              justifyContent="space-between"
              onClick={goPostView}
            >
              <CardContent style={{ padding: '0' }}>
                <Typography
                  gutterBottom
                  align="left"
                  variant="h2"
                  component="h3"
                >
                  {data.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  align="left"
                  color="textPrimary"
                  component="p"
                >
                  {data.preview}
                </Typography>
              </CardContent>
              <Typography align="right" variant="h6">
                {data.createdAt}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default PostPreviewCard;
