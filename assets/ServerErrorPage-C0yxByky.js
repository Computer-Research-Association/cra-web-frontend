import{d as t,u as n,j as r}from"./index-Bg1EspJE.js";import{H as s,S as i,W as c}from"./Vector-skyblue-DpGTPkBR.js";import"./Status_Crang-D4rL2o8g.js";const a=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
  margin-bottom: 20rem;
  font-family: 'Pretendard Bold';
  p {
    color: #2cb4db;
  }
  button {
    font-family: 'Pretendard Bold';
  }
`,d=t.div`
  p {
    text-align: center;
  }
  margin-bottom: 5rem;
`,l=t.p`
  font-size: 1.875rem;
  margin-bottom: 3rem;
`,o=t.p`
  color: #8c8c8c !important;
  font-size: 1.5625rem;
`,m=t.div`
  button {
    font-size: 1.5rem;
    text-align: center;
    border-radius: 0.5rem;
    padding: 0.75rem 2rem;
    margin: 0 1.25rem;
    user-select: none;
    transition: transform 0.2s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`,b=t.button`
  color: #2cb4db;
  border: 2px solid #2cb4db;
`,f=t.button`
  background-color: #2cb4db;
  color: #ffffff;
  border: 2px solid #2cb4db;
`;function g(){const e=n();return r.jsxs(a,{children:[r.jsx(s,{statusCode:500}),r.jsxs(d,{children:[r.jsx(l,{children:"Internel Server Error"}),r.jsx(o,{children:"존재하지 않는 주소를 입력하셨거나,"}),r.jsx(o,{children:"요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다."})]}),r.jsxs(m,{children:[r.jsxs(b,{onClick:()=>e("/"),children:["메인으로 ",r.jsx("img",{src:i})]}),r.jsxs(f,{onClick:()=>e(-1),children:["이전으로 ",r.jsx("img",{src:c})]})]})]})}export{g as default};
