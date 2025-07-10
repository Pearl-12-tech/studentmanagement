"use client";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  const addStudent = async () => {
    if (!name.trim() || !email.trim()) return;
    await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    const res = await fetch("http://localhost:8080/students");
    setStudents(await res.json());
  };

  return (
    <div className="page-root">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">🎓 Student Hub</div>
          <div className="sidebar-desc">Management System</div>
        </div>
        <div className="sidebar-form">
          <h3>Add New Student</h3>
          <div>
            <input
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <button onClick={addStudent} className="add-btn">
              Add Student
            </button>
          </div>
        </div>
        <div className="sidebar-count">
          <div>Total Students</div>
          <div className="count">{students.length}</div>
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content">
        <div className="main-header">
          <h1>Student Directory</h1>
          <div className="main-count">
            <span>
              {students.length} {students.length === 1 ? 'student' : 'students'} enrolled
            </span>
          </div>
        </div>
        {students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Students Yet</h3>
            <p>Add your first student using the form in the sidebar</p>
          </div>
        ) : (
          <div className="student-grid">
            {students.map((student, index) => (
              <div key={index} className="student-card">
                <div className="student-card-header">
                  <div className="avatar">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="student-name">{student.name}</div>
                    <div className="student-id">ID: {student.id}</div>
                  </div>
                </div>
                <div className="student-email-box">
                  <div className="student-email-label">Email</div>
                  <div className="student-email">{student.email}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .page-root {
          min-height: 100vh;
          background: #0f0f23;
          display: flex;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .sidebar {
          width: 300px;
          background: #1a1a2e;
          padding: 30px;
          border-right: 1px solid #2d2d44;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .sidebar-header {
          margin-bottom: 10px;
          text-align: center;
        }
        .sidebar-title {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }
        .sidebar-desc {
          font-size: 14px;
          color: #8b8b9f;
        }
        .sidebar-form h3 {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 20px;
        }
        .sidebar-form input.input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #2d2d44;
          background: #0f0f23;
          color: #fff;
          font-size: 14px;
          margin-bottom: 12px;
          outline: none;
          transition: border-color 0.2s;
        }
        .sidebar-form input.input:focus {
          border-color: #667eea;
        }
        .add-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        .sidebar-count {
          margin-top: 10px;
          padding: 20px;
          background: #16213e;
          border-radius: 16px;
          border: 1px solid #2d2d44;
          text-align: center;
        }
        .sidebar-count .count {
          font-size: 32px;
          font-weight: 700;
          color: #667eea;
        }
        .main-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .main-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
        .main-count {
          background: #16213e;
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #2d2d44;
        }
        .main-count span {
          color: #8b8b9f;
          font-size: 14px;
        }
        .empty-state {
          text-align: center;
          padding: 80px 0;
          color: #8b8b9f;
        }
        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        .empty-state h3 {
          font-size: 24px;
          color: #fff;
          margin-bottom: 12px;
        }
        .empty-state p {
          font-size: 16px;
          margin: 0;
          line-height: 1.5;
        }
        .student-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }
        .student-card {
          background: #1a1a2e;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #2d2d44;
          transition: transform 0.2s, border-color 0.2s;
        }
        .student-card:hover {
          transform: translateY(-4px);
          border-color: #667eea;
        }
        .student-card-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          margin-right: 16px;
        }
        .student-name {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        .student-id {
          font-size: 14px;
          color: #8b8b9f;
        }
        .student-email-box {
          background: #0f0f23;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #2d2d44;
        }
        .student-email-label {
          font-size: 12px;
          color: #8b8b9f;
          margin-bottom: 4px;
        }
        .student-email {
          font-size: 14px;
          color: #fff;
        }
        @media (max-width: 900px) {
          .sidebar {
            display: none;
          }
          .main-content {
            padding: 20px;
          }
          .student-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 