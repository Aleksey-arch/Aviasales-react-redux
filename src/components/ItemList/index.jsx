import classes from './index.module.scss';

function ItemList(tickets) {
  const { carrier, price, segments } = tickets.ticket;

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'Некорректная цена';
    }
    return price.toLocaleString('ru-RU');
  };
  // console.log(tickets);

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
    const time = `${
      formateTime(timeUp.getHours()) + ':' + formateTime(timeUp.getMinutes())
    } -
     ${
       formateTime(timeDown.getHours()) +
       ':' +
       formateTime(timeDown.getMinutes())
     }`;
    return time;
  };

  const timeUp = timeFly(segments[0].date, segments[0].duration);
  const timeDown = timeFly(segments[1].date, segments[1].duration);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <p className={classes.price}>{formatPrice(price)} ₽</p>
          <img
            className={classes.logo}
            alt={carrier}
            src={`https://pics.avs.io/99/36/${carrier}.png`}
          />
        </div>
        <div className={classes.footer}>
          <div className={classes.containerInfoTrip}>
            <div className={classes.interval}>
              <p
                className={classes.intervalHeading}
              >{`${segments[0].origin} - ${segments[0].destination}`}</p>
              <p className={classes.intervalValue}>{timeUp}</p>
            </div>

            <div className={classes.time}>
              <p className={classes.timeHeading}>В пути</p>
              <p className={classes.timeValue}>{`${hoursIn}ч ${minutesIn}м`}</p>
            </div>
            <div className={classes.transfers}>
              <p className={classes.transfersHeading}>{stopsIn}</p>
              <p className={classes.transfersValue}>{stationIn}</p>
            </div>
          </div>

          <div className={classes.containerInfoTrip}>
            <div className={classes.interval}>
              <p
                className={classes.intervalHeading}
              >{`${segments[1].origin} - ${segments[1].destination}`}</p>
              <p
                className={classes.intervalValue}
              >{`${hoursOut}ч ${minutesOut}м`}</p>
            </div>

            <div className={classes.time}>
              <p className={classes.timeHeading}>В пути</p>
              <p
                className={classes.timeValue}
              >{`${hoursOut}ч ${minutesOut}м`}</p>
            </div>

            <div className={classes.transfers}>
              <p className={classes.transfersHeading}>{stopsOut}</p>
              <p className={classes.transfersValue}>{stationOut}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemList;
