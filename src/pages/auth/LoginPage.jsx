import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import {extractErrorMessage} from "../../utils/extractErrorMessage";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");
        try {
            await login(form);
            navigate("/trips");
        } catch (err) {
            if(err.response?.status === 401) setError("Invalid email or password.");
            else if(err.response?.status === 403) setError("Your account is blocked");
            else if(err.response?.status === 429) setError("Too many failed login attempts. Try again in 10 minutes");
            else setError(extractErrorMessage(err, "Error"));
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
                                Login
                            </h2>

                            {error &&
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            }

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button
                                        type="submit"
                                        disabled={loading}>
                                        {loading ? "Logging in..." : "Login"}
                                    </Button>
                                </div>
                            </Form>

                            <div className="mt-3 text-center">
                                <Link to="/forgot-password">
                                    Forgot password?
                                </Link>
                            </div>
                            <hr />
                            <div className="text-center">
                                Don't have an account?
                                <br />
                                <Link to="/register">
                                    Register
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;