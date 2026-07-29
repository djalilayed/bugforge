	globalThis.batch = async function (requests) {
	  const res = await fetch("/wp-json/batch/v1", {
	    method: "POST",
	    credentials: "include",
	    headers: {
	      "Content-Type": "application/json"
	    },
	    body: JSON.stringify({ requests })
	  });

	  const text = await res.text();

	  let data;
	  try {
	    data = JSON.parse(text);
	  } catch {
	    data = text;
	  }

	  console.log("HTTP:", res.status);
	  console.log(data);

	  return {
	    status: res.status,
	    data
	  };
	};

	console.log("Batch helper ready");

await batch([
  {
    method: "POST",
    path: "http://:"
  },
  {
    method: "POST",
    path: "/wp/v2/plugins",
        body: {
          slug: "hello-wordmess",
          status: "active",
          hook: "test",
        }
  },
  {
    method: "GET",
    path: "/wp/v2/posts"
  }
]);
