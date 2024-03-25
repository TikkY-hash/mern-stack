import ProjectTabTasksListItem from '../ProjectTabTasksListItem';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasksSelector } from '../../store/Tasks/tasksSelectors/tasksSelectors';
import { getTasks, updateTask } from '../../store/Tasks/tasksThunk/tasksThunk';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateTasksOrder } from '../../store/Tasks/tasksSlice/tasksSlice';
import ProjectTabAddTask from '../ProjectTabAddTask';

const ProjectTabTasks = ({ projectId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasksSelector);

  useEffect(() => {
    if (projectId) {
      dispatch(getTasks({ id: projectId }));
    }
  }, [projectId]);

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
    <ul>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`${projectId}`}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="tasksListWrapper">
              {tasks.map((task, id) => (
                <ProjectTabTasksListItem key={task._id} task={task} projectId={projectId} position={id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ProjectTabAddTask projectId={projectId} label="Add task" placeholder="Add task" />
    </ul>
  );
};

export default ProjectTabTasks;
