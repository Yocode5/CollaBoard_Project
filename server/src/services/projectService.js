const projectRepository = require('../repositories/projectRepository');


const getAllProjects = () => {
    return projectRepository.getAllProjects();
};


const getProjectById = (id) => {
    const project = projectRepository.getProjectById(id);

    if (!project) {
        const error = new Error('Project not found.');
        error.statusCode = 404;
        throw error;
    }

    return project;
};


const createProject = (projectData) => {
    return projectRepository.createProject(projectData);
};


const updateProject = (id, projectData) => {
    const existingProject = projectRepository.getProjectById(id);

    if (!existingProject) {
        const error = new Error('Project not found.');
        error.statusCode = 404;
        throw error;
    }

    return projectRepository.updateProject(id, projectData);
};


const deleteProject = (id) => {
    const existingProject = projectRepository.getProjectById(id);

    if (!existingProject) {
        const error = new Error('Project not found.');
        error.statusCode = 404;
        throw error;
    }

    return projectRepository.deleteProject(id);
};


module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};