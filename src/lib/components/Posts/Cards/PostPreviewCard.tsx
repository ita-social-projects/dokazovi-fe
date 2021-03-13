import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IPost } from '../../../types';
import { useStyles } from '../../../styles/PostPreviewCard.styles';

export interface IPostPreviewCardProps {
  data: IPost;
  shouldNotUseLink?: boolean;
}
const PostPreviewCard: React.FC<IPostPreviewCardProps> = (props) => {
  const { data, shouldNotUseLink } = props;
  const expertLink = `/experts/${data.author.id}`;
  const postLink = `/posts/${data.id}`;
  const authorFullName = `${data.author?.firstName} ${data.author?.lastName}`;
  const VIEW_NUMBER = 100;
  const classes = useStyles();

  const expert = (
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
          mt={4}
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
        variant="caption"
        component="h3"
      >
        {data.author.mainInstitution?.city.name},{' '}
        {data.author.mainInstitution?.name}
      </Typography>
    </Box>
  );

  const post = (
    <Box
      className={classes.body}
      display="flex"
      flexDirection="column"
      flexGrow="1"
      justifyContent="space-between"
    >
      <CardContent className={classes.content}>
        <Typography gutterBottom align="left" variant="h2" component="h3">
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
  );

  return (
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
          {shouldNotUseLink ? expert : <Link to={expertLink}>{expert}</Link>}
          {shouldNotUseLink ? post : <Link to={postLink}>{post}</Link>}
        </Box>
      </Box>
    </Card>
  );
};

export default PostPreviewCard;
