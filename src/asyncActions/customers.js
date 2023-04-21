import { addManyCustomersAction } from "../store/customerReducer";

export const fetchCustomers = () => {
  return function (distpatch) {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => distpatch(addManyCustomersAction(json)));
  };
};
