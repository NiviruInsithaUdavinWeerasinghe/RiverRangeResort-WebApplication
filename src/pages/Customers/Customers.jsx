import React, { useState } from 'react';
import { addCustomer } from './customersService';
import styles from '../PageStyles/PageStyles.module.css';

const Customers = ({ isDarkMode }) => {
    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const textClass = isDarkMode ? `${styles.pageText} ${styles.darkMode}` : styles.pageText;
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;
    const inputClass = isDarkMode ? `${styles.inputField} ${styles.darkMode}` : styles.inputField;
    const buttonClass = isDarkMode ? `${styles.button} ${styles.darkMode}` : styles.button;

    const [customer, setCustomer] = useState({
        nic: '',
        fullName: '',
        phone: '',
        email: '',
        homeLocation: '',
        otherDetails: ''
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const customerID = await addCustomer(customer);
        alert(`Customer ${customer.fullName} saved successfully with ID: ${customerID}`);
        setCustomer({ nic: '', fullName: '', phone: '', email: '', homeLocation: '', otherDetails: '' });
    } catch (error) {
        console.error("Error adding customer: ", error);
        alert("Failed to save customer. Check console for errors.");
    }
};


    return (
        <div className={containerClass}>
            <h2 className={headerClass}>Customer List</h2>
            <p className={textClass}>
                Maintain and search the database of all registered customers.
            </p>

            <div className={cardClass} style={{ marginTop: '20px', padding: '20px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                    <input className={inputClass} name="nic" value={customer.nic} onChange={handleChange} placeholder="NIC" required />
                    <input className={inputClass} name="fullName" value={customer.fullName} onChange={handleChange} placeholder="Full Name" required />
                    <input className={inputClass} name="phone" value={customer.phone} onChange={handleChange} placeholder="Phone Number" required />
                    <input className={inputClass} name="email" value={customer.email} onChange={handleChange} placeholder="Email Address" required />
                    <input className={inputClass} name="homeLocation" value={customer.homeLocation} onChange={handleChange} placeholder="Home Location" />
                    <textarea className={inputClass} name="otherDetails" value={customer.otherDetails} onChange={handleChange} placeholder="Other Details" />

                    <button type="submit" className={buttonClass}>Save Customer</button>
                </form>
            </div>
        </div>
    );
};

export default Customers;
