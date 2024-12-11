import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./Routes";

function App() {
    return (
        <Router>
            <div>
                <h1>Job & Application Tracker</h1>
                <nav>
                    <Link to="/jobView">Job View</Link>{" | "}
                    <Link to="/applicationView">Application View</Link>{" | "}
                    <Link to="/recruiterView">Recruiter View</Link>{" | "}
                    <Link to="/interviewerView">Interviewer View</Link>{" | "}
                    <Link to="/applicantView">Applicant View</Link>{" | "}
                    <Link to="/interviewView">Interview View</Link>
                </nav>
                <AppRoutes />
            </div>
        </Router>
    );
}

export default App;
