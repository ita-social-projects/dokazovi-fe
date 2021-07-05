import React from 'react';
import { Skeleton } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { useStyles } from './SkeletonPostPreviewCard.styles';

export const SkeletonPostPreviewCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} data-testid="skeleton">
      <Box
        className={classes.header}
        flexDirection="column"
        flexWrap="no-wrap"
        justifyContent="space-between"
      >
        <Skeleton className={classes.postType} component="span" />
      </Box>
      <Box className={classes.body}>
        <Skeleton component="h3" className={classes.textHeader} />
        <Skeleton
          color="textPrimary"
          component="p"
          className={classes.textBody}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={6}
        >
          <Skeleton component="span" color="textSecondary" width="60%" />
        </Box>
      </Box>
    </Card>
  );
};
