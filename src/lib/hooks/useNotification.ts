import { useSnackbar } from 'notistack';

export enum NotificationTypeEnum {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export const useNotification = (): ((
  text: string,
  type: NotificationTypeEnum,
) => void) => {
  const { enqueueSnackbar } = useSnackbar();

  return (text: string, type: NotificationTypeEnum): void => {
    enqueueSnackbar(text, { variant: type });
  };
};
