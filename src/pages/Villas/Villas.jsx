import React from 'react';
import styles from '../PageStyles/PageStyles.module.css'; // FIX: Corrected import path

const Villas = ({ isDarkMode }) => {
    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const textClass = isDarkMode ? `${styles.pageText} ${styles.darkMode}` : styles.pageText;
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;

    return (
        <div className={containerClass}>
            <h2 className={headerClass}>Villas Management</h2>
            <p className={textClass}>
                Detailed status and maintenance records for each property unit.
            </p>
            <div className={cardClass} style={{ marginTop: '20px' }}>
                [Placeholder for Villa Inventory and Availability Charts]
            </div>
        </div>
    );
};

export default Villas;