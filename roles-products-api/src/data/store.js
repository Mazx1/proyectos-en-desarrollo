import { ROLES } from "../constants/roles.js";

let nextUserId = 4;
let nextRoleId = 4;
let nextProductId = 4;

export const roles = [
  { id: 1, name: ROLES.USER },
  { id: 2, name: ROLES.ADMIN },
  { id: 3, name: ROLES.SUPERADMIN },
];

export const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Teclado" },
];

export const users = [
  {
    id: 1,
    username: "superadmin",
    passwordHash: "",
    role: ROLES.SUPERADMIN,
  },
  {
    id: 2,
    username: "admin",
    passwordHash: "",
    role: ROLES.ADMIN,
  },
  {
    id: 3,
    username: "user",
    passwordHash: "",
    role: ROLES.USER,
  },
];

export function getNextUserId() {
  return nextUserId++;
}

export function getNextRoleId() {
  return nextRoleId++;
}

export function getNextProductId() {
  return nextProductId++;
}

export function findRoleById(id) {
  return roles.find((role) => role.id === id);
}

export function findRoleByName(name) {
  return roles.find((role) => role.name === name);
}

export function findProductById(id) {
  return products.find((product) => product.id === id);
}

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function findUserByUsername(username) {
  return users.find((user) => user.username === username);
}
