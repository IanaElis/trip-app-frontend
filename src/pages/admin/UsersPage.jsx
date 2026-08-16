import { useEffect, useState, useMemo } from "react";
import { Table, Button, Form, Spinner } from "react-bootstrap";
import { adminApi } from "../../services/adminService";
import useAuth from "../../hooks/useAuth";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useAuth();
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    async function loadUsers() {
        try {
            const data = await adminApi.getUsers();
            setUsers(data);
        } finally {
            setLoading(false);
        }
    }

    async function toggleBlock(user) {
        if (user.id === currentUser.id) return;
        if (user.blocked) {
            await adminApi.unblockUser(user.id);
        } else {
            await adminApi.blockUser(user.id);
        }
        loadUsers();
    }


    if (loading) return  <Spinner animation="border" className="align-center" />;



    return (
        <div className="p-4">
            <h2>Users</h2>

            <Form className="mb-3 d-flex justify-content-end">
                <Form.Control
                    style={{ maxWidth: "400px" }}
                    type="text"
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Form>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}
                            className={user.id === currentUser.id ? "user-row-disabled" : ""}
                        >
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>

                            <td>
                                {user.blocked ? "Blocked" : "Active"}
                            </td>

                            <td>
                                <Button
                                    size="sm"
                                    variant={user.blocked ? "success" : "danger"}
                                    disabled={user.id === currentUser.id}
                                    onClick={() => toggleBlock(user)}
                                >
                                    {user.blocked ? "Unblock" : "Block"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UsersPage;