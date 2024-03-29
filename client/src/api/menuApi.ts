import { apiUrl } from "./constants";


// const getMenu = () => {
//     return fetch(`${apiUrl}/api/menu`)
//         .then((res) => res.json());
// };


// Get all menu
const getMenu = async () => {
    const res = await fetch(`${apiUrl}/api/menu`);
    const menu = await res.json();
    return menu;
};


// Get a dish By Id
async function getDishById(id: string) {
    const res = await fetch(`${apiUrl}/api/menu/` + id, {
        method: 'GET',
        headers: { Accept: 'application/json' }
    });
    if (res.ok === true) {
        return await res.json();
    }
}


// Сreate Dish
async function submitMenuApi(form: any) {
    const res = await fetch(`${apiUrl}/api/menu`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: form
    });

    return await res.json();

    // так не проходе помилка 
    // if (res.ok === true) {
    //     return await res.json();
    // }
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


// Remove Dish
async function deleteDishApi(id: string) {
    const res = await fetch(`${apiUrl}/api/menu/` + id, {
        method: 'DELETE',
        headers: { Accept: 'application/json' }
    });
    if (res.ok === true) {
        return await res.json();
    }
}


export { getMenu, getDishById, submitMenuApi, editDishApi, deleteDishApi };
