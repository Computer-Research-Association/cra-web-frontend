import{r as F,j as n,L as cn}from"./index-1BZRweRX.js";import{H as rn,V as on,a as ln}from"./Arrow-Vector2-QfIn2702.js";const an=e=>{const[t,c]=F.useState(0),[i,l]=F.useState([]),r=F.useCallback(o=>{e&&e.scrollTo(o)},[e]),s=F.useCallback(o=>{l(o.scrollSnapList())},[]),a=F.useCallback(o=>{c(o.selectedScrollSnap())},[]);return F.useEffect(()=>{e&&(s(e),a(e),e.on("reInit",s).on("reInit",a).on("select",a))},[e,s,a]),{selectedIndex:t,scrollSnaps:i,onDotButtonClick:r}},un=e=>{const{children:t,...c}=e;return n.jsx("button",{type:"button",...c,children:t})};function dn(e){return Object.prototype.toString.call(e)==="[object Object]"}function ze(e){return dn(e)||Array.isArray(e)}function fn(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function Le(e,t){const c=Object.keys(e),i=Object.keys(t);if(c.length!==i.length)return!1;const l=JSON.stringify(Object.keys(e.breakpoints||{})),r=JSON.stringify(Object.keys(t.breakpoints||{}));return l!==r?!1:c.every(s=>{const a=e[s],o=t[s];return typeof a=="function"?`${a}`==`${o}`:!ze(a)||!ze(o)?a===o:Le(a,o)})}function $e(e){return e.concat().sort((t,c)=>t.name>c.name?1:-1).map(t=>t.options)}function mn(e,t){if(e.length!==t.length)return!1;const c=$e(e),i=$e(t);return c.every((l,r)=>{const s=i[r];return Le(l,s)})}function Te(e){return typeof e=="number"}function Ee(e){return typeof e=="string"}function be(e){return typeof e=="boolean"}function Ge(e){return Object.prototype.toString.call(e)==="[object Object]"}function O(e){return Math.abs(e)}function Ce(e){return Math.sign(e)}function me(e,t){return O(e-t)}function pn(e,t){if(e===0||t===0||O(e)<=O(t))return 0;const c=me(O(e),O(t));return O(c/e)}function hn(e){return Math.round(e*100)/100}function pe(e){return he(e).map(Number)}function z(e){return e[ge(e)]}function ge(e){return Math.max(0,e.length-1)}function De(e,t){return t===ge(e)}function He(e,t=0){return Array.from(Array(e),(c,i)=>t+i)}function he(e){return Object.keys(e)}function Ue(e,t){return[e,t].reduce((c,i)=>(he(i).forEach(l=>{const r=c[l],s=i[l],a=Ge(r)&&Ge(s);c[l]=a?Ue(r,s):s}),c),{})}function Ie(e,t){return typeof t.MouseEvent<"u"&&e instanceof t.MouseEvent}function xn(e,t){const c={start:i,center:l,end:r};function i(){return 0}function l(o){return r(o)/2}function r(o){return t-o}function s(o,u){return Ee(e)?c[e](o):e(t,o,u)}return{measure:s}}function xe(){let e=[];function t(l,r,s,a={passive:!0}){let o;if("addEventListener"in l)l.addEventListener(r,s,a),o=()=>l.removeEventListener(r,s,a);else{const u=l;u.addListener(s),o=()=>u.removeListener(s)}return e.push(o),i}function c(){e=e.filter(l=>l())}const i={add:t,clear:c};return i}function gn(e,t,c,i){const l=xe(),r=1e3/60;let s=null,a=0,o=0;function u(){l.add(e,"visibilitychange",()=>{e.hidden&&f()})}function j(){v(),l.clear()}function p(g){if(!o)return;s||(s=g);const d=g-s;for(s=g,a+=d;a>=r;)c(),a-=r;const _=a/r;i(_),o&&(o=t.requestAnimationFrame(p))}function h(){o||(o=t.requestAnimationFrame(p))}function v(){t.cancelAnimationFrame(o),s=null,a=0,o=0}function f(){s=null,a=0}return{init:u,destroy:j,start:h,stop:v,update:c,render:i}}function jn(e,t){const c=t==="rtl",i=e==="y",l=i?"y":"x",r=i?"x":"y",s=!i&&c?-1:1,a=j(),o=p();function u(f){const{height:x,width:g}=f;return i?x:g}function j(){return i?"top":c?"right":"left"}function p(){return i?"bottom":c?"left":"right"}function h(f){return f*s}return{scroll:l,cross:r,startEdge:a,endEdge:o,measureSize:u,direction:h}}function ce(e=0,t=0){const c=O(e-t);function i(u){return u<e}function l(u){return u>t}function r(u){return i(u)||l(u)}function s(u){return r(u)?i(u)?e:t:u}function a(u){return c?u-c*Math.ceil((u-t)/c):u}return{length:c,max:t,min:e,constrain:s,reachedAny:r,reachedMax:l,reachedMin:i,removeOffset:a}}function qe(e,t,c){const{constrain:i}=ce(0,e),l=e+1;let r=s(t);function s(h){return c?O((l+h)%l):i(h)}function a(){return r}function o(h){return r=s(h),p}function u(h){return j().set(a()+h)}function j(){return qe(e,a(),c)}const p={get:a,set:o,add:u,clone:j};return p}function _n(e,t,c,i,l,r,s,a,o,u,j,p,h,v,f,x,g,d,_){const{cross:S,direction:N}=e,C=["INPUT","SELECT","TEXTAREA"],E={passive:!1},w=xe(),y=xe(),I=ce(50,225).constrain(v.measure(20)),A={mouse:300,touch:400},L={mouse:500,touch:600},P=f?43:25;let $=!1,G=0,H=0,ne=!1,Z=!1,K=!1,Q=!1;function le(b){if(!_)return;function T(B){(be(_)||_(b,B))&&ue(B)}const M=t;w.add(M,"dragstart",B=>B.preventDefault(),E).add(M,"touchmove",()=>{},E).add(M,"touchend",()=>{}).add(M,"touchstart",T).add(M,"mousedown",T).add(M,"touchcancel",k).add(M,"contextmenu",k).add(M,"click",X,!0)}function U(){w.clear(),y.clear()}function re(){const b=Q?c:t;y.add(b,"touchmove",V,E).add(b,"touchend",k).add(b,"mousemove",V,E).add(b,"mouseup",k)}function oe(b){const T=b.nodeName||"";return C.includes(T)}function J(){return(f?L:A)[Q?"mouse":"touch"]}function ae(b,T){const M=p.add(Ce(b)*-1),B=j.byDistance(b,!f).distance;return f||O(b)<I?B:g&&T?B*.5:j.byIndex(M.get(),0).distance}function ue(b){const T=Ie(b,i);Q=T,K=f&&T&&!b.buttons&&$,$=me(l.get(),s.get())>=2,!(T&&b.button!==0)&&(oe(b.target)||(ne=!0,r.pointerDown(b),u.useFriction(0).useDuration(0),l.set(s),re(),G=r.readPoint(b),H=r.readPoint(b,S),h.emit("pointerDown")))}function V(b){if(!Ie(b,i)&&b.touches.length>=2)return k(b);const M=r.readPoint(b),B=r.readPoint(b,S),q=me(M,G),Y=me(B,H);if(!Z&&!Q&&(!b.cancelable||(Z=q>Y,!Z)))return k(b);const te=r.pointerMove(b);q>x&&(K=!0),u.useFriction(.3).useDuration(.75),a.start(),l.add(N(te)),b.preventDefault()}function k(b){const M=j.byDistance(0,!1).index!==p.get(),B=r.pointerUp(b)*J(),q=ae(N(B),M),Y=pn(B,q),te=P-10*Y,W=d+Y/50;Z=!1,ne=!1,y.clear(),u.useDuration(te).useFriction(W),o.distance(q,!f),Q=!1,h.emit("pointerUp")}function X(b){K&&(b.stopPropagation(),b.preventDefault(),K=!1)}function R(){return ne}return{init:le,destroy:U,pointerDown:R}}function bn(e,t){let i,l;function r(p){return p.timeStamp}function s(p,h){const f=`client${(h||e.scroll)==="x"?"X":"Y"}`;return(Ie(p,t)?p:p.touches[0])[f]}function a(p){return i=p,l=p,s(p)}function o(p){const h=s(p)-s(l),v=r(p)-r(i)>170;return l=p,v&&(i=p),h}function u(p){if(!i||!l)return 0;const h=s(l)-s(i),v=r(p)-r(i),f=r(p)-r(l)>170,x=h/v;return v&&!f&&O(x)>.1?x:0}return{pointerDown:a,pointerMove:o,pointerUp:u,readPoint:s}}function vn(){function e(c){const{offsetTop:i,offsetLeft:l,offsetWidth:r,offsetHeight:s}=c;return{top:i,right:l+r,bottom:i+s,left:l,width:r,height:s}}return{measure:e}}function Sn(e){function t(i){return e*(i/100)}return{measure:t}}function wn(e,t,c,i,l,r,s){const a=[e].concat(i);let o,u,j=[],p=!1;function h(g){return l.measureSize(s.measure(g))}function v(g){if(!r)return;u=h(e),j=i.map(h);function d(_){for(const S of _){if(p)return;const N=S.target===e,C=i.indexOf(S.target),E=N?u:j[C],w=h(N?e:i[C]);if(O(w-E)>=.5){g.reInit(),t.emit("resize");break}}}o=new ResizeObserver(_=>{(be(r)||r(g,_))&&d(_)}),c.requestAnimationFrame(()=>{a.forEach(_=>o.observe(_))})}function f(){p=!0,o&&o.disconnect()}return{init:v,destroy:f}}function yn(e,t,c,i,l,r){let s=0,a=0,o=l,u=r,j=e.get(),p=0;function h(){const E=i.get()-e.get(),w=!o;let y=0;return w?(s=0,c.set(i),e.set(i),y=E):(c.set(e),s+=E/o,s*=u,j+=s,e.add(s),y=j-p),a=Ce(y),p=j,C}function v(){const E=i.get()-t.get();return O(E)<.001}function f(){return o}function x(){return a}function g(){return s}function d(){return S(l)}function _(){return N(r)}function S(E){return o=E,C}function N(E){return u=E,C}const C={direction:x,duration:f,velocity:g,seek:h,settled:v,useBaseFriction:_,useBaseDuration:d,useFriction:N,useDuration:S};return C}function Nn(e,t,c,i,l){const r=l.measure(10),s=l.measure(50),a=ce(.1,.99);let o=!1;function u(){return!(o||!e.reachedAny(c.get())||!e.reachedAny(t.get()))}function j(v){if(!u())return;const f=e.reachedMin(t.get())?"min":"max",x=O(e[f]-t.get()),g=c.get()-t.get(),d=a.constrain(x/s);c.subtract(g*d),!v&&O(g)<r&&(c.set(e.constrain(c.get())),i.useDuration(25).useBaseFriction())}function p(v){o=!v}return{shouldConstrain:u,constrain:j,toggleActive:p}}function En(e,t,c,i,l){const r=ce(-t+e,0),s=p(),a=j(),o=h();function u(f,x){return me(f,x)<1}function j(){const f=s[0],x=z(s),g=s.lastIndexOf(f),d=s.indexOf(x)+1;return ce(g,d)}function p(){return c.map((f,x)=>{const{min:g,max:d}=r,_=r.constrain(f),S=!x,N=De(c,x);return S?d:N||u(g,_)?g:u(d,_)?d:_}).map(f=>parseFloat(f.toFixed(3)))}function h(){if(t<=e+l)return[r.max];if(i==="keepSnaps")return s;const{min:f,max:x}=a;return s.slice(f,x)}return{snapsContained:o,scrollContainLimit:a}}function In(e,t,c){const i=t[0],l=c?i-e:z(t);return{limit:ce(l,i)}}function Ln(e,t,c,i){const r=t.min+.1,s=t.max+.1,{reachedMin:a,reachedMax:o}=ce(r,s);function u(h){return h===1?o(c.get()):h===-1?a(c.get()):!1}function j(h){if(!u(h))return;const v=e*(h*-1);i.forEach(f=>f.add(v))}return{loop:j}}function Tn(e){const{max:t,length:c}=e;function i(r){const s=r-t;return c?s/-c:0}return{get:i}}function Cn(e,t,c,i,l){const{startEdge:r,endEdge:s}=e,{groupSlides:a}=l,o=p().map(t.measure),u=h(),j=v();function p(){return a(i).map(x=>z(x)[s]-x[0][r]).map(O)}function h(){return i.map(x=>c[r]-x[r]).map(x=>-O(x))}function v(){return a(u).map(x=>x[0]).map((x,g)=>x+o[g])}return{snaps:u,snapsAligned:j}}function Dn(e,t,c,i,l,r){const{groupSlides:s}=l,{min:a,max:o}=i,u=j();function j(){const h=s(r),v=!e||t==="keepSnaps";return c.length===1?[r]:v?h:h.slice(a,o).map((f,x,g)=>{const d=!x,_=De(g,x);if(d){const S=z(g[0])+1;return He(S)}if(_){const S=ge(r)-z(g)[0]+1;return He(S,z(g)[0])}return f})}return{slideRegistry:u}}function On(e,t,c,i,l){const{reachedAny:r,removeOffset:s,constrain:a}=i;function o(f){return f.concat().sort((x,g)=>O(x)-O(g))[0]}function u(f){const x=e?s(f):a(f),g=t.map((_,S)=>({diff:j(_-x,0),index:S})).sort((_,S)=>O(_.diff)-O(S.diff)),{index:d}=g[0];return{index:d,distance:x}}function j(f,x){const g=[f,f+c,f-c];if(!e)return f;if(!x)return o(g);const d=g.filter(_=>Ce(_)===x);return d.length?o(d):z(g)-c}function p(f,x){const g=t[f]-l.get(),d=j(g,x);return{index:f,distance:d}}function h(f,x){const g=l.get()+f,{index:d,distance:_}=u(g),S=!e&&r(g);if(!x||S)return{index:d,distance:f};const N=t[d]-_,C=f+j(N,0);return{index:d,distance:C}}return{byDistance:h,byIndex:p,shortcut:j}}function An(e,t,c,i,l,r,s){function a(p){const h=p.distance,v=p.index!==t.get();r.add(h),h&&(i.duration()?e.start():(e.update(),e.render(1),e.update())),v&&(c.set(t.get()),t.set(p.index),s.emit("select"))}function o(p,h){const v=l.byDistance(p,h);a(v)}function u(p,h){const v=t.clone().set(p),f=l.byIndex(v.get(),h);a(f)}return{distance:o,index:u}}function Mn(e,t,c,i,l,r,s,a){const o={passive:!0,capture:!0};let u=0;function j(v){if(!a)return;function f(x){if(new Date().getTime()-u>10)return;s.emit("slideFocusStart"),e.scrollLeft=0;const _=c.findIndex(S=>S.includes(x));Te(_)&&(l.useDuration(0),i.index(_,0),s.emit("slideFocus"))}r.add(document,"keydown",p,!1),t.forEach((x,g)=>{r.add(x,"focus",d=>{(be(a)||a(v,d))&&f(g)},o)})}function p(v){v.code==="Tab"&&(u=new Date().getTime())}return{init:j}}function fe(e){let t=e;function c(){return t}function i(o){t=s(o)}function l(o){t+=s(o)}function r(o){t-=s(o)}function s(o){return Te(o)?o:o.get()}return{get:c,set:i,add:l,subtract:r}}function Ke(e,t){const c=e.scroll==="x"?s:a,i=t.style;let l=null,r=!1;function s(h){return`translate3d(${h}px,0px,0px)`}function a(h){return`translate3d(0px,${h}px,0px)`}function o(h){if(r)return;const v=hn(e.direction(h));v!==l&&(i.transform=c(v),l=v)}function u(h){r=!h}function j(){r||(i.transform="",t.getAttribute("style")||t.removeAttribute("style"))}return{clear:j,to:o,toggleActive:u}}function Fn(e,t,c,i,l,r,s,a,o){const j=pe(l),p=pe(l).reverse(),h=d().concat(_());function v(w,y){return w.reduce((I,A)=>I-l[A],y)}function f(w,y){return w.reduce((I,A)=>v(I,y)>0?I.concat([A]):I,[])}function x(w){return r.map((y,I)=>({start:y-i[I]+.5+w,end:y+t-.5+w}))}function g(w,y,I){const A=x(y);return w.map(L=>{const P=I?0:-c,$=I?c:0,G=I?"end":"start",H=A[L][G];return{index:L,loopPoint:H,slideLocation:fe(-1),translate:Ke(e,o[L]),target:()=>a.get()>H?P:$}})}function d(){const w=s[0],y=f(p,w);return g(y,c,!1)}function _(){const w=t-s[0]-1,y=f(j,w);return g(y,-c,!0)}function S(){return h.every(({index:w})=>{const y=j.filter(I=>I!==w);return v(y,t)<=.1})}function N(){h.forEach(w=>{const{target:y,translate:I,slideLocation:A}=w,L=y();L!==A.get()&&(I.to(L),A.set(L))})}function C(){h.forEach(w=>w.translate.clear())}return{canLoop:S,clear:C,loop:N,loopPoints:h}}function kn(e,t,c){let i,l=!1;function r(o){if(!c)return;function u(j){for(const p of j)if(p.type==="childList"){o.reInit(),t.emit("slidesChanged");break}}i=new MutationObserver(j=>{l||(be(c)||c(o,j))&&u(j)}),i.observe(e,{childList:!0})}function s(){i&&i.disconnect(),l=!0}return{init:r,destroy:s}}function Bn(e,t,c,i){const l={};let r=null,s=null,a,o=!1;function u(){a=new IntersectionObserver(f=>{o||(f.forEach(x=>{const g=t.indexOf(x.target);l[g]=x}),r=null,s=null,c.emit("slidesInView"))},{root:e.parentElement,threshold:i}),t.forEach(f=>a.observe(f))}function j(){a&&a.disconnect(),o=!0}function p(f){return he(l).reduce((x,g)=>{const d=parseInt(g),{isIntersecting:_}=l[d];return(f&&_||!f&&!_)&&x.push(d),x},[])}function h(f=!0){if(f&&r)return r;if(!f&&s)return s;const x=p(f);return f&&(r=x),f||(s=x),x}return{init:u,destroy:j,get:h}}function Pn(e,t,c,i,l,r){const{measureSize:s,startEdge:a,endEdge:o}=e,u=c[0]&&l,j=f(),p=x(),h=c.map(s),v=g();function f(){if(!u)return 0;const _=c[0];return O(t[a]-_[a])}function x(){if(!u)return 0;const _=r.getComputedStyle(z(i));return parseFloat(_.getPropertyValue(`margin-${o}`))}function g(){return c.map((_,S,N)=>{const C=!S,E=De(N,S);return C?h[S]+j:E?h[S]+p:N[S+1][a]-_[a]}).map(O)}return{slideSizes:h,slideSizesWithGaps:v,startGap:j,endGap:p}}function Vn(e,t,c,i,l,r,s,a,o){const{startEdge:u,endEdge:j,direction:p}=e,h=Te(c);function v(d,_){return pe(d).filter(S=>S%_===0).map(S=>d.slice(S,S+_))}function f(d){return d.length?pe(d).reduce((_,S,N)=>{const C=z(_)||0,E=C===0,w=S===ge(d),y=l[u]-r[C][u],I=l[u]-r[S][j],A=!i&&E?p(s):0,L=!i&&w?p(a):0,P=O(I-L-(y+A));return N&&P>t+o&&_.push(S),w&&_.push(d.length),_},[]).map((_,S,N)=>{const C=Math.max(N[S-1]||0);return d.slice(C,_)}):[]}function x(d){return h?v(d,c):f(d)}return{groupSlides:x}}function Rn(e,t,c,i,l,r,s){const{align:a,axis:o,direction:u,startIndex:j,loop:p,duration:h,dragFree:v,dragThreshold:f,inViewThreshold:x,slidesToScroll:g,skipSnaps:d,containScroll:_,watchResize:S,watchSlides:N,watchDrag:C,watchFocus:E}=r,w=2,y=vn(),I=y.measure(t),A=c.map(y.measure),L=jn(o,u),P=L.measureSize(I),$=Sn(P),G=xn(a,P),H=!p&&!!_,ne=p||!!_,{slideSizes:Z,slideSizesWithGaps:K,startGap:Q,endGap:le}=Pn(L,I,A,c,ne,l),U=Vn(L,P,g,p,I,A,Q,le,w),{snaps:re,snapsAligned:oe}=Cn(L,G,I,A,U),J=-z(re)+z(K),{snapsContained:ae,scrollContainLimit:ue}=En(P,J,oe,_,w),V=H?ae:oe,{limit:k}=In(J,V,p),X=qe(ge(V),j,p),R=X.clone(),D=pe(c),b=({dragHandler:ie,scrollBody:ye,scrollBounds:Ne,options:{loop:je}})=>{je||Ne.constrain(ie.pointerDown()),ye.seek()},T=({scrollBody:ie,translate:ye,location:Ne,offsetLocation:je,previousLocation:Xe,scrollLooper:Ye,slideLooper:Ze,dragHandler:We,animation:en,eventHandler:ke,scrollBounds:nn,options:{loop:Be}},Pe)=>{const Ve=ie.settled(),tn=!nn.shouldConstrain(),Re=Be?Ve:Ve&&tn;Re&&!We.pointerDown()&&(en.stop(),ke.emit("settle")),Re||ke.emit("scroll");const sn=Ne.get()*Pe+Xe.get()*(1-Pe);je.set(sn),Be&&(Ye.loop(ie.direction()),Ze.loop()),ye.to(je.get())},M=gn(i,l,()=>b(we),ie=>T(we,ie)),B=.68,q=V[X.get()],Y=fe(q),te=fe(q),W=fe(q),se=fe(q),de=yn(Y,W,te,se,h,B),ve=On(p,V,J,k,se),Se=An(M,X,R,de,ve,se,s),Ae=Tn(k),Me=xe(),Qe=Bn(t,c,s,x),{slideRegistry:Fe}=Dn(H,_,V,ue,U,D),Je=Mn(e,c,Fe,Se,de,Me,s,E),we={ownerDocument:i,ownerWindow:l,eventHandler:s,containerRect:I,slideRects:A,animation:M,axis:L,dragHandler:_n(L,e,i,l,se,bn(L,l),Y,M,Se,de,ve,X,s,$,v,f,d,B,C),eventStore:Me,percentOfView:$,index:X,indexPrevious:R,limit:k,location:Y,offsetLocation:W,previousLocation:te,options:r,resizeHandler:wn(t,s,l,c,L,S,y),scrollBody:de,scrollBounds:Nn(k,W,se,de,$),scrollLooper:Ln(J,k,W,[Y,W,te,se]),scrollProgress:Ae,scrollSnapList:V.map(Ae.get),scrollSnaps:V,scrollTarget:ve,scrollTo:Se,slideLooper:Fn(L,P,J,Z,K,re,V,W,c),slideFocus:Je,slidesHandler:kn(t,s,N),slidesInView:Qe,slideIndexes:D,slideRegistry:Fe,slidesToScroll:U,target:se,translate:Ke(L,t)};return we}function zn(){let e={},t;function c(u){t=u}function i(u){return e[u]||[]}function l(u){return i(u).forEach(j=>j(t,u)),o}function r(u,j){return e[u]=i(u).concat([j]),o}function s(u,j){return e[u]=i(u).filter(p=>p!==j),o}function a(){e={}}const o={init:c,emit:l,off:s,on:r,clear:a};return o}const $n={align:"center",axis:"x",container:null,slides:null,containScroll:"trimSnaps",direction:"ltr",slidesToScroll:1,inViewThreshold:0,breakpoints:{},dragFree:!1,dragThreshold:10,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0,watchFocus:!0};function Gn(e){function t(r,s){return Ue(r,s||{})}function c(r){const s=r.breakpoints||{},a=he(s).filter(o=>e.matchMedia(o).matches).map(o=>s[o]).reduce((o,u)=>t(o,u),{});return t(r,a)}function i(r){return r.map(s=>he(s.breakpoints||{})).reduce((s,a)=>s.concat(a),[]).map(e.matchMedia)}return{mergeOptions:t,optionsAtMedia:c,optionsMediaQueries:i}}function Hn(e){let t=[];function c(r,s){return t=s.filter(({options:a})=>e.optionsAtMedia(a).active!==!1),t.forEach(a=>a.init(r,e)),s.reduce((a,o)=>Object.assign(a,{[o.name]:o}),{})}function i(){t=t.filter(r=>r.destroy())}return{init:c,destroy:i}}function _e(e,t,c){const i=e.ownerDocument,l=i.defaultView,r=Gn(l),s=Hn(r),a=xe(),o=zn(),{mergeOptions:u,optionsAtMedia:j,optionsMediaQueries:p}=r,{on:h,off:v,emit:f}=o,x=L;let g=!1,d,_=u($n,_e.globalOptions),S=u(_),N=[],C,E,w;function y(){const{container:D,slides:b}=S;E=(Ee(D)?e.querySelector(D):D)||e.children[0];const M=Ee(b)?E.querySelectorAll(b):b;w=[].slice.call(M||E.children)}function I(D){const b=Rn(e,E,w,i,l,D,o);if(D.loop&&!b.slideLooper.canLoop()){const T=Object.assign({},D,{loop:!1});return I(T)}return b}function A(D,b){g||(_=u(_,D),S=j(_),N=b||N,y(),d=I(S),p([_,...N.map(({options:T})=>T)]).forEach(T=>a.add(T,"change",L)),S.active&&(d.translate.to(d.location.get()),d.animation.init(),d.slidesInView.init(),d.slideFocus.init(R),d.eventHandler.init(R),d.resizeHandler.init(R),d.slidesHandler.init(R),d.options.loop&&d.slideLooper.loop(),E.offsetParent&&w.length&&d.dragHandler.init(R),C=s.init(R,N)))}function L(D,b){const T=U();P(),A(u({startIndex:T},D),b),o.emit("reInit")}function P(){d.dragHandler.destroy(),d.eventStore.clear(),d.translate.clear(),d.slideLooper.clear(),d.resizeHandler.destroy(),d.slidesHandler.destroy(),d.slidesInView.destroy(),d.animation.destroy(),s.destroy(),a.clear()}function $(){g||(g=!0,a.clear(),P(),o.emit("destroy"),o.clear())}function G(D,b,T){!S.active||g||(d.scrollBody.useBaseFriction().useDuration(b===!0?0:S.duration),d.scrollTo.index(D,T||0))}function H(D){const b=d.index.add(1).get();G(b,D,-1)}function ne(D){const b=d.index.add(-1).get();G(b,D,1)}function Z(){return d.index.add(1).get()!==U()}function K(){return d.index.add(-1).get()!==U()}function Q(){return d.scrollSnapList}function le(){return d.scrollProgress.get(d.location.get())}function U(){return d.index.get()}function re(){return d.indexPrevious.get()}function oe(){return d.slidesInView.get()}function J(){return d.slidesInView.get(!1)}function ae(){return C}function ue(){return d}function V(){return e}function k(){return E}function X(){return w}const R={canScrollNext:Z,canScrollPrev:K,containerNode:k,internalEngine:ue,destroy:$,off:v,on:h,emit:f,plugins:ae,previousScrollSnap:re,reInit:x,rootNode:V,scrollNext:H,scrollPrev:ne,scrollProgress:le,scrollSnapList:Q,scrollTo:G,selectedScrollSnap:U,slideNodes:X,slidesInView:oe,slidesNotInView:J};return A(t,c),setTimeout(()=>o.emit("init"),0),R}_e.globalOptions=void 0;function Oe(e={},t=[]){const c=F.useRef(e),i=F.useRef(t),[l,r]=F.useState(),[s,a]=F.useState(),o=F.useCallback(()=>{l&&l.reInit(c.current,i.current)},[l]);return F.useEffect(()=>{Le(c.current,e)||(c.current=e,o())},[e,o]),F.useEffect(()=>{mn(i.current,t)||(i.current=t,o())},[t,o]),F.useEffect(()=>{if(fn()&&s){_e.globalOptions=Oe.globalOptions;const u=_e(s,c.current,i.current);return r(u),()=>u.destroy()}else r(void 0)},[s,r]),[a,l]}Oe.globalOptions=void 0;const Un="_embla_109sv_1",qn="_embla__viewport_109sv_11",Kn="_embla__container_109sv_19",Qn="_embla__slide_109sv_27",Jn="_embla__slide__number_109sv_41",Xn="_embla__dots_109sv_65",Yn="_embla__dot_109sv_65",ee={embla:Un,embla__viewport:qn,embla__container:Kn,embla__slide:Qn,embla__slide__number:Jn,embla__dots:Xn,embla__dot:Yn,"embla__dot--selected":"_embla__dot--selected_109sv_115"},Zn=({slides:e=[1,2,3,4,5]})=>{const t={loop:!0,speed:300},[c,i]=Oe(t),{selectedIndex:l,scrollSnaps:r,onDotButtonClick:s}=an(i);return n.jsxs("div",{className:ee.embla,children:[n.jsx("div",{className:ee.embla__viewport,ref:c,children:n.jsx("div",{className:ee.embla__container,children:e.map(a=>n.jsx("div",{className:ee.embla__slide,children:n.jsx("div",{className:ee.embla__slide__number,children:a})},a))})}),n.jsx("div",{className:ee.embla__dots,children:r.map((a,o)=>n.jsx(un,{onClick:()=>s(o),className:`${ee.embla__dot} ${o===l?ee["embla__dot--selected"]:""}`},o))})]})},Wn="/cra-web-frontend-data/assets/pixelcrang1-DMC3WOe9.svg",et="/cra-web-frontend-data/assets/pixelcrang2-BT9ifHqw.svg",nt="/cra-web-frontend-data/assets/pixelcrang3-CBnIeGnZ.svg",tt="/cra-web-frontend-data/assets/pixelcrang4-Cc3pKv7H.svg",st="data:image/svg+xml,%3csvg%20width='1236'%20height='1236'%20viewBox='0%200%201236%201236'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_f_712_279)'%3e%3ccircle%20cx='618'%20cy='618'%20r='418'%20fill='url(%23paint0_radial_712_279)'%20fill-opacity='0.15'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_f_712_279'%20x='0'%20y='0'%20width='1236'%20height='1236'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='100'%20result='effect1_foregroundBlur_712_279'/%3e%3c/filter%3e%3cradialGradient%20id='paint0_radial_712_279'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(618%20618)%20rotate(90)%20scale(418)'%3e%3cstop%20stop-color='%232CB4DB'/%3e%3cstop%20offset='1'%20stop-color='%23E5F9FF'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e",ct="_container_jwl8o_1",rt="_main_jwl8o_15",ot="_section_jwl8o_23",it="_comment_jwl8o_41",lt="_banner_jwl8o_67",at="_helloworld_jwl8o_91",ut="_character1_jwl8o_115",dt="_character2_jwl8o_133",ft="_character3_jwl8o_151",mt="_character4_jwl8o_169",pt="_crangE_jwl8o_231",ht="_vector_jwl8o_285",xt="_section2_jwl8o_319",gt="_comment2_jwl8o_337",jt="_cra_jwl8o_231",_t="_title_jwl8o_393",bt="_description_jwl8o_427",vt="_content_jwl8o_451",St="_card_jwl8o_461",wt="_club_jwl8o_535",yt="_project_jwl8o_665",m={container:ct,main:rt,section:ot,comment:it,banner:lt,helloworld:at,character1:ut,character2:dt,character3:ft,character4:mt,"image-container":"_image-container_jwl8o_205",crangE:pt,"recruit-btn":"_recruit-btn_jwl8o_243",vector:ht,section2:xt,comment2:gt,"blur-round":"_blur-round_jwl8o_371",cra:jt,title:_t,"cap-letter":"_cap-letter_jwl8o_1",description:bt,content:vt,card:St,"card-title":"_card-title_jwl8o_1","card-content":"_card-content_jwl8o_1","card-content2":"_card-content2_jwl8o_1",club:wt,"club-container":"_club-container_jwl8o_549","club-card":"_club-card_jwl8o_565","club-card1":"_club-card1_jwl8o_567","club-title":"_club-title_jwl8o_579","club-content":"_club-content_jwl8o_599","club-content1":"_club-content1_jwl8o_611","club-image":"_club-image_jwl8o_635",project:yt};function It(){const[e,t]=F.useState(window.innerWidth<=1024),c=F.useRef(null),i=()=>{var l;(l=c.current)==null||l.scrollIntoView({behavior:"smooth",block:"center"})};return F.useEffect(()=>{const l=()=>t(window.innerWidth<=1024);return window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[]),n.jsxs("div",{className:m.container,children:[n.jsxs("div",{className:m.main,children:[n.jsx(rn,{}),n.jsxs("div",{className:m.section,children:[n.jsx("div",{className:m.comment,children:n.jsx("div",{children:"CRA와 함께 성장할 동아리원을 모집합니다"})}),n.jsxs("div",{className:m.banner,children:[n.jsx("div",{children:"Why not change the"}),n.jsx("div",{className:m.helloworld,children:"hello world!"})]}),n.jsxs("div",{className:m.CranEES,children:[n.jsx("img",{className:`${m.crangE} ${m.character1}`,src:Wn}),n.jsx("img",{className:`${m.crangE} ${m.character2}`,src:et}),n.jsx("img",{className:`${m.crangE} ${m.character3}`,src:nt}),n.jsx("img",{className:`${m.crangE} ${m.character4}`,src:tt})]}),n.jsx(cn,{to:"/recruit",className:m["recruit-btn"],children:n.jsx("p",{children:"2025-1 CRA RECRUITMENT"})}),n.jsxs("div",{className:m.vector,onClick:i,children:[n.jsx("img",{src:on}),n.jsx("img",{src:ln})]})]})]}),n.jsxs("div",{ref:c,className:m.section2,children:[n.jsxs("div",{className:m.comment2,children:[n.jsx("div",{children:"세대를 아우르는 열정과 끈끈한 유대감의 동아리,"}),n.jsx("div",{children:"CRA를 소개합니다."})]}),n.jsx("img",{className:m["blur-round"],src:st})]}),n.jsxs("div",{className:m.cra,children:[n.jsxs("div",{className:m.title,children:[n.jsx("span",{id:m["cap-letter"],children:"C"}),n.jsx("p",{children:"omputer"}),n.jsx("span",{id:m["cap-letter"],children:"R"}),n.jsx("p",{children:"esearch"}),n.jsx("span",{id:m["cap-letter"],children:"A"}),n.jsx("p",{children:"ssoication"})]}),n.jsxs("div",{className:m.description,children:[n.jsx("p",{children:"CRA는 한동대학교 전산 교육과정에 기초하여"}),n.jsx("p",{children:"한 분야에 국한되지 않는 신기술을 공부하고 습득한 지식과 기술을 통해"}),n.jsxs("p",{children:[n.jsx("span",{children:"‘배워서 남주자’"}),"를 실천하는 동아리입니다."]})]}),n.jsxs("div",{className:m.content,children:[n.jsxs("div",{className:m.card,children:[n.jsx("p",{id:m["card-title"],children:"CRA가 창립한지"}),n.jsx("p",{id:m["card-content"],children:"29년"})]}),n.jsxs("div",{className:m.card,children:[n.jsx("p",{id:m["card-title"],children:"출시 서비스"}),n.jsx("p",{id:m["card-content"],children:"?개"})]}),n.jsxs("div",{className:m.card,children:[n.jsx("p",{id:m["card-title"],children:"선배들과 함께하는"}),n.jsx("p",{id:m["card-content2"],children:"정기적인"}),n.jsx("p",{id:m["card-content2"],children:"교류활동"})]})]})]}),n.jsx("div",{className:m.club,children:e?n.jsxs(n.Fragment,{children:[n.jsx("div",{className:m["club-container"],children:n.jsxs("div",{className:m["club-card"],children:[n.jsx("div",{className:m["club-title"],children:n.jsx("p",{children:"탄탄하고 끈끈한 네트워크"})}),n.jsx("div",{className:m["club-image"],children:n.jsx("p",{children:"이미지1"})}),n.jsx("div",{className:m["club-content"],children:n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"현재 재학생 약 50명, 졸업생 약 200명으로 구성"}),n.jsx("p",{children:"되어 있으며, 매년 재학생과 졸업생 모두가 모이는"}),n.jsx("p",{children:"‘큰모임’이 진행됩니다."})]})})]})}),n.jsx("div",{className:m["club-container"],children:n.jsxs("div",{className:m["club-card"],children:[n.jsx("div",{className:m["club-title"],children:n.jsx("p",{children:"함께 성장하기에 최고로 좋은 환경"})}),n.jsx("div",{className:m["club-image"],children:n.jsx("p",{children:"이미지2"})}),n.jsxs("div",{className:m["club-content"],children:[n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"선의의 경쟁을 통해 좋은 자극을 받을 수 있는 동료들이 기다리고 있습니다."}),n.jsx("p",{children:"24시간 이용 가능한 동방에서 "}),n.jsx("p",{children:"모르는 것이 있으면 서로 물어보거나 토론을 하기도 합니다."})]}),n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"단순히 혼자서 공부하는 것이 아닌, ‘질문하고 토론하라!’"}),n.jsx("p",{children:"하브루타 공부법으로 더욱 심도있게 탐구하고 토론합니다."})]})]})]})}),n.jsx("div",{className:m["club-container"],children:n.jsxs("div",{className:m["club-card"],children:[n.jsx("div",{className:m["club-title"],children:n.jsx("p",{children:"리얼로다가! 개발을 합니다"})}),n.jsx("div",{className:m["club-image"],children:n.jsx("p",{children:"이미지3"})}),n.jsxs("div",{className:m["club-content"],children:[n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"신입회원은 방학 프로젝트를 진행하게 됩니다."}),n.jsx("p",{children:"선배의 가이드와 함께 지식을 공부하고 실제로 프로젝트를 기획하며 개발합니다."})]}),n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"더 나아가, 실제로 개발의 결과물을 바탕으로 서비스를 출시할 수도 있습니다."}),n.jsx("p",{children:"현재 서비스 중인 프로젝트에 투입되어 "}),n.jsx("p",{children:"서비스 유지보수 및 유저와 소통하는 방법을 학부생으로서 경험하게 됩니다."})]})]})]})})]}):n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:m["club-container"],children:[n.jsxs("div",{className:m["club-card"],children:[n.jsxs("div",{className:m["club-title"],children:[n.jsx("p",{children:"탄탄하고 끈끈한"}),n.jsx("p",{children:"네트워크"})]}),n.jsxs("div",{className:m["club-content"],children:[n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"현재 재학생 약 50명, 졸업생 약 200명으로 구성"}),n.jsx("p",{children:"되어 있으며, 매년 재학생과 졸업생 모두가 모이"}),n.jsx("p",{children:"는 ‘큰모임’이 진행됩니다."})]}),n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"재학생들은 대기업, 공기업, 스타트업, 실리콘 밸"}),n.jsx("p",{children:"리, 대학원 등 다양한 직군에 계시는 졸업생 선배"}),n.jsx("p",{children:"님들로부터 많은 도움을 받을 수 있습니다."})]})]})]}),n.jsx("div",{className:m["club-image"],children:n.jsx("p",{children:"이미지1"})})]}),n.jsxs("div",{className:m["club-container"],children:[n.jsx("div",{className:m["club-image"],children:n.jsx("p",{children:"이미지2"})}),n.jsxs("div",{className:m["club-card1"],children:[n.jsxs("div",{className:m["club-title"],children:[n.jsx("p",{children:"함께 성장하기에"}),n.jsx("p",{children:"최고로 좋은 환경"})]}),n.jsxs("div",{className:m["club-content"],children:[n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"선의의 경쟁을 통해 좋은 자극을 받을 수 있는 동"}),n.jsx("p",{children:"료들이 기다리고 있습니다. 24시간 이용 가능한"}),n.jsx("p",{children:"동방에서 모르는 것이 있으면 서로 물어보거나 토"}),n.jsx("p",{children:"론을 하기도 합니다."})]}),n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"단순히 혼자서 공부하는 것이 아닌, ‘질문하고 토"}),n.jsx("p",{children:"론하라!’ 하브루타 공부법으로 더욱 심도있게 탐"}),n.jsx("p",{children:"구하고 토론합니다."})]})]})]})]}),n.jsxs("div",{className:m["club-container"],children:[n.jsxs("div",{className:m["club-card"],children:[n.jsxs("div",{className:m["club-title"],children:[n.jsx("p",{children:"리얼로다가!"}),n.jsx("p",{children:"개발을 합니다"})]}),n.jsxs("div",{className:m["club-content"],children:[n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"신입회원은 방학 프로젝트를 진행하게 됩니다. 선"}),n.jsx("p",{children:"배의 가이드와 함께 지식을 공부하고 실제로 프로"}),n.jsx("p",{children:"젝트를 기획하며 개발합니다."})]}),n.jsxs("div",{className:m["club-content1"],children:[n.jsx("p",{children:"더 나아가, 실제로 개발의 결과물을 바탕으로 서"}),n.jsx("p",{children:"비스를 출시할 수도 있습니다. 현재 서비스 중인"}),n.jsx("p",{children:"프로젝트에 투입되어 서비스 유지보수 및 유저와"}),n.jsx("p",{children:"소통하는 방법을 학부생으로서 경험하게 됩니다."})]})]})]}),n.jsx("div",{className:m["club-image"],children:n.jsx("p",{children:"이미지3"})})]})]})}),n.jsxs("div",{className:m.project,children:[n.jsx("p",{children:"프로젝트 소개"}),n.jsx(Zn,{})]})]})}export{It as default};
