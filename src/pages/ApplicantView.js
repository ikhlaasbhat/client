import React, { useState, useEffect } from 'react';
import './TableView.css';

function ApplicantView() {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        fetch('/applicantsView')
            .then((res) => res.json())
            .then((data) => setApplicants(data))
            .catch((err) => console.error('Error fetching applicants:', err));
    }, []);

    return (
        <div className="table-view">
            <h1>Applicant View</h1>
            <table>
                <thead>
                    <tr>
                        <th>Applicant ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant) => (
                        <tr key={applicant.applicant_id}>
                            <td>{applicant.applicant_id}</td>
                            <td>{applicant.name}</td>
                            <td>{applicant.email}</td>
                            <td>{applicant.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ApplicantView;
