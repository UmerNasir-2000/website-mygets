// const URL = `https://backend-mygets.vercel.app`
const URL = `http://localhost:5000`

export const fetchUserOrganizations = async (accessToken: string) => {
  const response = await fetch(`${URL}/list-organizations`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const data = await response.json()
  return data
}

export const createNewOrganization = async (
  requestBody: {name: string, country: string, industryType: string, tenderProducts: string },
  accessToken: string
) => {
  const response = await fetch(`${URL}/create-organization`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(requestBody),
  })
  const data = await response.json()
  return data
}

export const sendInvite = async (
  requestBody: { email: string; orgId: string; role: string },
  accessToken: string
) => {
  const response = await fetch(`${URL}/invite`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(requestBody),
  })
  const data = await response.json()
  return data
}
