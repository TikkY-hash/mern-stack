import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabLabel from '../TabLabel';
import { a11yProps } from '../ProjectsList/utils';
import './ProjectsListTabs.scss';

const ProjectsListTabs = ({ value, handleChange, projects, handleDeleteProject, handleShowModal }) => (
  <Tabs
    orientation="vertical"
    variant="scrollable"
    value={value}
    onChange={handleChange}
    aria-label="Vertical tabs example"
    sx={{
      width: 300,
      height: 'calc(100vh - 210px)',
      borderRight: 1,
      borderColor: 'divider',
    }}
    className="tabs"
  >
    {projects.map((project) => (
      <Tab
        label={
          <TabLabel handleDeleteProject={handleDeleteProject} handleShowModal={handleShowModal} project={project} />
        }
        {...a11yProps(project._id)}
        key={project._id}
        className="tab"
        sx={{
          textTransform: 'none',
          margin: '12px 12px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          transition: 'background-color 0.3s, color 0.3s',
          '&.Mui-selected': {
            backgroundColor: '#e0e0e0',
            color: '#333',
          },
          '&:hover': {
            backgroundColor: '#f5f5f5',
            color: '#333',
          },
        }}
      />
    ))}
  </Tabs>
);

export default ProjectsListTabs;
