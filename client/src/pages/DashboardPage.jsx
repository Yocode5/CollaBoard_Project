import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import DashboardCard from "../components/Dashboard/DashboardCard";
import ProjectModal from "../components/ProjectModal/ProjectModal";
import { getDashboardStats } from "../api/dashboardApi";

export default function DashboardPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const [stats, setStats] = useState({
        enrolledProjects: 0,
        tasksPending: 0,
        tasksCompleted: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleAddProject = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    useEffect(() => {
        const loadDashboardStats = async () => {
            try {
                setLoading(true);
                setError("");

                const storedUser = localStorage.getItem("user");

                if (!storedUser) {
                    throw new Error("User information not found.");
                }

                const user = JSON.parse(storedUser);

                if (!user.id) {
                    throw new Error("User ID not found.");
                }

                const data = await getDashboardStats(user.id);

                setStats(data);
            } catch (error) {
                console.error("Failed to load dashboard:", error);

                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardStats();
    }, []);

    return (
        <div className="dashboard-page">
            <Header />

            <main className="dashboard-main">

                <WelcomeSection
                    buttonText="Add new Project"
                    onButtonClick={handleAddProject}
                />

                {error && (
                    <p className="error-text">
                        {error}
                    </p>
                )}

                <div className="dashboard-grid">

                    <DashboardCard
                        number={
                            loading
                                ? "..."
                                : stats.enrolledProjects
                        }
                        label="Enrolled Projects"
                    />

                    <DashboardCard
                        number={
                            loading
                                ? "..."
                                : stats.tasksPending
                        }
                        label="Tasks Pending"
                    />

                    <DashboardCard
                        number={
                            loading
                                ? "..."
                                : stats.tasksCompleted
                        }
                        label="Tasks Completed"
                    />

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