const key = "AIzaSyDA6WuLuNvsplkRj1FQAmOmbBlCIlPbX_0";
const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${key}`;

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    postBody: "id_token=123&providerId=google.com",
    requestUri: "http://localhost:5173",
    returnIdpCredential: true,
    returnSecureToken: true
  })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
