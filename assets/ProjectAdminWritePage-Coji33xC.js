import{u as h,r as p,j as e}from"./index-B8-MUm2i.js";import{u as j}from"./useMutation-BPYMXbH7.js";import{c as b}from"./project-UDcisoRJ.js";import{o as g}from"./board-BG_76WWX.js";import{s as v}from"./Project.module-Dpi1qAxQ.js";import"./utils-km2FGkQ4.js";function U(){const c=h(),[t,s]=p.useState({semester:"",teamName:"",serviceName:"",content:"",gitHubUrl:"",serviceUrl:"",members:[""],imageUrl:""}),u=j({mutationFn:a=>b(a),onSuccess:async()=>{await alert("프로젝트 게시글 작성 성공"),c(-1),s({semester:"",teamName:"",serviceName:"",content:"",gitHubUrl:"",serviceUrl:"",members:[""],imageUrl:""})},onError:a=>{console.error("프로젝트 작성 실패:",a),alert("프로젝트 작성 실패")}}),r=async a=>{const{name:l,value:m,files:n}=a.target;if(n&&n[0]){const i=n[0],o=await g(i);o&&s(x=>({...x,imageUrl:o}))}else s(i=>({...i,[l]:l==="members"?m.split(","):m}))},d=a=>{a.preventDefault(),console.log("Sending Data:",t),u.mutate(t)};return e.jsx("div",{className:v.container,children:e.jsxs("form",{onSubmit:d,children:[e.jsx("h2",{children:"프로젝트 게시글 작성"}),e.jsx("label",{htmlFor:"semester",children:"학기"}),e.jsx("input",{type:"text",id:"semester",name:"semester",placeholder:"진행된 학기를 입력하세요 (예: 24-2)",value:t.semester,onChange:r,required:!0}),e.jsx("br",{}),e.jsx("label",{htmlFor:"teamName",children:"팀 이름"}),e.jsx("input",{type:"text",id:"teamName",name:"teamName",placeholder:"팀 이름을 입력하세요",value:t.teamName,onChange:r,required:!0}),e.jsx("br",{}),e.jsx("label",{htmlFor:"title",children:"서비스 이름"}),e.jsx("input",{type:"text",id:"serviceName",name:"serviceName",placeholder:"서비스 이름을 입력하세요",value:t.serviceName,onChange:r,required:!0}),e.jsx("br",{}),e.jsx("label",{htmlFor:"content",children:"내용"}),e.jsx("input",{type:"text",id:"content",name:"content",placeholder:"내용을 입력하세요",value:t.content,onChange:r,required:!0}),e.jsx("br",{}),e.jsx("label",{htmlFor:"gitHubUrl",children:"GitHub 주소"}),e.jsx("input",{type:"text",id:"gitHubUrl",name:"gitHubUrl",placeholder:"깃허브 주소를 입력하세요",value:t.gitHubUrl,onChange:r,required:!0}),e.jsx("br",{}),e.jsx("label",{htmlFor:"serviceUrl",children:"서비스 URL"}),e.jsx("input",{type:"text",id:"serviceUrl",name:"serviceUrl",placeholder:"서비스 주소를 입력하세요",value:t.serviceUrl,onChange:r,required:!0}),e.jsx("br",{}),e.jsx("label",{htmlFor:"members",children:"팀원"}),e.jsx("input",{type:"text",id:"members",name:"members",placeholder:"팀원들의 이름을 입력하세요",value:t.members.join(","),onChange:r,required:!0}),e.jsx("br",{}),e.jsx("label",{htmlFor:"imageSelect",children:"이미지 선택"}),e.jsx("input",{type:"file",id:"imageSelect",name:"imageSelect",accept:"image/*",onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"submit",value:"게시글 작성"})]})})}function S(){return e.jsx("div",{children:e.jsx(U,{})})}export{S as default};
