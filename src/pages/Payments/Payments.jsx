import React from 'react';
import styles from '../PageStyles/PageStyles.module.css'; // FIX: Corrected import path

const Payments = ({ isDarkMode }) => {
    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const textClass = isDarkMode ? `${styles.pageText} ${styles.darkMode}` : styles.pageText;
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;

    return (
        <div className={containerClass}>
            <h2 className={headerClass}>Payment History</h2>
            <p className={textClass}>
                Track all transactions, refunds, and payment statuses.
            </p>
            <div className={cardClass} style={{ marginTop: '20px' }}>
                [Placeholder for Transaction Log and Payment Gateway Status]
            </div>
        </div>
    );
};

export default Payments;