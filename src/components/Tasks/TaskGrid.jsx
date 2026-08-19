import React from 'react';
import TaskCard from './TaskCard';
import { mockTasks } from '../../data/mockTasks';

export default function TaskGrid() {
    return (
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
            {mockTasks.map((task) => (
                <TaskCard 
                    key={task.id}
                    title={task.title}
                    status={task.status}
                    assignee={task.assignee}
                    dueDate={task.dueDate}
                    onViewDetails={() => console.log(task.id)}
                />
            ))}
        </section>
    );
}