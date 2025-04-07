
import { successAlert, errorAlert } from "../helper/alert";
const pathURL = process.env.NEXT_PUBLIC_PATH_API;


export function registerUser(user) {

    return fetch(pathURL + '/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then((data) => {

            console.log(data, "data");
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            }
            return data;
        });
}


export function getUsers() {
    return fetch(pathURL + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "data");
            return data;
        });
}

export function updateUser(user, id) {

    const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        status: user.status
    }

    console.log(data, "data");

    return fetch(`${pathURL}/user/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Client updated successfully!', 'success');
            return data;
        })
        .catch((error) => {
            errorAlert('Failed to update client.', 'error');
            throw error;
        });
}

export function deleteUser(id) {
    return fetch(`${pathURL}/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Usuário eliminado satifactoriamente!', 'success');
            return data;
        })
        .catch((error) => {
            errorAlert('Error al eliminar el usuario.', 'error');
            throw error;
        });
}