import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../../context/UserContext';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    navigate('/complaints');
  };

  const checkUserAndNavigate = () => {
    if (user) {
      navigate('/file-complaint');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="w-100"
      >
        <Container>
          <Navbar.Brand
            className="logo"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
            }}
          >
            <img
              src="./icons/logo-no-bg.png"
              alt="zalba.mk"
              style={{ width: 120 }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="w-100 mr-lg-auto align-items-center">
              <Link to="/complaints" className="nav-link">
                Поплаки
              </Link>
              <Link to="/brands" className="nav-link">
                Брендови
              </Link>
              <div className="d-flex ml-lg-auto align-items-center flex-wrap flex-lg-row flex-column text-lg-left text-center">
                {user && user.payload ? (
                  <div className="d-flex flex-column flex-lg-row align-items-center">
                    {user.payload.role === 'ADMIN' && (
                      <Link to="/dashboard" className="nav-link">
                        Админ
                      </Link>
                    )}
                    <span onClick={(e) => handleLogout(e)} className="nav-link">
                      Одјави се
                    </span>
                    <Link to="/user" className="nav-link">
                      Профил
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column flex-lg-row align-items-center">
                    <Link to="/login" className="nav-link">
                      Најави се
                    </Link>
                    <Link to="/signup" className="nav-link">
                      Регистрирај се
                    </Link>
                  </div>
                )}
                <div className="actions mt-3 mt-lg-0">
                  <button
                    className="file-complaint-btn"
                    style={{
                      width: 180,
                      textAlign: 'center',
                      backgroundColor: '#2563eb',
                    }}
                    onClick={checkUserAndNavigate}
                  >
                    + Додај поплака
                  </button>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
