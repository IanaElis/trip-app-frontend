import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Bell, PersonCircle } from "react-bootstrap-icons";

function NavBar() {
    const { isAdmin, logout, user } = useAuth();

    return (
        <Navbar variant="dark" expand="lg" style={{background: 
            "linear-gradient(90deg, #1e3c72, #2a5298)"}}>
            <Container fluid style={{}}>

                <Navbar.Brand className="fw-bold">
                    TripPlanner
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse className="align-items-center justify-content-center">

                    <Nav className="me-auto ms-4">
                        {isAdmin ? (
                            <Nav.Link as={Link} to="/users">
                                Users
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/trips">
                                Trips
                            </Nav.Link>
                        )}
                    </Nav>

                    <Nav className="ms-auto align-items-center">
 {/*                       <Nav.Link as={Link} to="/notifications"
                            className="d-flex align-items-center gap-1">
                            <Bell size={20} />
                            <span className="d-lg-none">
                                Notifications
                            </span>
                            <Badge bg="danger" pill>
                                3</Badge>
                        </Nav.Link>
*/}
                        <NavDropdown
                            title={<>
                                <PersonCircle className="me-2" size={22} />
                                {user?.username}
                            </>
                            }
                            align="end"
                        >
                            <NavDropdown.Item as={Link} to="/profile">
                                Profile
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item onClick={logout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>

                    </Nav>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default NavBar;