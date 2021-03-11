import React, { useState } from "react";
import "./index.css";

function NotesApp() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState([]);
  const [sortedNotes, setSortedNotes] = useState([]);

  const sortNotes = (arr) => {
    return [...arr].sort((a, b) => {
      const aStatus = a.status.toLowerCase();
      const bStatus = b.status.toLowerCase();
      if (aStatus === bStatus) {
        return 1;
      }
      if (aStatus === "active") {
        return -1;
      } else if (bStatus === "active") {
        return 1;
      } else if (aStatus === "completed") {
        return -1;
      } else if (bStatus === "completed") {
        return 1;
      } else {
        return 1;
      }
    });
  };
  const showAll = () => {
    setSortedNotes(sortNotes(notes));
  };
  const showCompleted = () => {
    setSortedNotes(
      [...notes].filter((n) => n.status.toLowerCase() === "completed")
    );
  };

  const showActive = () => {
    console.log("notes", notes);
    setSortedNotes(
      [...notes].filter((n) => n.status.toLowerCase() === "active")
    );
  };
  const addNote = () => {
    if (!title) {
      return;
    }
    setNotes([...notes, { title, status }]);
    setSortedNotes(sortNotes([...notes, { title, status }]));

    setStatus("");
    setTitle("");
  };
  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <input
          data-testid="input-note-name"
          type="text"
          className="large mx-8"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          data-testid="input-note-status"
          type="text"
          className="large mx-8"
          placeholder="Note Status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        />
        <button className="" data-testid="submit-button" onClick={addNote}>
          Add Note
        </button>
      </section>

      <div className="mt-50">
        <ul className="tabs">
          <li
            className="tab-item slide-up-fade-in"
            data-testid="allButton"
            onClick={showAll}
          >
            All
          </li>
          <li
            className="tab-item slide-up-fade-in"
            data-testid="activeButton"
            onClick={showActive}
          >
            Active
          </li>
          <li
            className="tab-item slide-up-fade-in"
            data-testid="completedButton"
            onClick={showCompleted}
          >
            Completed
          </li>
        </ul>
      </div>
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList">
            {sortedNotes.map((n) => (
              <tr key={n.title}>
                <td>{n.title}</td>
                <td>{n.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesApp;

/*.sort((a, b) => {
const aStatus = a.status.toLowerCase();
const bStatus = b.status.toLowerCase();
if (aStatus === bStatus) {
    return 1;
}
else if (aStatus ===  "active") {
  return -1;
} else if (bStatus === "active") {
  return 1;
} else if (aStatus === "completed") {
  return -1;
} else if (bStatus === "completed") {
  return 1;
} else {
  return 1;
}
})

 */
