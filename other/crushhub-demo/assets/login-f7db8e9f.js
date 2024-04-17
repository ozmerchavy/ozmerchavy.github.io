import{u as v,a as b,r,b as C,c as k,g as L,j as e,B as I,d as g,S as t,C as D,T as a,e as S,D as B,h as F,l as P,W as T}from"./index-66af4ed7.js";import{b as G,I as h}from"./iconify-06b07703.js";import{D as A}from"./dialog-31ae6465.js";import{L as x,T as p,I as E,a as W,b as R}from"./LoadingButton-967b47d3.js";function H(){const i=v(),l=b(),[n,m]=r.useState(!1),[j,c]=r.useState(!1),f=C(s=>s.user.isLoggedIn),[o,d]=r.useState({password:"",email:""}),u=k(),w=L({onSuccess:s=>{u(F(s.code))},onError:()=>{console.error("Google login failed")},flow:"auth-code"}),y=async()=>{u(P(o))};return f&&l.push("/"),e.jsx(I,{sx:{...G({color:g(i.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:e.jsx(t,{alignItems:"center",justifyContent:"center",children:e.jsxs(D,{sx:{p:5,width:1,maxWidth:420,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(a,{variant:"h4",children:"Sign in to CrushHub"}),e.jsxs(a,{variant:"body2",sx:{mt:2,mb:5},children:["Don’t have an account?",e.jsx(x,{variant:"subtitle2",sx:{ml:.5,cursor:"pointer"},onClick:()=>l.push("/register"),children:"Get started"})]}),e.jsx(t,{direction:"row",spacing:2,children:e.jsx(S,{fullWidth:!0,color:"inherit",variant:"outlined",sx:{borderColor:g(i.palette.grey[500],.16)},onClick:()=>w(),children:e.jsx(h,{icon:"eva:google-fill"})})}),e.jsx(B,{sx:{my:2},children:e.jsx(a,{variant:"body2",sx:{color:"text.secondary"},children:"OR"})}),e.jsxs(e.Fragment,{children:[e.jsxs(t,{spacing:3,children:[e.jsx(p,{name:"email",label:"Email address",value:o.email,onChange:s=>d({...o,email:s.target.value})}),e.jsx(p,{name:"password",label:"Password",type:n?"text":"password",value:o.password,onChange:s=>d({...o,password:s.target.value}),InputProps:{endAdornment:e.jsx(E,{position:"end",children:e.jsx(W,{onClick:()=>m(!n),edge:"end",children:e.jsx(h,{icon:n?"eva:eye-fill":"eva:eye-off-fill"})})})}})]}),e.jsx(t,{direction:"row",alignItems:"center",justifyContent:"flex-end",sx:{my:3},children:e.jsx(x,{variant:"subtitle2",underline:"hover",onClick:()=>c(!0),sx:{cursor:"pointer"},children:"Forgot password?"})}),e.jsx(A,{title:"Forgot Password",description:"Try to remember where you last put it.",ButtonText:"Back",onClick:()=>c(!1),open:j}),e.jsx(R,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:y,children:"Login"})]})]})})})}function _(){return e.jsxs(e.Fragment,{children:[e.jsx(T,{children:e.jsx("title",{children:" CrushHub | Login  "})}),e.jsx(H,{})]})}export{_ as default};
