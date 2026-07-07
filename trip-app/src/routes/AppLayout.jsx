import NavBar from "../components/NavBar/NavBar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <>
            <NavBar />

            <Container fluid className="mt-3">
                <Outlet />
            </Container>
        </>
    );
}

export default AppLayout;