import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";


function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    function handleChange(e) {
        setForm({
            ...form, [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;

        }

        setLoading(true);

        try {
            await register({
                username: form.username,
                email: form.email,
                password: form.password
            });

            navigate("/login");

        } catch (err) {
            setError(
                err.response?.data?.message ??
                "Registration failed."
            );

        } finally {
            setLoading(false);
        }

    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                Register
                            </h2>

                            {error &&
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            }

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        minLength={8}
                                        maxLength={64}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Confirm password
                                    </Form.Label>

                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        minLength={8}
                                        maxLength={64}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button
                                        type="submit"
                                        disabled={loading} >
                                        {loading ? "Creating account..." : "Register"}
                                    </Button>
                                </div>
                            </Form>
                            <hr />
                            <div className="text-center">
                                Already have an account?
                                <br />
                                <Link to="/login">
                                    Login
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

export default RegisterPage;