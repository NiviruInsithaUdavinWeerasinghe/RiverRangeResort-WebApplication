import React from 'react';

const Guests = () => (
    <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', minHeight: '80vh' }}>
        <h2 style={{ color: '#fbbf24', fontSize: '28px', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '8px' }}>Guest List</h2>
        <p style={{ color: '#f8fafc', fontSize: '16px' }}>
            Maintain and search the database of all registered guests.
        </p>
        <div style={{ marginTop: '20px', backgroundColor: 'rgba(30, 41, 59, 1)', padding: '16px', borderRadius: '8px', color: '#94a3b8' }}>
            [Placeholder for Guest CRM and Profile Lookup]
        </div>
    </div>
);

export default Guests;