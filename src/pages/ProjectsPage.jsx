import { useState } from "react";

import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import ProjectGrid from "../components/Project/ProjectGrid";
import ProjectModal from "../components/ProjectModal/ProjectModal";

export default function ProjectsPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);


    const handleAddProject = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };


    const handleViewProject = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };


    return (
        <div className="projects-page">

            <Header />

            <main>

                <WelcomeSection
                    sectionName="Projects"
                    buttonText="Add new Project"
                    onButtonClick={handleAddProject}
                />


                <ProjectGrid
                    onViewProject={handleViewProject}
                />

            </main>


            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
            />

        </div>
    );
}