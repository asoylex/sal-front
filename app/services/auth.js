
import { successAlert, warningAlert } from "../helper/alert";
const pathURL = process.env.NEXT_PUBLIC_PATH_API;

export function login(data) {
    const { email, password } = data

    return fetch(pathURL + '/auth/login', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.access_token) {
                localStorage.setItem('accessToken', data.access_token);
                successAlert('Login successful');
            } else {
                warningAlert('Login failed');
            }
            return data;
        })
        .catch((error) => {
            warningAlert('An error occurred during login');
            console.error('Login error:', error);
        });
}


export function logoutService() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
}