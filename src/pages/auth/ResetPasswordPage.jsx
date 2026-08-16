import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authAPI } from "../../services/authService";


function ResetPasswordPage() {
    const [params] = useSearchParams();
    const token = params.get("token");

    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            await authAPI.resetPassword({
                token, newPassword: form.password
            });
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2500);
        } catch (err) {
            setError(
                err.response?.data?.message ??
                "Password reset failed."
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
                                Reset Password
                            </h2>

                            {!token &&
                                <Alert variant="danger">
                                    Invalid password reset link.
                                </Alert>
                            }
                            {success &&
                                <Alert variant="success">
                                    Password changed successfully.
                                    <br />
                                    Redirecting to login...
                                </Alert>
                            }
                            {error &&
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            }

                            {!success && token &&
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>New Password</Form.Label>
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
                                        <Form.Label>Confirm Password</Form.Label>
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
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Updating..."
                                                : "Reset Password"}
                                        </Button>
                                    </div>
                                </Form>
                            }
                            <hr />
                            <div className="text-center">
                                <Link to="/login">
                                    Back to Login
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ResetPasswordPage;