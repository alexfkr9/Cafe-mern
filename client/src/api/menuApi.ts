import { apiUrl } from "./constants";


// const getMenu = () => {
//     return fetch(`${apiUrl}/api/menu`)
//         .then((res) => res.json());
// };


const getMenu = async () => {
    const res = await fetch(`${apiUrl}/api/menu`);
    return await res.json();
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


export { getMenu, getDishById };
