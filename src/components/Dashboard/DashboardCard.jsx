import './DashboardCard.css';

export default function DashboardCard({ number, label }) {
    return (
        <div className="dashboard-card">
            <span className="dashboard-card__number">{number}</span>
            <span className="dashboard-card__label">{label}</span>
        </div>
    );
}