import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
  const mode = new URL(request.url).searchParams.get('mode');
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  if (mode !== 'login' || mode !== 'signup') {
    throw json({message: 'Unsupported mode.'}, { status: 422});
  }

  if (mode) {
    const response = await fetch('http://localhost:8080/login' + mode, {
      method: 'POST',
      body: JSON.stringify(authData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 422 || response.status === 401) {
      throw json({ message: 'Authentication failed.'}, { status: 401});
    }

    if (!response.ok) {
      throw json({ message: 'Error. Could not authenticate user.'}, { status: 500});
    }

    return redirect('/')
  }
}