import React, { useState, useEffect } from 'react';
import './TableView.css';

function RecruiterView() {
    const [recruiters, setRecruiters] = useState([]);

    useEffect(() => {
        fetch('/recruitersView')
            .then((res) => res.json())
            .then((data) => setRecruiters(data))
            .catch((err) => console.error('Error fetching recruiters:', err));
    }, []);

    return (
        <div className="table-view">
            <h1>Recruiter View</h1>
            <table>
                <thead>
                    <tr>
                        <th>Recruiter ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {recruiters.map((recruiter) => (
                        <tr key={recruiter.recruiter_id}>
                            <td>{recruiter.recruiter_id}</td>
                            <td>{recruiter.name}</td>
                            <td>{recruiter.email}</td>
                            <td>{recruiter.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecruiterView;
