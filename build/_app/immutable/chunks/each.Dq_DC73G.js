import{f as H,r as j,E as el,g as nl,h as fl,m as vl,j as k,k as G,l as Z,n as ol,p as V,q as Q,u as hl,v as N,w as K,x as rl,y as _l,z as $,A as El,B as b,C as Al}from"./disclose-version.6VTIbz7j.js";import{d as g,i as ul,n as Cl,b as wl,s as y,e as Il,c as cl,E as Sl,f as pl}from"./runtime.DnRKx-fn.js";const P=-1,J=99999999,il=-2;function Ll(l,u){return{a:u,d:null,f:l,v:[],e:null,p:cl,r:null,s:[],t:Sl}}function Ol(l,u,a){return{a:null,d:null,e:null,i:u,k:a,v:l,p:cl,r:null,s:null,t:pl}}function al(l,u,a,c,s,t,h){const _=(a&V)!==0,f=Ll(a,l);let E=null;ol(l,_);let S,v=null,e=null,I=!1;f.r=i=>{const n=E,A=n.s;A.add(i),i.f(()=>{A.delete(i),A.size===0&&n.e!==null&&(n.d!==null&&(H(n.d),n.d=null),g(n.e),n.e=null)})};const r=()=>{const i={d:null,e:null,s:new Set,p:E},n=j(()=>{const A=f.d;A!==null&&(H(A),f.d=null);let w=f.a;(f.f&V)!==0&&(Q?w=w.firstChild:(w=hl(),f.a.appendChild(w))),t(w),i.d=f.d,f.d=null},f,!0);i.e=n,E=i},p=i=>{const n=i.f,A=(n&V)!==0,w=i.a;h(S,i,w,A,s,n,!0,v)},o=j(()=>{var A,w;const i=u();S=ul(i)?i:i==null?[]:Array.from(i),c!==null?v=S.map(c):a&el||S.map(Cl);const n=S.length;if(Q){const L=((w=(A=N)==null?void 0:A[0])==null?void 0:w.data)==="ssr:each_else";L&&n||!L&&!n?(H(N),K(null),I=!0):L&&N.shift()}if(t!==null){if(n===0){if(f.v.length!==0||e===null){p(f),r();return}}else if(f.v.length===0&&E!==null){const L=E,O=L.s;O.size===0?L.d!==null&&(H(L.d),L.d=null):nl(O,"out")}}e!==null&&Il(e)},f,!1);e=j(p,f,!0),I&&K([]),wl(o,()=>{const i=f.f,n=f.a,A=(i&V)!==0;let w=E;for(;w!==null;){const L=w.d;L!==null&&H(L);const O=w.e;O!==null&&g(O),w=w.p}h([],f,n,A,s,i,!1,v),g(e)}),f.e=o}function xl(l,u,a,c,s,t){al(l,u,a,c,s,t,Tl)}function Dl(l,u,a,c,s){al(l,u,a,null,c,s,Hl)}function Hl(l,u,a,c,s,t,h){var _=u.v,f=u.s,E=_.length,S=l.length,v=Math.max(E,S),e=0,I,r;if(f.length!==0&&tl(f),S===0)for(I=[],c&&E!==0&&fl(a);e<v;)r=_[e++],B(r,f,h,c);else{var p;let A=!1;if(I=Array(S),Q){for(var o=N,i=o[0];e<v;e++){var n=rl(i);if(K(n),!n){A=!0;break}p=l[e],r=T(p,null,e,s,t),I[e]=r,i=n[n.length-1].nextSibling.nextSibling}sl(o,i)}for(;e<v;e++)e>=E?(p=l[e],r=T(p,null,e,s,t),I[e]=r,q(r,a,c,null)):e>=S?(r=_[e],B(r,f,h)):(p=l[e],r=_[e],I[e]=r,D(r,p,e,t));A&&K([])}u.v=I}function Tl(l,u,a,c,s,t,h,_){var f=u.v;const E=_!==null;var S=u.s,v=f.length,e=l.length,I,r;if(S.length!==0&&tl(S),e===0)for(I=[],c&&v!==0&&fl(a);v>0;)r=f[--v],B(r,S,h,c);else{var p=v-1,o=e-1,i,n,A;let d=!1;if(I=Array(e),Q){for(var w,L=N,O=L[0];e>0;){if(w=rl(O),K(w),!w){d=!0;break}A=o- --e,n=l[A],i=E?_[A]:n,r=T(n,i,A,s,t),I[A]=r,O=(w[w.length-1]||O).nextSibling.nextSibling}sl(L,O)}if(v===0)for(;e>0;)A=o- --e,n=l[A],i=E?_[A]:n,r=T(n,i,A,s,t),I[A]=r,q(r,a,c,null);else{var U=(t&_l)!==0,W=(t&(Z|$))!==0||U,C=0,M=null;n=l[o],i=E?_[o]:n;l:for(;;){for(;f[p].k===i;){if(r=f[p--],n=l[o],W&&D(r,n,o,t),M=ll(r),I[o]=r,C>--o||C>p)break l;i=E?_[o]:n}for(n=l[C],i=E?_[C]:n;C<=p&&C<=o&&f[C].k===i;)n=l[C],r=f[C],W&&D(r,n,C,t),I[C]=r,++C,i=E?_[C]:l[C];break}if(C>p)for(;o>=C;)n=l[o],i=E?_[o]:n,r=T(n,i,o,s,t),I[o--]=r,M=q(r,a,c,M);else if(C>o){e=C;do(r=f[e++])!==null&&B(r,S,h);while(e<=p)}else{var z=0,x=o-C+1,R=new Int32Array(x),X=new Map;for(e=0;e<x;++e)v=e+C,R[e]=P,n=l[v],i=E?_[v]:n,vl(X,i,v);if(U)for(e=C;e<=p;++e)v=k(X,f[e].k),v!==void 0&&(n=l[v],r=f[e],D(r,n,v,t));for(e=C;e<=p;++e)v=k(X,f[e].k),r=f[e],v!==void 0?(z=z<v?v:J,R[v-C]=e,I[v]=r):r!==null&&B(r,S,h);z===J&&Bl(R);for(var Y,m,F;x-- >0;)o=x+C,v=R[x],F=v===-1,n=l[o],F?(i=E?_[o]:n,r=T(n,i,o,s,t)):(r=I[o],!U&&W&&D(r,n,o,t)),(F||z===J&&v!==il)&&(m=Y===void 0?M:ll(Y),M=q(r,a,c,m)),I[o]=r,Y=r}}d&&K([])}u.v=I}function sl(l,u){if(u!==null){var a=l.indexOf(u);a!==-1&&l.length>a+1&&H(l.slice(a))}}function Bl(l){for(var u=l.length,a=new Int32Array(u),c=new Int32Array(u),s=0,t=0,h,_,f,E;l[t]===P;++t);for(c[0]=t++;t<u;++t)if(_=l[t],_!==P)if(h=c[s],l[h]<_)a[t]=h,c[++s]=t;else{for(f=0,E=s;f<E;)h=f+E>>1,l[c[h]]<_?f=h+1:E=h;_<l[c[f]]&&(f>0&&(a[t]=c[f-1]),c[f]=t)}for(h=c[s];s-->=0;)l[h]=il,h=a[h]}function q(l,u,a,c){var s=l.d;return c===null?a?G(s,u,null):G(s,u.parentNode,u):G(s,null,c)}function ll(l){var u=l.d;return ul(u)?u[0]:u}function tl(l){var u=l.length;if(u>0){for(var a=0,c,s;a<u;a++)c=l[a],s=c.r,s!==null&&(c.r=null,B(c,null,!1));l.length=0}}function D(l,u,a,c){const s=l.v;c&Z&&y(s,u);const t=l.s,h=(c&$)!==0,_=l.a;t!==null&&c&el&&_!==null&&_(l,t),h?y(l.i,a):l.i=a}function B(l,u,a,c=!1){const s=l.s;if(a&&s!==null){for(let h of s)h.r==="key"&&s.delete(h);if(s.size===0)l.s=null;else{nl(s,"out"),u!==null&&u.push(l);return}}const t=l.d;!c&&t!==null&&H(t),g(l.e)}function T(l,u,a,c,s){const h=(s&Z)===0?l:s&El?b(l):Al(l),_=s&$?b(a):a,f=Ol(h,_,u),E=j(S=>{c(null,S.v,S.i)},f,!0);return f.e=E,f}export{xl as a,Dl as e};