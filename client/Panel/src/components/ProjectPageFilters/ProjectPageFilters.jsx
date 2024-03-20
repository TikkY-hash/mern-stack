import cn from 'classnames';
import './ProjectPageFilters.scss';

const ProjectPageFilters = ({ value, setFilterType }) => (
  <div className="projectPageFiltersWrapper">
    <button
      onClick={() => setFilterType('all')}
      className={cn('filterButton', {
        selectedButton: value === 'all',
      })}
    >
      All
    </button>
    <button
      onClick={() => setFilterType('pending')}
      className={cn('filterButton', {
        selectedButton: value === 'pending',
      })}
    >
      Pending
    </button>
    <button
      onClick={() => setFilterType('finished')}
      className={cn('filterButton', {
        selectedButton: value === 'finished',
      })}
    >
      Finished
    </button>
  </div>
);

export default ProjectPageFilters;
