import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  // ! here we are getting our query params 'login' or 'signup'
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get('mode') || 'login';
  console.log(mode);

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = { email: data.get('email'), password: data.get('password') };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // ! here we are axtracting our query key
  const resData = await response.json();
  // there is a key (resData.token) token in this object
  const token = resData.token;

  // setting a token to the local storage
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  // ! when we are logged in we are being redirected to the starting page
  return redirect('/');
};
