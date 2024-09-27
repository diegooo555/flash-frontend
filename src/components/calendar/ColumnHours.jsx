const hoursDay = [
    { hour: 12, amPm: "AM" },
    { hour: 1, amPm: "AM" },
    { hour: 2, amPm: "AM" },
    { hour: 3, amPm: "AM" },
    { hour: 4, amPm: "AM" },
    { hour: 5, amPm: "AM" },
    { hour: 6, amPm: "AM" },
    { hour: 7, amPm: "AM" },
    { hour: 8, amPm: "AM" },
    { hour: 9, amPm: "AM" },
    { hour: 10, amPm: "AM" },
    { hour: 11, amPm: "AM" },
    { hour: 12, amPm: "PM" },
    { hour: 1, amPm: "PM" },
    { hour: 2, amPm: "PM" },
    { hour: 3, amPm: "PM" },
    { hour: 4, amPm: "PM" },
    { hour: 5, amPm: "PM" },
    { hour: 6, amPm: "PM" },
    { hour: 7, amPm: "PM" },
    { hour: 8, amPm: "PM" },
    { hour: 9, amPm: "PM" },
    { hour: 10, amPm: "PM" },
    { hour: 11, amPm: "PM" },
  ];

export const ColumnHours = () => (
    <div className="grid grid-rows-[24] w-[6%] relative bottom-3">
      {hoursDay.map((hour, index) => (
        <span
          key={index}
          className="text-sm font-semibold text-gray-500 text-end pr-1 max-md:text-[10px] max-sm:text-[8px] h-16 max-md:h-24"
        >
          {index !== 0 ? `${hour.hour} ${hour.amPm}` : ""}
        </span>
      ))}
    </div>
);