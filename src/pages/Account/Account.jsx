import React from 'react';
import styles from '../PageStyles/PageStyles.module.css';

const Account = ({ isDarkMode }) => {
    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const textClass = isDarkMode ? `${styles.pageText} ${styles.darkMode}` : styles.pageText;
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;

    return (
        <div className={containerClass}>
            <h2 className={headerClass}>Account</h2>

            <p className={textClass}>
                View and manage your user account details.
            </p>

            <div className={cardClass} style={{ marginTop: '20px' }}>
                [Placeholder for Account Information]
            </div>
        </div>
    );
};

export default Account;
