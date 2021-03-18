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

const VIEWS_COUNT = 100;

const PostPreviewCard: React.FC<IPostPreviewCardProps> = (props) => {
  const classes = useStyles();
  const { data, shouldNotUseLink } = props;
  const expertLink = `/experts/${data.author.id}`;
  const postLink = `/posts/${data.id}`;
  const authorFullName = `${data.author.firstName} ${data.author.lastName}`;
  const authorMainInstitution = data.author.mainInstitution
    ? `${data.author.mainInstitution.city.name}, ${data.author.mainInstitution.name}`
    : '';

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
            variant="overline"
            component="span"
          >
            {data.postType.name}
          </Typography>
          <Typography variant="h5" component="span">
            {authorFullName}
          </Typography>
        </Box>
        <CardMedia
          className={classes.avatar}
          image={data.author.avatar} // paste default avatar if not present
          title={authorFullName}
        />
      </Box>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="span"
        gutterBottom
      >
        {authorMainInstitution}
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
        <Typography gutterBottom variant="h4" component="h3">
          {data.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
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
          <Typography
            variant="caption"
            className={classes.viewsCount}
            color="textSecondary"
          >
            {VIEWS_COUNT}
          </Typography>
        </Box>
        <Typography variant="caption" color="textSecondary">
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
