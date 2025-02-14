import{b as _,j as e,L as m,r as A}from"./index-B8-MUm2i.js";import{u as d,Q as l}from"./queryKey-DyDI9S4Q.js";import{g as N}from"./havruta-LuL8oTP9.js";import{P as w}from"./Pagination-BxCoHlaV.js";import"./utils-km2FGkQ4.js";const C=async(s=1,r=10,a=0)=>{try{return(await _.get(`/board/havruta/page/${s}`,{params:{perPage:r,orderBy:a,isASC:!1}})).data}catch(o){throw console.log(o),o}},q=async()=>{try{return(await _.get("/board/havruta")).data}catch(s){throw console.log(s),s}},B=async(s,r=1,a=10,o=0)=>{try{return(await _.get(`/board/havruta/${s}/page/${r}`,{params:{perPage:a,orderBy:o,isASC:!1}})).data}catch(t){throw console.log(t),t}},H=async s=>{try{return(await _.get(`/board/havruta/${s}`)).data}catch(r){throw console.log(r),r}},j="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUUlEQVR4nLWOQQqAQAwD9wf6wSQXLfto9StKDguytDcNzKlD0tZ+jaRVUpiIWEqJ5EXyNgDOVAbQhzRwc9YYs0hyS6c995o+yj99ALCbUvosD9fANs0/T/xpAAAAAElFTkSuQmCC",I="_menu_1lri2_1",E="_menuItem_1lri2_35",S="_selected_1lri2_71",u={menu:I,menuItem:E,selected:S};function L({havrutaQuery:s,selectedHavrutaId:r,onHavrutaChange:a}){var o;return s.isLoading?e.jsx("div",{children:"로딩중..."}):s.isError?e.jsx("div",{children:"ERROR!"}):e.jsxs("ul",{className:u.menu,children:[e.jsx("h2",{children:"과목 목록"}),e.jsxs("li",{className:`${u.menuItem} ${r===null?u.selected:""}`,children:[e.jsx("img",{src:j}),e.jsx(m,{to:"#",onClick:()=>a(null),children:"전체"})]}),(o=s.data)==null?void 0:o.map(t=>e.jsxs("li",{className:`${u.menuItem} ${r===t.id?u.selected:""}`,children:[e.jsx("img",{src:j}),e.jsxs(m,{to:"#",onClick:()=>a(t.id??null),children:[t.className," (",t.professor,")"]})]},t.id))]})}const i={"board-item-container":"_board-item-container_smd4q_1","board-professor":"_board-professor_smd4q_17","board-time":"_board-time_smd4q_35","temp-link":"_temp-link_smd4q_47","board-title":"_board-title_smd4q_59","board-content":"_board-content_smd4q_77"};function P({havrutaBoard:s}){var r;return e.jsx(m,{to:`/havruta/view/${s.id}`,className:i["temp-link"],children:e.jsxs("div",{className:i["board-item-container"],children:[e.jsxs("div",{children:[e.jsxs("div",{className:i["board-professor"],children:[s.havrutaDto?e.jsxs(e.Fragment,{children:[s.havrutaDto.classname," (",s.havrutaDto.professor,")"]}):"정보 없음",e.jsx("span",{className:i["board-time"],children:(r=s.createdAt)==null?void 0:r.toString().substring(0,10)})]}),e.jsx("div",{className:i["board-title"],children:e.jsx("div",{className:i["board-title"],children:s.title})})]}),e.jsx("div",{className:i["board-content"],children:s.content})]})})}const $="_container_2s758_1",k="_sidebar_2s758_23",D="_content_2s758_43",K="_title_2s758_57",Q="_boardList_2s758_73",R="_loading_2s758_119",F="_error_2s758_127",U="_spacer_2s758_151",Y="_divider_2s758_193",n={container:$,sidebar:k,content:D,title:K,boardList:Q,"board-wrapper":"_board-wrapper_2s758_93",loading:R,error:F,"board-list-footer":"_board-list-footer_2s758_135",spacer:U,"write-link":"_write-link_2s758_159",divider:Y};function O({havrutaQuery:s,havrutaBoardQuery:r,totalPages:a,currentPage:o,selectedHavrutaId:t,onPageChange:h,onHavrutaChange:v}){const p=()=>{if(r.isLoading)return e.jsx("div",{children:e.jsx("div",{className:n["board-wrapper"],children:"데이터를 불러오는 중입니다..."})});if(r.isError)return e.jsx("div",{className:n["board-wrapper"],children:"에러가 발생했습니다!"});if(r.isSuccess)return r.data.length>0?r.data.filter(c=>c.id!==void 0).map((c,b)=>e.jsxs("div",{children:[e.jsx("div",{className:n["board-wrapper"],children:e.jsx(P,{havrutaBoard:c})}),b<r.data.length-1&&e.jsx("div",{className:n.divider})]},`havruta-${c.id}`)):e.jsx("div",{className:n["board-wrapper"],children:"게시글이 없습니다."})};return e.jsxs("div",{className:n.container,children:[e.jsx("div",{className:n.sidebar,children:e.jsx(L,{havrutaQuery:s,selectedHavrutaId:t,onHavrutaChange:v})}),e.jsxs("div",{className:n.content,children:[e.jsx("h2",{className:n.title,children:"하브루타 게시판"}),e.jsx("div",{className:n.boardList,children:p()}),e.jsxs("div",{className:n["board-list-footer"],children:[e.jsx("div",{className:n.spacer}),e.jsx(w,{totalPages:a,currentPage:o,onPageChange:h}),e.jsx(m,{className:n["write-link"],to:"/havruta/write",children:"글쓰기"})]})]})]})}function V(){var g,x;const[s,r]=A.useState(null),[a,o]=A.useState(0),t=10,h=d({queryKey:l.havrutaBoard.havrutaBoardsCount(),queryFn:async()=>q()}),v=d({queryKey:l.havrutaBoard.havrutaBoards(a),queryFn:async()=>C(a)}),p=d({queryKey:l.havrutaBoard.havrutaBoardsCountByHavrutaId(s??1),queryFn:async()=>s!==null?H(s):Promise.resolve([]),enabled:s!==null}),c=d({queryKey:l.havrutaBoard.havrutaBoardsByHavrutaId(s??1,a),queryFn:async()=>s!==null?B(s,a):Promise.resolve([]),enabled:s!==null}),b=d({queryKey:l.havruta.havrutas(),queryFn:async()=>N()}),y=s===null?((g=h.data)==null?void 0:g.length)??0:((x=p.data)==null?void 0:x.length)??0,f=Math.ceil(y/t);return e.jsx(O,{havrutaQuery:b,havrutaBoardQuery:s===null?v:c,totalPages:f,currentPage:a,selectedHavrutaId:s,onPageChange:o,onHavrutaChange:r})}function G(){return e.jsx("div",{children:e.jsx(V,{})})}export{G as default};
