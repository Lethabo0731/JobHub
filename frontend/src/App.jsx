import { useEffect, useState } from "react";

function App() {
  // =========================
  // PAGE
  // =========================

  const [page, setPage] = useState("login");

  // =========================
  // AUTH
  // =========================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // DATA
  // =========================

  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [applications, setApplications] = useState([]);
  const [employerApplications, setEmployerApplications] = useState([]);

  // =========================
  // JOB FORM
  // =========================

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [jobSalary, setJobSalary] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");

  // =========================
  // MESSAGE
  // =========================

  const [message, setMessage] = useState("");

  // =========================
  // USER
  // =========================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const token = localStorage.getItem("token");

  // =========================
  // JOB IMAGE
  // =========================

  const getJobImage = (title = "") => {
    const job = title.toLowerCase();

    if (
      job.includes("software") ||
      job.includes("developer") ||
      job.includes("programmer") ||
      job.includes("frontend") ||
      job.includes("backend") ||
      job.includes("full stack") ||
      job.includes("web")
    ) {
      return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("qa") ||
      job.includes("tester") ||
      job.includes("testing") ||
      job.includes("quality")
    ) {
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("data") ||
      job.includes("analyst") ||
      job.includes("analytics")
    ) {
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("designer") ||
      job.includes("design") ||
      job.includes("ui") ||
      job.includes("ux")
    ) {
      return "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("marketing") ||
      job.includes("social media") ||
      job.includes("content")
    ) {
      return "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("finance") ||
      job.includes("accountant") ||
      job.includes("accounting") ||
      job.includes("bank")
    ) {
      return "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("health") ||
      job.includes("nurse") ||
      job.includes("doctor") ||
      job.includes("medical")
    ) {
      return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("teacher") ||
      job.includes("education") ||
      job.includes("lecturer")
    ) {
      return "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("engineer") ||
      job.includes("engineering")
    ) {
      return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("logistics") ||
      job.includes("warehouse") ||
      job.includes("driver") ||
      job.includes("supply")
    ) {
      return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=85";
    }

    if (
      job.includes("agriculture") ||
      job.includes("farmer") ||
      job.includes("farming") ||
      job.includes("agri")
    ) {
      return "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=85";
    }

    return "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85";
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    if (user) {
      if (user.role === "employer") {
        setPage("employer");
        loadEmployerJobs();
        loadEmployerApplications();
      } else {
        setPage("jobs");
        loadJobs();
        loadResume();
        loadApplications();
      }
    }
  }, [user]);

  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: "job_seeker",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Please log in.");

        setName("");
        setEmail("");
        setPassword("");

        setPage("login");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not connect to the server.");
    }
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);

        setEmail("");
        setPassword("");

        setMessage("Login successful!");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not connect to the server.");
    }
  };

  // =========================
  // JOB SEEKER - LOAD JOBS
  // =========================

  const loadJobs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs"
      );

      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      }
    } catch (error) {
      setMessage("Could not load jobs.");
    }
  };

  // =========================
  // LOAD RESUME
  // =========================

  const loadResume = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/resumes/user/${user.id}`
      );

      if (response.ok) {
        const data = await response.json();
        setResume(data);
      } else {
        setResume(null);
      }
    } catch (error) {
      setResume(null);
    }
  };

  // =========================
  // LOAD APPLICATIONS
  // =========================

  const loadApplications = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setApplications(data);
      }
    } catch (error) {
      console.log("Applications could not be loaded.");
    }
  };

  // =========================
  // EMPLOYER - LOAD JOBS
  // =========================

  const loadEmployerJobs = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not load your jobs.");
    }
  };

  // =========================
  // EMPLOYER - LOAD APPLICATIONS
  // =========================

  const loadEmployerApplications = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/applications/employer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmployerApplications(data);
      }
    } catch (error) {
      console.log("Applicants could not be loaded.");
    }
  };

  // =========================
  // UPLOAD RESUME
  // =========================

  const uploadResume = async (e) => {
    e.preventDefault();

    const file = e.target.resume.files[0];

    if (!file) {
      setMessage("Please select a resume.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("user_id", user.id);

    try {
      const response = await fetch(
        "http://localhost:5000/api/resumes/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Resume uploaded successfully!");

        await loadResume();

        e.target.reset();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not upload resume.");
    }
  };

  // =========================
  // APPLY FOR JOB
  // =========================

  const applyForJob = async (jobId) => {
    if (!token) {
      setMessage("Please log in before applying.");
      setPage("login");
      return;
    }

    if (!resume) {
      setMessage("Please upload a resume before applying.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            job_id: jobId,
            resume_id: resume.id,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        await loadApplications();
      }
    } catch (error) {
      setMessage("Could not submit application.");
    }
  };

  // =========================
  // CREATE JOB
  // =========================

  const createJob = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            company_id: user.company_id,
            title: jobTitle,
            description: jobDescription,
            location: jobLocation,
            employment_type: employmentType,
            salary: jobSalary,
            requirements: jobRequirements,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Job posted successfully!");

        setJobTitle("");
        setJobDescription("");
        setJobLocation("");
        setEmploymentType("Full-time");
        setJobSalary("");
        setJobRequirements("");

        await loadEmployerJobs();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not create job.");
    }
  };

  // =========================
  // UPDATE APPLICATION STATUS
  // =========================

  const updateApplicationStatus = async (
    applicationId,
    status
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        await loadEmployerApplications();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not update application status.");
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setResume(null);
    setJobs([]);
    setApplications([]);
    setEmployerApplications([]);

    setPage("login");
    setMessage("");
  };

  // =========================
  // STATUS CLASS
  // =========================

  const getStatusClass = (status) => {
    if (status === "Applied") return "status status-applied";
    if (status === "Under Review") return "status status-review";
    if (status === "Shortlisted")
      return "status status-shortlisted";
    if (status === "Interview")
      return "status status-interview";
    if (status === "Rejected")
      return "status status-rejected";
    if (status === "Hired")
      return "status status-hired";

    return "status status-applied";
  };

  // =========================
  // LOGIN PAGE
  // =========================

  if (page === "login" && !user) {
    return (
      <div className="auth-page">
        <div className="auth-visual">
          <h1>JobHub</h1>

          <p>
            Connect talented people with great opportunities.
            Discover jobs, manage applications and build your
            career from one professional platform.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <span className="auth-feature-icon">✓</span>
              Find opportunities
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">✓</span>
              Upload your resume
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">✓</span>
              Track your applications
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">✓</span>
              Connect employers with talent
            </div>
          </div>
        </div>

        <div className="auth-form-area">
          <div className="auth-form">
            <div className="logo">
              <div className="logo-icon">J</div>
              JobHub
            </div>

            <br />

            <h2>Welcome back</h2>

            <p className="auth-form-subtitle">
              Sign in to continue to your account.
            </p>

            {message && (
              <div className="message">
                {message}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>

                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password
                </label>

                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                style={{ width: "100%" }}
              >
                Login
              </button>
            </form>

            <br />

            <p style={{ color: "#6b7280" }}>
              Don't have an account?
            </p>

            <br />

            <button
              className="btn btn-secondary"
              onClick={() => {
                setMessage("");
                setPage("register");
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // REGISTER PAGE
  // =========================

  if (page === "register") {
    return (
      <div className="auth-page">
        <div className="auth-visual">
          <h1>Join JobHub</h1>

          <p>
            Create your account and take the next step in your
            career journey.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <span className="auth-feature-icon">✓</span>
              Create your professional profile
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">✓</span>
              Upload your CV
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">✓</span>
              Apply for jobs
            </div>
          </div>
        </div>

        <div className="auth-form-area">
          <div className="auth-form">
            <div className="logo">
              <div className="logo-icon">J</div>
              JobHub
            </div>

            <br />

            <h2>Create Account</h2>

            <p className="auth-form-subtitle">
              Create your JobHub account.
            </p>

            {message && (
              <div className="message">
                {message}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  className="form-input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>

                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password
                </label>

                <input
                  className="form-input"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                style={{ width: "100%" }}
              >
                Create Account
              </button>
            </form>

            <br />

            <p style={{ color: "#6b7280" }}>
              Already have an account?
            </p>

            <br />

            <button
              className="btn btn-secondary"
              onClick={() => {
                setMessage("");
                setPage("login");
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // EMPLOYER DASHBOARD
  // =========================================================

  if (user?.role === "employer") {
    return (
      <>
        <header className="jobhub-header">
          <div className="header-inner">
            <div className="logo">
              <div className="logo-icon">J</div>
              JobHub
            </div>

            <div className="header-user">
              <div className="user-info">
                <div className="user-name">
                  {user.name}
                </div>

                <div className="user-role">
                  Employer
                </div>
              </div>

              <div className="avatar">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "E"}
              </div>

              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="page-container">
          <div className="dashboard-hero">
            <div className="hero-content">
              <h1>
                Welcome, {user.name}
              </h1>

              <p>
                Manage your job listings, review candidates
                and find the right talent for your company.
              </p>
            </div>

            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=80"
              alt="Professional team"
            />
          </div>

          {message && (
            <div className="message">
              {message}
            </div>
          )}

          {/* POST JOB */}

          <section className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  Post a Job
                </h2>

                <p className="section-subtitle">
                  Find qualified candidates for your next role.
                </p>
              </div>
            </div>

            <div className="form-card">
              <form onSubmit={createJob}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Job Title
                    </label>

                    <input
                      className="form-input"
                      type="text"
                      placeholder="e.g. Junior Software Developer"
                      value={jobTitle}
                      onChange={(e) =>
                        setJobTitle(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Location
                    </label>

                    <input
                      className="form-input"
                      type="text"
                      placeholder="e.g. Johannesburg"
                      value={jobLocation}
                      onChange={(e) =>
                        setJobLocation(e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Employment Type
                    </label>

                    <select
                      className="form-select"
                      value={employmentType}
                      onChange={(e) =>
                        setEmploymentType(e.target.value)
                      }
                    >
                      <option value="Full-time">
                        Full-time
                      </option>

                      <option value="Part-time">
                        Part-time
                      </option>

                      <option value="Contract">
                        Contract
                      </option>

                      <option value="Internship">
                        Internship
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Salary
                    </label>

                    <input
                      className="form-input"
                      type="number"
                      placeholder="e.g. 15000"
                      value={jobSalary}
                      onChange={(e) =>
                        setJobSalary(e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Job Description
                  </label>

                  <textarea
                    className="form-textarea"
                    placeholder="Describe the role and responsibilities..."
                    value={jobDescription}
                    onChange={(e) =>
                      setJobDescription(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Requirements
                  </label>

                  <textarea
                    className="form-textarea"
                    placeholder="e.g. Java, Spring Boot, MySQL and Git"
                    value={jobRequirements}
                    onChange={(e) =>
                      setJobRequirements(e.target.value)
                    }
                  />
                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  + Post Job
                </button>
              </form>
            </div>
          </section>

          {/* MY JOBS */}

          <section className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  My Jobs
                </h2>

                <p className="section-subtitle">
                  Jobs posted by your company.
                </p>
              </div>
            </div>

            {jobs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💼</div>

                <h3>No jobs posted yet</h3>

                <p>
                  Create your first job listing using the
                  form above.
                </p>
              </div>
            ) : (
              <div className="jobs-grid">
                {jobs.map((job) => (
                  <div
                    className="job-card"
                    key={job.id}
                  >
                    <img
                      className="job-card-image"
                      src={getJobImage(job.title)}
                      alt={job.title}
                    />

                    <div className="job-card-header">
                      <div>
                        <h3 className="job-title">
                          {job.title}
                        </h3>

                        <p className="company-name">
                          {job.company_name}
                        </p>
                      </div>

                      <span className="meta-item">
                        💼
                      </span>
                    </div>

                    <div className="job-meta">
                      <span className="meta-item">
                        📍 {job.location}
                      </span>

                      <span className="meta-item">
                        💼 {job.employment_type}
                      </span>
                    </div>

                    <p className="salary">
                      {job.salary
                        ? `R${job.salary}`
                        : "Salary not specified"}
                    </p>

                    <br />

                    <p className="job-description">
                      {job.description}
                    </p>

                    <div className="job-requirements">
                      <strong>Requirements:</strong>{" "}
                      {job.requirements ||
                        "Not specified"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* APPLICANTS */}

          <section className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  Applicants
                </h2>

                <p className="section-subtitle">
                  Review candidates who have applied to your
                  jobs.
                </p>
              </div>
            </div>

            {employerApplications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>

                <h3>No applications yet</h3>

                <p>
                  Applications from candidates will appear
                  here.
                </p>
              </div>
            ) : (
              employerApplications.map(
                (application) => (
                  <div
                    className="applicant-card"
                    key={application.id}
                  >
                    <div className="applicant-header">
                      <div className="applicant-avatar">
                        {application.applicant_name
                          ? application.applicant_name
                              .charAt(0)
                              .toUpperCase()
                          : "U"}
                      </div>

                      <div>
                        <div className="applicant-name">
                          {application.applicant_name}
                        </div>

                        <div className="applicant-email">
                          {application.applicant_email}
                        </div>
                      </div>
                    </div>

                    <div className="applicant-details">
                      <div className="detail-item">
                        <span className="detail-label">
                          Position
                        </span>

                        {application.job_title}
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">
                          Resume
                        </span>

                        📄 {application.file_name}
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">
                          Applied
                        </span>

                        {new Date(
                          application.applied_at
                        ).toLocaleDateString()}
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">
                          Current Status
                        </span>

                        <span
                          className={getStatusClass(
                            application.status
                          )}
                        >
                          {application.status}
                        </span>
                      </div>
                    </div>

                    <p
                      style={{
                        marginBottom: "10px",
                        fontWeight: "650",
                      }}
                    >
                      Update Application
                    </p>

                    <div className="status-actions">
                      <button
                        className="status-button"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "Under Review"
                          )
                        }
                      >
                        Under Review
                      </button>

                      <button
                        className="status-button"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "Shortlisted"
                          )
                        }
                      >
                        Shortlisted
                      </button>

                      <button
                        className="status-button"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "Interview"
                          )
                        }
                      >
                        Interview
                      </button>

                      <button
                        className="status-button"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "Rejected"
                          )
                        }
                      >
                        Rejected
                      </button>

                      <button
                        className="status-button"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "Hired"
                          )
                        }
                      >
                        Hired
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </section>
        </main>

        <footer className="footer">
          © 2026 JobHub. Connecting talent with opportunity.
        </footer>
      </>
    );
  }

  // =========================================================
  // JOB SEEKER DASHBOARD
  // =========================================================

  return (
    <>
      <header className="jobhub-header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">J</div>
            JobHub
          </div>

          <div className="header-user">
            <div className="user-info">
              <div className="user-name">
                {user?.name}
              </div>

              <div className="user-role">
                Job Seeker
              </div>
            </div>

            <div className="avatar">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="page-container">
        {/* HERO */}

        <div className="dashboard-hero">
          <div className="hero-content">
            <h1>
              Welcome, {user?.name}
            </h1>

            <p>
              Discover your next career opportunity, manage
              your applications and keep your professional
              resume ready.
            </p>
          </div>

          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80"
            alt="Professionals working together"
          />
        </div>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {/* RESUME */}

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                My Resume
              </h2>

              <p className="section-subtitle">
                Keep your resume ready when applying for jobs.
              </p>
            </div>
          </div>

          {resume ? (
            <div className="card resume-card">
              <div className="resume-icon">
                📄
              </div>

              <div>
                <div className="resume-name">
                  {resume.file_name}
                </div>

                <div className="resume-description">
                  Your resume is ready to use when applying
                  for jobs.
                </div>
              </div>
            </div>
          ) : (
            <div className="form-card">
              <form onSubmit={uploadResume}>
                <div className="form-group">
                  <label className="form-label">
                    Upload Resume
                  </label>

                  <input
                    className="form-input"
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  Upload Resume
                </button>
              </form>
            </div>
          )}
        </section>

        {/* APPLICATIONS */}

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                My Applications
              </h2>

              <p className="section-subtitle">
                Track the jobs you have applied for.
              </p>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📨</div>

              <h3>No applications yet</h3>

              <p>
                When you apply for a job, your application
                will appear here.
              </p>
            </div>
          ) : (
            applications.map((application) => (
              <div
                className="application-card"
                key={application.id}
              >
                <div>
                  <div className="application-title">
                    {application.title}
                  </div>

                  <div className="application-company">
                    {application.company_name}
                  </div>

                  <div className="application-info">
                    📍 {application.location}
                  </div>

                  <div className="application-info">
                    💼 {application.employment_type}
                  </div>

                  <div className="application-info">
                    Applied{" "}
                    {new Date(
                      application.applied_at
                    ).toLocaleDateString()}
                  </div>
                </div>

                <span
                  className={getStatusClass(
                    application.status
                  )}
                >
                  {application.status}
                </span>
              </div>
            ))
          )}
        </section>

        {/* JOBS */}

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                Available Jobs
              </h2>

              <p className="section-subtitle">
                Explore the latest opportunities on JobHub.
              </p>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💼</div>

              <h3>No jobs available</h3>

              <p>
                Check back later for new opportunities.
              </p>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div
                  className="job-card"
                  key={job.id}
                >
                  <img
                    className="job-card-image"
                    src={getJobImage(job.title)}
                    alt={job.title}
                  />

                  <div className="job-card-header">
                    <div>
                      <h3 className="job-title">
                        {job.title}
                      </h3>

                      <p className="company-name">
                        {job.company_name}
                      </p>
                    </div>

                    <span className="meta-item">
                      💼
                    </span>
                  </div>

                  <div className="job-meta">
                    <span className="meta-item">
                      📍 {job.location}
                    </span>

                    <span className="meta-item">
                      💼 {job.employment_type}
                    </span>
                  </div>

                  <p className="salary">
                    {job.salary
                      ? `R${job.salary}`
                      : "Salary not specified"}
                  </p>

                  <br />

                  <p className="job-description">
                    {job.description}
                  </p>

                  <div className="job-requirements">
                    <strong>Requirements:</strong>{" "}
                    {job.requirements ||
                      "Not specified"}
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      applyForJob(job.id)
                    }
                  >
                    Apply for this job
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        © 2026 JobHub. Connecting talent with opportunity.
      </footer>
    </>
  );
}

export default App;