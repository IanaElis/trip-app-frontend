import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { adminApi } from "../../services/adminService";
import useAuth from "../../hooks/useAuth";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser} = useAuth();

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const data = await adminApi.getUsers();
        setUsers(data);
        setLoading(false);
    }

    async function toggleBlock(user) {
        console.log("toggleBlock input:", user);
        if (user.id === currentUser.id) return;
         if (user.blocked) {
        await adminApi.unblockUser(user.id);
    } else {
        await adminApi.blockUser(user.id);
    }
        loadUsers();
    }


    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2>Users</h2>

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
                    {users.map(user => (
                        <tr key={user.id}
                        className={user.id === currentUser.id ? "user-row-disabled" : ""}
                        style={{opacity: 0.6, pointerEvents: none}}>
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