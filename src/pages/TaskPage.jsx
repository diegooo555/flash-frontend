import Calendar from "../components/calendar/Calendar";
import { useState ,useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { TaskContext } from "../context/useTaskContext";
import { Link } from "react-router-dom";


function TaskPage() {
  const userContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });



  const logOut = userContext?.logOut;
  
  const getTasks = taskContext?.getTasks


  const tasks = taskContext?.tasks


  console.log("Renderizado Task Page");

  useEffect(() => {
    function handleResize(){
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize);
    getTasks();

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <div className="h-screen">
    <Calendar tasks={tasks} mdScreen={windowSize.width < 768}/>
      {/* <Link className="bg-red-500 rounded-md p-2" to="/" onClick={() => { logOut?logOut() : console.log("Funcion no definida") }}>Cerrar Sesión</Link> */}
    </div>
  )
}

export default TaskPage;