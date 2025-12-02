import React from 'react';
import styles from '../PageStyles/PageStyles.module.css';

const Settings = ({ isDarkMode }) => {
    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const textClass = isDarkMode ? `${styles.pageText} ${styles.darkMode}` : styles.pageText;
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;

    return (
        <div className={containerClass}>
            <h2 className={headerClass}>Settings</h2>

            <p className={textClass}>
                Change your system preferences and application settings.
            </p>

            <div className={cardClass} style={{ marginTop: '20px' }}>
                [Placeholder for Settings Options]
            </div>
        </div>
    );
};

export default Settings;
