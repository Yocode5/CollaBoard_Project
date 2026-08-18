import Header from "../components/Header/Header";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import TaskGrid from "../components/Tasks/TaskGrid";
import TaskCard from "../components/Tasks/TaskCard";

export default function TasksPage() {
    return (
        <div className="tasks-page">
            <Header />
            <main>
                <WelcomeSection />
                <TaskCard />
            </main>
        </div>
    );
}