import { useState} from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
const WindowQuestion = (props) => (
  <div className="w-screen h-screen fixed top-0 left-0 z-10 grid">
    <div className="h-[30%] w-[30%] self-center justify-self-center flex flex-col justify-center items-center bg-white gap-2">
      <p>¿Deseas eliminar la tarea?</p>
      <div className='flex justify-around items-center w-full'>
        <button
          onClick={() => {
            props.deleteTask(props.id);
          }}
          className="bg-red-500 p-2 w-[20%] rounded-md"
        >
          Si
        </button>
        <button className="bg-blue-400 p-2 w-[20%] rounded-md">No</button>
      </div>
    </div>
  </div>
);

const ModalTask = ({taskModal, updateTask, deleteTask, setTaskModal}) => {
  const task = taskModal.task;
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [dateStart, setDateStart] = useState(task?.dateStart);
  const [dateEnd, setDateEnd] = useState(task?.dateEnd);
  const [color, setColor] = useState(task?.color);
  const [windowQuestion, setWindowQuestion] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
        console.log(data)
        if (task) {
          updateTask(task._id, data)
          setTaskModal({state: false, task: {_id: "", title: "", description: "", dateStart: "", dateEnd: "", color: ""}})
        }
    })

    return(
        <div className="w-screen h-screen grid fixed top-0 left-0 z-20" onClick={() => setTaskModal({state: false, task: {_id: "", title: "", description: "", dateStart: "", dateEnd: ""}})}>
        <form className='flex flex-col justify-self-center self-center w-[45%] h-[80%] bg-white shadow-2xl
          gap-2 dark:border rounded-md p-5' onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
            <button className='self-end bg-gray-400 rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300' onClick={() => setTaskModal({state: false, task: {_id: "", title: "", description: "", dateStart: "", dateEnd: ""}})} >
                <svg focusable="false" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                </svg>
            </button>
            <input type="text" value={title} className='outline-none border-[gray] border rounded-md p-2' {...register('title')} onChange={(e) => setTitle(e.target.value)}/>
            <textarea id="description" value={description} className='outline-none border-[gray] border rounded-md p-2' {...register('description')} onChange={(e) => setDescription(e.target.value)}/>
            <input type="datetime-local" value={dateStart} className='outline-none border-[gray] border rounded-md p-2' {...register('dateStart')} onChange={(e) => setDateStart(e.target.value)}/>
            <input type="datetime-local" value={dateEnd} className='outline-none border-[gray] border rounded-md p-2'  {...register('dateEnd')} onChange={(e) => setDateEnd(e.target.value)}/>
            <input type="color" value={color} className="w-32 h-12 self-center" {...register('color')} onChange={(e) => setColor(e.target.value)}/>
            <button className='bg-red-600 p-2 rounded-md' onClick={() => {
                setWindowQuestion(true)
            }} type='button'>Eliminar</button>
            
            <button className='bg-green-400 p-2 rounded-md' type='submit'>Guardar</button>
        </form>
        {(windowQuestion && task)&&  (<WindowQuestion deleteTask={deleteTask} id={task._id}/>)}
    </div>
    )
};

ModalTask.propTypes = {
  taskModal: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
  setTaskModal: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

WindowQuestion.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default ModalTask;

