import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import Card from "../../components/Card";
import "./index.css";

function AnnouncementsPage() {
  const { socket } = useSocketContext();
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    socket.emit("fetchAnnouncements");

    socket.on("newAnnouncements", (data) => {
      setAnnouncements(data);
    });
  }, []);
  return (
    <div>
      <h1>Announcements</h1>
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
    </div>
  );
}

export default AnnouncementsPage;
