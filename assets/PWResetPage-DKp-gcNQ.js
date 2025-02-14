import{d as r,u as i,j as e}from"./index-q5O6V7Yp.js";const a=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15rem 0;
`,l=r.h2`
  line-height: 59px;
  color: var(--color-bright-text);
  font-size: 40px;
  text-align: center;
  margin-bottom: 70px;
`,c=r.form`
  width: 100%;
  max-width: 700px;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 3rem 4rem;
`,t=r.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  label {
    color: var(--color-dark);
    font-family: 'Pretendard SemiBold';
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    transform: translateY(1.25rem);
    user-select: none;
  }
  input {
    width: 100%;
    background-color: var(--color-white);
    color: var(--color-dark-stroke);
    border: 1px solid var(--color-dark-stroke);
    border-radius: 0.5rem;
    padding: 1.5rem 1rem;
    transform: translateX(-2rem);
  }
`,d=r.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 1.5rem;
  font-family: 'Pretendard Bold';
  border-radius: 1rem;
  border: none;
  padding: 1rem 0;
  margin: 4rem 0 2rem 0;
  user-select: none;
  cursor: pointer;
`;function m(){const o=i();return e.jsxs(a,{children:[e.jsx(l,{children:"비밀번호 재설정"}),e.jsxs(c,{children:[e.jsxs(t,{children:[e.jsx("label",{htmlFor:"newPW",children:"새 비밀번호"}),e.jsx("input",{type:"text",name:"newPW",id:"newPW",placeholder:"새 비밀번호을 입력하세요."})]}),e.jsxs(t,{children:[e.jsx("label",{htmlFor:"checkPW",children:"비밀번호 확인"}),e.jsx("input",{type:"text",name:"checkPW",id:"checkPW",placeholder:"새 비밀번호을 입력해주세요."})]}),e.jsx(d,{onClick:n=>{n.preventDefault(),o("/pwsearch/complete")},children:"확인"})]})]})}export{m as default};
