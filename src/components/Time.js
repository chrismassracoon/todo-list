const Time = ({hour, minutes, seconds}) => {
  return (
    <h2 className="time">
      {('' + hour).length < 2 ? `0${hour}` : hour}:
      {('' + minutes).length < 2 ? `0${minutes}` : minutes}:
      {('' + seconds).length < 2 ? `0${seconds}` : seconds}
    </h2>
  );
};

export default Time;
