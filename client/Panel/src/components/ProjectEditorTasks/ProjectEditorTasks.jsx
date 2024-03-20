import './ProjectEditorTasks.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, addTasks } from '../../store/Tasks/tasksThunk/tasksThunk';
import { getTasksSelector } from '../../store/Tasks/tasksSelectors/tasksSelectors';
import TasksList from '../TasksList';

const ProjectEditorTasks = ({ projectId }) => {
  const dispatch = useDispatch();

  const tasks = useSelector(getTasksSelector);

  useEffect(() => {
    dispatch(getTasks({ id: projectId }));
  }, []);

  const handleAddTask = () => dispatch(addTasks({ id: projectId }));

  return (
    <div className="projectEditorTasksWrapper">
      <TasksList tasks={tasks} projectId={projectId} />
      <button className="taskButton" onClick={handleAddTask}>
        Add task
      </button>
    </div>
  );
};

export default ProjectEditorTasks;
