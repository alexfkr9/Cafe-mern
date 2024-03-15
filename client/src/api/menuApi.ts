import { apiUrl } from "./constants";


// const getMenu = () => {
//     return fetch(`${apiUrl}/api/menu`)
//         .then((res) => res.json());
// };


const getMenu = async () => {
    const res = await fetch(`${apiUrl}/api/menu`);
    const menu = await res.json();
    return menu;
};


// Get a dish from server
async function getDishById(id: string) {
    const res = await fetch(`${apiUrl}/api/menu/` + id, {
        method: 'GET',
        headers: { Accept: 'application/json' }
    });
    if (res.ok === true) {
        return await res.json();
    }
}

// Change Dish
async function editDishApi(form: any) {
    const res = await fetch(`${apiUrl}/api/menu`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    });
    if (res.ok === true) {
        return await res.json();
    }
}


// Remove dish
async function DeleteDishApi(id: string) {
    const res = await fetch(`${apiUrl}/api/menu/` + id, {
        method: 'DELETE',
        headers: { Accept: 'application/json' }
    });
    if (res.ok === true) {
        return await res.json();
    }
}


// Change Dish
async function submitMenuApi(form: any) {
    const res = await fetch(`${apiUrl}/api/menu`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: form
    });
    if (res.ok === true) {
        return await res.json();
    }
}


export { getMenu, getDishById, editDishApi, DeleteDishApi, submitMenuApi };
