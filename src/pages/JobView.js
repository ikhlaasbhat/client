import React, { useState, useEffect } from "react";
import "./JobView.css";

function JobView() {
    const [jobs, setJobs] = useState([]);
    const [recruiters, setRecruiters] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        location: "",
        posted_date: "",
        status: "",
        recruiter_id: ""
    });
    const [editJob, setEditJob] = useState(null);

    useEffect(() => {
        fetch("/jobView")
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch((error) => console.error("Error fetching jobs:", error));
    }, []);

    useEffect(() => {
        fetch("/recruitersDropdown")
            .then((res) => res.json())
            .then((data) => setRecruiters(data))
            .catch((error) => console.error("Error fetching recruiters:", error));
    }, []);

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditJob((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setNewJob((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Add Job handler
    const handleAddJob = () => {
        fetch("/addJob", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newJob)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to add job");
                }
                return res.json();
            })
            .then((newlyAddedJob) => {
                // Displays recruiter name based on recruiter_id
                const recruiterName = recruiters.find(
                    (recruiter) => recruiter.recruiter_id === parseInt(newlyAddedJob.recruiter_id)
                )?.name;
    
                setJobs((prevJobs) => [
                    ...prevJobs,
                    { ...newlyAddedJob, recruiter_name: recruiterName }
                ]);
                setIsAdding(false); // Close the add form
            })
            .catch((error) => alert(`Error adding job: ${error.message}`));
    };
    
    // Update Job edit form Handler
    const handleEditJob = (job_id) => {
        const jobToEdit = jobs.find((job) => job.job_id === job_id);
        setEditJob({ ...jobToEdit });
    };

    // Update Job Handler
    const handleUpdateJob = () => {
        fetch(`/editJob/${editJob.job_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editJob),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update job");
                }
                return res.json();
            })
            .then((data) => {
                alert(data.message);
    
                // Update the modified job
                setJobs((prevJobs) =>
                    prevJobs.map((job) =>
                        job.job_id === editJob.job_id
                            ? {
                                  ...editJob,
                                  recruiter_name: recruiters.find(
                                      (recruiter) =>
                                          recruiter.recruiter_id ===
                                          parseInt(editJob.recruiter_id)
                                  )?.name || job.recruiter_name,
                              }
                            : job
                    )
                );
    
                setEditJob(null); // Close the edit form
            })
            .catch((error) => alert(`Error updating job: ${error.message}`));
    };
    

    // Delete Job handler 
    const handleDeleteJob = (job_id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        fetch(`/deleteJob/${job_id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => {
                setJobs(jobs.filter((job) => job.job_id !== job_id));
            })
            .catch((error) => console.error("Error deleting job:", error));
    };

    return (
        <div>
            <h1>Job View</h1>
            {isAdding ? (
                <div>
                    <h3>Add Job</h3>
                    <form>
                        <input type="text" name="title" placeholder="Title" onChange={handleInputChange} />
                        <input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
                        <input type="text" name="location" placeholder="Location" onChange={handleInputChange} />
                        <input type="date" name="posted_date" onChange={handleInputChange} />
                        <select name="status" onChange={handleInputChange}>
                            <option value="">Select Status</option>
                            <option value="Open/Accepting Applications">Open/Accepting Applications</option>
                            <option value="Closed - Still Deciding">Closed - Still Deciding</option>
                            <option value="Closed & Decided">Closed & Decided</option>
                        </select>
                        <select name="recruiter_id" onChange={handleInputChange}>
                            <option value="">Select Recruiter</option>
                            {recruiters.map((recruiter) => (
                                <option key={recruiter.recruiter_id} value={recruiter.recruiter_id}>
                                    {recruiter.recruiter_id} - {recruiter.name}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddJob}>Submit</button>
                    </form>
                </div>
            ) : (
                <button onClick={() => setIsAdding(true)}>Add Job</button>
            )}

            {editJob ? (
                <div>
                    <h3>Edit Job</h3>
                    <form>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={editJob.title}
                            onChange={(e) => handleInputChange(e, true)}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={editJob.description}
                            onChange={(e) => handleInputChange(e, true)}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={editJob.location}
                            onChange={(e) => handleInputChange(e, true)}
                        />
                        <input
                            type="date"
                            name="posted_date"
                            value={editJob.posted_date}
                            onChange={(e) => handleInputChange(e, true)}
                        />
                        <select
                            name="status"
                            value={editJob.status}
                            onChange={(e) => handleInputChange(e, true)}
                        >
                            <option value="">Select Recruiter</option>
                            <option value="Open/Accepting Applications">Open/Accepting Applications</option>
                            <option value="Closed - Still Deciding">Closed - Still Deciding</option>
                            <option value="Closed & Decided">Closed & Decided</option>
                        </select>
                        <select
                            name="recruiter_id"
                            value={editJob.recruiter_id}
                            onChange={(e) => handleInputChange(e, true)}
                        >
                            <option value="">Select Recruiter</option>
                            {recruiters.map((recruiter) => (
                                <option key={recruiter.recruiter_id} value={recruiter.recruiter_id}>
                                    {recruiter.recruiter_id} - {recruiter.name}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleUpdateJob}>Update</button>
                    </form>
                </div>
            ) : null}

            <h3>Jobs</h3>
            <table className="job-table">
                <thead>
                    <tr>
                        <th>Job ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Posted Date</th>
                        <th>Status</th>
                        <th>Recruiter</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.job_id}>
                            <td>{job.job_id}</td>
                            <td>{job.title}</td>
                            <td>{job.description}</td>
                            <td>{job.location}</td>
                            <td>{job.posted_date}</td>
                            <td>{job.status}</td>
                            <td>{job.recruiter_name}</td>
                            <td>
                                <button onClick={() => handleEditJob(job.job_id)}>Modify</button>
                                <button className="delete" onClick={() => handleDeleteJob(job.job_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobView;
