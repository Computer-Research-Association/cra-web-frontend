import{d as r,u as i,j as e}from"./index-q5O6V7Yp.js";const l=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`,d=r.h2`
  line-height: 59px;
  color: var(--color-bright-text);
  font-size: 40px;
  text-align: center;
  margin-bottom: 70px;
`,a=r.form`
  width: 100%;
  max-width: 700px;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 3rem 10rem;
`,t=r.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  label {
    color: var(--color-dark);
    font-family: 'Pretendard SemiBold';
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    user-select: none;
  }
  input {
    width: 100%;
    background-color: var(--color-white);
    color: var(--color-dark-stroke);
    border: 1px solid var(--color-dark-stroke);
    border-radius: 0.5rem;
    padding: 1.5rem 1rem;
  }
`,s=r.button`
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
`;function m(){const o=i();return e.jsxs(l,{children:[e.jsx(d,{children:"아이디 찾기"}),e.jsxs(a,{children:[e.jsxs(t,{children:[e.jsx("label",{htmlFor:"studentNum",children:"학번"}),e.jsx("input",{type:"text",name:"studentNum",id:"studentNum",placeholder:"학번을 입력하세요."})]}),e.jsxs(t,{children:[e.jsx("label",{htmlFor:"studentNum",children:"이름"}),e.jsx("input",{type:"text",name:"studentNum",id:"studentNum",placeholder:"학번을 입력하세요."})]}),e.jsxs(t,{children:[e.jsx("label",{htmlFor:"email",children:"이메일"}),e.jsx("input",{type:"text",name:"email",id:"email",placeholder:"이메일을 입력하세요."})]}),e.jsx(s,{onClick:n=>{n.preventDefault(),o("/idsearch/complete")},children:"확인"})]})]})}export{m as default};
