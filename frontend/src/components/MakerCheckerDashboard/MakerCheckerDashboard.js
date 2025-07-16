import React, { useState, useEffect } from "react";
import "./MakerCheckerDashboard.css";

function MakerCheckerDashboard({ user }) {
  const [requests, setRequests] = useState([]);
  const [desc, setDesc] = useState("");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetch("/api/requests", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(res => res.json())
      .then(data => setRequests(data));
  }, [jwt]);

  const handleCreate = () => {
    if (desc.trim()) {
      fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
        body: JSON.stringify({
          maker: user.username,
          description: desc,
        }),
      })
      .then(res => res.json())
      .then(newReq => {
        setRequests([...requests, newReq]);
        setDesc("");
      });
    }
  };

  const handleAction = (id, status) => {
    fetch(`/api/requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      body: JSON.stringify({ status }),
    })
    .then(res => res.json())
    .then(updated => {
      setRequests(requests.map(req => req.id === id ? updated : req));
    });
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <header>
        <h2>Maker-Checker Dashboard</h2>
        <div>
          Logged in as: <b>{user.username}</b> [{user.role}]
        </div>
      </header>
      <main>
        {user.role === "Maker" ? (
          <section>
            <h3>Create New Request</h3>
            <input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Request Description"
            />
            <button onClick={handleCreate}>Submit</button>
            <h3>My Requests</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests
                  .filter(r => r.maker === user.username)
                  .map(req => (
                    <tr key={req.id}>
                      <td>{req.id}</td>
                      <td>{req.description}</td>
                      <td>{req.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        ) : (
          <section>
            <h3>Pending Requests</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Maker</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests
                  .filter(r => r.status === "Pending")
                  .map(req => (
                    <tr key={req.id}>
                      <td>{req.id}</td>
                      <td>{req.maker}</td>
                      <td>{req.description}</td>
                      <td>{req.status}</td>
                      <td>
                        <button onClick={() => handleAction(req.id, "Approved")}>
                          Approve
                        </button>
                        <button onClick={() => handleAction(req.id, "Rejected")}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
      <footer>
        <small>© Maker-Checker Dashboard Sample</small>
      </footer>
    </div>
  );
}

export default MakerCheckerDashboard;
