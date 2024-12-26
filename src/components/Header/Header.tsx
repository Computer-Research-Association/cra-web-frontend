import React from 'react';
import HeaderIntro from './HeaderIntro';
import HeaderMain from './HeaderMain';
import { useLocation } from 'react-router-dom';

// 현재 페이지가 Intro & Recruit 일 경우 Header_Intro 출력
// 현재 페이지가 Main과 관련된 경우 Header_Main 출력

export default function Header() {
  const location = useLocation();
  const isIntro = location.pathname === '/intro';
  const isRecruit = location.pathname === '/recruit';
  // console.log(location.pathname);
  return isIntro || isRecruit ? <HeaderIntro /> : <HeaderMain />;
}
