import React, { useState, useEffect } from 'react';
import './TableView.css';

function InterviewView() {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        fetch('/interviewsView')
            .then((res) => res.json())
            .then((data) => setInterviews(data))
            .catch((err) => console.error('Error fetching interviews:', err));
    }, []);

    return (
        <div className="table-view">
            <h1>Interview View</h1>
            <table>
                <thead>
                    <tr>
                        <th>Interview ID</th>
                        <th>Application ID</th>
                        <th>Interviewer ID</th>
                        <th>Interview Date</th>
                        <th>Interview Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {interviews.map((interview) => (
                        <tr key={interview.interview_id}>
                            <td>{interview.interview_id}</td>
                            <td>{interview.application_id}</td>
                            <td>{interview.interviewer_id}</td>
                            <td>{interview.interview_date}</td>
                            <td>{interview.interview_time}</td>
                            <td>{interview.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InterviewView;
