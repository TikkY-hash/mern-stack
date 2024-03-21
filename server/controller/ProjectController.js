import ProjectSchema from "../models/ProjectModel.js";

export const createProjectController = async (req, res) => {
  try {
    const doc = new ProjectSchema({
      description: req.body.description,
      title: req.body.title,
      image: req.body.image,
      user: req.userId,
    });

    const project = await doc.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Something going wrong" });
  }
};

export const getProjectsController = async (req, res) => {
  try {
    const { query } = req.query;

    const regex = new RegExp(query, 'i'); // 'i' 

    const projects = await ProjectSchema.find({
      user: req.userId,
      title: { $regex: regex },
    }).select('-tasks -user');

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Something going wrong' });
  }
};

export const getProjectController = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await ProjectSchema.findById(projectId).select("-tasks");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteProjectsController = async (req, res) => {
  try {
    const project = await ProjectSchema.findOneAndDelete({
      _id: req.params.id,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot delete project" });
  }
};

export const updateProjectController = async (req, res) => {
  try {
    const projectId = req.params.id;

    const updateData = req.body;

    const updatedProject = await ProjectSchema.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true },
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
