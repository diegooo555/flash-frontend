import { useState, useEffect, useRef, createContext, useContext, memo } from "react";
import HeaderWeek from "./HeaderWeek";
import IndicatorHour from "./IndicatorHour";
import ModalTask from "./ModalTask";
import CreateTask from "./CreateTask";
import Task from "./Task";
import { TaskContext } from "../../context/useTaskContext";
import ActualTime from "./ActualTime";
import PropTypes from "prop-types";

const ModalCreate = createContext(null);

const generateDaysMonths = (actualYear) => {
  const daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (actualYear % 4 === 0 || actualYear % 400 === 0) {
    daysMonths[1] = 29;
  }

  return daysMonths;
};

const days = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];

const generateDaysWeek = (dayActual, monthActual, yearActual, dayStr, index) => {
  console.log("Funcion generate Weeks")
  const arrDays = Array(7);
  const indexDay = days.indexOf(dayStr);
  const daysMonthActual = generateDaysMonths(yearActual)[monthActual - 1];
  const daysPrevMonth = monthActual !== 1 ? generateDaysMonths(yearActual)[monthActual - 2] : generateDaysMonths(yearActual - 1)[11];

  for (let index = 0; index < arrDays.length; index++) {
    let dayTogenerate;
    let monthActualDay = monthActual;
    let yearActualDay = yearActual;

    if (index > indexDay) {
      dayTogenerate = dayActual + (index - indexDay);
      if (dayTogenerate > daysMonthActual) {
        dayTogenerate -= daysMonthActual;
        monthActualDay++;
        if (monthActualDay > 12) {
          monthActualDay = 1;
          yearActualDay++;
        }
      }
    } else {
      dayTogenerate = dayActual - (indexDay - index);
      if (dayTogenerate <= 0) {
        dayTogenerate = daysPrevMonth + dayTogenerate;
        monthActualDay--;
        if (monthActualDay === 0) {
          monthActualDay = 12;
          yearActualDay--;
        }
      }
    }

    arrDays[index] = {
      day: dayTogenerate,
      month: monthActualDay,
      year: yearActualDay,
      dayStr: days[index],
      state: false,
    };
  }

  arrDays[indexDay] = {
    day: dayActual,
    month: monthActual,
    year: yearActual,
    dayStr: dayStr,
    state: (index === 0),
  };

  return arrDays;
};

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

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const getComponentsFullDate = (date) => {
  const year = Number(date.substring(0, 4));
  const month = Number(date.substring(5, 7));
  const day = Number(date.substring(8, 10));
  const hour = Number(date.substring(11, 13));
  const minutes = Number(date.substring(14, 17));
  const amPm = hour > 12 ? "pm" : "am";
  const components = { year, month, day, hour, minutes, amPm };

  return components;
};

const getElementsTask = (dateStart, dateEnd, day) => {
  const cmpDateStart = getComponentsFullDate(dateStart);
  const cmpDateEnd = getComponentsFullDate(dateEnd);
  const sameFinishDay = cmpDateStart.day === cmpDateEnd.day;
  const sameRangeDays = day > cmpDateStart.day && day < cmpDateEnd.day;
  const hourStProv = cmpDateStart.hour + cmpDateStart.minutes / 60;
  const hourStart = sameFinishDay
    ? hourStProv
    : day > cmpDateStart.day
    ? 0
    : hourStProv;
  const defHourSt = sameRangeDays ? 0 : hourStart;
  const hourEndProv = cmpDateEnd.hour + cmpDateEnd.minutes / 60;
  const hourEnd = sameFinishDay
    ? hourEndProv
    : day < cmpDateEnd.day
    ? 24
    : hourEndProv;
  const defHourEnd = sameRangeDays ? 24 : hourEnd;
  const formatHourStart =
    cmpDateStart.hour > 12 ? cmpDateStart.hour - 12 : cmpDateStart.hour;
  const formatHourEnd =
    cmpDateEnd.hour > 12 ? cmpDateEnd.hour - 12 : cmpDateEnd.hour;
  const addZero = (time) => (time < 10 ? `0${time}` : time.toString());
  const strIntervalHour = `${formatHourStart}:${
    addZero(cmpDateStart.minutes) + cmpDateStart.amPm
  }-${formatHourEnd}:${addZero(cmpDateEnd.minutes) + cmpDateEnd.amPm}`;
  return { hourStart, defHourSt, defHourEnd, strIntervalHour };
};

const arrSimpleDaysWeek = (day, dayFinal) => {
  const arrayDays = [];

  if (day < dayFinal) {
    // Llenar arrayDays con los días entre day y dayFinal
    for (let i = day; i <= dayFinal; i++) {
      arrayDays.push(i);
    }
  } else {
    // Llenar arrayDays con días desde 'day' hasta el final del mes y desde el inicio del próximo mes hasta 'dayFinal'
    const daysMonth = day + (7 - dayFinal);
    for (let i = day; i < daysMonth; i++) { // Suponiendo 31 días como límite máximo
      arrayDays.push(i);
    }
    for (let i = 1; i <= dayFinal; i++) {
      arrayDays.push(i);
    }
  }
  return arrayDays;
}

const filterTaskByWeek = (day, month, year, dayFinal, monthFinal, yearFinal, tasks, arrDays) => {

  const tasksWeek = tasks.filter((task) => {
    const dateStart = getComponentsFullDate(task.dateStart);
    const conditionYear = (dateStart.year === year) || (dateStart.year === yearFinal);
    const conditionMonth = (dateStart.month === month) || (dateStart.month === monthFinal);
    const subDay = (dateStart.day >= 24) ? (dateStart.month === month) : true;

    const conditionDay = arrDays.includes(dateStart.day) && !(dateStart.day <= 7 && dateStart.month < monthFinal) && subDay;
    return conditionDay && conditionYear && conditionMonth;

  });

  return tasksWeek;
};

const ColumnHours = () => (
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

const RowHour = ({hourStart, hourEnd, amPm, amPmEnd, day, month, year}) => {
  const modalCreateContext = useContext(ModalCreate);

  return (
    <>
      <div className="border-solid border border-blue-300 hover:bg-blue-100 h-16 max-md:h-24" onClick={() => modalCreateContext.setCreateModal(
        {
          state: true, 
          hourStart: hourStart, 
          hourEnd: hourEnd,
          amPm: amPm,
          amPmEnd: amPmEnd, 
          day: day, 
          month: month, 
          year: year
        })}/>
    </>

  );
};

const RowsHour = ({day, month, year}) => (
  <div className="grid grid-rows-[24]">
    <RowHour hourStart={12} amPm={"AM"} hourEnd={1} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={1} amPm={"AM"} hourEnd={2} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={2} amPm={"AM"} hourEnd={3} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={3} amPm={"AM"} hourEnd={4} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={4} amPm={"AM"} hourEnd={5} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={5} amPm={"AM"} hourEnd={6} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={6} amPm={"AM"} hourEnd={7} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={7} amPm={"AM"} hourEnd={8} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={8} amPm={"AM"} hourEnd={9} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={9} amPm={"AM"} hourEnd={10} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={10} amPm={"AM"} hourEnd={11} amPmEnd={"AM"} day={day} month={month} year={year}/>
    <RowHour hourStart={11} amPm={"AM"} hourEnd={12} amPmEnd={"PM"} day={day} month={month} year={year}/>

    <RowHour hourStart={12} amPm={"PM"} hourEnd={1} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={1} amPm={"PM"} hourEnd={2} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={2} amPm={"PM"} hourEnd={3} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={3} amPm={"PM"} hourEnd={4} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={4} amPm={"PM"} hourEnd={5} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={5} amPm={"PM"} hourEnd={6} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={6} amPm={"PM"} hourEnd={7} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={7} amPm={"PM"} hourEnd={8} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={8} amPm={"PM"} hourEnd={9} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={9} amPm={"PM"} hourEnd={10} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={10} amPm={"PM"} hourEnd={11} amPmEnd={"PM"} day={day} month={month} year={year}/>
    <RowHour hourStart={11} amPm={"PM"} hourEnd={12} amPmEnd={"PM"} day={day} month={month} year={year}/>
  </div>
);

const ColumnDay = memo(function ColumnDay({dayObject}) {
  return(
    <div
      className={dayObject.state?" bg-blue-200 relative":"relative"
    }>
    <RowsHour day={dayObject.day} month={dayObject.month} year={dayObject.year} />
    {dayObject.state && <IndicatorHour />}
  </div>
  );
});


const formatHourMeridian = (dateActual) => {
  const offsetInMinutes = dateActual.getTimezoneOffset();
  const offSetInHours = -(offsetInMinutes / 60);
  const sign = offSetInHours >= 0 ? "+" : "-";
  const absOffSetInHours = Math.abs(Math.floor(offSetInHours));
  const formattedOffset = `GMT${sign}${absOffSetInHours
    .toString()
    .padStart(2, "0")}`;
  return formattedOffset;
};

export function Calendar({tasks, mdScreen}) {
  const [taskModal, setTaskModal] = useState({ state: false, task: {_id: "", title: "", description: "", dateStart: "", dateEnd: ""} });
  const [createModal, setCreateModal] = useState( {state: false, hourStart: 0, hourEnd: 0, amPm: "", amPmEnd: "",  day: 0,  month: 0,  year: 0});
  const dateNow = new Date();
  const scrollableRef = useRef(null);
  const currentDay = dateNow.getDate();
  const currentMonth = dateNow.getMonth() + 1;
  const currentYear = dateNow.getFullYear();
  const dayStr = days[dateNow.getDay()];

  const [actualDate, setActualDate] = useState({currentDay: currentDay, currentMonth: currentMonth, currentYear: currentYear, dayStr: dayStr, index: 0});
  const formatMeridian = formatHourMeridian(dateNow);
  const taskContext = useContext(TaskContext)
  const deleteTask = taskContext.deleteTask;
  const updateTask = taskContext.updateTask;

  console.log("Renderizado Calendar")

  const arrDaysWeek = generateDaysWeek(actualDate.currentDay, actualDate.currentMonth, actualDate.currentYear, actualDate.dayStr, actualDate.index);

  const arrDaysSimple = arrSimpleDaysWeek(arrDaysWeek[0].day, arrDaysWeek[6].day);

  const filterTaskWeek = filterTaskByWeek(arrDaysWeek[0].day, arrDaysWeek[0].month, arrDaysWeek[0].year, arrDaysWeek[6].day, arrDaysWeek[6].month, arrDaysWeek[6].year, tasks, arrDaysSimple);

  const sizeGridColumns = "14.28571429%".repeat(7);

  const prevWeek = () => {
    const daysMonth = (actualDate.currentMonth !== 1) ? generateDaysMonths(actualDate.currentYear)[actualDate.currentMonth - 2] : 31;
    const newDay =  (arrDaysWeek[0].day - 7 <= 0) ? daysMonth + (arrDaysWeek[0].day - 7) : arrDaysWeek[0].day - 7;
    const newMonth = (arrDaysWeek[0].day - 7 <= 0) ? (actualDate.currentMonth !==1 ? (arrDaysWeek[0].month - 1) : 12 ) : arrDaysWeek[0].month;

    const newYear = (arrDaysWeek[0].day - 7 <= 0 && newMonth === 12) ? arrDaysWeek[0].year - 1 : arrDaysWeek[0].year;
    const newDayStr = "DO";
    
    setActualDate((prev) => ({...prev, currentDay: newDay, currentMonth: newMonth, currentYear: newYear, dayStr: newDayStr, index: actualDate.index - 1}));

    if(actualDate.index === 1){
      const timeNow = new Date();
      const hours = timeNow.getHours();
      const minutes = timeNow.getMinutes();
      const minutesPorcent = minutes / 60;
      const hoursPorcent = (hours + minutesPorcent) / 24;
      const positionScroll = Number(hoursPorcent.toFixed(4));
      if (scrollableRef.current) {
          scrollableRef.current.scrollTop =
          scrollableRef.current.scrollHeight * positionScroll - 30;
      }
      setActualDate((prev) => ({...prev, currentDay: dateNow.getDate(), currentMonth: dateNow.getMonth() + 1, currentYear: dateNow.getFullYear(), dayStr: days[dateNow.getDay()], index: 0}));
    }else{
      setActualDate((prev) => ({...prev, currentDay: newDay, currentMonth: newMonth, currentYear: newYear, dayStr: newDayStr, index: actualDate.index - 1}));
    }
  };

  const nextWeek = () => {
    const daysMonth = (actualDate.currentMonth !== 12) ? generateDaysMonths(actualDate.currentYear)[actualDate.currentMonth - 1] : 31;
    const newDay =  (arrDaysWeek[6].day + 1 < daysMonth) ? arrDaysWeek[6].day + 1 : 1;
    const newMonth = newDay === 1 ? (actualDate.currentMonth !== 12 ? (arrDaysWeek[6].month + 1) : 1) : arrDaysWeek[6].month;
    const newYear = (newDay === 1 && newMonth === 1) ? arrDaysWeek[6].year + 1 : arrDaysWeek[6].year;
    const newDayStr = "DO";

    if(actualDate.index === -1){
      const timeNow = new Date();
      const hours = timeNow.getHours();
      const minutes = timeNow.getMinutes();
      const minutesPorcent = minutes / 60;
      const hoursPorcent = (hours + minutesPorcent) / 24;
      const positionScroll = Number(hoursPorcent.toFixed(4));
      if (scrollableRef.current) {
          scrollableRef.current.scrollTop =
          scrollableRef.current.scrollHeight * positionScroll - 30;
      }
      setActualDate((prev) => ({...prev, currentDay: dateNow.getDate(), currentMonth: dateNow.getMonth() + 1, currentYear: dateNow.getFullYear(), dayStr: days[dateNow.getDay()], index: 0}));

    }else{
      setActualDate((prev) => ({...prev, currentDay: newDay, currentMonth: newMonth, currentYear: newYear, dayStr: newDayStr, index: actualDate.index + 1}));
    }         
  };

  useEffect(() => {
    const scrollCurrentTime = () => {
      const timeNow = new Date();
      const hours = timeNow.getHours();
      const minutes = timeNow.getMinutes();
      const minutesPorcent = minutes / 60;
      const hoursPorcent = (hours + minutesPorcent) / 24;
      const positionScroll = Number(hoursPorcent.toFixed(4));
      if (scrollableRef.current) {
          scrollableRef.current.scrollTop =
          scrollableRef.current.scrollHeight * positionScroll - 30;
      }
    };
    scrollCurrentTime();
  }, []);

  return (
    <ModalCreate.Provider value={{createModal, setCreateModal}}>

      <div className="w-full h-[15%] flex items-center justify-around gap-4 max-md-h-auto max-md:max-h-20">
        <div className="flex flex-col justify-center items-center h-full w-40 max-md:w-30">
          <span className="font-bold text-2xl max-md:text-xl text-blue-600 max-sm:text-base">{monthNames [actualDate.currentMonth - 1]}</span>
          <div className="flex w-full justify-center items-center gap-4">
            <button className="w-10 h-10 p-3 rounded-full bg-blue-300 flex justify-center items-center text-white font-bold text-2xl max-md:w-9 max-md:h-9" onClick={prevWeek}>
              <img src="/arrow.png" alt="flecha" className="h-full w-full rotate-180 "/>
            </button>
            <button onClick={nextWeek} className="w-10 h-10 p-3 rounded-full bg-blue-300 flex justify-center items-center text-white font-bold text-2xl max-md:w-9 max-md:h-9"> 
              <img src="/arrow.png" alt="flecha" className="h-full w-full"/>
            </button>
          </div>
        </div>
        <div className="h-full flex justify-center items-center">
          <ActualTime/>
        </div>
        <div className="text-2xl text-purple-500">Diego</div>
      </div>
      
      <div className="h-[85%] overflow-hidden" onClick={() => { if(createModal.state){
        setCreateModal((prev) => ({...prev, state: false}))
      }
      if(taskModal.state){
        setTaskModal({ state: false, task: {_id: "", title: "", description: "", dateStart: "", dateEnd: ""} })
      }
      }}>
        
        
        <HeaderWeek arrDays={arrDaysWeek} formatMeridianHour={formatMeridian} />
        <div className="h-[84%] pt-1">
          <div className="overflow-y-scroll h-full w-full relative flex" ref={scrollableRef}>
            <ColumnHours/>
            <div className="w-[94%] h-full grid" style={{ gridTemplateColumns: sizeGridColumns}}>
              <ColumnDay setTaskModal={setTaskModal} dayObject={arrDaysWeek[0]}/>
              <ColumnDay setTaskModal={setTaskModal} dayObject={arrDaysWeek[1]}/>
              <ColumnDay setTaskModal={setTaskModal} dayObject={arrDaysWeek[2]}/>
              <ColumnDay setTaskModal={setTaskModal} dayObject={arrDaysWeek[3]}/>
              <ColumnDay setTaskModal={setTaskModal} dayObject={arrDaysWeek[4]}/>
              <ColumnDay setTaskModal={setTaskModal} dayObject={arrDaysWeek[5]}/>
              <ColumnDay setTaskModal={setTaskModal} dayObject={arrDaysWeek[6]}/>
              { filterTaskWeek.length > 0 &&
              filterTaskWeek.map((task, index) => {
              const dateStart = task.dateStart;
              const dateEnd = task.dateEnd;
              const componentsDateStart = getComponentsFullDate(dateStart);
              const elementsTask = getElementsTask(dateStart, dateEnd, componentsDateStart.day);
              const positionPorcent = ((mdScreen ? 144 : 96)  * Number(elementsTask.hourStart / 24));
              const leftPorcent =  ((arrDaysSimple.indexOf(componentsDateStart.day)) * (94/7)) + 6;
              const heightPorcent = (mdScreen ? 144 : 96) * ((elementsTask.defHourEnd - elementsTask.defHourSt) / 24);
              return (
                <Task key={index} task={task} positionPorcent={positionPorcent} heightPorcent={heightPorcent} leftPorcent={leftPorcent} setTaskModal={setTaskModal} strIntervalHour={elementsTask.strIntervalHour}/>
              );
            })}
            </div>
          </div>
        </div>
      </div>
      {taskModal.state && (<ModalTask taskModal={taskModal} deleteTask={deleteTask} setTaskModal={setTaskModal} updateTask={updateTask}/>)}
      {createModal.state &&(
        <CreateTask createModal={createModal} setCreateTaskModal={setCreateModal}/>
      )}
    </ModalCreate.Provider>
  );
}

Calendar.propTypes = {
  tasks: PropTypes.array.isRequired,
  mdScreen: PropTypes.bool.isRequired,
}

ColumnDay.propTypes = {
  dayObject: PropTypes.object.isRequired,
}

RowsHour.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
}

RowHour.propTypes = {
  hourStart: PropTypes.number.isRequired,
  hourEnd: PropTypes.number.isRequired,
  amPm: PropTypes.string.isRequired,
  amPmEnd: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
}

export default Calendar;
