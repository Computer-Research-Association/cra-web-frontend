import{k as n,b as s}from"./index-B8-MUm2i.js";const i=async a=>{try{return(await s.get(`/board/${a}`)).data}catch(t){throw console.log(t),t}},g=async(a,t=1,e=10,r=0)=>{try{return(await s.get(`/board/${a}/page/${t}`,{params:{perPage:e,orderBy:r,isASC:!1}})).data}catch(o){throw console.log(o),o}},y=async a=>{try{const e=(await n.get(`/board/view/${a}`)).data;return{...e,createdAt:e.createdAt?new Date(e.createdAt):new Date}}catch(t){throw console.log("⚠️ Error occurred while fetching board:",t),t}},w=async(a,t)=>{try{const e=new FormData;return e.append("board",new Blob([JSON.stringify(a)],{type:"application/json"})),t&&e.append("file",t),(await n.post("/board",e,{headers:{"Content-type":"multipart/form-data"}})).data}catch(e){throw console.log(e),e}},h=async(a,t)=>{try{const e=new FormData,r={title:a.title,content:a.content,imageUrls:a.imageUrls,isChangedFile:!!t,deleted:!1};e.append("board",new Blob([JSON.stringify(r)],{type:"application/json"})),t&&e.append("file",t);const o=window.location.href,c=o.substring(o.lastIndexOf("/")+1),d=Number(c);return(await n.put(`/board/${d}`,e,{headers:{"Content-type":"multipart/form-data"}})).data}catch(e){throw console.error("Update board error:",e),e}},m=async a=>{try{return(await n.delete(`/board/${a}`)).data}catch(t){throw console.log(t),t}},u=async a=>{const t=new FormData;t.append("image",a);try{const r=(await n.post("/image/upload",t,{headers:{"Content-Type":"multipart/form-data"}})).data;return console.log("받은 이미지 URL:",r),alert("이미지 업로드 성공"),r}catch(e){throw console.error("이미지 업로드 실패:",e),alert("이미지 업로드 실패"),e}};export{g as a,y as b,w as c,m as d,i as g,u as o,h as u};
