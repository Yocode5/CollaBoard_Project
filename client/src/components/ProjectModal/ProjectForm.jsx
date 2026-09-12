import { useState } from "react";

import {
    createProject,
    updateProject,
    deleteProject
} from "../../api/projectApi";

import { searchUsers } from "../../api/userApi";


export default function ProjectForm({
    project,
    onClose,
    onProjectSaved
}) {

    const storedUser = localStorage.getItem("user");

    let currentUser = null;

    if (storedUser) {
        try {
            currentUser = JSON.parse(storedUser);
        } catch (error) {
            console.error("Failed to read current user:", error);
        }
    }


    const [title, setTitle] = useState(project?.title || "");
    const [startDate, setStartDate] = useState(project?.startDate || "");
    const [endDate, setEndDate] = useState(project?.endDate || "");

    const [description, setDescription] = useState(
        project?.description || ""
    );


    const [memberSearch, setMemberSearch] = useState("");

    const [memberSuggestions, setMemberSuggestions] = useState([]);

    const [members, setMembers] = useState(() => {

        if (project?.members) {
            return project.members;
        }

        if (currentUser) {
            return [
                {
                    id: currentUser.id,
                    name: currentUser.name,
                    email: currentUser.email
                }
            ];
        }

        return [];
    });


    // =========================
    // SEARCH REGISTERED USERS
    // =========================

    const handleMemberSearch = async (event) => {

        const value = event.target.value;

        setMemberSearch(value);

        if (!value.trim()) {
            setMemberSuggestions([]);
            return;
        }

        try {

            const users = await searchUsers(value);

            const filteredUsers = users.filter(
                (user) =>
                    !members.some(
                        (member) => member.id === user.id
                    )
            );

            setMemberSuggestions(filteredUsers);

        } catch (error) {

            console.error("Failed to search users:", error);
            setMemberSuggestions([]);
        }
    };


    // =========================
    // ADD MEMBER
    // =========================

    const handleAddMember = (user) => {

        if (!user) {
            return;
        }

        const alreadyAdded = members.some(
            (member) => member.id === user.id
        );

        if (alreadyAdded) {
            return;
        }

        setMembers([
            ...members,
            user
        ]);

        setMemberSearch("");
        setMemberSuggestions([]);
    };


    // =========================
    // HANDLE ENTER
    // =========================

    const handleMemberKeyDown = (event) => {

        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        if (memberSuggestions.length > 0) {
            handleAddMember(memberSuggestions[0]);
        }
    };


    // =========================
    // REMOVE MEMBER
    // =========================

    const handleRemoveMember = (memberToRemove) => {

        setMembers(
            members.filter(
                (member) => member.id !== memberToRemove.id
            )
        );
    };


    // =========================
    // CREATE / UPDATE PROJECT
    // =========================

    const handleSubmit = async (event) => {

        event.preventDefault();

        const projectData = {
            title,
            startDate,
            endDate,
            members: members.map((member) => member.id),
            description
        };

        try {

            if (project) {

                await updateProject(
                    project.id,
                    projectData
                );

            } else {

                await createProject(projectData);

            }

            onProjectSaved();
            onClose();

        } catch (error) {

            console.error(error);
        }
    };


    // =========================
    // DELETE PROJECT
    // =========================

    const handleDelete = async () => {

        if (!project) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteProject(project.id);

            onProjectSaved();
            onClose();

        } catch (error) {

            console.error(error);
        }
    };


    return (
        <form
            className="project-form"
            onSubmit={handleSubmit}
        >

            {/* =========================
                PROJECT TITLE
            ========================= */}

            <div className="project-form__field">

                <label htmlFor="project-title">
                    Project Title
                </label>

                <input
                    id="project-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    required
                />

            </div>


            {/* =========================
                DATES
            ========================= */}

            <div className="project-form__dates">

                <div className="project-form__field">

                    <label htmlFor="start-date">
                        Start Date
                    </label>

                    <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(event) =>
                            setStartDate(event.target.value)
                        }
                    />

                </div>


                <div className="project-form__field">

                    <label htmlFor="end-date">
                        End Date
                    </label>

                    <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(event) =>
                            setEndDate(event.target.value)
                        }
                    />

                </div>

            </div>


            {/* =========================
                ADD MEMBERS
            ========================= */}

            <div className="project-form__field">

                <label htmlFor="member-search">
                    Add Members
                </label>

                <input
                    id="member-search"
                    type="text"
                    value={memberSearch}
                    onChange={handleMemberSearch}
                    onKeyDown={handleMemberKeyDown}
                    placeholder="Search by name or email"
                    autoComplete="off"
                />


                {/* =========================
                    USER SUGGESTIONS
                ========================= */}

                {memberSuggestions.length > 0 && (

                    <div className="project-form__suggestions">

                        {memberSuggestions.map((user) => (

                            <button
                                type="button"
                                className="project-form__suggestion"
                                key={user.id}
                                onClick={() =>
                                    handleAddMember(user)
                                }
                            >

                                <span>
                                    {user.name}
                                </span>

                                <small>
                                    {user.email}
                                </small>

                            </button>

                        ))}

                    </div>

                )}

            </div>


            {/* =========================
                MEMBER CHIPS
            ========================= */}

            {members.length > 0 && (

                <div className="project-form__members">

                    {members.map((member) => (

                        <div
                            className="project-form__member"
                            key={member.id}
                        >

                            <span>
                                {member.name}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    handleRemoveMember(member)
                                }
                                aria-label={`Remove ${member.name}`}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                        </div>

                    ))}

                </div>

            )}


            {/* =========================
                DESCRIPTION
            ========================= */}

            <div className="project-form__field project-form__field--description">

                <label htmlFor="project-description">
                    Description
                </label>

                <textarea
                    id="project-description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />

            </div>


            {/* =========================
                ACTIONS
            ========================= */}

            <div className="project-form__actions">

                <button
                    type="submit"
                    className="project-form__button project-form__button--create"
                >
                    {project ? "Save" : "Create"}
                </button>


                {project ? (

                    <button
                        type="button"
                        className="project-form__button project-form__button--cancel"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                ) : (

                    <button
                        type="button"
                        className="project-form__button project-form__button--cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                )}

            </div>

        </form>
    );
}