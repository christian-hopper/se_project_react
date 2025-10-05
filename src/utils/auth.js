const baseUrl = "http://localhost:3001";

import { checkResponse } from "./api.js";

// Signup request
function signup({ name, avatar, email, password }) {
  const body = avatar
    ? { name, avatar, email, password }
    : { name, email, password };

  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(checkResponse);
}

// Signin request
function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// Get user info request
function getUserInfo(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { signup, signin, getUserInfo };
