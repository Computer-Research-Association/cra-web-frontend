import{d as t,j as e}from"./index-B8-MUm2i.js";import{u as a,Q as m}from"./queryKey-DyDI9S4Q.js";import{a as x}from"./item-DNDuFyEr.js";import"./utils-km2FGkQ4.js";const h=t.div`
  padding: 10rem;
`,i=t.div`
  padding: 1rem 0;
  font-size: 1rem;
`,n=t.b`
  padding-right: 0.25rem;
`;function j(){const c=window.location.href,l=c.substring(c.lastIndexOf("/")+1),o=Number(l),r=a({queryKey:m.item.itemById(o),queryFn:async()=>x(o)});let d;if(r.isLoading)d=e.jsx("div",{className:"loading",children:"데이터를 불러오는 중입니다..."});else if(r.isError)d=e.jsx("div",{className:"error",children:"에러가 발생했습니다!"});else if(r.isSuccess){const s=r.data;return e.jsxs(h,{children:[e.jsx("h1",{children:"비품 자세히 보기"}),e.jsxs(i,{children:[e.jsx(n,{children:"ID:"})," ",s.id]}),e.jsxs(i,{children:[e.jsx(n,{children:"이름:"})," ",s.name]}),e.jsxs(i,{children:[e.jsx(n,{children:"설명:"})," ",s.description]}),e.jsxs(i,{children:[e.jsx(n,{children:"이미지 URLs:"})," ",s.imageUrl]}),e.jsxs(i,{children:[e.jsx(n,{children:"대여 가능 여부:"})," ",s.isBorrowed?e.jsx("span",{children:"대여 중"}):e.jsx("span",{children:"대여 가능"})]})]})}return e.jsx("div",{children:d})}function I(){return e.jsx("div",{children:e.jsx(j,{})})}export{I as default};
