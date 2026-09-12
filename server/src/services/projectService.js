const projectRepository = require('../repositories/projectRepository');
const userRepository = require('../repositories/userRepository');

const validateProjectMembers = async (members = []) => {
    const uniqueMembers = [...new Set(members.map(String))];

    for (const memberId of uniqueMembers) {
        const user = await userRepository.getUserById(memberId);

        if (!user) {
            const error = new Error(
                `User ${memberId} is not a registered user.`
            );
            error.statusCode = 400;
            throw error;
        }
    }

    return uniqueMembers;
};

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
    const validatedMembers = await validateProjectMembers(
        projectData.members || []
    );

    return await projectRepository.createProject({
        ...projectData,
        members: validatedMembers
    });
};

const updateProject = async (id, projectData) => {
    const existingProject = await projectRepository.getProjectById(id);

    if (!existingProject) {
        const error = new Error('Project not found.');
        error.statusCode = 404;
        throw error;
    }

    if (projectData.members !== undefined) {
        projectData.members = await validateProjectMembers(
            projectData.members
        );
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