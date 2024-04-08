import{i as Y,k as O,a1 as S,c as z,m as I,b as Z,l as W,d as B,o as V,e as H}from"../chunks/disclose-version.C19aztMc.js";import{p as J,a as Q,s as q,g as j}from"../chunks/runtime.DoKzdPu0.js";import{o as G}from"../chunks/main-client.DvK-05yQ.js";import"../chunks/transform.s-_yf9sf.js";import{s as K,b as X,l as $,a as tt,m as nt,c as et}from"../chunks/linear.DpLS6zqf.js";import{w as rt,a as at,c as _}from"../chunks/array.DIqrq8cy.js";var F={},k={},N=34,A=10,R=13;function M(t){return new Function("d","return {"+t.map(function(e,o){return JSON.stringify(e)+": d["+o+'] || ""'}).join(",")+"}")}function ot(t,e){var o=M(t);return function(r,s){return e(o(r),s,t)}}function U(t){var e=Object.create(null),o=[];return t.forEach(function(r){for(var s in r)s in e||o.push(e[s]=s)}),o}function v(t,e){var o=t+"",r=o.length;return r<e?new Array(e-r+1).join(0)+o:o}function it(t){return t<0?"-"+v(-t,6):t>9999?"+"+v(t,6):v(t,4)}function st(t){var e=t.getUTCHours(),o=t.getUTCMinutes(),r=t.getUTCSeconds(),s=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":it(t.getUTCFullYear())+"-"+v(t.getUTCMonth()+1,2)+"-"+v(t.getUTCDate(),2)+(s?"T"+v(e,2)+":"+v(o,2)+":"+v(r,2)+"."+v(s,3)+"Z":r?"T"+v(e,2)+":"+v(o,2)+":"+v(r,2)+"Z":o||e?"T"+v(e,2)+":"+v(o,2)+"Z":"")}function lt(t){var e=new RegExp('["'+t+`
\r]`),o=t.charCodeAt(0);function r(n,u){var c,f,i=s(n,function(d,g){if(c)return c(d,g-1);f=d,c=u?ot(d,u):M(d)});return i.columns=f||[],i}function s(n,u){var c=[],f=n.length,i=0,d=0,g,x=f<=0,b=!1;n.charCodeAt(f-1)===A&&--f,n.charCodeAt(f-1)===R&&--f;function y(){if(x)return k;if(b)return b=!1,F;var w,D=i,T;if(n.charCodeAt(D)===N){for(;i++<f&&n.charCodeAt(i)!==N||n.charCodeAt(++i)===N;);return(w=i)>=f?x=!0:(T=n.charCodeAt(i++))===A?b=!0:T===R&&(b=!0,n.charCodeAt(i)===A&&++i),n.slice(D+1,w-1).replace(/""/g,'"')}for(;i<f;){if((T=n.charCodeAt(w=i++))===A)b=!0;else if(T===R)b=!0,n.charCodeAt(i)===A&&++i;else if(T!==o)continue;return n.slice(D,w)}return x=!0,n.slice(D,f)}for(;(g=y())!==k;){for(var a=[];g!==F&&g!==k;)a.push(g),g=y();u&&(a=u(a,d++))==null||c.push(a)}return c}function p(n,u){return n.map(function(c){return u.map(function(f){return C(c[f])}).join(t)})}function E(n,u){return u==null&&(u=U(n)),[u.map(C).join(t)].concat(p(n,u)).join(`
`)}function h(n,u){return u==null&&(u=U(n)),p(n,u).join(`
`)}function l(n){return n.map(m).join(`
`)}function m(n){return n.map(C).join(t)}function C(n){return n==null?"":n instanceof Date?st(n):e.test(n+="")?'"'+n.replace(/"/g,'""')+'"':n}return{parse:r,parseRows:s,format:E,formatBody:h,formatRows:l,formatRow:m,formatValue:C}}var ut=lt(","),ct=ut.parse;function ft(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.text()}function dt(t,e){return fetch(t,e).then(ft)}function pt(t){return function(e,o,r){return arguments.length===2&&typeof o=="function"&&(r=o,o=void 0),dt(e,o).then(function(s){return t(s,r)})}}var ht=pt(ct);function P(t){this._context=t}P.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e);break}}};function mt(t){return new P(t)}function gt(t){return t[0]}function bt(t){return t[1]}function L(t,e){var o=_(!0),r=null,s=mt,p=null,E=rt(h);t=typeof t=="function"?t:t===void 0?gt:_(t),e=typeof e=="function"?e:e===void 0?bt:_(e);function h(l){var m,C=(l=at(l)).length,n,u=!1,c;for(r==null&&(p=s(c=E())),m=0;m<=C;++m)!(m<C&&o(n=l[m],m,l))===u&&((u=!u)?p.lineStart():p.lineEnd()),u&&p.point(+t(n,m,l),+e(n,m,l));if(c)return p=null,c+""||null}return h.x=function(l){return arguments.length?(t=typeof l=="function"?l:_(+l),h):t},h.y=function(l){return arguments.length?(e=typeof l=="function"?l:_(+l),h):e},h.defined=function(l){return arguments.length?(o=typeof l=="function"?l:_(!!l),h):o},h.curve=function(l){return arguments.length?(s=l,r!=null&&(p=s(r)),h):s},h.context=function(l){return arguments.length?(l==null?r=p=null:p=s(r=l),h):r},h}var vt=H('<input type="text" placeholder="Enter Zipcode"> <button>Update Chart</button> <svg width="960" height="500"></svg>',!0);function Tt(t,e){Q(e,!1);let o=I(""),r,s,p;function E(){const c={top:50,right:250,bottom:80,left:70},f=960-c.left-c.right,i=500-c.top-c.bottom;r=K("svg").attr("viewBox",`0 0 1000 ${i+c.top+c.bottom}`).append("g").attr("transform",`translate(${c.left},${c.top})`),s=X().range([0,f]).padding(.2),r.append("g").attr("class","x-axis").attr("transform",`translate(0,${i})`),r.append("text").attr("class","x label").attr("text-anchor","middle").attr("x",f/2).attr("y",i+40).text("Year"),p=$().range([i,0]),r.append("g").attr("class","y-axis"),r.append("text").attr("class","y label").attr("text-anchor","middle").attr("transform","rotate(-90)").attr("y",-50).attr("x",-i/2).text("Number of Distinct Buildings or Complaints in a Year"),r.append("text").attr("class","chart title").attr("x",f/2).attr("y",-20).attr("text-anchor","middle").style("font-size","16px").style("font-weight","bold").text("Complaints Filed about Condominium Buildings in the Boston and Cambridge Area");const d=r.append("g").attr("class","legend").attr("transform",`translate(${f+50}, 20)`),g=[{color:"steelblue",label:"# of Complaints Filed Per Year"},{color:"red",label:"# of Distinct Buildings the Complaints are Filed About"}];let x=0;g.forEach(b=>{const y=b.label.length*8;x=Math.max(x,y)}),x+=40,d.append("rect").attr("class","legend-box").attr("x",0).attr("y",0).attr("width",x).attr("height",g.length*20+10).attr("fill","none").attr("stroke","black"),g.forEach((b,y)=>{const a=d.append("g").attr("transform",`translate(0, ${y*20+10})`);a.append("rect").attr("x",0).attr("y",0).attr("width",10).attr("height",10).attr("fill",b.color),a.append("text").attr("x",20).attr("y",9).attr("font-size","10px").text(b.label)})}async function h(u){const c=await ht("complaints_year_zipcode.csv");c.columns=c.columns.map(a=>a.trim().replace(/[^\x20-\x7E]+/g,""));const f=c.filter(a=>a["Zip Code"]===u);let i={};f.forEach(a=>{const w=a["Date (Years)"];i[w]||(i[w]={count:0,discounted:0}),i[w].count+=+a["Number of Complaints Filed Per Year"],i[w].discounted+=+a["Number of Distinct Condominum Buildings the Complaints are Filed About"]});let d=Object.keys(i).map(a=>({year:a,count:i[a].count,discounted:i[a].discounted}));const g=L().x(a=>s(a.year)+s.bandwidth()/2).y(a=>p(a.count)),x=L().x(a=>s(a.year)+s.bandwidth()/2).y(a=>p(a.discounted));s.domain(d.map(a=>a.year)),r.select(".x-axis").transition().duration(750).call(tt(s)).selectAll("text").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end"),p.domain([0,nt(d,a=>Math.max(a.count,a.discounted))]),r.select(".y-axis").transition().duration(750).call(et(p));let b=r.selectAll(".line-count").data([d],a=>a.year),y=r.selectAll(".line-discounted").data([d],a=>a.year);b.transition().duration(750).attr("d",g(d)),y.transition().duration(750).attr("d",x(d)),b.empty()&&r.append("path").data([d]).attr("class","line-count").attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("d",g),y.empty()&&r.append("path").data([d]).attr("class","line-discounted").attr("fill","none").attr("stroke","red").attr("stroke-width",1.5).attr("d",x)}function l(){j(o)?h(j(o)):alert("Please enter a zipcode.")}G(()=>{E()}),Y();var m=V(t,!0,vt),C=Z(m);W(C);var n=B(B(C,!0));O(C,()=>j(o),u=>q(o,u)),S("click",n,l,!1),z(t,m),J()}export{Tt as component};