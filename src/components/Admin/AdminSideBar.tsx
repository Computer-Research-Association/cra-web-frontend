import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Menu = styled.ul`
  display: flex;
  width: 20%;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
`;

const MenuItem = styled.li`
  margin: 1rem 0;
  border-radius: 10%;
  a {
    text-decoration: none;
    font-family: 'Pretendard SemiBold';
    font-size: 18px;
    color: var(--color-brighter-text);
    transition: color 0.5s;
    &:hover {
      color: var(--color-bright-text);
    }
  }
`;

export default function AdminSideBar() {
  return (
    <Menu>
      {/* <MenuItem>
        <Link to="/admin">관리자 홈</Link>
      </MenuItem> */}
      <MenuItem>
        <Link to="/admin/notice/write">공지글 쓰기</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/admin/book">도서 관리</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/admin/item">비품 관리</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/admin/havruta">하브루타 과목 관리</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/admin/project">프로젝트 관리</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/admin/code">가입코드 생성</Link>
      </MenuItem>
    </Menu>
  );
}
