import { authAPI } from "../../../services/authService";
import { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";

function ProfilePage() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

 const loadProfile = async () => {
            const data = await authAPI.getUser();
            setForm(prev => ({
                ...prev,
                username: data.username  ?? "",
                email: data.email  ?? ""
            }));
        };



    useEffect(() => {
       
        loadProfile();
    }, []);


    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try{

        const updatedUser = await authAPI.updateProfile({
            username: form.username,
            email: form.email,
            currentPassword: form.currentPassword || null,
            newPassword: form.newPassword || null
        });

        setForm({
    username: updatedUser.username,
    email: updatedUser.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
});
    }catch(err){
        console.log(err);
    }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card>
                        <Card.Body>
                            <h5>Change personal information</h5>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        name="username"
                                        value={form.username ?? ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <br />
                                <hr />
                                <br />

                                <h5>Change password</h5>

                                <Form.Group className="mb-3">
                                    <Form.Label>Current password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="currentPassword"
                                        value={form.currentPassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>New password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="newPassword"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>


                                <Button
                                    type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePage;