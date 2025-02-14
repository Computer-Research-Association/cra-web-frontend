import{r as d,b as Z,d as p,j as r,u as se,e as ne,s as ie}from"./index-q5O6V7Yp.js";import{H as le}from"./HeightSpacer-Dn6T5_Lr.js";import{A as de,C as R}from"./AlertModal-DOrHut45.js";import{W as L}from"./WidthSpacer-1C67X6Xe.js";import{u as ce}from"./registerStore-lvW8K9EB.js";var ue={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function me(t){if(typeof t=="number")return{value:t,unit:"px"};var o,i=(t.match(/^[0-9.]*/)||"").toString();i.includes(".")?o=parseFloat(i):o=parseInt(i,10);var e=(t.match(/[^0-9]*$/)||"").toString();return ue[e]?{value:o,unit:e}:(console.warn("React Spinners: ".concat(t," is not a valid css value. Defaulting to ").concat(o,"px.")),{value:o,unit:"px"})}function W(t){var o=me(t);return"".concat(o.value).concat(o.unit)}var pe=function(t,o,i){var e="react-spinners-".concat(t,"-").concat(i);if(typeof window>"u"||!window.document)return e;var n=document.createElement("style");document.head.appendChild(n);var f=n.sheet,x=`
    @keyframes `.concat(e,` {
      `).concat(o,`
    }
  `);return f&&f.insertRule(x,0),e},A=function(){return A=Object.assign||function(t){for(var o,i=1,e=arguments.length;i<e;i++){o=arguments[i];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},A.apply(this,arguments)},fe=function(t,o){var i={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(i[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(t);n<e.length;n++)o.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(t,e[n])&&(i[e[n]]=t[e[n]]);return i},ge=pe("ClipLoader","0% {transform: rotate(0deg) scale(1)} 50% {transform: rotate(180deg) scale(0.8)} 100% {transform: rotate(360deg) scale(1)}","clip");function H(t){var o=t.loading,i=o===void 0?!0:o,e=t.color,n=e===void 0?"#000000":e,f=t.speedMultiplier,x=f===void 0?1:f,v=t.cssOverride,C=v===void 0?{}:v,k=t.size,S=k===void 0?35:k,M=fe(t,["loading","color","speedMultiplier","cssOverride","size"]),g=A({background:"transparent !important",width:W(S),height:W(S),borderRadius:"100%",border:"2px solid",borderTopColor:n,borderBottomColor:"transparent",borderLeftColor:n,borderRightColor:n,display:"inline-block",animation:"".concat(ge," ").concat(.75/x,"s 0s infinite linear"),animationFillMode:"both"},C);return i?d.createElement("span",A({style:g},M)):null}const he=async t=>(await Z.post(`/account/valid/email-request?email=${t}`)).status,xe=async t=>(await Z.post(`/account/valid/email-code?code=${t}`)).status,ve=p.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;

  label {
    color: var(--color-dark);
    font-family: 'Pretendard SemiBold';
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    user-select: none;
  }

  input {
    background-color: var(--color-white);
    color: var(--color-dark-text);
    font-size: 1.25rem;
    border: 1px solid var(--color-dark-stroke);
    border-radius: 0.5rem;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    height: 66px;
    flex: 1;

    @media (max-width: 480px) {
      padding: 1.2rem 0.8rem;
    }
  }

  input:read-only {
    background-color: var(--color-background);
  }

  input.error {
    border-color: red;
  }

  div.error {
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    color: red;
    font-size: 1rem;
  }
`;function j({name:t,value:o,label:i,placeHolder:e,onChange:n,onBlur:f,valid:x,errorMessage:v}){return r.jsxs(ve,{children:[r.jsx("label",{htmlFor:t,children:i}),r.jsx("input",{type:"text",name:t,id:t,placeholder:e,value:o,onChange:n,onBlur:f,className:x?"":"error"}),!x&&r.jsx("div",{className:"error",children:v})]})}const be=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1600px;
  margin-bottom: 4rem;
  @media (max-width: 768px) {
    width: 80%;
  }
`,ye=p.h2`
  text-align: center;
  font-size: 40px;
  line-height: 59px;
  margin-bottom: 70px;
  color: var(--color-bright-text);
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`,we=p.form`
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 600px;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  button {
    background-color: var(--color-primary);
    color: var(--color-white);
    max-width: 400px;
    font-family: 'Pretendard Bold';
    font-size: 1.25rem;
    text-align: center;
    padding: 0.9rem 0;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
  }
`,je=p.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;

  label {
    color: var(--color-dark);
    font-family: 'Pretendard SemiBold';
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    user-select: none;
  }

  input {
    background-color: var(--color-white);
    color: var(--color-dark-text);
    font-size: 1.25rem;
    border: 1px solid var(--color-dark-stroke);
    border-radius: 0.5rem;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    height: 66px;
    flex: 1;

    @media (max-width: 480px) {
      padding: 1.2rem 0.8rem;
    }
  }

  input:read-only {
    background-color: var(--color-background);
  }

  input.error {
    border-color: red;
  }

  div.error {
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    color: red;
    font-size: 1rem;
  }
`,Ce=p.div`
  background-color: var(--color-white);
  color: var(--color-dark-text);
  font-size: 1.25rem;
  border: 1px solid var(--color-dark-stroke);
  border-radius: 0.5rem;
  box-sizing: border-box;
  height: 66px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;

  input {
    background-color: transparent;
    height: 100%;
    border: none;
  }
`,G=p.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ke=p.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 66px;
  width: 20%;

  &:disabled {
    background-color: gray;
    cursor: default;
    opacity: 0.6;
  }
`,Se=p.button`
  background-color: var(--color-secondary-button) !important;
  height: 66px;
  width: 17%;
`,Ie=p.button`
  height: 66px;
  width: 20%;
`,Ee=p.button`
  width: 20%;
  margin-top: 2rem;
`,Re=300;function Me(){const t=se(),{setName:o,setUserName:i}=ce(),[e,n]=d.useState({username:"",password:"",passwordCheck:"",studentId:"",name:"",email:"",term:"",githubId:"",code:""}),[f,x]=d.useState(""),[v,C]=d.useState(!1),[k,S]=d.useState(!1),[M,g]=d.useState(!1),[P,F]=d.useState(!1),[O,T]=d.useState(!1),[_,J]=d.useState(""),[b,V]=d.useState({}),[y,N]=d.useState({}),[K,c]=d.useState(""),[Q,l]=d.useState(!1),[B,q]=d.useState(0),[U,z]=d.useState(!1),X=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),D=(s,a)=>{if(!a)return{valid:!1,message:"값을 입력해 주세요."};if(s==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a))return{valid:!1,message:"올바르지 않은 이메일 형식입니다."};if(s==="studentId"){if(!/^\d+$/.test(a))return{valid:!1,message:"숫자로만 입력해 주세요."};if(a.length!=8)return{valid:!1,message:"8글자로 입력해 주세요."}}return s==="term"&&!/^\d{2}-\d$/.test(a)?{valid:!1,message:"올바른 형식이 아닙니다."}:s==="password"&&!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(a)?{valid:!1,message:"비밀번호는 8자 이상이어야 하며, 대문자와 특수 문자를 포함해야 합니다."}:s==="passwordCheck"&&a!==e.password?{valid:!1,message:"비밀번호가 일치하지 않습니다."}:{valid:!0,message:""}},Y=async()=>{var s;if(!v){if(C(!0),e.email===""){l(!0),c("이메일을 입력해 주세요."),C(!1);return}if(!X(e.email)){l(!0),c("올바른 이메일 형식이 아닙니다."),C(!1);return}try{await he(e.email)===200&&(F(!0),q(Re),z(!0),l(!0),c("이메일을 확인해 주세요."))}catch(a){if(ne.isAxiosError(a)&&((s=a.response)==null?void 0:s.status)===409){l(!0),c("이미 가입된 이메일입니다."),C(!1);return}l(!0),c("이메일 확인 중 에러가 발생하였습니다.")}C(!1)}},ee=async()=>{if(k)return;S(!0),await xe(f)===200?(l(!0),c("이메일 인증을 성공하였습니다."),F(!1),z(!1),T(!0)):(l(!0),c("이메일 인증 중 에러가 발생하였습니다.")),S(!1)},re=()=>{F(!1),z(!1),T(!1)},h=s=>{const{name:a,value:m}=s.target,{valid:I,message:E}=D(a,m);n(u=>({...u,[a]:m})),V(u=>({...u,[a]:!I})),N(u=>({...u,[a]:E}))},w=s=>{const{name:a,value:m}=s.target,{valid:I,message:E}=D(a,m);n(u=>({...u,[a]:m})),V(u=>({...u,[a]:!I})),N(u=>({...u,[a]:E}))},te=async s=>{if(s.preventDefault(),i(e.username),o(e.name),console.log(e.username),console.log(e.name),M)return;g(!0);for(const $ in e)if(!e[$]){l(!0),c("모든 항목을 입력해 주세요."),g(!1);return}const a=/^\d{2}-\d$/,m=/^\d+$/;if(e.password.length<8){l(!0),c("비밀번호는 8글자 이상이어야 합니다."),g(!1);return}if(!m.test(e.studentId)||e.studentId.length<8){l(!0),c("학번은 8글자 숫자로 이루어져야 합니다."),g(!1);return}if(!a.test(e.term)){l(!0),c("올바르지 않은 기수 번호입니다."),g(!1);return}if(e.password!==e.passwordCheck){l(!0),c("비밀번호가 일치하지 않습니다."),g(!1);return}if(!O){l(!0),c("이메일을 인증해주세요."),g(!1);return}const I="epwj@kc*difmruvhal@2345fdhfbrcyh",E=R.enc.Utf8.parse("hgdfi!@54caswjcx"),u=R.AES.encrypt(e.password,R.enc.Utf8.parse(I),{iv:E,mode:R.mode.CBC,padding:R.pad.Pkcs7}).toString();J("");const oe={...e,password:u,studentId:parseInt(e.studentId)};try{await ie(oe),l(!0),c("회원가입이 완료되었습니다."),t("/welcome")}catch($){$ instanceof Error&&(l(!0),c($.message))}finally{g(!1)}};d.useEffect(()=>{if(B>0&&U){const s=setInterval(()=>{q(a=>a-1)},1e3);return()=>clearInterval(s)}else B===0&&z(!1)},[B,U]);const ae=s=>{const a=Math.floor(s/60),m=s%60;return`${a}:${m<10?`0${m}`:m}`};return r.jsxs(be,{children:[r.jsx(ye,{children:"회원가입"}),r.jsxs(we,{onSubmit:te,children:[r.jsx(j,{name:"username",value:e.username,label:"아이디",placeHolder:"아이디를 입력해 주세요.",onChange:h,onBlur:w,valid:!b.username,errorMessage:y.username}),r.jsx(j,{name:"password",value:e.password,label:"비밀번호",placeHolder:"비밀번호를 입력해 주세요.",onChange:h,onBlur:w,valid:!b.password,errorMessage:y.password}),r.jsx(j,{name:"passwordCheck",value:e.passwordCheck,label:"비밀번호 확인",placeHolder:"비밀번호를 한번 더 입력해 주세요.",onChange:h,onBlur:w,valid:!b.passwordCheck,errorMessage:y.passwordCheck}),r.jsx(j,{name:"studentId",value:e.studentId,label:"학번 (22500123)",placeHolder:"학번을 입력해 주세요.",onChange:h,onBlur:w,valid:!b.studentId,errorMessage:y.studentId}),r.jsx(j,{name:"name",value:e.name,label:"이름",placeHolder:"이름을 입력해 주세요.",onChange:h,onBlur:w,valid:!b.name,errorMessage:y.name}),r.jsxs(je,{children:[r.jsx("label",{htmlFor:"name",children:"E-mail"}),r.jsxs(G,{children:[r.jsx("input",{type:"text",name:"email",id:"email",placeholder:"E-mail을 입력하세요.",value:e.email,onChange:h,readOnly:O||P||v||k})," ",r.jsx(L,{space:6}),r.jsx(ke,{type:"button",onClick:Y,disabled:O,children:v?r.jsx(H,{size:25,color:"#fff"}):"이메일 인증"})]}),P&&r.jsxs(r.Fragment,{children:[r.jsx(le,{space:6}),r.jsxs(G,{children:[r.jsxs(Ce,{children:[r.jsx("input",{type:"text",name:"emailCode",id:"emailCode",placeholder:"인증코드를 입력하세요.",value:f,onChange:s=>x(s.target.value),readOnly:O}),r.jsx(L,{space:30}),r.jsx("div",{children:ae(B)})]}),r.jsx(L,{space:6}),r.jsx(Se,{type:"button",onClick:re,children:"재전송"}),r.jsx(L,{space:6}),r.jsx(Ie,{type:"button",onClick:ee,children:k?r.jsx(H,{size:25,color:"#fff"}):"확인"})]})]})]}),r.jsx(j,{name:"term",value:e.term,label:"CRA 기수 (25-1)",placeHolder:"CRA 기수를 입력해 주세요.",onChange:h,onBlur:w,valid:!b.term,errorMessage:y.term}),r.jsx(j,{name:"githubId",value:e.githubId,label:"GitHub 아이디",placeHolder:"GitHub 아이디를 입력해 주세요.",onChange:h,onBlur:w,valid:!b.githubId,errorMessage:y.githubId}),r.jsx(j,{name:"code",value:e.code,label:"가입코드",placeHolder:"관리자로부터 받은 가입코드를 입력해 주세요.",onChange:h,onBlur:w,valid:!b.code,errorMessage:y.code}),_&&r.jsx("p",{style:{color:"red"},children:_}),r.jsx(Ee,{type:"submit",children:M?r.jsx(H,{size:25,color:"#fff"}):"확인"})]}),Q&&r.jsx(de,{closeModal:()=>l(!1),message:K})]})}function Ae(){return r.jsx(Me,{})}export{Ae as default};
