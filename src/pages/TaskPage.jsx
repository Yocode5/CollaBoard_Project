import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import TaskGrid from "../components/Tasks/TaskGrid";

export default function TasksPage() {
    return (
        <div className="tasks-page">
            <Header />
            <main>
                <WelcomeSection />
                <TaskGrid />
            </main>
        </div>
    );
}