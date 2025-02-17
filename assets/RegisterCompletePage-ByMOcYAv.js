import{d as e,u as s,j as r}from"./index-1BZRweRX.js";import{B as a}from"./Blue-Check-Bsu4bqEw.js";import{u as m}from"./registerStore-DXGE4k6v.js";const c=e.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20rem;
`,l=e.img`
  user-select: none;
`,d=e.p`
  color: var(--color-primary);
  font-size: 2.5rem;
  font-family: 'Pretendard Bold';
  margin: 3rem 0;
`,o=e.p`
  color: var(--color-bright-text);
  font-size: 1.5625rem;
  font-family: 'Pretendard Bold';
  padding: 0.25rem 0;
`,f=e.button`
  margin: 5rem 0 20rem 0;
  background-color: var(--color-primary);
  border: none;
  border-radius: 1rem;
  color: #ffffff;
  font-size: 2rem;
  padding: 1rem 5rem;
  font-family: 'Pretendard Bold';
  cursor: pointer;
`;function x(){const n=s(),{username:t,name:i}=m();return r.jsxs(c,{children:[r.jsx(l,{src:a}),r.jsx(d,{children:"회원가입 완료"}),r.jsxs(o,{children:[i," (",t,"),"]}),r.jsx(o,{children:"CRA의 회원이 되신 것을 진심으로 환영합니다."}),r.jsx(f,{onClick:()=>n("/login"),children:"로그인 바로하기"})]})}export{x as default};
