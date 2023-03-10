import { useEffect, useState } from 'react';
import '../mainStyles.scss';
import { useDispatch } from 'react-redux';
import { setName } from '../redux/slice';
import Time from './Time';
import { useAuth } from '../hooks/useAuth';

const Data = () => {
  // Отримання ім'я з редаксу
  const { name, email } = useAuth();
  const dispatch = useDispatch();
  const borderName = name.length < 1 ? { borderBottom: '1px solid white' } : {};

  // Отримання дати вперше
  let engDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [date, setDate] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
    day: new Date().getDay(),
    number: new Date().getDate(),
    month: new Date().toLocaleDateString('en-EN', { month: 'long' }),
  });

  // Оновлення часу щосекундно
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
        <div className="welcome">
          <h2 className="data">{email ? 'Welcome back,' : 'Hello, guest'}</h2>
          {email && (
            <input
              maxLength={9}
              style={borderName}
              onChange={(e) => dispatch(setName(e.target.value))}
              value={name}></input>
          )}
        </div>
        <Time hour={date.hour} minutes={date.minutes} seconds={date.seconds} />
        <h2 className="data">
          {' '}
          {engDays[date.day]}, {date.number} {date.month}
        </h2>
      </div>
    </div>
  );
};

export default Data;
