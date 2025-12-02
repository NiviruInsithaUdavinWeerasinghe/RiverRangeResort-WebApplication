import React from 'react';

const Dashboard = () => (
    <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', minHeight: '80vh' }}>
        <h2 style={{ color: '#fbbf24', fontSize: '28px', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '8px' }}>Dashboard Overview</h2>
        <p style={{ color: '#f8fafc', fontSize: '16px' }}>
            Welcome to the centralized dashboard for River Range Resort. View key performance indicators (KPIs) and operational summaries here.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <Card title="Total Bookings" value="1,250" />
            <Card title="Occupancy Rate" value="85.4%" />
            <Card title="Revenue (MTD)" value="$45,000" />
            <Card title="New Guests" value="78" />
        </div>
    </div>
);

const Card = ({ title, value }) => (
    <div style={{ backgroundColor: 'rgba(30, 41, 59, 1)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>{title}</p>
        <p style={{ color: '#fbbf24', fontSize: '32px', fontWeight: 'bold' }}>{value}</p>
    </div>
);

export default Dashboard;