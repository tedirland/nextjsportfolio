import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
const AppLink = ({ children, className, href }) => (
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>
);
function AppNavbar() {
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink className="mr-3 font-weight-bold navbar-brand" href="/">
          TedIrland
        </AppLink>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/portfolios" className="nav-link mr-3">
              Portfolios
            </AppLink>
            <AppLink href="/forum/categories" className="nav-link mr-3">
              Forum
            </AppLink>
            <AppLink href="/cv" className="nav-link mr-3">
              Cv
            </AppLink>
          </Nav>
          <Nav>
            <AppLink href="/register" className="nav-link mr-3">
              Sign Up
            </AppLink>
            <AppLink
              href="/login"
              className="mr-3 btn btn-success bg-green-2 bright"
            >
              Sign In
            </AppLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
