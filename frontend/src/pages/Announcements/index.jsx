import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import Card from "../../components/Card";
import "./index.css";

function AnnouncementsPage() {
  const { socket } = useSocketContext();
  const [announcements, setAnnouncements] = useState([]);

  const handleOnClickRefreshBtn = () => {
    socket.emit("fetchAnnouncements");
  };

  useEffect(() => {
    socket.emit("fetchAnnouncements");

    socket.on("newAnnouncements", (data) => {
      setAnnouncements(data);
    });
  }, []);

  return (
    <>
      <div className="announcements-header">
        <h1>Announcements</h1>
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
