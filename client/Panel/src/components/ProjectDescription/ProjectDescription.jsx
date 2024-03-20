import './ProjectDescription.scss';

const ProjectDescription = ({ project }) => (
  <div className="projectDescriptionWrapper">
    <h1 className="projectDescriptionTitle">Description</h1>
    <p className="projectCurrentDescription">{project.description}</p>
  </div>
);

export default ProjectDescription;
