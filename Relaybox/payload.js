function c(type,d){try{fetch('/collect',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({type:type},d||{}))})}catch(e){}}
c('page-load',{href:location.href,origin:location.origin,ref:document.referrer});
document.getElementById('connect').onclick=()=>{
  c('connect-click',{});
  const s=new URLSearchParams({
    client_id:'relaybox-assistant',
    response_type:'code',
    scope:'notes:read',
    redirect_uri:'http://cdn.localhost:3000/assistant/oauth/callback',
    state:location.origin
  });
  const w=window.open('http://localhost:3000/assistant/oauth/authorize?'+s.toString(),'assistant-studio','width=560,height=700');
  c('popup',{opened:!!w});
};
window.addEventListener('message',(e)=>{
  try{c('postmessage',{origin:e.origin,data:(typeof e.data==='object'?JSON.stringify(e.data):String(e.data)).slice(0,600)})}catch(err){}
  if(e.origin==='http://cdn.localhost:3000'&&e.data&&e.data.type==='relaybox:assistant:connected'){
    document.getElementById('status')&&(document.getElementById('status').textContent='Connection approved.');
    c('connected',{});
  }
});
