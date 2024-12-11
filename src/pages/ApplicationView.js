import React, { useState, useEffect } from 'react';
import './ApplicationView.css';

function ApplicationView() {
    const [applications, setApplications] = useState([]);
    const [filterRole, setFilterRole] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [recruiters, setRecruiters] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statistics, setStatistics] = useState({});

    const fetchApplications = () => {
        const queryParams = new URLSearchParams();
        if (filterRole === 'job') queryParams.append('job_id', filterValue);
        if (filterRole === 'applicant') queryParams.append('applicant_id', filterValue);
        if (filterRole === 'recruiter') queryParams.append('recruiter_id', filterValue);
        if (startDate) queryParams.append('start_date', startDate);
        if (endDate) queryParams.append('end_date', endDate);

        fetch(`/applicationView?${queryParams.toString()}`)
        .then((res) => res.json())
        .then((data) => {
            setApplications(data.applications);
            setStatistics(data.statistics);
        })
        .catch((err) => console.error('Error fetching applications:', err));
    };

    const clearFilters = () => {
        setFilterRole('');
        setFilterValue('');
        setStartDate('');
        setEndDate('');
        fetchApplications();
    };

    // Fetch dropdown data from backend
    useEffect(() => {
        fetch('/getJobs')
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch((err) => console.error('Error fetching jobs:', err));
    
        fetch('/getApplicants')
            .then((res) => res.json())
            .then((data) => setApplicants(data))
            .catch((err) => console.error('Error fetching applicants:', err));
    
        fetch('/getRecruiters')
            .then((res) => res.json())
            .then((data) => setRecruiters(data))
            .catch((err) => console.error('Error fetching recruiters:', err));
    
        fetchApplications(); // Fetch applications at the start
    }, []);

    const renderFilterDropdown = () => {
        let options = [];
        if (filterRole === 'job') options = jobs;
        if (filterRole === 'applicant') options = applicants;
        if (filterRole === 'recruiter') options = recruiters;

        return (
            <select onChange={(e) => setFilterValue(e.target.value)} value={filterValue}>
                <option value="">Select...</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {`${option.id} - ${option.name}`}
                    </option>
                ))}
            </select>
        );
    };

    return (
        <div className="application-view">
            <h1>Application View</h1>
            <div className="filters">
                <label>
                    Filter By:
                    <select onChange={(e) => setFilterRole(e.target.value)} value={filterRole}>
                        <option value="">None</option>
                        <option value="job">Job</option>
                        <option value="applicant">Applicant</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                </label>
                {filterRole && renderFilterDropdown()}
                <div className="date-filter">
                    <label>Application Date Range:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button onClick={fetchApplications}>Apply Filters</button>
                <button className="clear-button" onClick={clearFilters}>Clear Filters</button>
            </div>

            <table className="application-table">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Applicant Name</th>
                        <th>Job Title</th>
                        <th>Job Location</th>
                        <th>Job Posted Date</th>
                        <th>Recruiter Name</th>
                        <th>Application Status</th>
                        <th>Application Date</th>
                        <th>Interview Date</th>
                        <th>Interview Time</th>
                        <th>Interviewer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.application_id}>
                            <td>{app.application_id}</td>
                            <td>{app.applicant_name}</td>
                            <td>{app.job_title}</td>
                            <td>{app.job_location}</td>
                            <td>{app.posted_date}</td>
                            <td>{app.recruiter_name}</td>
                            <td>{app.application_status}</td>
                            <td>{app.application_date}</td>
                            <td>{app.interview_date || 'N/A'}</td>
                            <td>{app.interview_time || 'N/A'}</td>
                            <td>{app.interviewer_name || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="report">
                <h2>Statistical Report</h2>
                {Object.keys(statistics).length > 0 ? (
                    <ul>
                        {Object.entries(statistics).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No statistics available.</p>
                )}
            </div>
        </div>
    );
}

export default ApplicationView;
