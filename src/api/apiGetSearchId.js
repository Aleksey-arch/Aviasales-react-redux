import React from 'react';

import styleTicket from './Ticket.module.scss';

const Ticket = ({ price, carrier, segments }) => {
  const hoursIn = Math.floor(segments[0].duration / 60);
  const minutesIn = segments[0].duration - hoursIn * 60;

  const hoursOut = Math.floor(segments[1].duration / 60);
  const minutesOut = segments[1].duration - hoursOut * 60;

  const stopStation = (item) => {
    switch (item.length) {
      case 0:
        return 'Без пересадок';
      case 1:
        return '1 Пересадка';
      case 2:
        return '2 Пересадки';
      case 3:
        return '3 Пересадки';
    }
  };

  const stopsIn = stopStation(segments[0].stops);
  const stationIn =
    segments[0].stops.length == 0 ? '' : segments[0].stops.join(', ');

  const stopsOut = stopStation(segments[1].stops);
  const stationOut =
    segments[1].stops.length == 0 ? '' : segments[1].stops.join(', ');

  const timeFly = (date, duration) => {
    const timeUp = new Date(date);
    const timeDown = new Date(timeUp.getTime() + duration * 60 * 1000);
    const formateTime = (t) => ('' + t).padStart(2, '0');
    const time = `${formateTime(timeUp.getHours()) + ':' + formateTime(timeUp.getMinutes())} - ${formateTime(timeDown.getHours()) + ':' + formateTime(timeDown.getMinutes())}`;
    return time;
  };

  const timeUp = timeFly(segments[0].date, segments[0].duration);
  const timeDown = timeFly(segments[1].date, segments[1].duration);

  return (
    <>
      <div className={styleTicket.container}>
        <div className={styleTicket.titleInfo}>
          <h3 className={styleTicket.price}>{price.toLocaleString()}</h3>
          <img
            className={styleTicket.logo}
            src={`https://pics.avs.io/99/36/${carrier}.png`}
            alt={carrier}
          />
        </div>

        <div className={styleTicket.airInfo}>
          <div className={styleTicket.infoBox}>
            <h4 className={styleTicket.title}>
              {`${segments[0].origin} - ${segments[0].destination}`}
            </h4>
            <p className={styleTicket.description}>{timeUp}</p>

            <h4 className={styleTicket.title}>
              {`${segments[1].origin} - ${segments[1].destination}`}
            </h4>
            <p className={styleTicket.description}>{timeDown}</p>
          </div>

          <div className={styleTicket.infoBox}>
            <h4 className={styleTicket.title}>В пути</h4>
            <p className={styleTicket.description}>
              {`${hoursIn}ч ${minutesIn}м`}
            </p>
            <h4 className={styleTicket.title}>В пути</h4>
            <p className={styleTicket.description}>
              {`${hoursOut}ч ${minutesOut}м`}
            </p>
          </div>

          <div className={styleTicket.infoBox}>
            <h4 className={styleTicket.title}>{stopsIn}</h4>
            <p className={styleTicket.description}>{stationIn}</p>
            <h4 className={styleTicket.title}>{stopsOut}</h4>
            <p className={styleTicket.description}>{stationOut}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
