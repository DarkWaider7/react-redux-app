import "./App.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCustomerAction } from "./store/customerReducer";
import { removeCustomerAction } from "./store/customerReducer";
import { fetchCustomers } from "./asyncActions/customers";

function App() {
  const distpatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customer.customers);
  console.log(customers);

  const addCash = (finalCash) => {
    distpatch({ type: "ADD_CASH", payload: finalCash });
  };

  const getCash = (finalCash) => {
    distpatch({ type: "GET_CASH", payload: finalCash });
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    distpatch(addCustomerAction(customer));
  };

  const removeCustomer = (customer) => {
    console.log(customer, "-cus");
    distpatch(removeCustomerAction(customer.id));
  };
  return (
    <div className="App">
      <div className="title">{cash}</div>
      <div className="btns">
        <button onClick={() => addCash(Number(prompt("пополнить счет")))}>
          +
        </button>
        <button onClick={() => getCash(Number(prompt("снять со счета")))}>
          -
        </button>
        <button onClick={() => addCustomer(prompt("дабавить клиента"))}>
          Add Client
        </button>
        <button onClick={() => distpatch(fetchCustomers())}>
          See all users
        </button>
      </div>
      <div className="clients">
        {customers.length ? (
          <div>
            {customers.map((customer) => {
              return (
                <div
                  className="client"
                  onClick={() => removeCustomer(customer)}
                  key={customer.id}>
                  {customer.name}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ fontSize: "23px" }}>NO CLIENTS</div>
        )}
      </div>
    </div>
  );
}

export default App;
