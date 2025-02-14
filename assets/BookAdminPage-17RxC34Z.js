import{d as t,i as p,j as e,L as u}from"./index-B6fNKAJy.js";import{Q as c,u as j}from"./queryKey-DewzWnt4.js";import{d as b,g as f}from"./item-D6pTh3fj.js";import{I as s}from"./itemCategory-Bnt1WtYm.js";import{u as g}from"./useMutation-CExOacJ0.js";import"./utils-km2FGkQ4.js";const y=t.button`
  background: none;
  border: none;
  color: #da2b2b;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;function k({id:o}){const r=p(),n=g({mutationFn:i=>b(i),onSuccess:async()=>{alert("도서 삭제 성공"),r.setQueryData(c.item.items(s.BOOK),l=>(console.log("Old Cached Data Before Update:",l),l?l.filter(m=>m.id!==o):[])),await r.invalidateQueries({queryKey:c.item.items(s.BOOK)});const i=r.getQueryData(c.item.items(s.BOOK));console.log("Updated Cached Data:",i)},onError:i=>{console.error("도서 삭제 실패",i),alert("도서 삭제 실패")}}),h=()=>{n.mutate(o)};return e.jsx(y,{onClick:h,children:"삭제"})}const B=t.div`
  padding: 10rem;
`,O=t.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0rem;
  font-size: 1rem;
  text-align: left;
`,a=t.th`
  border-bottom: 2px solid black;
  padding: 10px;
`,d=t.td`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`,x=t(u)`
  padding: 0.25rem 0.5rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`,v=t.div`
  padding: 0.25rem 0.5rem;
  display: inline-block;
`,C=t(u)`
  color: #2cb4db;
  font-size: 1.25rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;function K(){const o=j({queryKey:c.item.items(s.BOOK),queryFn:async()=>f(s.BOOK)});let r;return o.isLoading?r=e.jsx("div",{children:"로딩중..."}):o.isError?r=e.jsx("div",{children:"에러가 발생했습니다!"}):o.isSuccess&&(o.data.length===0?console.log("서버 통신 가능, 아직 데이터 없음"):r=e.jsxs(O,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx(a,{children:"id"}),e.jsx(a,{children:"제품명"}),e.jsx(a,{children:"설명"}),e.jsx(a,{children:"대여 가능 여부"})]})}),e.jsx("tbody",{children:o.data.map(n=>e.jsxs("tr",{children:[e.jsx(d,{children:n.id}),e.jsx(d,{children:n.name}),e.jsx(d,{children:n.description}),e.jsx(d,{children:n.isBorrowed?e.jsx("span",{children:"대여 불가능"}):e.jsx("span",{children:"대여 가능"})}),e.jsxs(d,{children:[e.jsx(x,{to:`/admin/book/view/${n.id}`,children:"자세히 보기"}),"|",e.jsx(x,{to:`/admin/book/edit/${n.id}`,children:"수정"}),"|"," ",e.jsx(v,{children:e.jsx(k,{id:n.id})})]})]},n.id))})]})),e.jsxs(B,{children:[e.jsx("h1",{children:"관리자 도서 페이지"}),r,e.jsx(C,{to:"/admin/book/write",children:"새 도서 추가"})]})}function T(){return e.jsx(K,{})}export{T as default};
