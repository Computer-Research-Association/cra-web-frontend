import { Routes, Route, Navigate } from 'react-router-dom';
import IntroPage from './Intro/IntroPage';
import RecruitPage from './Recruit/RecruitPage';
import MainPage from './Main/MainPage';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';
import AcademicPage from './Board/Academic/AcademicPage';
import AcademicDetailPage from './Board/Academic/AcademicDetailPage';
import AcademicEditPage from './Board/Academic/AcademicEditPage';
import AcademicWritePage from './Board/Academic/AcademicWritePage';
import BookPage from './Board/Book/BookPage';
import BookDetailPage from './Board/Book/BookDetailPage';
import BookWritePage from './Board/Book/BookWritePage';
import BookEditPage from './Board/Book/BookEditPage';
import EquipmentPage from './Board/Equipment/EquipmentPage';
import EquipmentDetailPage from './Board/Equipment/EquipmentDetailPage';
import EquipmentEditPage from './Board/Equipment/EquipmentEditPage';
import EquipmentWritePage from './Board/Equipment/EquipmentWritePage';
import HavrutaPage from './Board/Havruta/HavrutaPage';
import HavrutaDetailPage from './Board/Havruta/HavrutaDetailPage';
import HavrutaEditPage from './Board/Havruta/HavrutaEditPage';
import HavrutaWritePage from './Board/Havruta/HavrutaWritePage';
import NoticePage from './Board/Notice/NoticePage';
import NoticeDetailPage from './Board/Notice/NoticeDetailPage';
import NoticeEditPage from './Board/Notice/NoticeEditPage';
import NoticeWritePage from './Board/Notice/NoticeWritePage';
import AdminPage from './Admin/AdminPage';
import IDSearchPage from './Login/Search/ID/IDSearchPage';
import PWSearchPage from './Login/Search/PW/PWSearchPage';
import ProjectPage from './Board/Project/ProjectPage';
import ProjectDetailPage from './Board/Project/ProjectDetailPage';
import ProjectEditPage from './Board/Project/ProjectEditPage';
import ProjectWritePage from './Board/Project/ProjectWritePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/intro" />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/recruit" element={<RecruitPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/academic" element={<AcademicPage />} />
      <Route path="/academic/view/:id" element={<AcademicDetailPage />} />
      <Route path="/academic/edit/:id" element={<AcademicEditPage />} />
      <Route path="/academic/write" element={<AcademicWritePage />} />
      <Route path="/book" element={<BookPage />} />
      <Route path="/book/view/:id" element={<BookDetailPage />} />
      <Route path="/book/edit/:id" element={<BookEditPage />} />
      <Route path="/book/write" element={<BookWritePage />} />
      <Route path="/equip" element={<EquipmentPage />} />
      <Route path="/equip/view/:id" element={<EquipmentDetailPage />} />
      <Route path="/equip/edit/:id" element={<EquipmentEditPage />} />
      <Route path="/equip/write" element={<EquipmentWritePage />} />
      <Route path="/havruta" element={<HavrutaPage />} />
      <Route path="/havruta/view/:id" element={<HavrutaDetailPage />} />
      <Route path="/havruta/edit/:id" element={<HavrutaEditPage />} />
      <Route path="/havruta/write" element={<HavrutaWritePage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/notice/view/:id" element={<NoticeDetailPage />} />
      <Route path="/notice/edit/:id" element={<NoticeEditPage />} />
      <Route path="/notice/write" element={<NoticeWritePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/idsearch" element={<IDSearchPage />} />
      <Route path="/pwsearch" element={<PWSearchPage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/project/view/:id" element={<ProjectDetailPage />} />
      <Route path="/project/edit/:id" element={<ProjectEditPage />} />
      <Route path="/project/write" element={<ProjectWritePage />} />
    </Routes>
  );
}
