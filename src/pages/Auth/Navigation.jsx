import { useState, useEffect, useRef } from 'react';
import { AiOutlineHome, AiOutlineShop, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/UserApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import "./Navigation.css";

const Navigation = () => {
    const { userInfo } = useSelector(state => state.auth);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const sidebarRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setDropDownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropDown = () => setDropDownOpen(prev => !prev);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <nav ref={sidebarRef} className={`sidebar-container`}>
            <div className="nav-links">
                <Link to="/" className="nav-link" title="Home">
                    <AiOutlineHome className="nav-icon" size={26} />
                    <span className="nav-item-name">Home</span>
                </Link>
                <Link to="/shop" className="nav-link" title="Shop">
                    <AiOutlineShop className="nav-icon" size={26} />
                    <span className="nav-item-name">Shop</span>
                </Link>
                <Link to="/favorite" className="nav-link" title="Favorite">
                    <FaHeart className="nav-icon" size={26} />
                    <span className="nav-item-name">Favorite</span>
                </Link>
            </div>

            {userInfo ? (
                <div className="user-area">
                    <button
                        onClick={toggleDropDown}
                        className="username-button"
                        aria-haspopup="true"
                        aria-expanded={dropDownOpen}
                        aria-label="User menu"
                    >
                        <span>{userInfo.username}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`dropdown-arrow ${dropDownOpen ? 'rotate' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropDownOpen && (
                        <ul className="dropdown-menu-above">
                            {userInfo.isAdmin && (
                                <>
                                    <li><Link to="/admin/dashboard" className="dropdown-item">Dashboard</Link></li>
                                    <li><Link to="/admin/productlist" className="dropdown-item">Products</Link></li>
                                    <li><Link to="/admin/categorylist" className="dropdown-item">Category</Link></li>
                                    <li><Link to="/admin/orderlist" className="dropdown-item">Orders</Link></li>
                                    <li><Link to="/admin/userlist" className="dropdown-item">Users</Link></li>
                                </>
                            )}
                            <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                            <li><button onClick={logoutHandler} className="dropdown-item">Logout</button></li>
                        </ul>
                    )}
                </div>
            ) : (
                <ul className="auth-links">
                    <li>
                            <Link to="/login" className="nav-link">
                            <AiOutlineLogin className="nav-icon" size={26} />
                            <span className="nav-item-name">Login</span>
                        </Link>
                    </li>
                    <li>
                            <Link to="/register" className="nav-link">
                            <AiOutlineUserAdd className="nav-icon" size={26} />
                            <span className="nav-item-name">Register</span>
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navigation;
