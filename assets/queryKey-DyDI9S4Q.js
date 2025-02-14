var ct=t=>{throw TypeError(t)};var $=(t,e,r)=>e.has(t)||ct("Cannot "+r);var s=(t,e,r)=>($(t,e,"read from private field"),r?r.call(t):e.get(t)),f=(t,e,r)=>e.has(t)?ct("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),h=(t,e,r,i)=>($(t,e,"write to private field"),i?i.call(t,r):e.set(t,r),r),l=(t,e,r)=>($(t,e,"access private method"),r);import{S as It,p as lt,l as B,m as G,n as W,o as Bt,q as J,t as dt,v as Et,w as Ot,x as St,y as ft,z as Rt,r as S,i as Qt}from"./index-B8-MUm2i.js";import{s as wt,n as pt}from"./utils-km2FGkQ4.js";var y,a,z,b,F,P,w,I,N,M,L,U,D,x,H,n,A,X,Z,tt,et,st,rt,it,gt,yt,xt=(yt=class extends It{constructor(e,r){super();f(this,n);f(this,y);f(this,a);f(this,z);f(this,b);f(this,F);f(this,P);f(this,w);f(this,I);f(this,N);f(this,M);f(this,L);f(this,U);f(this,D);f(this,x);f(this,H,new Set);this.options=r,h(this,y,e),h(this,I,null),h(this,w,lt()),this.options.experimental_prefetchInRender||s(this,w).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(r)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(s(this,a).addObserver(this),vt(s(this,a),this.options)?l(this,n,A).call(this):this.updateResult(),l(this,n,et).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return at(s(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return at(s(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,l(this,n,st).call(this),l(this,n,rt).call(this),s(this,a).removeObserver(this)}setOptions(e,r){const i=this.options,d=s(this,a);if(this.options=s(this,y).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof B(this.options.enabled,s(this,a))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");l(this,n,it).call(this),s(this,a).setOptions(this.options),i._defaulted&&!G(this.options,i)&&s(this,y).getQueryCache().notify({type:"observerOptionsUpdated",query:s(this,a),observer:this});const u=this.hasListeners();u&&bt(s(this,a),d,this.options,i)&&l(this,n,A).call(this),this.updateResult(r),u&&(s(this,a)!==d||B(this.options.enabled,s(this,a))!==B(i.enabled,s(this,a))||W(this.options.staleTime,s(this,a))!==W(i.staleTime,s(this,a)))&&l(this,n,X).call(this);const o=l(this,n,Z).call(this);u&&(s(this,a)!==d||B(this.options.enabled,s(this,a))!==B(i.enabled,s(this,a))||o!==s(this,x))&&l(this,n,tt).call(this,o)}getOptimisticResult(e){const r=s(this,y).getQueryCache().build(s(this,y),e),i=this.createResult(r,e);return Ft(this,i)&&(h(this,b,i),h(this,P,this.options),h(this,F,s(this,a).state)),i}getCurrentResult(){return s(this,b)}trackResult(e,r){const i={};return Object.keys(e).forEach(d=>{Object.defineProperty(i,d,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(d),r==null||r(d),e[d])})}),i}trackProp(e){s(this,H).add(e)}getCurrentQuery(){return s(this,a)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const r=s(this,y).defaultQueryOptions(e),i=s(this,y).getQueryCache().build(s(this,y),r);return i.fetch().then(()=>this.createResult(i,r))}fetch(e){return l(this,n,A).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),s(this,b)))}createResult(e,r){var ut;const i=s(this,a),d=this.options,u=s(this,b),o=s(this,F),E=s(this,P),R=e!==i?e.state:s(this,z),{state:g}=e;let c={...g},T=!1,m;if(r._optimisticResults){const v=this.hasListeners(),j=!v&&vt(e,r),_=v&&bt(e,i,r,d);(j||_)&&(c={...c,...St(g.data,e.options)}),r._optimisticResults==="isRestoring"&&(c.fetchStatus="idle")}let{error:k,errorUpdatedAt:Q,status:O}=c;if(r.select&&c.data!==void 0)if(u&&c.data===(o==null?void 0:o.data)&&r.select===s(this,N))m=s(this,M);else try{h(this,N,r.select),m=r.select(c.data),m=ft(u==null?void 0:u.data,m,r),h(this,M,m),h(this,I,null)}catch(v){h(this,I,v)}else m=c.data;if(r.placeholderData!==void 0&&m===void 0&&O==="pending"){let v;if(u!=null&&u.isPlaceholderData&&r.placeholderData===(E==null?void 0:E.placeholderData))v=u.data;else if(v=typeof r.placeholderData=="function"?r.placeholderData((ut=s(this,L))==null?void 0:ut.state.data,s(this,L)):r.placeholderData,r.select&&v!==void 0)try{v=r.select(v),h(this,I,null)}catch(j){h(this,I,j)}v!==void 0&&(O="success",m=ft(u==null?void 0:u.data,v,r),T=!0)}s(this,I)&&(k=s(this,I),m=s(this,M),Q=Date.now(),O="error");const K=c.fetchStatus==="fetching",Y=O==="pending",q=O==="error",ot=Y&&K,ht=m!==void 0,C={status:O,fetchStatus:c.fetchStatus,isPending:Y,isSuccess:O==="success",isError:q,isInitialLoading:ot,isLoading:ot,data:m,dataUpdatedAt:c.dataUpdatedAt,error:k,errorUpdatedAt:Q,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>R.dataUpdateCount||c.errorUpdateCount>R.errorUpdateCount,isFetching:K,isRefetching:K&&!Y,isLoadingError:q&&!ht,isPaused:c.fetchStatus==="paused",isPlaceholderData:T,isRefetchError:q&&ht,isStale:nt(e,r),refetch:this.refetch,promise:s(this,w)};if(this.options.experimental_prefetchInRender){const v=V=>{C.status==="error"?V.reject(C.error):C.data!==void 0&&V.resolve(C.data)},j=()=>{const V=h(this,w,C.promise=lt());v(V)},_=s(this,w);switch(_.status){case"pending":e.queryHash===i.queryHash&&v(_);break;case"fulfilled":(C.status==="error"||C.data!==_.value)&&j();break;case"rejected":(C.status!=="error"||C.error!==_.reason)&&j();break}}return C}updateResult(e){const r=s(this,b),i=this.createResult(s(this,a),this.options);if(h(this,F,s(this,a).state),h(this,P,this.options),s(this,F).data!==void 0&&h(this,L,s(this,a)),G(i,r))return;h(this,b,i);const d={},u=()=>{if(!r)return!0;const{notifyOnChangeProps:o}=this.options,E=typeof o=="function"?o():o;if(E==="all"||!E&&!s(this,H).size)return!0;const p=new Set(E??s(this,H));return this.options.throwOnError&&p.add("error"),Object.keys(s(this,b)).some(R=>{const g=R;return s(this,b)[g]!==r[g]&&p.has(g)})};(e==null?void 0:e.listeners)!==!1&&u()&&(d.listeners=!0),l(this,n,gt).call(this,{...d,...e})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&l(this,n,et).call(this)}},y=new WeakMap,a=new WeakMap,z=new WeakMap,b=new WeakMap,F=new WeakMap,P=new WeakMap,w=new WeakMap,I=new WeakMap,N=new WeakMap,M=new WeakMap,L=new WeakMap,U=new WeakMap,D=new WeakMap,x=new WeakMap,H=new WeakMap,n=new WeakSet,A=function(e){l(this,n,it).call(this);let r=s(this,a).fetch(this.options,e);return e!=null&&e.throwOnError||(r=r.catch(Bt)),r},X=function(){l(this,n,st).call(this);const e=W(this.options.staleTime,s(this,a));if(J||s(this,b).isStale||!dt(e))return;const i=Et(s(this,b).dataUpdatedAt,e)+1;h(this,U,setTimeout(()=>{s(this,b).isStale||this.updateResult()},i))},Z=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(s(this,a)):this.options.refetchInterval)??!1},tt=function(e){l(this,n,rt).call(this),h(this,x,e),!(J||B(this.options.enabled,s(this,a))===!1||!dt(s(this,x))||s(this,x)===0)&&h(this,D,setInterval(()=>{(this.options.refetchIntervalInBackground||Ot.isFocused())&&l(this,n,A).call(this)},s(this,x)))},et=function(){l(this,n,X).call(this),l(this,n,tt).call(this,l(this,n,Z).call(this))},st=function(){s(this,U)&&(clearTimeout(s(this,U)),h(this,U,void 0))},rt=function(){s(this,D)&&(clearInterval(s(this,D)),h(this,D,void 0))},it=function(){const e=s(this,y).getQueryCache().build(s(this,y),this.options);if(e===s(this,a))return;const r=s(this,a);h(this,a,e),h(this,z,e.state),this.hasListeners()&&(r==null||r.removeObserver(this),e.addObserver(this))},gt=function(e){Rt.batch(()=>{e.listeners&&this.listeners.forEach(r=>{r(s(this,b))}),s(this,y).getQueryCache().notify({query:s(this,a),type:"observerResultsUpdated"})})},yt);function Tt(t,e){return B(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&e.retryOnMount===!1)}function vt(t,e){return Tt(t,e)||t.state.data!==void 0&&at(t,e,e.refetchOnMount)}function at(t,e,r){if(B(e.enabled,t)!==!1){const i=typeof r=="function"?r(t):r;return i==="always"||i!==!1&&nt(t,e)}return!1}function bt(t,e,r,i){return(t!==e||B(i.enabled,t)===!1)&&(!r.suspense||t.state.status!=="error")&&nt(t,r)}function nt(t,e){return B(e.enabled,t)!==!1&&t.isStaleByTime(W(e.staleTime,t))}function Ft(t,e){return!G(t.getCurrentResult(),e)}var Ct=S.createContext(!1),Ut=()=>S.useContext(Ct);Ct.Provider;function Dt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var jt=S.createContext(Dt()),_t=()=>S.useContext(jt),Pt=(t,e)=>{(t.suspense||t.throwOnError||t.experimental_prefetchInRender)&&(e.isReset()||(t.retryOnMount=!1))},Mt=t=>{S.useEffect(()=>{t.clearReset()},[t])},Lt=({result:t,errorResetBoundary:e,throwOnError:r,query:i})=>t.isError&&!e.isReset()&&!t.isFetching&&i&&wt(r,[t.error,i]),Ht=t=>{t.suspense&&(t.staleTime===void 0&&(t.staleTime=1e3),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3)))},kt=(t,e)=>t.isLoading&&t.isFetching&&!e,At=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,mt=(t,e,r)=>e.fetchOptimistic(t).catch(()=>{r.clearReset()});function zt(t,e,r){var g,c,T,m,k;const i=Qt(),d=Ut(),u=_t(),o=i.defaultQueryOptions(t);(c=(g=i.getDefaultOptions().queries)==null?void 0:g._experimental_beforeQuery)==null||c.call(g,o),o._optimisticResults=d?"isRestoring":"optimistic",Ht(o),Pt(o,u),Mt(u);const E=!i.getQueryCache().get(o.queryHash),[p]=S.useState(()=>new e(i,o)),R=p.getOptimisticResult(o);if(S.useSyncExternalStore(S.useCallback(Q=>{const O=d?pt:p.subscribe(Rt.batchCalls(Q));return p.updateResult(),O},[p,d]),()=>p.getCurrentResult(),()=>p.getCurrentResult()),S.useEffect(()=>{p.setOptions(o,{listeners:!1})},[o,p]),At(o,R))throw mt(o,p,u);if(Lt({result:R,errorResetBoundary:u,throwOnError:o.throwOnError,query:i.getQueryCache().get(o.queryHash)}))throw R.error;if((m=(T=i.getDefaultOptions().queries)==null?void 0:T._experimental_afterQuery)==null||m.call(T,o,R),o.experimental_prefetchInRender&&!J&&kt(R,d)){const Q=E?mt(o,p,u):(k=i.getQueryCache().get(o.queryHash))==null?void 0:k.promise;Q==null||Q.catch(pt).finally(()=>{p.updateResult()})}return o.notifyOnChangeProps?R:p.trackResult(R)}function Yt(t,e){return zt(t,xt)}const qt={board:{boards:(t,e)=>["board.boards",t,e],boardsCount:t=>["board.boards",t],boardById:t=>["board.boardById",t]},comment:{commentsById:t=>["comment.commentsById",t],commentsCountById:t=>["comment.commentsCountById",t]},project:{projects:()=>["project.projects"],projectById:t=>["project.projectById",t]},item:{items:t=>["item.items",t],itemById:t=>["item.itemById",t]},havruta:{havrutas:()=>["havruta.havrutas"],havrutaById:t=>["havruta.havrutaById",t]},havrutaBoard:{havrutaBoards:t=>["havrutaBoard.havrutaBoards",t],havrutaBoardsCount:()=>["havrutaBoard.havrutaBoards"],havrutaBoardById:t=>["havrutaBoard.havrutaBoardById",t],havrutaBoardsByHavrutaId:(t,e)=>["havrutaBoard.havrutaBoardsByHavrutaId",t,e],havrutaBoardsCountByHavrutaId:t=>["havrutaBoard.havrutaBoardsByHavrutaId",t]}};export{qt as Q,Yt as u};
