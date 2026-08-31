import jwt, time
secret = "84dd59cc289ce36f1387b9ae92014a66"
tok = jwt.encode({
    "email": "ops@vaultly.internal",
    "iss": "https://id.vaultly.app",
    "sub": "okta|ops",
    "aud": "vaultly-hq",
    "iat": int(time.time()),
    "exp": int(time.time())+300,
}, secret, algorithm="HS256")
print(tok)
