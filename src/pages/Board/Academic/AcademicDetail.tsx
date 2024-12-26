import React from 'react';
import { Link } from 'react-router-dom';
import BoardDetail from '../../../components/Board/BoardDetail';
import { CATEGORY } from '../../../constants/category';

export default function AcademicDetail() {
  return <BoardDetail category={CATEGORY.ACADEMIC} />;
}
