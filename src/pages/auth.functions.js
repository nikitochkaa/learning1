export function signIn(email, password) {
  fetch('http://localhost:5000/api/auth/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      email: email,
      password: password
    }),
  }).then(response => response.json()).then(data => {
    window.location.href = 'http://localhost:3000/'
    window.localStorage.setItem('token', data.token)
  }).catch(e => {
    console.log(e)
  })
}

export function signUp(email, password) {
  fetch('http://localhost:5000/api/auth/register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
  }).then(response => response.json()).then(data => {
    console.log(data)
  }).catch(e => {
    console.log(e)
  })
}

export function logOut() {
  localStorage.removeItem('token')
}


