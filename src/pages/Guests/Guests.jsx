import React from 'react';
import styles from '../PageStyles/PageStyles.module.css'; // FIX: Corrected import path

const Guests = ({ isDarkMode }) => {
    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const textClass = isDarkMode ? `${styles.pageText} ${styles.darkMode}` : styles.pageText;
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;

    return (
        <div className={containerClass}>
            <h2 className={headerClass}>Guest List</h2>
            <p className={textClass}>
                Maintain and search the database of all registered guests.
            </p>
            <div className={cardClass} style={{ marginTop: '20px' }}>
                [Placeholder for Guest CRM and Profile Lookup]
            </div>
        </div>
    );
};

export default Guests;