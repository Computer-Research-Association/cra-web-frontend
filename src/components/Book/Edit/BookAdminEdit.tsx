import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { Item } from '~/models/Item.ts';
import { getItemById, updateItem } from '~/api/item.ts';
import { onUploadImage } from '~/api/board.ts';
import styles from '../../Project/Project.module.css';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

function BookAdminEdit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    itemCategory: 0,
    imageUrl: '',
    isBorrowed: true,
  });
  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const itemId = Number(id);

  const itemQuery = useQuery<Item>({
    queryKey: QUERY_KEY.item.itemById(itemId),
    queryFn: async () => getItemById(itemId),
  });

  let content;

  const mutation = useMutation({
    mutationFn: (newItem: Item) => updateItem(newItem),
    onSuccess: async () => {
      await navigate(-1);
    },
    onError: (error) => {
      console.error('수정 실패:', error);
    },
  });

  useEffect(() => {
    if (itemQuery.isSuccess && itemQuery.data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...itemQuery.data,
      }));
    }
  }, [itemQuery.isSuccess, itemQuery.data]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    // 체크박스인 경우, checked 값을 사용하여 상태를 업데이트
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [name]: e.target.checked, // checked 값 (boolean)을 사용
      });
    } else if (files && files[0]) {
      const file = files[0];
      const imageUrl = await onUploadImage(file);

      if (imageUrl) {
        setFormData((formData) => ({ ...formData, imageUrl }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (itemQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (itemQuery.isError) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else if (itemQuery.isSuccess) {
    console.log(formData);
    return (
      <div className={styles['container']}>
        <form onSubmit={HandleSubmit}>
          <h1>도서 게시글 수정</h1>
          <label htmlFor="Name">도서명</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="도서명 입력"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="description">설명</label>
          <br />
          <input
            type="text"
            id="description"
            name="description"
            placeholder="설명 입력"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="imageSelect">이미지 선택</label>
          <br />
          <input
            type="file"
            id="imageSelect"
            name="imageSelect"
            accept="image/*"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="isBorrowed">대여중</label>
          <br />
          <input
            type="checkbox"
            id="isBorrowed"
            name="isBorrowed"
            checked={formData.isBorrowed}
            onChange={handleChange}
          />
          <br />

          <input type="submit" value="도서 수정" />
        </form>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default BookAdminEdit;
