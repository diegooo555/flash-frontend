import IndicatorHour from "./IndicatorHour";
import Task from "./Task";
import { getComponentsFullDate, getElementsTask, filterTaskByWeek, arrSimpleDaysWeek  } from "../../logic/calendar";
import PropTypes from "prop-types";
import { RowsHour } from "./RowsHour";

const ColumnDay = ({dayObject}) => {
    return(
      <div
        className={dayObject.state?" bg-blue-200 relative":"relative"
      }>
      <RowsHour day={dayObject.day} month={dayObject.month} year={dayObject.year} />
      {dayObject.state && <IndicatorHour />}
    </div>
    );
  };

const WeekCalendar = ({arrDaysWeek, setTaskModal,  mdScreen, tasks}) => {
    const arrDaysSimple = arrSimpleDaysWeek(arrDaysWeek[0].day, arrDaysWeek[6].day);
    const filterTaskWeek = filterTaskByWeek(arrDaysWeek[0].day, arrDaysWeek[0].month, arrDaysWeek[0].year, arrDaysWeek[6].day, arrDaysWeek[6].month, arrDaysWeek[6].year, tasks, arrDaysSimple);
    const sizeGridColumns = "14.28571429%".repeat(7);
    return(
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
    )
}

ColumnDay.propTypes = {
    dayObject: PropTypes.object.isRequired,
}

WeekCalendar.propTypes = {
    arrDaysWeek: PropTypes.array.isRequired,
    setTaskModal: PropTypes.func.isRequired,
    mdScreen: PropTypes.bool.isRequired,
    tasks: PropTypes.array.isRequired,
}

export default WeekCalendar;