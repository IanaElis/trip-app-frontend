import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { authAPI } from "../../services/authService";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");
        try {
            await authAPI.forgotPassword({email});
            setSuccess(true);
        } catch (err) {
            setError( "Unable to send reset email.");
            console.log(err);
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
                                Forgot Password
                            </h2>

                            <p className="text-muted text-center">
                                Enter your email address and we'll send you a password reset link.
                            </p>

                            {success &&
                                <Alert variant="success">
                                    If an account with this email exists, a password reset link has been sent.
                                </Alert>
                            }

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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Sending..." : "Send reset email"}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgotPasswordPage;