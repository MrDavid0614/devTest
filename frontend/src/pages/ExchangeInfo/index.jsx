import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import "./index.css";

function ExchangeInfoPage() {
  const { socket } = useSocketContext();
  const [buyInstruments, setBuyInstruments] = useState([]);
  const [sellInstruments, setSellInstruments] = useState([]);
  useEffect(() => {
    socket.on("newData", (payload) => {
      if (Array.isArray(payload)) {
        const newBuyInstruments = [];
        const newSellInstruments = [];
        payload.forEach((instrument) => {
          switch (instrument.side) {
            case "Buy":
              newBuyInstruments.push(instrument);
              break;

            case "Sell":
              newSellInstruments.push(instrument);
              break;

            default:
              break;
          }
        });

        setBuyInstruments(
          newBuyInstruments.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
        setSellInstruments(
          newSellInstruments.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
      }
    });
  }, []);

  return (
    <>
      <h1>Exchange information page</h1>
      <section className="coin-container">
        <h2>XBTUSD</h2>
        <section className="coin-prices">
          <div>
            <h3>Buy</h3>
            {!!buyInstruments.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {buyInstruments.map((instrument) => {
                    const time = new Date(instrument.timestamp);
                    return (
                      <tr key={instrument.id}>
                        <td>${instrument.price}</td>
                        <td>{instrument.size}</td>
                        <td>
                          {`${time.toLocaleDateString()} ${time.toLocaleTimeString()}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div>
            <h3>Sell</h3>
            {!!sellInstruments.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {sellInstruments.map((instrument) => {
                    const time = new Date(instrument.timestamp);
                    return (
                      <tr key={instrument.id}>
                        <td>${instrument.price}</td>
                        <td>{instrument.size}</td>
                        <td>
                          {`${time.toLocaleDateString()} ${time.toLocaleTimeString()}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
      </section>
    </>
  );
}

export default ExchangeInfoPage;
