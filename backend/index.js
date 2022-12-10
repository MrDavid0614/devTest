import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import BitMEXClient from "bitmex-realtime-api";
import axios from "axios";
import cors from "cors";
import AnnouncementModel from "./models/Announcement.js";
import { Sequelize } from "sequelize";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(cors());

const client = new BitMEXClient();

client.addStream(
  "XBTUSD",
  "orderBookL2_25",
  function (data, symbol, tableName) {
    io.emit("newData", data);
  }
);

io.on("connection", (socket) => {
  socket.on("fetchAnnouncements", async () => {
    try {
      const res = await axios.get(
        "https://www.bitmex.com/api/v1/announcement",
        {
          headers: { "Accept-Encoding": "gzip,deflate,compress" },
        }
      );

      io.emit("newAnnouncements", res.data);
      await AnnouncementModel.bulkCreate(res.data);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("searchAnnouncement", async (searchQuery) => {
    const result = await AnnouncementModel.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: `%${searchQuery}%`,
        },
      },
    });

    io.emit(
      "searchResults",
      result.map((data) => data.dataValues)
    );
  });
});

io.listen(PORT);
