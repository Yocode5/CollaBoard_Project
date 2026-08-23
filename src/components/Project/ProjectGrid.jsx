import './ProjectGrid.css';

import ProjectCard from './ProjectCard';
import mockProjects from '../../data/mockProjects';

export default function ProjectGrid({ onViewProject }) {

    return (
        <section className="project-grid">

            {mockProjects.map((project) => (

                <ProjectCard
                    key={project.id}
                    title={project.title}
                    membersCount={project.membersCount}
                    description={project.description}
                    onViewDetails={() => onViewProject(project)}
                />

            ))}

        </section>
    );
}