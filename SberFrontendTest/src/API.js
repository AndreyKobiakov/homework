import { USERS_MOCK } from "./__mock_data";

let __mock = USERS_MOCK;

function getUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(__mock), 1000);
  });
}

function addUser(newUserData) {
  return new Promise((resolve, reject) => {
    __mock.push(newUserData);
    setTimeout(() => resolve(__mock), 1000);
  });
}

function removeUserById(removeId) {
  return new Promise((resolve, reject) => {
    __mock = __mock.filter((user) => user.id !== removeId);
    setTimeout(() => resolve(__mock), 1000);
  });
}

export default {
  getUsers,
  addUser,
  removeUserById
};
