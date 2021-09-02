async function request({url, method, token, body}) {
  const response = await fetch(url, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const data = await response.json();

  return data;
}

export {request};
