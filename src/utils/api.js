const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}`);
  });
}

function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}`);
  });
}

function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}`);
  });
}

export { getItems, addItem, deleteItem };
