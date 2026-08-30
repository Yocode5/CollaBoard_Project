import { useState } from "react";

import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import TaskGrid from "../components/Tasks/TaskGrid";
import TaskModal from "../components/TaskModal/TaskModal";

export default function TasksPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);


    // Open an empty modal for creating a new task
    const handleAddTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };


    // Open the modal with an existing task
    const handleViewTask = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };


    // Close the modal
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
                />

            </main>


            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                task={selectedTask}
            />

        </div>
    );
}