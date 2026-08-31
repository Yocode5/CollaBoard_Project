const API_URL = "http://localhost:4000/api/projects";

export const getProjects = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch projects.");
    }

    const result = await response.json();

    return result.data;
};


export const getProject = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch project.");
    }

    const result = await response.json();

    return result.data;
};


export const createProject = async (projectData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
    });

    if (!response.ok) {
        throw new Error("Failed to create project.");
    }

    const result = await response.json();

    return result.data;
};


export const updateProject = async (id, projectData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
    });

    if (!response.ok) {
        throw new Error("Failed to update project.");
    }

    const result = await response.json();

    return result.data;
};


export const deleteProject = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete project.");
    }

    const result = await response.json();

    return result.data;
};