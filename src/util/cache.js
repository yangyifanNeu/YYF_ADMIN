export default {
  get(name) {
    return JSON.parse(localStorage.getItem(name));
  },
  put(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  },
  remove(name) {
    localStorage.removeItem(name);
  },
};
