// Bookings.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Check, HelpCircle } from 'lucide-react';
import styles from '../PageStyles/PageStyles.module.css';

// --- Sub-components ---

const FilterGroup = ({ activeStatus, setActiveStatus, isDarkMode }) => {
    const statuses = ['All', 'Checked out', 'Checked in', 'Unconfirmed'];
    const buttonBase = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300';
    const inactiveLight = 'bg-slate-200 text-gray-700 hover:bg-slate-300';
    const activeLight = 'bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-900/20';
    const inactiveDark = 'bg-slate-700/50 text-slate-300 hover:bg-slate-700';
    const activeDark = 'bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-900/40';
    const inactiveClass = isDarkMode ? inactiveDark : inactiveLight;
    const activeClass = isDarkMode ? activeDark : activeLight;

    return (
        <div className="flex space-x-2">
            {statuses.map(status => (
                <button
                    key={status}
                    onClick={() => setActiveStatus(status)}
                    className={`${buttonBase} ${activeStatus === status ? activeClass : inactiveClass}`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
};

const SortDropdown = ({ activeSort, setActiveSort, isDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const sortOptions = [
        { label: 'Date Ascending', value: 'date-asc', icon: <ChevronUp size={16} /> },
        { label: 'Date Descending', value: 'date-desc', icon: <ChevronDown size={16} /> },
        { label: 'Amount Ascending', value: 'amount-asc', icon: <ChevronUp size={16} /> },
        { label: 'Amount Descending', value: 'amount-desc', icon: <ChevronDown size={16} /> },
    ];

    const currentOption = sortOptions.find(opt => opt.value === activeSort) || sortOptions[1];
    const dropdownBase = 'relative';
    const buttonBase = 'flex items-center justify-between w-48 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer';
    const buttonLight = 'bg-white border border-slate-300 text-gray-700 hover:bg-slate-50';
    const buttonDark = 'bg-slate-700/70 border border-slate-600 text-slate-300 hover:bg-slate-700';
    const listClass = 'absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10';
    const listLight = 'bg-white';
    const listDark = 'bg-slate-800 border border-slate-700';
    const itemBase = 'flex items-center px-4 py-2 text-sm transition-colors duration-200 cursor-pointer';
    const itemLight = 'text-gray-700 hover:bg-amber-100 hover:text-amber-700';
    const itemDark = 'text-slate-300 hover:bg-slate-700 hover:text-amber-400';

    return (
        <div className={dropdownBase}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${buttonBase} ${isDarkMode ? buttonDark : buttonLight}`}
            >
                {currentOption.label}
                <ChevronDown size={16} className={`ml-2 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {isOpen && (
                <div className={`${listClass} ${isDarkMode ? listDark : listLight}`}>
                    <div className="py-1">
                        {sortOptions.map(option => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    setActiveSort(option.value);
                                    setIsOpen(false);
                                }}
                                className={`${itemBase} ${isDarkMode ? itemDark : itemLight} ${
                                    activeSort === option.value ? (isDarkMode ? 'bg-slate-700/50 text-amber-400' : 'bg-amber-100 text-amber-600 font-semibold') : ''
                                }`}
                            >
                                <span className="mr-2 opacity-50">{option.icon}</span>
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Custom Interactive Delete Button ---
// States: 'idle', 'hover', 'confirm', 'deleted'
const DeleteButton = ({ isDarkMode }) => {
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        if (status === 'deleted') {
            const timer = setTimeout(() => setStatus('idle'), 2000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleMouseEnter = () => { if (status === 'idle') setStatus('hover'); };
    const handleMouseLeave = () => { if (status === 'hover') setStatus('idle'); };
    const handleClick = () => {
        if (status === 'idle' || status === 'hover') setStatus('confirm');
        else if (status === 'confirm') setStatus('deleted');
    };

    // Use explicit hex colors for --btn-bg so CSS pseudo-element can match exactly
    const config = {
        idle: {
            widthClass: 'w-12',
            // choose neutral color so idle button blends with container (not filled)
            bgHex: isDarkMode ? 'transparent' : 'transparent',
            // icon color follows theme in idle
            iconColor: isDarkMode ? '#f1f5f9' : '#0f172a',
            text: null,
            ariaLabel: 'Delete'
        },
        hover: {
            widthClass: 'w-32',
            bgHex: '#ef4444', // red-500
            iconColor: '#ffffff',
            text: 'Delete',
            ariaLabel: 'Confirm delete'
        },
        confirm: {
            widthClass: 'w-40',
            bgHex: '#3b82f6', // blue-500
            iconColor: '#ffffff',
            text: 'Are you sure?',
            ariaLabel: 'Confirm delete final'
        },
        deleted: {
            widthClass: 'w-36',
            bgHex: '#10b981', // emerald-500
            iconColor: '#ffffff',
            text: 'Deleted',
            ariaLabel: 'Deleted'
        }
    };

    const current = config[status];

    // Icon elements - keep lucide icons but color applied via style prop
    const iconElement = (() => {
        if (status === 'confirm') return <HelpCircle size={18} style={{ color: current.iconColor }} />;
        if (status === 'deleted') return <Check size={18} style={{ color: current.iconColor }} />;
        // idle/hover use trash icon; hover gets tilt animation
        return <Trash2 size={18} style={{ color: current.iconColor }} className={status === 'hover' ? styles.tiltIcon : ''} />;
    })();

    // Inline CSS var for pseudo-element background
    // If bgHex is 'transparent' we still set var to 'transparent'
    const cssVar = { ['--btn-bg']: current.bgHex };

    return (
        <button
            aria-label={current.ariaLabel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            // set inline CSS var and class
            style={cssVar}
            data-state={status}   // ← ADD THIS LINE
            className={`${styles.deleteButton} ${current.widthClass} h-10 flex items-center overflow-hidden rounded-md transition-all duration-300 ease-in-out relative`}
        >
            {/* Icon Container (transparent background) */}
            <div className={`${styles.deleteIconContainer} flex-shrink-0 w-12 h-full flex items-center justify-center z-10`}>
                {iconElement}
            </div>

            {/* Text container */}
            <div
                className={`${styles.deleteText} whitespace-nowrap text-sm font-medium`}
                aria-hidden={status === 'idle'}
            >
                {current.text}
            </div>
        </button>
    );
};

const ActionButtons = ({ isDarkMode }) => {
    const buttonBase = 'flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300';
    const addButtonClass = isDarkMode
        ? 'bg-amber-600 text-white hover:bg-amber-700'
        : 'bg-amber-500 text-white hover:bg-amber-600';

    return (
        <div className="flex space-x-3 items-center">
            <button
                className={`${buttonBase} ${addButtonClass} h-10`}
                onClick={() => alert('Add Booking Clicked')}
            >
                <Plus size={18} className="mr-2" />
                Add Booking
            </button>

            {/* Pass isDarkMode down to DeleteButton */}
            <DeleteButton isDarkMode={isDarkMode} />
        </div>
    );
};

// --- Main Bookings Component ---
const Bookings = ({ isDarkMode }) => {
    const [activeStatus, setActiveStatus] = useState('All');
    const [activeSort, setActiveSort] = useState('date-desc');

    const containerClass = isDarkMode ? `${styles.pageContainer} ${styles.darkMode}` : styles.pageContainer;
    const headerClass = isDarkMode ? `${styles.pageHeader} ${styles.darkMode}` : styles.pageHeader;
    const cardClass = isDarkMode ? `${styles.contentCard} ${styles.darkMode}` : styles.contentCard;

    return (
        <div className={containerClass}>
            {/* Header and Controls */}
            <div className={`flex justify-between items-start ${headerClass}`}>
                <h2 className="m-0 p-0">{`Bookings Management`}</h2>

                <div className="flex space-x-6">
                    <FilterGroup
                        activeStatus={activeStatus}
                        setActiveStatus={setActiveStatus}
                        isDarkMode={isDarkMode}
                    />
                    <SortDropdown
                        activeSort={activeSort}
                        setActiveSort={setActiveSort}
                        isDarkMode={isDarkMode}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mb-6 mt-4">
                <ActionButtons isDarkMode={isDarkMode} />
            </div>

            {/* Placeholder Content */}
            <div className={cardClass} style={{ marginTop: '0' }}>
                <p className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>
                    [Placeholder for Bookings Table and Calendar View]
                </p>
            </div>
        </div>
    );
};

export default Bookings;
