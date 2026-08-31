import { useState } from "react";

import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import ProjectGrid from "../components/Project/ProjectGrid";
import ProjectModal from "../components/ProjectModal/ProjectModal";

export default function ProjectsPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);


    // =========================
    // ADD PROJECT
    // =========================

    const handleAddProject = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };


    // =========================
    // VIEW / EDIT PROJECT
    // =========================

    const handleViewProject = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };


    // =========================
    // CLOSE MODAL
    // =========================

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };


    // =========================
    // PROJECT SAVED
    // =========================

    const handleProjectSaved = () => {
        setRefreshTrigger(value => value + 1);
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
                    refreshTrigger={refreshTrigger}
                />

            </main>


            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
                onProjectSaved={handleProjectSaved}
            />

        </div>
    );
}