import cn from 'classnames';
import './ProjectPageFilters.scss';
import Button from '../Button';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Finished', value: 'finished' },
];

const ProjectPageFilters = ({ value, setFilterType }) => {
  const handleFilterClick = (filterValue) => {
    setFilterType(filterValue);
  };

  return (
    <div className="projectPageFiltersWrapper">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
          className={cn('filterButton', {
            selectedButton: value === filter.value,
          })}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default ProjectPageFilters;
