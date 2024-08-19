import Calendar from "../components/calendar/Calendar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { TaskContext } from "../context/useTaskContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


function TaskPage() {
  const { register, handleSubmit } = useForm();
  const userContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);

  const logOut = userContext?.logOut;
  
  const getTasks = taskContext?.getTasks

  const createTask = taskContext?.createTask

  const tasks = taskContext?.tasks

  const onSubmit = handleSubmit(async (data) => {
    createTask ? createTask(data) : console.log("Create Task Function Undefined")
  })

  console.log("Renderizado Task Page");

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <div className="h-screen">
    <Calendar tasks={tasks} />
      <form onSubmit={onSubmit} className="flex flex-col items-center w-[45%] border-blue-500 border-[1.5px] rounded-md">

        <fieldset className="w-full">
          <div className="flex justify-center items-center p-3 gap-3">
            <img src="/tarea.png" alt="" width="50px" height="50px" />
            <legend className="text-orange-500 font-extrabold text-2xl">Nueva Tarea</legend>
          </div>
        </fieldset>

        <fieldset className="flex flex-col items-center w-full gap-1">
          <label htmlFor="title" className="text-[darkblue] font-bold text-lg">Titulo:</label>
          <input type="text"  id="title" className="outline-none border-gray-400 border-[1px] w-[90%] p-3 rounded-md" {...register('title')} required />

          <label htmlFor="description" className="text-[darkblue] font-bold text-lg">Descripción:</label>
          <textarea id="description" rows={3} className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md" {...register('description')}></textarea>

          <label htmlFor="date" className="text-[darkblue] font-bold text-lg">Fecha Inicio:</label>
          <input type="datetime-local"  id="date" className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md p-3 text-center" {...register('dateStart')} required />

          <label htmlFor="date" className="text-[darkblue] font-bold text-lg">Fecha Fin:</label>
          <input type="datetime-local" id="date" className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md p-3 text-center" {...register('dateEnd')} required />

          <div className="flex w-full justify-center gap-2">
            <label htmlFor="color" className="text-[darkblue] font-bold text-lg">Color: </label>
            <input value="#4ADE80" type="color" {...register("color")} required />
          </div>
        </fieldset>

        <button type="submit" className="magic-button">Agregar</button>

      </form>
      <Link className="bg-red-500 rounded-md p-2" to="/" onClick={() => { logOut?logOut() : console.log("Funcion no definida") }}>Cerrar Sesión</Link>
    </div>
  )
}

export default TaskPage;