import { useEffect, useState } from 'react';

import './ProjectGrid.css';

import ProjectCard from './ProjectCard';
import { getProjects } from '../../api/projectApi';

export default function ProjectGrid({ onViewProject, refreshTrigger }) {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const loadProjects = async () => {

            try {
                setLoading(true);
                setError(null);

                const data = await getProjects();

                setProjects(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };

        loadProjects();

    }, [refreshTrigger]);


    if (loading) {
        return <p>Loading projects...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }


    return (
        <section className="project-grid">

            {projects.map((project) => (

                <ProjectCard
                    key={project.id}
                    title={project.title}
                    membersCount={project.members.length}
                    description={project.description}
                    onViewDetails={() => onViewProject(project)}
                />

            ))}

        </section>
    );
}