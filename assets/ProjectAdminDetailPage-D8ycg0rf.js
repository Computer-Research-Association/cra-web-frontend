import{d as t,j as e}from"./index-B6fNKAJy.js";import{u as j,Q as a}from"./queryKey-DewzWnt4.js";import{g as x}from"./project-CsAc1-cW.js";import"./utils-km2FGkQ4.js";const h=t.div`
  padding: 10rem;
`,s=t.div`
  padding: 1rem 0;
  font-size: 1rem;
`,i=t.b`
  padding-right: 0.25rem;
`;function m(){const c=window.location.href;console.log(c);const l=c.substring(c.lastIndexOf("/")+1),o=Number(l),n=j({queryKey:a.project.projectById(o),queryFn:async()=>x(o)});let d;if(n.isLoading)d=e.jsx("div",{className:"loading",children:"데이터를 불러오는 중입니다..."});else if(n.isError)d=e.jsx("div",{className:"error",children:"에러가 발생했습니다!"});else if(n.isSuccess){const r=n.data;return e.jsxs(h,{children:[e.jsx("h1",{children:"프로젝트 자세히 보기"}),e.jsxs(s,{children:[e.jsx(i,{children:"ID:"})," ",r.id]}),e.jsxs(s,{children:[e.jsx(i,{children:"학기:"})," ",r.semester]}),e.jsxs(s,{children:[e.jsx(i,{children:"팀 이름:"})," ",r.teamName]}),e.jsxs(s,{children:[e.jsx(i,{children:"서비스 이름:"})," ",r.serviceName]}),e.jsxs(s,{children:[e.jsx(i,{children:"내용:"})," ",r.content]}),e.jsxs(s,{children:[e.jsx(i,{children:"GitHub 주소:"})," ",r.gitHubUrl]}),e.jsxs(s,{children:[e.jsx(i,{children:"서비스 주소:"})," ",r.serviceUrl]}),e.jsxs(s,{children:[e.jsx(i,{children:"팀원:"})," ",r.members.join(", ")]}),e.jsxs(s,{children:[e.jsx(i,{children:"이미지 URL:"})," ",r.imageUrl]})]})}return e.jsx("div",{children:d})}function v(){return e.jsx("div",{children:e.jsx(m,{})})}export{v as default};
