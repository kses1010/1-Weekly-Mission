import styled from 'styled-components';
import FolderCategoryButton from './FolderCategoryButton';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import useAsync from '../../hooks/useAsync';
import { getFolders } from '../../api/api';
import add_icon from '../../assets/svg/add-folder.svg';
import Modal from '../Modal/Modal';
import FolderModal from '../Modal/FolderModal';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const ENTIRE_CATEGORY = {
  id: 0,
  name: '전체',
};

function FolderCategory({ onGetCategory }) {
  const modalRef = useRef();
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const openModal = ({ isOpen }) => {
    setIsOpen(isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useOnClickOutside(modalRef, closeModal);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <FolderCategoryContainer>
      <FolderCategoryStyle>
        {categories.map((category) =>
          <Fragment key={category.id}>
            <FolderCategoryButton category={category} onGetCategory={onGetCategory}></FolderCategoryButton>
            {foldersLoadingError?.message && <span>{foldersLoadingError.message}</span>}
          </Fragment>,
        )}
      </FolderCategoryStyle>
      <FolderAddButton onClick={() => {
        openModal({
          isOpen: true,
        });
      }}>
        <FolderAddName>폴더 추가</FolderAddName>
        <FolderAddIcon src={add_icon} alt='폴더 추가 아이콘' />
      </FolderAddButton>
      {isOpen && (
        <Modal>
          <FolderModal action='add' onCloseModal={closeModal} ref={modalRef} />
        </Modal>
      )}
    </FolderCategoryContainer>
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

const FolderCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  @media (min-width: 768px) {
    width: 70.4rem;
  }

  @media (min-width: 1024px) {
    width: 106rem;
  }
`;

const FolderAddButton = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    gap: 0.4rem;
  }
`;

const FolderAddName = styled.p`
  color: #6d6afe;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.3px;
  white-space: nowrap;
`;

const FolderAddIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;
