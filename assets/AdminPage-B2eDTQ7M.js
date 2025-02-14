import{d as i,j as e,L as r}from"./index-Bg1EspJE.js";const t=i.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-family: 'Pretendard Medium';
  width: 80%;
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
`;function o(){return e.jsxs(t,{children:[e.jsx("p",{children:"어드민 홈 페이지입니다."}),e.jsx("p",{children:"환영합니다."})]})}const d=i.ul`
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
`,n=i.li`
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
`;function s(){return e.jsxs(d,{children:[e.jsx(n,{children:e.jsx(r,{to:"/admin",children:"관리자 홈"})}),e.jsx(n,{children:e.jsx(r,{to:"/admin/book",children:"도서 관리"})}),e.jsx(n,{children:e.jsx(r,{to:"/admin/item",children:"물품 관리"})}),e.jsx(n,{children:e.jsx(r,{to:"/admin/havruta",children:"하브루타 과목 관리"})}),e.jsx(n,{children:e.jsx(r,{to:"/admin/project",children:"프로젝트 관리"})})]})}const c=i.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 60%;
`;function a(){return e.jsxs(c,{children:[e.jsx(s,{}),e.jsx(o,{})]})}export{a as default};
