import React from "react";
import { Routes, Route } from "react-router-dom";
import ApplicationView from "./pages/ApplicationView"; // Application View Page
import JobView from "./pages/JobView";
import RecruiterView from "./pages/RecruiterView";
import InterviewerView from "./pages/InterviewerView";
import InterviewView from "./pages/InterviewView";
import ApplicantView from "./pages/ApplicantView";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Home Page */}
            <Route path="/" element={<p>Select a category to view data.</p>} />

            {/* Route for Modifying Jobs */}
            <Route path="/jobView" element={<JobView />} />

            {/* Route for Application View */}
            <Route path="/applicationView" element={<ApplicationView />} /> 

            <Route path="/recruiterView" element={<RecruiterView />} />
            <Route path="/interviewerView" element={<InterviewerView />} />
            <Route path="/applicantView" element={<ApplicantView />} />
            <Route path="/interviewView" element={<InterviewView />} />
        </Routes>
    );
};

export default AppRoutes;
