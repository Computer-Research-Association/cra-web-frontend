import{d as t,i as u,j as e,L as l}from"./index-1BZRweRX.js";import{Q as c,u as h}from"./queryKey-BdNitZrQ.js";import{d as m,a as p}from"./project-CNF7wR7K.js";import{u as b}from"./useMutation-9rSFg_mA.js";import"./utils-km2FGkQ4.js";const f=t.button`
  background: none;
  border: none;
  color: #da2b2b;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;function y({id:n}){const i=u(),r=b({mutationFn:o=>m(o),onSuccess:async()=>{alert("프로젝트 삭제 성공"),i.setQueryData(c.project.projects(),o=>o?o.filter(j=>j.id!==n):[]),await i.invalidateQueries({queryKey:c.project.projects()})},onError:o=>{console.error("프로젝트 삭제 실패",o),alert("프로젝트 삭제 실패")}}),x=()=>{r.mutate(n)};return e.jsx(f,{onClick:x,children:"삭제"})}const g=t.div`
  padding: 10rem;
`,v=t.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0rem;
  font-size: 1rem;
  text-align: left;
`,s=t.th`
  border-bottom: 2px solid black;
  padding: 10px;
`,d=t.td`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`,a=t(l)`
  padding: 0.25rem 0.5rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`,k=t.div`
  padding: 0.25rem 0.5rem;
  display: inline-block;
`,P=t(l)`
  color: #2cb4db;
  font-size: 1.25rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;function Q(){const n=h({queryKey:c.project.projects(),queryFn:async()=>p()});let i;return n.isLoading?i=e.jsx("div",{children:"로딩중..."}):n.isError?i=e.jsx("div",{children:"에러가 발생했습니다!"}):n.isSuccess&&(n.data.length===0?console.log("서버 통신 가능, 아직 데이터 없음"):i=e.jsxs(v,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx(s,{children:"ID"}),e.jsx(s,{children:"학기"}),e.jsx(s,{children:"팀 이름"}),e.jsx(s,{children:"서비스 이름"}),e.jsx(s,{children:"팀원"}),e.jsx(s,{children:"작업"})]})}),e.jsx("tbody",{children:n.data.map(r=>e.jsxs("tr",{children:[e.jsx(d,{children:r.id}),e.jsx(d,{children:r.semester}),e.jsx(d,{children:r.teamName}),e.jsx(d,{children:r.serviceName}),e.jsx(d,{children:r.members.join(", ")}),e.jsxs(d,{children:[e.jsx(a,{to:`/admin/project/view/${r.id}`,children:"자세히 보기"}),"|",e.jsx(a,{to:`/admin/project/edit/${r.id}`,children:"수정"}),"|"," ",e.jsx(k,{children:e.jsx(y,{id:r.id})})]})]},r.id))})]})),e.jsxs(g,{children:[e.jsx("h1",{children:"관리자 프로젝트 페이지"}),i,e.jsx(P,{to:"/admin/project/write",children:"새 프로젝트 생성"})]})}function A(){return e.jsx("div",{children:e.jsx(Q,{})})}export{A as default};
