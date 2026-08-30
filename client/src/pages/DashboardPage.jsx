import { useState } from "react";
import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import DashboardCard from "../components/Dashboard/DashboardCard";
import ProjectModal from "../components/ProjectModal/ProjectModal";
// import './DashboardPage.css';

export default function DashboardPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleAddProject = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="dashboard-page">
            <Header />

            <main className="dashboard-main">
                <WelcomeSection
                    buttonText="Add new Project"
                    onButtonClick={handleAddProject}
                />

                <div className="dashboard-grid">
                    <DashboardCard number="14" label="Enrolled Projects" />
                    <DashboardCard number="05" label="Tasks Pending" />
                    <DashboardCard number="10" label="Tasks Completed" />
                </div>
            </main>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
            />
        </div>
    );
}