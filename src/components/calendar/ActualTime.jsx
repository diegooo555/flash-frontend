import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ComponentDay = ({ data }) => (
  <div className="h-full flex items-center justify-center">
    <div className="p-3 bg-blue-500 rounded-md text-white text-2xl flex
      hover:scale-90 hover:bg-blue-400 cursor-pointer w-14 h-14 justify-center items-center max-md:w-10 max-md:h-10">
      <span className="text-xl font-bold max-md:text-lg">{data}</span>
    </div>
  </div>
);

function ActualTime() {
  const [dateNow, setDateNow] = useState(new Date());
  useEffect(() => {
    const updateDate = () => {
      setDateNow(new Date());
    };

    updateDate();

    const intervalDate = setInterval(updateDate, 1000);

    return () => clearInterval(intervalDate);
  }, []);

  const hours = dateNow.getHours();
  const minutes = dateNow.getMinutes();
  const seconds = dateNow.getSeconds();
  const isMorning = hours < 12;
  const addZero = (time) => (time < 10 ? `0${time}` : time.toString());
  const formatHours = hours > 12 ? addZero(hours - 12) : addZero(hours);
  const formatMinutes = addZero(minutes);
  const formatSeconds = addZero(seconds);
  const amPm = isMorning ? "AM" : "PM";

  return (
    <div className="flex w-full h-full gap-3 max-md:gap-1">
      <ComponentDay data={formatHours} />
      <ComponentDay data={formatMinutes} />
      <ComponentDay data={formatSeconds} />
      <ComponentDay data={amPm} />
    </div>
  );
}

ComponentDay.propTypes = {
  data: PropTypes.string.isRequired,
}

export default ActualTime;
