import AuthForm from '../components/AuthForm';
import { json, redirect} from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
  const mode = new URL(request.url).searchParams.get('mode');


  console.log(mode)
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  if (mode !== 'login' && mode !== 'signup') {
    throw json({message: 'Unsupported mode.'}, { status: 422});
  }

  if (mode) {
    const url = `http://localhost:8080/${mode}`;
    console.log(url)
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(authData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 422 || response.status === 401) {
      return response
    }

    if (!response.ok) {
      throw json({ message: 'Error. Could not authenticate user.'}, { status: 500});
    }

    return redirect('/')
  }
}