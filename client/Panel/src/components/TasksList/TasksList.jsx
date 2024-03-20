import TasksListItem from '../TasksListItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateTasksOrder } from '../../store/Tasks/tasksSlice/tasksSlice';
import { updateTask } from '../../store/Tasks/tasksThunk/tasksThunk';
import './TasksList.scss';
import { useDispatch } from 'react-redux';

const TasksList = ({ tasks, projectId }) => {
  const dispatch = useDispatch();

  const handleUpdateTaskPositions = (attributes) => dispatch(updateTask({ attributes }));
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    const attributes = updatedTasks.map((task, index) => ({
      taskId: task._id,
      pos: index,
    }));

    dispatch(updateTasksOrder(updatedTasks));
    handleUpdateTaskPositions(attributes);
  };

  return (
    <div>
      <h1 className="taskListTitle">Tasks</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`${projectId}`}>
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps} className="tasksListWrapper">
              {tasks.map((task, id) => (
                <TasksListItem key={task._id} task={task} projectId={projectId} position={id} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TasksList;
