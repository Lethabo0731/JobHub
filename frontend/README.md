# JobHub — Full-Stack Job Portal

JobHub is a full-stack job marketplace platform that connects job seekers with employers. Users can create accounts, upload resumes, browse job opportunities, apply for positions, and track application progress.

Employers can create job listings, review applicants, and update application statuses throughout the recruitment process.

## 🚀 Features

### 👤 Job Seekers

* Create a JobHub account
* Secure login and logout
* Browse available job opportunities
* View job descriptions and requirements
* Upload a professional resume
* Apply for jobs
* Track submitted applications
* View application status updates
* Responsive dashboard

### 🏢 Employers

* Employer dashboard
* Create and publish job listings
* Specify job location, employment type, salary and requirements
* View company job listings
* Review applicants
* View applicant information
* Track submitted resumes
* Update application statuses
* Manage the recruitment process

### 📊 Application Tracking

Job applications can move through different recruitment stages:

* Applied
* Under Review
* Shortlisted
* Interview
* Rejected
* Hired

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* Responsive Design

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication

### Database

* MySQL
* SQL

### Development Tools

* Git
* GitHub
* Visual Studio Code
* npm

## 🏗️ Project Structure

```text
JobPortal/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   └── resumeController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   └── resumeRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── database/
│   └── schema.sql
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    │
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Lethabo0731/JobHub.git
```

### 2. Open the project

```bash
cd JobHub
```

## 💻 Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🖥️ Backend Setup

Open a second terminal and navigate to:

```bash
cd JobHub/backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

## 🗄️ Database Setup

JobHub uses MySQL.

1. Create a MySQL database.
2. Open:

```text
database/schema.sql
```

3. Run the SQL script in MySQL.
4. Configure the database connection in:

```text
backend/config/db.js
```

Make sure your database credentials match your local MySQL setup.

## 🔐 Authentication

JobHub uses authentication to protect application and employer functionality.

Authenticated requests use:

```text
Authorization: Bearer <token>
```

The application stores the authenticated user's session information locally.

## 🔌 Main API Areas

| Feature               | Endpoint                       |
| --------------------- | ------------------------------ |
| Register              | `/api/auth/register`           |
| Login                 | `/api/auth/login`              |
| Jobs                  | `/api/jobs`                    |
| My Jobs               | `/api/jobs/my`                 |
| Upload Resume         | `/api/resumes/upload`          |
| My Applications       | `/api/applications/my`         |
| Employer Applications | `/api/applications/employer`   |
| Application Status    | `/api/applications/:id/status` |

## 🎯 Project Goals

The project was created to demonstrate practical full-stack software development skills, including:

* Frontend development
* Backend API development
* Database integration
* Authentication
* CRUD operations
* File uploads
* RESTful services
* Application workflow management
* Responsive UI design
* Git and GitHub version control

## 📸 Screenshots

Screenshots of the JobHub interface can be added here to showcase:

* Login page
* Registration page
* Job seeker dashboard
* Employer dashboard
* Job listings
* Application tracking
* Employer applicant management

## 🔮 Future Improvements

Potential future improvements include:

* Advanced job search and filtering
* Company profile pages
* Job categories
* Saved jobs
* Email notifications
* Password reset
* User profile editing
* Resume preview/download
* Employer analytics dashboard
* Pagination
* Cloud file storage
* Production deployment
* Automated testing

## 🧪 Build Verification

The frontend production build has been successfully tested using:

```bash
npm run build
```

The Vite production build completed successfully.

## 👨‍💻 Developer

**Lethabo Mashimbye**

Diploma in Systems Development

Interested in software development, frontend development, backend development and QA/testing.

## 📄 License

This project is intended for portfolio and educational purposes.
