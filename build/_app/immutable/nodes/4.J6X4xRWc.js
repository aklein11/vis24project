import{i as B,O as M,M as n,c as m,$ as L,d as r,a as c,b as P,o as f,N as l,e as s}from"../chunks/disclose-version.6VTIbz7j.js";import{p as O,a as T}from"../chunks/runtime.DnRKx-fn.js";import{i as x}from"../chunks/main-client.DOo1v655.js";import{u as H,a as W,s as F}from"../chunks/store.BIgn9ua_.js";import{M as G,S as p,B as N,P as Z,L as A,a as D}from"../chunks/Mapchoice.CERAaW85.js";import{w as E}from"../chunks/index.Dfv-Md-h.js";var I=s('<p class="test svelte-11jnsqs">Section 1: How Old are Condos that are Most Likely to be Converted?</p>'),J=s('<div class="scrolly-container svelte-11jnsqs"><!></div>'),K=s('<p class="test-pie svelte-11jnsqs">Section 2: What Types of Buildings are Most Likely to be Converted?</p>'),Q=s('<div class="pie-container svelte-11jnsqs"><!></div>'),R=s("<h1>Condo Complaints</h1> <blockquote>For Cambridge, we did not have data on condominium complaints.</blockquote>",!0),U=s('<p class="test svelte-11jnsqs">Section 3: How do Complaints about Condominiums vary over Time?</p>'),V=s('<div class="scrolly-container svelte-11jnsqs"><!></div>'),X=s('<p class="test svelte-11jnsqs">Section 4: What Types of Complaints are Most Common?</p>'),Y=s('<div class="scrolly-container svelte-11jnsqs"><!></div>'),ee=s("<!> <!>",!0),te=s('<blockquote>Through our interactive visualization, we invite you to explore the impact of condo conversions on your community.<br> <newline></newline> On the map, click a Boston or Cambridge zip code to see the locations of condo conversions (starting from 2015) in the region:</blockquote> <div class="parent-container svelte-11jnsqs"><!> <!> <!></div> <!>',!0);function le(g,S){T(S,!1);const b={};H(b);const v=()=>F(y,"$zipcode",b);let y=E("");const $=["02140","02139","02142","02141","02138"];B();var q=f(g,!0,te);M(e=>{L.title="Condo Conversions in Greater Boston "});var j=P(q),h=r(r(j,!0)),C=c(h),z=r(r(C,!0)),k=r(r(z,!0)),w=r(r(h,!0));G(C,{get zipcode(){return v()},set zipcode(e){W(y,e)}}),p(z,{children:(e,i)=>{var t=l(e,!0,I);n(e,t)},$$slots:{viz:(e,i)=>{var t=l(e,!0,J),d=c(t);N(d,{get query(){return v()}}),n(e,t)}}}),p(k,{children:(e,i)=>{var t=l(e,!0,K);n(e,t)},$$slots:{viz:(e,i)=>{var t=l(e,!0,Q),d=c(t);Z(d,{get query(){return v()}}),n(e,t)}}}),x(w,()=>v()!==""&&$.indexOf(v())!==-1,e=>{var i=f(e,!0,R);m(e,i)},e=>{var i=f(e,!0,ee),t=P(i),d=r(r(t,!0));p(t,{children:(o,u)=>{var a=l(o,!0,U);n(o,a)},$$slots:{viz:(o,u)=>{var a=l(o,!0,V),_=c(a);A(_,{get query(){return v()}}),n(o,a)}}}),p(d,{children:(o,u)=>{var a=l(o,!0,X);n(o,a)},$$slots:{viz:(o,u)=>{var a=l(o,!0,Y),_=c(a);D(_,{get query(){return v()}}),n(o,a)}}}),m(e,i)}),m(g,q),O()}export{le as component};