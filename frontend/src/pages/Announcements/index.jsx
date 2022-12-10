import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import Card from "../../components/Card";
import "./index.css";

const debounce = (cb, wait) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      cb(...args);
    }, wait);
  };
};

function AnnouncementsPage() {
  const { socket } = useSocketContext();
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnClickRefreshBtn = () => {
    socket.emit("fetchAnnouncements");
  };

  useEffect(() => {
    socket.emit("fetchAnnouncements");

    socket.on("newAnnouncements", (data) => {
      setAnnouncements(data);
    });

    socket.on("searchResults", (data) => {
      setAnnouncements(data);
    });
  }, []);

  useEffect(() => {
    socket.emit("searchAnnouncement", searchQuery);
  }, [searchQuery]);

  return (
    <>
      <div className="announcements-header">
        <h1>Recent Announcements</h1>
        <section className="search-section">
          <label htmlFor="searchbar">Search</label>
          <input
            value={searchQuery}
            type="text"
            id="searchbar"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>
        <button onClick={handleOnClickRefreshBtn} className="refresh-btn">
          Refresh announcements
        </button>
      </div>
      <section className="announcements-container">
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            header={<h3>{announcement.title}</h3>}
            body={
              <p dangerouslySetInnerHTML={{ __html: announcement.content }} />
            }
            footer={
              <>
                <p>{new Date(announcement.date).toLocaleDateString()}</p>
                <a href={announcement.link}>Read More</a>
              </>
            }
          />
        ))}
      </section>
    </>
  );
}

export default AnnouncementsPage;
