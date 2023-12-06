
const URL = `http://localhost:5000`

export const fetchUserOrganizations = async (accessToken: string) => { 
    const response = await fetch(`${URL}/list-organizations`, { headers: { 'Authorization': `Bearer ${accessToken}` }  });
    const data = await response.json();
    return data;
}