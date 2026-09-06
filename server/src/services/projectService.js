const projectRepository = require('../repositories/projectRepository');

const getAllProjects = async () => {
    return await projectRepository.getAllProjects();
};

const getProjectById = async (id) => {
    const project = await projectRepository.getProjectById(id);

    if (!project) {
        const error = new Error('Project not found.');
        error.statusCode = 404;
        throw error;
    }

    return project;
};

const createProject = async (projectData) => {
    return await projectRepository.createProject(projectData);
};

const updateProject = async (id, projectData) => {
    const existingProject = await projectRepository.getProjectById(id);

    if (!existingProject) {
        const error = new Error('Project not found.');
        error.statusCode = 404;
        throw error;
    }

    return await projectRepository.updateProject(id, projectData);
};

const deleteProject = async (id) => {
    const existingProject = await projectRepository.getProjectById(id);

    if (!existingProject) {
        const error = new Error('Project not found.');
        error.statusCode = 404;
        throw error;
    }

    return await projectRepository.deleteProject(id);
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};