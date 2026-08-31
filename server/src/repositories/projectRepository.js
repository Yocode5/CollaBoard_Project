let projects = [
    {
        id: 1,
        title: 'Project 1',
        members: [
            'Yomith',
            'Yasith',
            'Sahseena',
            'Naduntha',
            'Samadhi'
        ],
        startDate: '2026-08-01',
        endDate: '2026-09-30',
        description:
            'Core ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.'
    },

    {
        id: 2,
        title: 'Project 2',
        members: [
            'Yomith',
            'Yasith',
            'Sahseena',
            'Naduntha',
            'Samadhi',
            'Dulina',
            'Zahin',
            'Member 8'
        ],
        startDate: '2026-08-05',
        endDate: '2026-10-15',
        description:
            'Core ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.'
    },

    {
        id: 3,
        title: 'Project 3',
        members: [
            'Yomith',
            'Dulina',
            'Zahin',
            'Member 4'
        ],
        startDate: '2026-08-10',
        endDate: '2026-09-25',
        description:
            'Core ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.'
    }
];


const getAllProjects = () => {
    return projects;
};


const getProjectById = (id) => {
    return projects.find(project => project.id === Number(id));
};


const createProject = (projectData) => {
    const newProject = {
        id: projects.length > 0
            ? Math.max(...projects.map(project => project.id)) + 1
            : 1,
        ...projectData
    };

    projects.push(newProject);

    return newProject;
};


const updateProject = (id, projectData) => {
    const index = projects.findIndex(
        project => project.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    projects[index] = {
        ...projects[index],
        ...projectData,
        id: projects[index].id
    };

    return projects[index];
};


const deleteProject = (id) => {
    const index = projects.findIndex(
        project => project.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedProject = projects[index];

    projects.splice(index, 1);

    return deletedProject;
};


module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};