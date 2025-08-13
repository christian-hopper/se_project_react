const baseUrl = "http://localhost:3001";

function checkResponse(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function addItem(item) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
}

export { getItems, addItem, deleteItem };
