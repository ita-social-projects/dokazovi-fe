import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectSize, setChangesSize } from 'models/changeLog';
import { fetchChangeLog } from 'old/lib/utilities/API/api';
import { useActions } from 'shared/hooks';
import {
  AuthorListDropdown,
  PageSizeType,
} from 'views/Profile/AuthorsList/AuthorListDropdown';
import { useTranslation } from 'react-i18next';
import { langTokens } from 'locales/localizationInit';
import { Pagination, Skeleton } from '@material-ui/lab';

type ContentChangesType = {
  id: number;
  title: string;
  changes: string;
  dateOfChange: Date;
};
const changesPerPage: PageSizeType = [10, 20, 50, 'All'];

export const ChangeLog: React.FC = () => {
  const [changes, setChanges] = useState<ContentChangesType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const size = useSelector(selectSize);
  const [pages, setPages] = useState(0);
  const [setSizePerPage] = useActions([setChangesSize]);
  const [totalPages, setTotalPages] = useState(size);
  const { t } = useTranslation();

  const handleNotesToShowChange = (val: number | unknown) => {
    setPages(0);
    setSizePerPage(val);
  };

  useEffect(() => {
    const changedMaterials = async () => {
      setIsLoading(true);
      if (typeof size === 'string') {
        const { data } = await fetchChangeLog();
        setChanges(data?.content || []);
        return setIsLoading(false);
      }
      const { data } = await fetchChangeLog({ size, page: pages });
      setTotalPages(data?.totalPages || 0);
      setChanges(data?.content || []);
      return setIsLoading(false);
    };
    changedMaterials();
  }, [size, pages]);

  return (
    <>
      <Typography component="h2" variant="h2">
        {t(langTokens.admin.changesList)}
      </Typography>
      <Box mt={3}>
        <AuthorListDropdown
          pageSizes={changesPerPage || 'All'}
          setChanges={handleNotesToShowChange}
          selected={size || 'All'}
        />
        <List>
          {isLoading
            ? changes.map((item) => {
                return (
                  <Skeleton
                    key={item.id}
                    width="65%"
                    component="div"
                    style={{ marginLeft: '16px' }}
                  >
                    <ListItem>
                      <Typography variant="h6" component="h2" />
                    </ListItem>
                  </Skeleton>
                );
              })
            : changes.map((item) => {
                return (
                  <ListItem key={item.id}>
                    <Typography variant="h6" component="h2">
                      {item.title} {item.changes}:{' '}
                      {new Date(item.dateOfChange).toUTCString()}
                    </Typography>
                  </ListItem>
                );
              })}
          {!changes.length && (
            <Typography component="h2" variant="h2">
              {t(langTokens.admin.noChangesLog)}
            </Typography>
          )}
        </List>
        {totalPages && totalPages > 1 && !isLoading && (
          <Pagination
            count={totalPages}
            onChange={(_, value: number) => setPages(value - 1)}
            page={pages + 1}
          />
        )}
      </Box>
    </>
  );
};
