import {useContext } from "react";
import PropTypes from "prop-types";
import { ModalCreate } from "../../context/ModalCreateContext.js";

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

  export const RowsHour = ({day, month, year}) => (
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