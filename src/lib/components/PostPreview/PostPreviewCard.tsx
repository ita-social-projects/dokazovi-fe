import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { DIRECTION_PROPERTIES } from '../../constants/direction-properties';
import { postTypeProperties } from '../../constants/post-type-properties';
import { IPost } from '../../types';
import { useStyles } from '../../styles/PostPreviewCard.styles';

export interface IPostPreviewCardProps {
  data: IPost;
}

const PostPreviewCard: React.FC<IPostPreviewCardProps> = (props) => {
  const { data } = props;

  let authorFullName = '';
  if (data.author?.firstName && data.author?.secondName) {
    authorFullName = `${data.author?.firstName} ${data.author?.secondName}`;
  }

  const classes = useStyles();
  return (
    <Card className={classes.root} style={{ height: '265px' }}>
      <Box position="relative" display="flex" flexDirection="column">
        <Box
          position="relative"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          style={{
            marginLeft: '14px',
            marginRight: '14px',
            marginTop: '10px',
          }}
        >
          <CardMedia
            style={{ padding: '15px', height: '58px', width: 46 }}
            className={classes.media}
            image={data.author?.photo}
            title={authorFullName}
          />
          <Box display="flex" flexDirection="column" justifyContent="start">
            <Typography
              align="left"
              variant="body1"
              component="h3"
              style={{ margin: '5px', textDecoration: 'underline' }}
            >
              {authorFullName}
            </Typography>
            <Typography
              align="left"
              variant="subtitle2"
              component="h3"
              style={{ padding: '5px' }}
            >
              {data.author?.workPlace}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              component="h3"
              style={{
                backgroundColor: DIRECTION_PROPERTIES[data.direction].color,
                borderRadius: '15px',
                padding: '0px 8px 0px 8px',
              }}
            >
              {DIRECTION_PROPERTIES[data.direction].name}
            </Typography>
            <Typography
              style={{ fontStyle: 'italic' }}
              variant="subtitle2"
              component="h3"
            >
              {postTypeProperties[data.postType].name}
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom align="left" variant="h6" component="h3">
            {data.title}
          </Typography>
          <Typography
            variant="body2"
            align="left"
            color="textSecondary"
            component="p"
          >
            {data.preview}
          </Typography>
          <Typography
            style={{ fontStyle: 'italic' }}
            align="right"
            variant="body2"
          >
            {data.createdAt.toLocaleDateString()}
          </Typography>
        </CardContent>
      </Box>
      <CardActions />
    </Card>
  );
};

export default PostPreviewCard;
