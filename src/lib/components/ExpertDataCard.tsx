import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IExpert } from '../types';
import { useStyles } from '../styles/ExpertDataCard.styles';
import PostDirectionLink from './PostDirectionLink';

export interface IExpertDataCardProps {
  expert: IExpert;
}

const ExpertDataCard: React.FC<IExpertDataCardProps> = (props) => {
  const { expert } = props;
  const history = useHistory();
  const fullName = `${expert.firstName} ${expert.lastName}`;
  const mainInsitutionCity = expert.mainInstitution?.city?.name || '';
  const mainInsitutionName = expert.mainInstitution?.name || '';
  const expertLastPost = expert.lastAddedPost?.id || '';

  const goExpertPage = () => {
    history.push(`/experts/${expert.id}`);
  };

  const goPostPage = () => {
    history.push(`/posts/${expertLastPost}`);
  };

  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box
          style={{
            height: 210,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <Typography
            className={classes.name}
            onClick={goExpertPage}
            variant="h5"
          >
            {fullName}
          </Typography>
          <Box>
            Спеціалізація:{' '}
            {expert.directions?.map((d) => {
              return <PostDirectionLink direction={d} key={d.id} />;
            })}
          </Box>
          <div>
            <Typography variant="body1" component="h2">
              {mainInsitutionCity}
            </Typography>
            <Typography
              className={classes.pos}
              onClick={goExpertPage}
              variant="body1"
              component="h2"
            >
              {mainInsitutionName}
            </Typography>
          </div>
          {expert.lastAddedPost && (
            <div style={{ cursor: 'pointer' }}>
              <Typography variant="body2" color="textSecondary">
                Останній доданий матеріал:
              </Typography>
              <Typography variant="h6" component="p" onClick={goPostPage}>
                {expert.lastAddedPost?.title}
              </Typography>
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertDataCard;
