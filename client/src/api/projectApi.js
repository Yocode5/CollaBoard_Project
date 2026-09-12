const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/projects`;

const formatMember = (member) => {
    if (typeof member === "string") {
        return {
            id: member,
            name: member,
            email: ""
        };
    }

    return {
        id: member._id || member.id,
        name: member.name || "",
        email: member.email || ""
    };
};

const formatProject = (project) => {
    return {
        ...project,
        id: project._id,
        members: (project.members || []).map(formatMember)
    };
};

export const getProjects = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch projects.");
    }

    const result = await response.json();

    return result.data.map(formatProject);
};

export const getProject = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch project.");
    }

    const result = await response.json();

    return formatProject(result.data);
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
        const result = await response.json().catch(() => null);

        throw new Error(
            result?.message || "Failed to create project."
        );
    }

    const result = await response.json();

    return formatProject(result.data);
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
        const result = await response.json().catch(() => null);

        throw new Error(
            result?.message || "Failed to update project."
        );
    }

    const result = await response.json();

    return formatProject(result.data);
};

export const deleteProject = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const result = await response.json().catch(() => null);

        throw new Error(
            result?.message || "Failed to delete project."
        );
    }

    const result = await response.json();

    return formatProject(result.data);
};