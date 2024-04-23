import { redirect } from 'react-router-dom';

export function getAuthToken() {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (!token || tokenDuration <= 0) {
        return 'EXPIRED';
    }

    console.log(token)

    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null;
}

export function getTokenDuration() { 
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    console.log(duration)
    return duration;
}