import{d as t,j as e}from"./index-B6fNKAJy.js";import{u as a,Q as m}from"./queryKey-DewzWnt4.js";import{a as x}from"./item-D6pTh3fj.js";import"./utils-km2FGkQ4.js";const h=t.div`
  padding: 10rem;
`,s=t.div`
  padding: 1rem 0;
  font-size: 1rem;
`,n=t.b`
  padding-right: 0.25rem;
`;function j(){const o=window.location.href,l=o.substring(o.lastIndexOf("/")+1),c=Number(l),r=a({queryKey:m.item.itemById(c),queryFn:async()=>x(c)});let d;if(r.isLoading)d=e.jsx("div",{className:"loading",children:"데이터를 불러오는 중입니다..."});else if(r.isError)d=e.jsx("div",{className:"error",children:"에러가 발생했습니다!"});else if(r.isSuccess){const i=r.data;return e.jsxs(h,{children:[e.jsx("h1",{children:"도서 자세히 보기"}),e.jsxs(s,{children:[e.jsx(n,{children:"ID:"})," ",i.id]}),e.jsxs(s,{children:[e.jsx(n,{children:"도서명:"})," ",i.name]}),e.jsxs(s,{children:[e.jsx(n,{children:"설명:"})," ",i.description]}),e.jsxs(s,{children:[e.jsx(n,{children:"이미지 URL:"})," ",i.imageUrl]}),e.jsxs(s,{children:[e.jsx(n,{children:"대여 가능 여부:"})," ",i.isBorrowed?e.jsx("span",{children:"대여 중"}):e.jsx("span",{children:"대여 가능"})]})]})}return e.jsx("div",{children:d})}function y(){return e.jsx("div",{children:e.jsx(j,{})})}export{y as default};
