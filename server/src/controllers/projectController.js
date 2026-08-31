const projectService = require('../services/projectService');


const getAllProjects = (req, res, next) => {
    try {
        const projects = projectService.getAllProjects();

        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        next(error);
    }
};


const getProjectById = (req, res, next) => {
    try {
        const project = projectService.getProjectById(req.params.id);

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};


const createProject = (req, res, next) => {
    try {
        const project = projectService.createProject(req.body);

        res.status(201).json({
            success: true,
            message: 'Project created successfully.',
            data: project
        });
    } catch (error) {
        next(error);
    }
};


const updateProject = (req, res, next) => {
    try {
        const project = projectService.updateProject(
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


const deleteProject = (req, res, next) => {
    try {
        const project = projectService.deleteProject(req.params.id);

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