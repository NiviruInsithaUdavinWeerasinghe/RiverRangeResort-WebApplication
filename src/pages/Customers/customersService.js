// customersService.js
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore/lite";

// Generate customer ID RC-[id]
export const generateCustomerID = async () => {
  const snapshot = await getDocs(collection(db, "customers"));
  return `RC-${snapshot.size + 1}`;
};

// Add a new customer to Firestore
export const addCustomer = async (customerData) => {
  const customerID = await generateCustomerID();
  const newCustomer = {
    id: customerID,
    ...customerData,
    createdAt: new Date(),
  };

  await addDoc(collection(db, "customers"), newCustomer);
  return customerID;
};

// Optional: fetch all customers
export const getAllCustomers = async () => {
  const snapshot = await getDocs(collection(db, "customers"));
  return snapshot.docs.map((doc) => doc.data());
};
