const projectService = require('../services/projectService');

const getAllProjects = async (req, res, next) => {
    try {
        const projects = await projectService.getAllProjects();

        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        next(error);
    }
};

const getProjectById = async (req, res, next) => {
    try {
        const project = await projectService.getProjectById(req.params.id);

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};

const createProject = async (req, res, next) => {
    try {
        const project = await projectService.createProject(req.body);

        res.status(201).json({
            success: true,
            message: 'Project created successfully.',
            data: project
        });
    } catch (error) {
        next(error);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const project = await projectService.updateProject(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: 'Project updated successfully.',
            data: project
        });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const project = await projectService.deleteProject(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully.',
            data: project
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};