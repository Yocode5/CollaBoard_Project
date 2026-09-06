import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TaskPage from "./pages/TaskPage";

function App() {
    const currentPath = window.location.pathname;

    if (currentPath === "/register") {
        return <RegisterPage />;
    }

    if (currentPath === "/projects") {
        return <ProjectsPage />;
    }

    if (currentPath === "/tasks") {
        return <TaskPage />;
    }

    if (currentPath === "/dashboard") {
        return <DashboardPage />;
    }

    return <LoginPage />;
}

export default App;