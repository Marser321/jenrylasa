import React from "react";
import KanbanBoard from "./KanbanBoard";
import { getProjects } from "./actions";

export default async function ProjectsPage() {
    // Server fetch
    const initialProjects = await getProjects();

    return (
        <div className="p-8">
            <KanbanBoard initialProjects={initialProjects} />
        </div>
    );
}
