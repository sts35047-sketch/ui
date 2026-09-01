import { Home as HomeIcon, CheckCircle2, FileText, Menu as MenuIcon, ArrowLeft, MoreVertical, User, MessageSquare, Mail, Target, BarChart2 } from "lucide-react";
import React, { useState } from "react";
import "./mobile.css";

const subjects = [
  { code: "21CS51", name: "Database Systems", faculty: "Teacher 1", marks: 49, percent: 98 },
  { code: "21CS52", name: "Operating Systems", faculty: "Teacher 4", marks: 48, percent: 96 },
  { code: "21CS53", name: "Computer Networks", faculty: "Teacher 7", marks: 50, percent: 100 },
  { code: "21CS54", name: "Software Engineering", faculty: "Teacher 6", marks: 48, percent: 96 },
  { code: "21CS55", name: "AI Foundations", faculty: "abcd123", marks: 49, percent: 98 },
];

const semesters = [
  ["Sem 1", "CSE • 2024"], ["Sem 2", "CSE • 2024"],
  ["Sem 3", "CSE • 2023"], ["Sem 4", "CSE • 2023"],
  ["Sem 5", "CSE • 2022"], ["Sem 6", "CSE • 2022"],
];

function Icon({ children }) {
  return <span className="mf-icon flex items-center justify-center" aria-hidden="true">{children}</span>;
}

function Header({ title, onBack, action }) {
  return (
    <header className="m-header">
      <button className="icon-btn" onClick={onBack} aria-label="Back">‹</button>
      <strong>{title}</strong>
      {action || <span className="header-spacer" />}
    </header>
  );
}

function BottomNav({ page, setPage }) {
  const items = [
    ["home", "Home", <HomeIcon size={20} />],
    ["attendance", "Attendance", <CheckCircle2 size={20} />],
    ["marks", "CIE Marks", <FileText size={20} />],
    ["menu", "Menu", <MenuIcon size={20} />],
  ];
  return (
    <nav className="bottom-nav">
      {items.map(([id, label, icon]) => (
        <button
          key={id}
          className={page === id ? "active" : ""}
          onClick={() => setPage(id)}
        >
          <Icon>{icon}</Icon>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Home({ setPage }) {
  return (
    <main className="m-content">
      <div className="greeting">
        <span>Good morning, Karunya 👋</span>
        <h1>Your academic workspace</h1>
      </div>

      <section className="progress-card">
        <div>
          <small>OVERALL PROGRESS</small>
          <div className="progress-row">
            <div className="ring">78%</div>
            <p>You need <b>3 more classes</b><br />to reach 75% in DBMS.</p>
          </div>
        </div>
        <button onClick={() => setPage("attendance")} className="chevron">›</button>
      </section>

      <h2 className="section-title">Quick Access</h2>
      <div className="quick-grid">
        <button onClick={() => setPage("attendance")}><span>📊</span>Attendance</button>
        <button onClick={() => setPage("marks")}><span>📈</span>CIE Marks</button>
        <button onClick={() => setPage("feedback")}><span>📚</span>Feedback</button>
        <button onClick={() => setPage("profile")}><User size={24} className="mb-2 text-[#57534E]" />Profile</button>
      </div>

      <h2 className="section-title">Today's Overview</h2>
      <div className="metric-grid">
        <div className="metric green"><small>CLASSES ATTENDED</small><b>6</b></div>
        <div className="metric red"><small>CLASSES MISSED</small><b>0</b></div>
        <div className="metric blue"><small>ATTENDANCE %</small><b>100%</b></div>
        <div className="metric purple"><small>CIE AVERAGE</small><b>42.5/50</b></div>
      </div>

      <div className="eligible-card">
        <span>✓</span>
        <div><b>Eligible Status</b><small>You are eligible for all subjects.</small></div>
      </div>
    </main>
  );
}

function Attendance() {
  return (
    <main className="m-content">
      <div className="segmented">
        <button className="selected">Overview</button>
        <button>Subject-wise</button>
      </div>

      <div className="status-pill">✓ Eligible (75% required)</div>

      <div className="metric-grid attendance-metrics">
        <div className="metric"><small>CONDUCTED</small><b>6</b></div>
        <div className="metric green"><small>ATTENDED</small><b>6</b></div>
        <div className="metric red"><small>ABSENT</small><b>0</b></div>
        <div className="metric blue"><small>PERCENTAGE</small><b>100%</b></div>
      </div>

      <div className="info-card">
        <span>ⓘ</span>
        <p>You can miss up to <b>2 more classes</b> and still remain eligible (75%).</p>
      </div>

      <section className="simple-card">
        <div className="card-heading"><b>Attendance Meter</b><b>100%</b></div>
        <div className="meter"><i style={{ width: "100%" }} /></div>
        <small>Required: 75%</small>
      </section>

      <section className="simple-card">
        <div className="card-heading"><b>Recent Activity</b></div>
        {subjects.slice(0, 3).map((s, i) => (
          <div className="activity" key={s.code}>
            <span>▣</span><div><b>{s.name}</b><small>{19 - i} Aug 2026 • Attended</small></div><em>●</em>
          </div>
        ))}
      </section>
    </main>
  );
}

function Marks() {
  return (
    <main className="m-content">
      <section className="marks-summary">
        <small>YOUR AVERAGE</small>
        <div className="marks-total">42.5<span>/50</span></div>
        <p>Good job! Keep it up.</p>
        <div className="score-ring">98%</div>
      </section>

      <div className="subject-list">
        {subjects.map(s => (
          <div className="subject-mark" key={s.code}>
            <div><b>{s.name}</b><small>{s.code}</small></div>
            <strong>{s.marks}<small>/50</small></strong>
            <span className="tiny-ring">{s.percent}%</span>
          </div>
        ))}
      </div>

      <button className="wide-secondary">View detailed report →</button>
    </main>
  );
}

function Feedback({ setPage }) {
  return (
    <main className="m-content">
      <section className="feedback-head">
        <span>📚</span>
        <div><small>Batch 2024–2028</small><h2>Sem 1</h2></div>
      </section>

      <div className="stepper">
        <b>1</b><i /><span>2</span><i /><span>3</span>
      </div>

      <p className="step-label">Step 1 of 3</p>
      <h2 className="page-subtitle">Select Semester</h2>

      <div className="semester-grid">
        {semesters.map(([name, sub], i) => (
          <button key={name} onClick={() => setPage("subjects")}>
            <b>{name}</b><small>{sub}</small>
          </button>
        ))}
      </div>
    </main>
  );
}

function Subjects({ setPage }) {
  return (
    <main className="m-content">
      <p className="step-label">Step 2 of 3</p>
      <h2 className="page-subtitle">Select Subject</h2>
      <div className="subject-select-list">
        {subjects.map(s => (
          <button key={s.code} onClick={() => setPage("submit")}>
            <span className="book">📘</span>
            <div><small>{s.code}</small><b>{s.name}</b><small>Faculty: {s.faculty}</small></div>
            <span className="radio" />
          </button>
        ))}
      </div>
    </main>
  );
}

function SubmitFeedback() {
  const [ratings, setRatings] = useState([5, 5, 5, 4, 5]);
  const labels = ["Teaching Quality", "Concept Clarity", "Communication", "Material & Resources", "Overall Satisfaction"];
  return (
    <main className="m-content">
      <section className="feedback-head">
        <span>📘</span>
        <div><b>Database Systems</b><small>21CS51 • Teacher 1</small></div>
      </section>
      <p className="step-label">Step 3 of 3</p>
      <h2 className="page-subtitle">Your Feedback</h2>
      <p className="muted">Please rate your experience</p>

      <div className="ratings">
        {labels.map((label, idx) => (
          <div className="rating-row" key={label}>
            <span>{label}</span>
            <div>{[1,2,3,4,5].map(n =>
              <button key={n} onClick={() => setRatings(r => r.map((x,j) => j === idx ? n : x))} className={n <= ratings[idx] ? "star on" : "star"}>★</button>
            )}</div>
          </div>
        ))}
      </div>
      <label className="field-label">Additional Comments <small>(Optional)</small></label>
      <textarea placeholder="Write your feedback..." />
      <button className="primary-btn">Submit Feedback</button>
    </main>
  );
}

function Profile() {
  return (
    <main className="m-content">
      <section className="profile-card">
        <div className="avatar-large">👨🏻🎓</div>
        <h1>Karunya KP</h1>
        <p>1EP24CS001</p>
        <small>Computer Science & Engineering</small>
        <div className="profile-row"><span>USN</span><b>1EP24CS001</b></div>
        <div className="profile-row"><span>Semester</span><b>5th Semester, 2024–25</b></div>
        <div className="profile-row"><span>Section</span><b>A</b></div>
        <div className="profile-row"><span>Status</span><b className="success-text">● Active</b></div>
        <blockquote>"Attendance is a ledger, not a percentage."</blockquote>
      </section>
    </main>
  );
}

function Menu({ setPage, setActive }) {
  return (
    <main className="m-content">
      <section className="account-card">
        <div className="avatar">K</div>
        <div><b>Karunya KP</b><small>1EP24CS001</small><small>CSE • Sem 1 • Sec A</small></div>
      </section>
      <h2 className="menu-label">ACADEMIC</h2>
      <div className="menu-list">
        {[
          ["home", "Dashboard"], ["attendance", "Academic Attendance"],
          ["marks", "CIE Marks"], ["feedback", "Subject Feedback"]
        ].map(([id, label]) => <button key={id} onClick={() => setPage(id)}><span>▣</span>{label}{id === "attendance" || id === "marks" ? <em>Live</em> : null}</button>)}
        <button><span>▢</span>Suggestion Box</button>
      </div>
      <h2 className="menu-label">ACCOUNT</h2>
      <div className="menu-list">
        <button onClick={() => setPage("profile")}><span>◯</span>My Profile</button>
        <button><span>⚙</span>Settings</button>
        <button className="logout" onClick={() => setActive(0)}><span>↪</span>Logout</button>
      </div>
    </main>
  );
}

export default function StudentMobileApp({ setActive }) {
  const [page, setPage] = useState("home");

  const titles = {
    home: "EduFeedback Pro", attendance: "Academic Attendance",
    marks: "CIE & Internals", feedback: "Subject Feedback",
    subjects: "Sem 1 • Subjects", submit: "Submit Feedback",
    profile: "My Profile", menu: "Menu",
  };

  const goBack = () => {
    if (page === "subjects") setPage("feedback");
    else if (page === "submit") setPage("subjects");
    else if (page === "profile" || page === "feedback") setPage("home");
    else setPage("home");
  };

  const render = {
    home: <Home setPage={setPage} />,
    attendance: <Attendance />,
    marks: <Marks />,
    feedback: <Feedback setPage={setPage} />,
    subjects: <Subjects setPage={setPage} />,
    submit: <SubmitFeedback />,
    profile: <Profile />,
    menu: <Menu setPage={setPage} setActive={setActive} />,
  }[page];

  const isHome = page === "home";

  return (
    <div className="mobile-shell">
      <div className="mobile-device">
        <div className="status-bar">
          <span>9:41</span><span>● ◔ ▰</span>
        </div>

        {isHome ? (
          <header className="m-home-header">
            <div className="brand"><span className="brand-mark">🎓</span><b>EduFeedback Pro</b></div>
            <div className="header-actions"><button onClick={() => setActive(0)}>‹</button><button className="mini-avatar">K</button></div>
          </header>
        ) : (
          <Header title={titles[page]} onBack={goBack} action={page === "attendance" || page === "marks" ? <button className="icon-btn">⌕</button> : null} />
        )}

        {render}
        <BottomNav page={page} setPage={setPage} />
      </div>
    </div>
  );
}
