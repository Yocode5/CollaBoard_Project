const Project = require('../models/Project');

const getAllProjects = async () => {
    return await Project.find().sort({ createdAt: -1 });
};

const getProjectById = async (id) => {
    return await Project.findById(id);
};

const createProject = async (projectData) => {
    const project = new Project(projectData);

    return await project.save();
};

const updateProject = async (id, projectData) => {
    return await Project.findByIdAndUpdate(
        id,
        projectData,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteProject = async (id) => {
    return await Project.findByIdAndDelete(id);
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};