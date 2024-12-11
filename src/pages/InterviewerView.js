import React, { useState, useEffect } from 'react';
import './TableView.css';

function InterviewerView() {
    const [interviewers, setInterviewers] = useState([]);

    useEffect(() => {
        fetch('/interviewersView')
            .then((res) => res.json())
            .then((data) => setInterviewers(data))
            .catch((err) => console.error('Error fetching interviewers:', err));
    }, []);

    return (
        <div className="table-view">
            <h1>Interviewer View</h1>
            <table>
                <thead>
                    <tr>
                        <th>Interviewer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewers.map((interviewer) => (
                        <tr key={interviewer.interviewer_id}>
                            <td>{interviewer.interviewer_id}</td>
                            <td>{interviewer.name}</td>
                            <td>{interviewer.email}</td>
                            <td>{interviewer.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InterviewerView;
