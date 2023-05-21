export async function handleInitAuth(authResponse: google.accounts.oauth2.CodeResponse) {
  const apiResponse = await fetch(`http://localhost:4008/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: authResponse.code
    })
  })


  return apiResponse.json();
}