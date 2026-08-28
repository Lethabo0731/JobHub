CREATE DATABASE IF NOT EXISTS job_portal;

USE job_portal;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('job_seeker', 'employer', 'admin') NOT NULL DEFAULT 'job_seeker',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    location VARCHAR(150),
    logo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150),
    employment_type ENUM('Full-time', 'Part-time', 'Contract', 'Internship') NOT NULL,
    salary DECIMAL(10,2),
    requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    user_id INT NOT NULL,
    resume_id INT NOT NULL,
    status ENUM(
        'Applied',
        'Under Review',
        'Shortlisted',
        'Interview',
        'Rejected',
        'Hired'
    ) NOT NULL DEFAULT 'Applied',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (job_id, user_id)
);

CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    user_id INT NOT NULL,
    resume_id INT NOT NULL,
    status ENUM('Applied', 'Under Review', 'Shortlisted', 'Interview', 'Rejected', 'Hired') NOT NULL DEFAULT 'Applied',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (job_id, user_id)
);