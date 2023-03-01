import { useEffect, useState } from 'react';
import '../mainStyles.scss';

const Data = () => {
  let engDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [date, setDate] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
    day: new Date().getDay(),
    number: new Date().getDate(),
    month: new Date().toLocaleDateString('en-EN', { month: 'long' }),
  });
  useEffect(() => {
    const dateInterval = setInterval(() => {
      setDate({
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
        day: new Date().getDay(),
        number: new Date().getDate(),
        month: new Date().toLocaleDateString('en-EN', { month: 'long' }),
      });
    }, 1000);
    return () => clearInterval(dateInterval);
  });
  return (
    <div className="container">
      <div className="data__container">
        <h2 className="data">Welcome back, name</h2>
        <h2 className="time">
          {('' + date.hour).length < 2 ? `0${date.hour}` : date.hour}:
          {('' + date.minutes).length < 2 ? `0${date.minutes}` : date.minutes}:
          {('' + date.seconds).length < 2 ? `0${date.seconds}` : date.seconds}
        </h2>
        <h2 className="data">
          {' '}
          {engDays[date.day]}, {date.number} {date.month}
        </h2>
      </div>
    </div>
  );
};

export default Data;
