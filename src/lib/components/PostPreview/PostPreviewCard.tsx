import React from 'react';
import { Link } from 'react-router-dom';
// import { ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IPost } from '../../types';
import { useStyles } from '../../styles/PostPreviewCard.styles';
// import { MAIN_THEME } from '../../theme/theme';

export interface IPostPreviewCardProps {
  data: IPost;
}
const PostPreviewCard: React.FC<IPostPreviewCardProps> = (props) => {
  const { data } = props;
  const expertLink = `/experts/${data.author.id}`;
  const postLink = `/posts/${data.id}`;
  const authorFullName = `${data.author?.firstName} ${data.author?.lastName}`;
  const VIEW_NUMBER = 100;

  // if (data.author) {
  //   expertLink = `/experts/${data.author.id}`;
  // }

  // if (data.author?.firstName && data.author?.lastName) {
  //   authorFullName = `${data.author?.firstName} ${data.author?.lastName}`;
  // }

  const classes = useStyles();
  return (
    // <ThemeProvider theme={MAIN_THEME}>
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
          <Link to={expertLink}>
            <Box
              className={classes.header}
              flexDirection="column"
              flexWrap="no-wrap"
              justifyContent="space-between"
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
                    className={classes.postType}
                    variant="subtitle1"
                    component="h3"
                  >
                    {data.postType.name.toUpperCase()}
                  </Typography>
                  <Typography
                    className={classes.authorTypography}
                    align="left"
                    variant="h4"
                    component="h4"
                  >
                    {authorFullName}
                  </Typography>
                </Box>
                <CardMedia
                  className={classes.media}
                  image={data.author.avatar}
                  title={authorFullName}
                />
              </Box>
              <Typography
                color="textSecondary"
                align="left"
                variant="subtitle2"
                component="h3"
              >
                {data.author.mainInstitution?.city.name},{' '}
                {data.author.mainInstitution?.name}
              </Typography>
            </Box>
          </Link>
          <Link to={postLink}>
            <Box
              className={classes.body}
              display="flex"
              flexDirection="column"
              flexGrow="1"
              justifyContent="space-between"
            >
              <CardContent className={classes.content}>
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Box display="flex" alignItems="center">
                  <VisibilityIcon className={classes.eyeIcon} />
                  <Typography variant="h6" className={classes.eyeNumber}>
                    {VIEW_NUMBER}
                  </Typography>
                </Box>
                <Typography variant="h6" color="textSecondary">
                  {data.createdAt}
                </Typography>
              </Box>
            </Box>
          </Link>
        </Box>
      </Box>
    </Card>
    // </ThemeProvider>
  );
};

export default PostPreviewCard;
