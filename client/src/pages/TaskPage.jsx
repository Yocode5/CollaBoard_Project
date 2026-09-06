import { useState } from "react";

import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import TaskGrid from "../components/Tasks/TaskGrid";
import TaskModal from "../components/TaskModal/TaskModal";

export default function TasksPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Get the project ID from:
    // /tasks?projectId=xxxxxxxx
    const projectId = new URLSearchParams(
        window.location.search
    ).get("projectId");

    // =========================
    // ADD TASK
    // =========================

    const handleAddTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    // =========================
    // VIEW / EDIT TASK
    // =========================

    const handleViewTask = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    // =========================
    // CLOSE MODAL
    // =========================

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="tasks-page">

            <Header />

            <main>

                <WelcomeSection
                    sectionName="Tasks"
                    buttonText="Add new Task"
                    onButtonClick={handleAddTask}
                />

                <TaskGrid
                    onViewTask={handleViewTask}
                    projectId={projectId}
                />

            </main>

            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                task={selectedTask}
                projectId={projectId}
            />

        </div>
    );
}