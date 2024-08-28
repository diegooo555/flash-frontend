import PropTypes from "prop-types"

function Task({task, positionPorcent, heightPorcent, leftPorcent, setTaskModal, strIntervalHour}) {
  return (
    <button
      className="w-[13.42857143%] absolute
        rounded-md flex flex-col text-white 
        z-10 overflow-auto"
      style={{
        top: `${positionPorcent}rem`,
        height: `${heightPorcent}rem`,
        left: `${leftPorcent}%`,
        backgroundColor: task.color,
      }}
      onClick={(e) => setTaskModal({ state: true, task: task, x: e.clientX, y: e.clientY })}
      title={task.title}
    >
      <span className="w-full text-center">{task.title}</span>
      <span className="w-full text-center">{strIntervalHour}</span>
    </button>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  positionPorcent: PropTypes.number.isRequired,
  heightPorcent: PropTypes.number.isRequired,
  leftPorcent: PropTypes.number.isRequired,
  setTaskModal: PropTypes.func.isRequired,
  strIntervalHour: PropTypes.string.isRequired,
}

export default Task;
