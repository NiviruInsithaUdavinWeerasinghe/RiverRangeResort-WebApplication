import React from 'react';
import styles from '../PageStyles/PageStyles.module.css'; // FIX: Corrected import path

const Reports = ({ isDarkMode }) => {
    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const textClass = isDarkMode ? `${styles.pageText} ${styles.darkMode}` : styles.pageText;
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;

    return (
        <div className={containerClass}>
            <h2 className={headerClass}>Analytics & Reports</h2>
            <p className={textClass}>
                Generate and export custom reports on revenue, guest demographics, and property performance.
            </p>
            <div className={cardClass} style={{ marginTop: '20px' }}>
                [Placeholder for Report Generation Tools]
            </div>
        </div>
    );
};

export default Reports;