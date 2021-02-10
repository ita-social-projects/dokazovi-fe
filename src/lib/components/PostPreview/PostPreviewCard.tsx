import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IPost } from '../../types';
import { useStyles } from '../../styles/PostPreviewCard.styles';
import PostDirectionLink from '../PostDirectionLink';

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

  const classes = useStyles();
  return (
    <Card className={classes.root} style={{ height: '265px' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Box position="relative" display="flex" flexDirection="column">
          <Box
            position="relative"
            display="flex"
            flexDirection="row"
            flexWrap="no-wrap"
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
              image={data.author?.avatar}
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
                {data.author?.mainInstitution?.city.name},{' '}
                {data.author?.mainInstitution?.name}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              {data.directions?.map((d) => {
                return <PostDirectionLink direction={d} key={d.id} />;
              })}
              <Typography
                style={{ fontStyle: 'italic' }}
                variant="subtitle2"
                component="h3"
              >
                {data.postType.name}
              </Typography>
            </Box>
          </Box>
          <CardContent style={{ paddingBottom: '0' }}>
            <Typography
              gutterBottom
              align="left"
              variant="h6"
              component="h3"
              onClick={goPostView}
            >
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
          </CardContent>
        </Box>
        <Typography
          style={{ fontStyle: 'italic', padding: '0 15px 15px 0' }}
          align="right"
          variant="body2"
        >
          {data.createdAt}
        </Typography>
      </Box>
    </Card>
  );
};

export default PostPreviewCard;
