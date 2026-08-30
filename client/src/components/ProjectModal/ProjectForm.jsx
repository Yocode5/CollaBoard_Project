import { useState } from "react";

export default function ProjectForm({ project, onClose }) {

    const [title, setTitle] = useState(project?.title || "");
    const [startDate, setStartDate] = useState(project?.startDate || "");
    const [endDate, setEndDate] = useState(project?.endDate || "");
    const [description, setDescription] = useState(
        project?.description || ""
    );

    const [memberSearch, setMemberSearch] = useState("");

    const [members, setMembers] = useState(
        project?.members || []
    );


    // =========================
    // ADD MEMBER
    // =========================

    const handleAddMember = (event) => {

        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        const member = memberSearch.trim();

        if (!member) {
            return;
        }

        // Prevent duplicate members
        if (members.includes(member)) {
            setMemberSearch("");
            return;
        }

        setMembers([...members, member]);
        setMemberSearch("");
    };


    // =========================
    // REMOVE MEMBER
    // =========================

    const handleRemoveMember = (memberToRemove) => {

        setMembers(
            members.filter(member => member !== memberToRemove)
        );

    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = (event) => {

        event.preventDefault();

        const projectData = {
            title,
            startDate,
            endDate,
            members,
            description
        };

        console.log(
            project ? "Edit project:" : "Create project:",
            projectData
        );

        onClose();
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
                    onChange={(event) => setTitle(event.target.value)}
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
                    onChange={(event) =>
                        setMemberSearch(event.target.value)
                    }
                    onKeyDown={handleAddMember}
                    placeholder=""
                />

            </div>


            {/* =========================
                MEMBER CHIPS
            ========================= */}

            {members.length > 0 && (

                <div className="project-form__members">

                    {members.map((member) => (

                        <div
                            className="project-form__member"
                            key={member}
                        >

                            <span>
                                {member}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    handleRemoveMember(member)
                                }
                                aria-label={`Remove ${member}`}
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

                <button
                    type="button"
                    className="project-form__button project-form__button--cancel"
                    onClick={onClose}
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}