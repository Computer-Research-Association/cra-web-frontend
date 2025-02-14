import{c as S,d as s,r as o,a as M,u as P,j as e,L as i}from"./index-Bg1EspJE.js";import{H as C}from"./HeightSpacer-CARO8HMd.js";import{A as N,C as a}from"./AlertModal-BLs01AFg.js";const L=S(r=>({isOpen:!1,openModal:()=>r({isOpen:!0}),closeModal:()=>r({isOpen:!1})})),E="_id_1823g_1",O="_password_1823g_3",A="_login_1823g_25",n={id:E,password:O,login:A,"search-link":"_search-link_1823g_109","register-link":"_register-link_1823g_125","checkbox-container":"_checkbox-container_1823g_137"},F=s.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 668px;
  padding-top: 5rem;
  padding-bottom: 10rem;
  margin: 0 auto;
  @media (max-width: 468px) {
    padding-top: 1rem;
  }
`,U=s.div`
  p {
    text-align: center;
    font-size: 40px;
    font-family: 'Pretendard Bold';
    line-height: 59px;
    margin-bottom: 70px;
    color: var(--color-bright-text);
    user-select: none;
    @media (max-width: 768px) {
      padding-top: 2rem;
      margin-bottom: 15px;
    }
    @media (max-width: 468px) {
      padding-top: 3rem;
      margin-bottom: 15px;
    }
  }
`,B=s.div`
  @media (max-width: 768px) {
    scale: 95%;
    padding: 0rem 1.5rem;
  }
  @media (max-width: 684px) {
    scale: 90%;
  }
  @media (max-width: 568px) {
    scale: 87.5%;
  }
  @media (max-width: 468px) {
    scale: 85%;
  }
`,z=s.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`,H=s.div`
  text-align: end;
  line-height: 34px;
  user-select: none;
`,q=s.div`
  input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* 화면 크기에 맞게 100%로 설정 */
    max-width: 662px; /* 최대 너비 설정 */
    height: 68px;
    background-color: var(--color-primary);
    border: none;
    border-radius: 10px;
    color: #ffffff;
    font-size: 30px;
    font-family: 'Pretendard Bold';
    margin-top: 40px;
    margin-bottom: 14px;
    cursor: pointer;
  }
`,I=s.div`
  width: 100%;
  line-height: 34px;
  margin: 1rem 0;
  text-align: center;
  font-size: 16px;
  font-family: 'Pretendard Medium';
  color: var(--color-dark-text);
  user-select: none;
`,R=s.div``,D=()=>{const[r,l]=o.useState(""),[d,p]=o.useState(""),[c,x]=o.useState(!1),{login:h}=M(),m=P(),{isOpen:g,openModal:u,closeModal:f}=L(),[w,j]=o.useState(""),v=async t=>{t.preventDefault();const y="epwj@kc*difmruvhal@2345fdhfbrcyh",b=a.enc.Utf8.parse("hgdfi!@54caswjcx"),k=a.AES.encrypt(d,a.enc.Utf8.parse(y),{iv:b,mode:a.mode.CBC,padding:a.pad.Pkcs7}).toString();try{await h({username:r,password:k}),m("/main")}catch(_){console.error("Login Handling Error: ",_),u(),j("모든 항목을 입력해 주세요.")}};return e.jsxs(F,{children:[e.jsx(U,{children:e.jsx("p",{children:"로그인"})}),e.jsxs(B,{children:[e.jsxs("form",{onSubmit:v,children:[e.jsxs("div",{className:n.id,children:[e.jsx("label",{htmlFor:"id",children:"Username"}),e.jsx("input",{type:"text",placeholder:"Enter the Username",value:r,onChange:t=>l(t.target.value),required:!0})]}),e.jsx(C,{space:28}),e.jsxs("div",{className:n.password,children:[e.jsx("label",{htmlFor:"password",children:"Password"}),e.jsx("div",{className:n["password-input-container"],children:e.jsx("input",{type:c?"text":"password",placeholder:"Enter the Password",value:d,onChange:t=>p(t.target.value),required:!0})})]}),e.jsxs(z,{children:[e.jsxs("div",{className:n["checkbox-container"],children:[e.jsx("input",{type:"checkbox",id:"show-password",checked:c,onChange:t=>x(t.target.checked)}),e.jsx("label",{htmlFor:"show-password",children:"비밀번호 보기"})]}),e.jsx(R,{children:e.jsxs(H,{children:[e.jsx(i,{to:"/idsearch",className:n["search-link"],children:"아이디 찾기"}),e.jsx("span",{children:"|"}),e.jsx(i,{to:"/pwsearch",className:n["search-link"],children:"비밀번호 찾기"})]})})]}),e.jsx(q,{children:e.jsx("input",{type:"submit",value:"로그인"})})]}),e.jsxs(I,{children:[e.jsx("span",{children:"혹시 계정이 없으신가요? "}),e.jsx(i,{to:"/register",className:n["register-link"],children:"회원가입하기"})]})]}),g&&e.jsx(N,{closeModal:f,message:w})]})};function G(){return e.jsx(e.Fragment,{children:e.jsx(D,{})})}export{G as default};
