import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(
  () => ({
    showMore: {
      margin: '20px 0 0 0',
    },
  }),
  { name: 'NewestContainer' },
);
interface IStyles {
  [propName: string]: React.CSSProperties;
}

export const styles: IStyles = {
  container: {
    minHeight: '600px',
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: 'calc(50% - 30px)',
    msTransform: 'translateY(-50%)',
    transform: 'translateY(-50%),',
  },
};
