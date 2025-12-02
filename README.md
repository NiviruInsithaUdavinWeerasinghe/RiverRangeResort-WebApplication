# **River Range Resort – Management Web Application**


## **Overview**

This repository contains the official Management Web Application used internally by the staff of River Range Resort.
The system centralizes all operational workflows including bookings, guest records, payments, activity management, analytics, and administrative controls.
It is built to deliver a reliable, secure, and scalable tool for resort operations.



## **Purpose**

The application is designed to streamline daily processes across the entire resort. It serves as the backend control panel for handling:

* Villa and hotel room bookings
* Guest details, history, and availability tracking
* Secure card payments using Stripe
* Internal staff operations
* Outdoor activity management
* Exclusive pass management
* Feedback, reviews, and customer service data
* Reports, insights, and revenue analytics
* Website content updates and media uploads

Overall, it reduces manual work and ensures operational accuracy.



## **Tech Stack**

### **Frontend**

* React.js (CRA + CRACO)
* CSS Modules, Tailwind, and custom component styling
* Axios / Fetch for API communication
* React Router for navigation

### **Backend**

* Node.js with Express.js
* Firebase Admin SDK
* Stripe for payment processing

### **Database and Cloud Services**

* Firebase Firestore (NoSQL database)
* Firebase Authentication (staff login)
* Firebase Storage (images and documents)
* Firebase Hosting (deployment)
* Optional BigQuery integration for analytics

### **Security Measures**

* HTTPS
* Environment variables for all keys
* Firestore database rules
* CORS and secure API access
* Role-based access control for staff



## **Core Features**

### **Management and Admin**

* Dashboard with real-time booking and revenue insights
* Manage villas, rooms, availability, and seasonal pricing
* Staff accounts and role permissions
* Global content management

### **Front Desk**

* Create bookings manually
* Edit, cancel, or update reservations
* Guest check-in and check-out status
* View guest profiles and booking history

### **Accounting**

* Stripe payment logs
* Transaction details
* Daily, weekly, and monthly revenue statistics

### **Outdoor Activity and Exclusive Pass Operations**

* Manage activity schedules
* Track exclusive pass usage
* Approve and update outdoor experiences

### **Marketing**

* Upload images to gallery
* Publish events, offers, and announcements



## **Users of This System**

| Role                  | Purpose                                           |
| --------------------- | ------------------------------------------------- |
| Admin                 | Complete control over system and staff access     |
| Manager               | Reporting, approvals, data oversight              |
| Front Desk Staff      | Daily bookings and guest support                  |
| Outdoor Activity Team | Activity scheduling and exclusive pass operations |
| Marketing Team        | Website content and promotional updates           |



## **Developer Responsibilities**

This project requires continuous development and maintenance. Responsibilities include:

* Implementing new features and UI components
* Building secure API endpoints
* Maintaining database architecture and rules
* Integrating and managing Stripe payments
* Debugging and performance optimization
* Mobile responsiveness and UI refinement
* Documenting updates and version control management
* Handling CI/CD and Firebase deployment



## **Setup Instructions**

### **1. Clone Repository**

```bash
git clone https://github.com/your-repo-url/river-range-management.git
cd river-range-management
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Variables**

Create a `.env` file in the root directory:

```
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender
REACT_APP_FIREBASE_APP_ID=your_app_id

REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_key

SUPABASE_URL=temporary_or_test_value
SUPABASE_KEY=temporary_or_test_value
```

### **4. Start Development Server**

```bash
npm start
```

### **5. Backend Setup**

Navigate to the backend folder:

```bash
cd server
npm install
node server.js
```

---

## **Deployment**

To deploy to Firebase Hosting:

```bash
npm run build
firebase deploy
```

All environment variables should be set through Firebase configuration when deploying backend functions.


