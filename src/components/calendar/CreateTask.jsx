import { useState, useContext } from "react";
import { TaskContext } from "../../context/useTaskContext";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';


/* 2024-08-09T22:12 
2024-8-8T9:00
2024-08-09T09:00*/
function CreateTask({createModal, setCreateTaskModal}) {
  const { register, handleSubmit } = useForm();

  const formatDate = (hourRe, amPmRe) => {
    const formatMonth = createModal.month < 10 ? `0${createModal.month}` : createModal.month
    const formatDay = createModal.day < 10 ? `0${createModal.day}` : createModal.day
    const militarHour = amPmRe === "AM" ? "00" : "12"
    const formatHourPre = amPmRe === "PM" ? `${hourRe + 12}` : (hourRe < 10 ? `0${hourRe}` : hourRe)
    const formatHour = hourRe === 12 ? militarHour : formatHourPre
    return `${createModal.year}-${formatMonth}-${formatDay}T${formatHour}:00`

  }

  const [dateStart, setDateStart] = useState(formatDate(createModal.hourStart, createModal.amPm))
  const [dateEnd, setDateEnd] = useState(formatDate(createModal.hourEnd, createModal.amPmEnd))

  const taskContext = useContext(TaskContext);
  const wscreen = window.innerHeight / 2;
  const hscreen = window.innerWidth / 2;


  const onSubmit = handleSubmit(async (data) => {
    await taskContext?.createTask(data);
      setCreateTaskModal((prev) => ({...prev, state: false}));
  });
  return (

      <div className={`z-20 h-[70vh] min-w-[400px] max-md:h-[50vh] fixed`} style={{top: wscreen, left: hscreen, transform: 'translate(-50%, -50%)',}}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center w-full border-blue-500 border-[1.5px] rounded-md bg-white h-full overflow-y-scroll"
        >
          <fieldset className="w-full">
            <div className="flex justify-center items-center p-3 gap-3">
              <img src="/tarea.png" alt="" width="50px" height="50px" />
              <legend className="text-orange-500 font-extrabold text-2xl">
                Nueva Tarea
              </legend>
            </div>
          </fieldset>

          <fieldset className="flex flex-col items-center w-full gap-1">
            <label htmlFor="title" className="text-[darkblue] font-bold text-lg">
              Titulo:
            </label>
            <input
              type="text"
              id="title"
              className="outline-none border-gray-400 border-[1px] w-[90%] p-3 rounded-md"
              {...register("title")}
              required
            />

            <label
              htmlFor="description"
              className="text-[darkblue] font-bold text-lg"
            >
              Descripción:
            </label>
            <textarea
              id="description"
              rows={3}
              className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md"
              {...register("description")}
            ></textarea>

            <label htmlFor="date" className="text-[darkblue] font-bold text-lg">
              Fecha Inicio:
            </label>
            <input
              type="datetime-local"
              id="date"
              className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md p-3 text-center"
              {...register("dateStart")}
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              required
            />

            <label htmlFor="date" className="text-[darkblue] font-bold text-lg">
              Fecha Fin:
            </label>
            <input
              type="datetime-local"
              id="date"
              className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md p-3 text-center"
              {...register("dateEnd")}
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              required
            />
            <div className="flex w-full justify-center gap-2">
              <label htmlFor="color" className="text-[darkblue] font-bold text-lg">Color: </label>
              <input type="color" name="color" id="color" {...register("color")} required/>
            </div>
          </fieldset>

          <button type="submit" className="p-2 bg-blue-600 m-2 text-white font-bold rounded-md">
            Agregar
          </button>
        </form>
      </div>
    
  );
}

CreateTask.propTypes = {
  createModal: PropTypes.object.isRequired,
  setCreateTaskModal: PropTypes.func.isRequired,
}

export default CreateTask;
