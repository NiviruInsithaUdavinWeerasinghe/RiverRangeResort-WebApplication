import React from 'react';
import styles from '../PageStyles/PageStyles.module.css';

// Card component now uses the shared styles module
const Card = ({ title, value, isDarkMode }) => {
    // Apply darkMode class conditionally
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;
    const valueClass = isDarkMode ? `${styles.cardValue} ${styles.darkMode}` : styles.cardValue;
    // FIX: Apply conditional dark mode class to the title
    const titleClass = isDarkMode ? `${styles.cardTitle} ${styles.darkMode}` : styles.cardTitle; 

    return (
        <div className={cardClass}>
            <p className={titleClass}>{title}</p>
            <p className={valueClass}>{value}</p>
        </div>
    );
};

// Dashboard component accepts isDarkMode prop
const Dashboard = ({ isDarkMode }) => {
    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const textClass = isDarkMode ? `${styles.pageText} ${styles.darkMode}` : styles.pageText;

    return (
        <div className={containerClass}>
            <h2 className={headerClass}>Dashboard Overview</h2>
            <p className={textClass}>
                Welcome to the centralized dashboard for River Range Resort. View key performance indicators (KPIs) and operational summaries here.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
                <Card title="Total Bookings" value="1,250" isDarkMode={isDarkMode} />
                <Card title="Occupancy Rate" value="85.4%" isDarkMode={isDarkMode} />
                <Card title="Revenue (MTD)" value="$45,000" isDarkMode={isDarkMode} />
                <Card title="New Guests" value="78" isDarkMode={isDarkMode} />
            </div>
        </div>
    );
};

export default Dashboard;