import styled from 'styled-components';
import FolderCategoryButton from './FolderCategoryButton';
import { Fragment, useCallback, useEffect, useState } from 'react';
import useAsync from '../../hooks/useAsync';
import { getFolders } from '../../api/api';

const ENTIRE_CATEGORY = {
  id: 0,
  name: '전체',
};

function FolderCategory({ onGetCategory }) {
  const [categories, setCategories] = useState([]);
  const [, foldersLoadingError, getFoldersAsync] = useAsync(getFolders);

  const handleLoad = useCallback(
    async () => {
      const result = await getFoldersAsync();
      if (!result) {
        return;
      }
      const { data } = { ...result };

      setCategories([ENTIRE_CATEGORY, ...data]);
    }, [getFoldersAsync],
  );

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <FolderCategoryStyle>
      {categories.map((category) => {
        return (
          <Fragment key={category.id}>
            <FolderCategoryButton category={category} onGetCategory={onGetCategory}></FolderCategoryButton>
            {foldersLoadingError?.message && <span>{foldersLoadingError.message}</span>}
          </Fragment>
        );
      })
      }
    </FolderCategoryStyle>
    
  );
}

export default FolderCategory;

const FolderCategoryStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  row-gap: 1.2rem;
  column-gap: 0.8rem;
  width: 100%;
  flex-wrap: wrap;
`;
