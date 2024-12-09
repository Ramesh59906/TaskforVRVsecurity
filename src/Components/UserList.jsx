
import React, { useState } from "react";
import { Table, Button, Form, Modal, InputGroup, Container, DropdownButton, Dropdown, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { FaEdit, FaTrash,FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = () => {
    // Load users from localStorage or set an empty array if not found
    const loadUsersFromStorage = () => {
        const storedUsers = JSON.parse(localStorage.getItem("users"));
        return storedUsers ? storedUsers : [];
    };

    const [users, setUsers] = useState(loadUsersFromStorage());
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "", isActive: true });
    const [editingUser, setEditingUser] = useState(null); // Tracks user being edited
    const [editValues, setEditValues] = useState({ name: "", email: "", role: "", isActive: true });
    const [searchQuery, setSearchQuery] = useState(""); // Search query
    const [filteredUser, setFilteredUser] = useState(null); // For search result popup
    const [showModal, setShowModal] = useState(false); // Modal visibility

    // Generate the next ID
    const getNextId = () => {
        return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    };

    // Handle adding a new user
    const handleAddUser = () => {
        if (newUser.name && newUser.email && newUser.role) {
            const newUserWithId = { id: getNextId(), ...newUser };
            const updatedUsers = [...users, newUserWithId];
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            setNewUser({ name: "", email: "", role: "", isActive: false });
            setShowModal(false);
            toast.success("User added successfully!"); 
        } else {
            toast.error("Please fill out all fields."); 
        }
    };


    // Handle editing a user
    const handleEditUser = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setEditingUser(id);
        setEditValues({ name: userToEdit.name, email: userToEdit.email, role: userToEdit.role, isActive: userToEdit.isActive });
    };

    const handleUpdateUser = () => {
        const updatedUsers = users.map((user) =>
            user.id === editingUser ? { ...user, ...editValues } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setEditingUser(null);
        toast.success("User updated successfully!");
    };

    // Handle deleting a user
    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers)); 
        toast.info("User deleted.");
    };

    
    const handleSearch = () => {
        const result = users.find((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUser(result || null);
    };

    return (
        <Container>
            {/* Toast Notifications */}
            <ToastContainer />
            <div className="container">
    <div className="row align-items-center h-50">
        {/* Responsive Heading */}
        <div className="col-12 col-md-10 mb-1">
            <h2 className="text-start p-0 w-100">User Management</h2>
        </div>

        {/* Responsive Button */}
        <div className="col-12 col-md-2 text-md-end text-center">
            <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="mb-3"
            >
                Add User
            </Button>
        </div>
    </div>
    <hr />
</div>

 {/* Search Input */}
 <div className="d-flex justify-content-end mb-3">
                <InputGroup style={{ maxWidth: "400px" }}>
                    <Form.Control
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline-secondary" onClick={handleSearch}>
                        <FaSearch />
                    </Button>
                </InputGroup>
            </div>

            {/* User Table */}
            <Table striped bordered hover responsive className="mt-md-3">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                {editingUser === user.id ? (
                                    <Form.Control
                                        type="text"
                                        value={editValues.name}
                                        onChange={(e) =>
                                            setEditValues({ ...editValues, name: e.target.value })
                                        }
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <Form.Control
                                        type="email"
                                        value={editValues.email}
                                        onChange={(e) =>
                                            setEditValues({ ...editValues, email: e.target.value })
                                        }
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <DropdownButton
                                        title={editValues.role || "Select Role"}
                                        onSelect={(selectedRole) =>
                                            setEditValues({ ...editValues, role: selectedRole })
                                        }
                                    >
                                        <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                                        <Dropdown.Item eventKey="User">User</Dropdown.Item>
                                        <Dropdown.Item eventKey="Moderator">Moderator</Dropdown.Item>
                                    </DropdownButton>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <ToggleButtonGroup
                                        type="radio"
                                        name="status"
                                        value={editValues.isActive ? 1 : 0}
                                        onChange={(val) =>
                                            setEditValues({ ...editValues, isActive: val === 1 })
                                        }
                                    >
                                        <ToggleButton id={`edit-active-${user.id}`} value={1}>Active</ToggleButton>
                                        <ToggleButton id={`edit-inactive-${user.id}`} value={0}>Inactive</ToggleButton>
                                    </ToggleButtonGroup>
                                ) : (
                                    user.isActive ? "Active" : "Inactive"
                                )}
                            </td>

                            <td>
                                {editingUser === user.id ? (
                                    <Button variant="success" onClick={handleUpdateUser}>
                                        Save
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="warning"
                                            className="text-white me-2"
                                            style={{ fontSize: "12px" }}
                                            onClick={() => handleEditUser(user.id)}
                                        >
                                            <FaEdit /> Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteUser(user.id)}
                                            style={{ fontSize: "12px" }}
                                        >
                                            <FaTrash /> Delete
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for adding new user */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <DropdownButton
                                title={newUser.role || "Select Role"}
                                onSelect={(selectedRole) =>
                                    setNewUser({ ...newUser, role: selectedRole })
                                }
                                className="w-100"
                            >
                                <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                                <Dropdown.Item eventKey="User">User</Dropdown.Item>
                                <Dropdown.Item eventKey="Moderator">Moderator</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <ToggleButtonGroup
                                type="radio"
                                name="status"
                                value={newUser.isActive ? 1 : 0}
                                onChange={(val) => setNewUser({ ...newUser, isActive: val === 1 })}
                                className="w-100"
                            >
                                <ToggleButton id="active" value={1}>Active</ToggleButton>
                                <ToggleButton id="inactive" value={0}>Inactive</ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>
                        Add User
                    </Button>
                </Modal.Footer>
            </Modal>

              {/* Search Result Popup */}
              <Modal show={!!filteredUser} onHide={() => setFilteredUser(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {filteredUser ? (
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{filteredUser.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{filteredUser.email}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{filteredUser.role}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{filteredUser.isActive ? "Active" : "Inactive"}</td>
                                </tr>
                            </tbody>
                        </Table>
                    ) : (
                        <p>No user found.</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default UserTable;

