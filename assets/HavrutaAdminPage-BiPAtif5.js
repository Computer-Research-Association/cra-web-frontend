import{d as n,i as x,j as e,L as c}from"./index-q5O6V7Yp.js";import{Q as a,u as h}from"./queryKey-C20MtJkg.js";import{d as m,g as j}from"./havruta-B-uEpZd0.js";import{u as f}from"./useMutation-CjRpVrXN.js";import"./utils-km2FGkQ4.js";const p=n.button`
  background: none;
  border: none;
  color: #da2b2b;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;function v({id:r}){const i=x(),t=f({mutationFn:o=>m(o),onSuccess:async()=>{i.setQueryData(a.havruta.havrutas(),o=>o?o.filter(u=>u.id!==r):[]),await i.invalidateQueries({queryKey:a.havruta.havrutas()})},onError:o=>{console.error("하브루타 삭제 실패",o)}}),l=()=>{window.confirm("정말로 삭제하시겠습니까?")&&t.mutate(r)};return e.jsx(p,{onClick:l,children:"삭제"})}const b=n.div``,y=n.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0rem;
  font-size: 1rem;
  text-align: left;
`,d=n.th`
  border-bottom: 2px solid black;
  padding: 10px;
`,s=n.td`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`,g=n(c)`
  padding: 0.25rem 0.5rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`,k=n.div`
  padding: 0.25rem 0.5rem;
  display: inline-block;
`,D=n(c)`
  color: #2cb4db;
  font-size: 1.25rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;function H(){const r=h({queryKey:a.havruta.havrutas(),queryFn:async()=>j()});let i;return r.isLoading?i=e.jsx("div",{children:"로딩중..."}):r.isError?i=e.jsx("div",{children:"에러가 발생했습니다!"}):r.isSuccess&&(r.data.length===0?console.log("서버 통신 가능, 아직 데이터 없음"):i=e.jsxs(y,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx(d,{children:"ID"}),e.jsx(d,{children:"과목명"}),e.jsx(d,{children:"교수명"})]})}),e.jsx("tbody",{children:r.data.map(t=>e.jsxs("tr",{children:[e.jsx(s,{children:t.id}),e.jsx(s,{children:t.className}),e.jsx(s,{children:t.professor}),e.jsxs(s,{children:[e.jsx(g,{to:`/admin/havruta/edit/${t.id}`,children:"수정"}),"|",e.jsx(k,{children:e.jsx(v,{id:t.id})})]})]},t.id))})]})),e.jsxs(b,{children:[e.jsx("h1",{children:"관리자 Havruta 페이지"}),i,e.jsx(D,{to:"./admin/havruta/write",children:"새 하브루타 생성"})]})}function A(){return e.jsx("div",{children:e.jsx(H,{})})}export{A as default};
