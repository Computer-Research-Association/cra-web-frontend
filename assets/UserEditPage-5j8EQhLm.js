import{u as g,D as v,r as f,j as e}from"./index-B8-MUm2i.js";import{u as I}from"./useMutation-BPYMXbH7.js";import{u as y}from"./user-c0oMh55C.js";import{s as r}from"./UserPage.module-5F34UAF7.js";import"./utils-km2FGkQ4.js";function F(){const s=g(),{name:u,email:i,studentId:m,term:o,githubId:l,setUser:d}=v(),[n,h]=f.useState({name:u,email:i,studentId:m,term:o,githubId:l}),c=I({mutationFn:async t=>(await y(t),t),onSuccess:t=>{s(`/user/${t.name}`),d(t)},onError:()=>{alert("에러")}}),x=t=>{t.preventDefault(),c.mutate(n)},a=t=>{const{name:p,value:b}=t.target;h(j=>({...j,[p]:b}))};return e.jsx("div",{className:r.container,children:e.jsxs("form",{onSubmit:x,children:[e.jsx("div",{className:r.title,children:"유저 정보 수정"}),e.jsx("label",{htmlFor:"name",children:"이름"}),e.jsx("input",{type:"text",id:"name",name:"name",value:n.name,onChange:a,required:!0}),e.jsx("label",{htmlFor:"email",children:"이메일"}),e.jsx("input",{type:"text",id:"email",name:"email",value:n.email,onChange:a,required:!0}),e.jsx("label",{htmlFor:"studentId",children:"학번"}),e.jsx("input",{type:"number",id:"studentId",name:"studentId",value:n.studentId,onChange:a,required:!0}),e.jsx("label",{htmlFor:"term",children:"기수"}),e.jsx("input",{type:"text",id:"term",name:"term",value:n.term,onChange:a,required:!0}),e.jsx("label",{htmlFor:"githubId",children:"GihHub 아이디"}),e.jsx("input",{type:"text",id:"githubId",name:"githubId",value:n.githubId,onChange:a,required:!0}),e.jsx("input",{type:"submit",value:"수정 확인",className:`${r.submit} ${r.formbutton}`})]})})}function N(){return e.jsx(F,{})}export{N as default};
