import { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const AppNavbar: FC = () => {

    return <>
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Task 5</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>

                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default AppNavbar;