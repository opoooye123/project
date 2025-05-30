import { useState } from 'react';
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

    const toggleDropDown = () => setDropDownOpen(!dropDownOpen);
    const closeDropDown = () => setDropDownOpen(false);

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
        <div
            style={{ zIndex: 999 }}
            className="sidebar-container"
            id="navigation-container"
            onClick={closeDropDown} // close dropdown when clicking outside button/dropdown
        >
            <div className="nav-links">
                <Link to="/" className="nav-link" onClick={closeDropDown}>
                    <AiOutlineHome className="nav-icon" size={26} />
                    <span className="nav-item-name">Home</span>
                </Link>
                <Link to="/shop" className="nav-link" onClick={closeDropDown}>
                    <AiOutlineShop className="nav-icon" size={26} />
                    <span className="nav-item-name">Shop</span>
                </Link>
                <Link to="/favorite" className="nav-link" onClick={closeDropDown}>
                    <FaHeart className="nav-icon" size={26} />
                    <span className="nav-item-name">Favorite</span>
                </Link>
            </div>

            {userInfo ? (
                <div
                    className="user-area"
                    onClick={e => e.stopPropagation()} // prevent sidebar onClick closing dropdown when clicking here
                >
                    {/* Dropdown appears above the button */}
                    {dropDownOpen && (
                        <ul className="dropdown-menu-above">
                            {userInfo.isAdmin && (
                                <>
                                    <li>
                                        <Link to="/admin/dashboard" className="dropdown-item">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/productlist" className="dropdown-item">
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/categorylist" className="dropdown-item">
                                            Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/orderlist" className="dropdown-item">
                                            Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/userlist" className="dropdown-item">
                                            Users
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link to="/profile" className="dropdown-item">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button onClick={logoutHandler} className="dropdown-item">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )}

                    <button
                        onClick={toggleDropDown}
                        className="username-button flex items-center px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
                    >
                        <span className="mr-2">{userInfo.username}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 transition-transform duration-200 ${dropDownOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                </div>
            ) : (
                <ul className="auth-links">
                    <li>
                        <Link to="/login" className="nav-link" onClick={closeDropDown}>
                            <AiOutlineLogin className="nav-icon" size={26} />
                            <span className="nav-item-name">Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="nav-link" onClick={closeDropDown}>
                            <AiOutlineUserAdd className="nav-icon" size={26} />
                            <span className="nav-item-name">Register</span>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Navigation;
