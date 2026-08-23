//import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
//import TaskPage from "./pages/TaskPage";

function App() {
    const currentPath = window.location.pathname;

    if (currentPath === "/projects") {
        return <ProjectsPage />;
    }

    return <DashboardPage />;
}

export default App;