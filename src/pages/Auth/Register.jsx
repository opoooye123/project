import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApiSlice";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
        navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        toast.error("Password do not match");
    } else {
        try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
          toast.success("User successfully registered");
      } catch (error) {
            toast.error(error?.data?.message || error.error || "Failed to register");
            console.log(error);
        }
    }
  };

    return (
      <section className="flex items-start justify-center min-h-screen p-10 gap-10 bg-gray-900">
          {/* Form container */}
          <div className="w-full max-w-md">
              <h1 className="text-2xl font-semibold mb-4 text-white">Register</h1>

              <form
                  onSubmit={submitHandler}
                  className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                  {/* Username */}
                  <div>
                      <label
                          htmlFor="username"
                          className="block text-sm font-medium text-white mb-1"
                      >
                          Username
                      </label>
                      <input
                          type="text"
                          id="username"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                          required
                      />
                  </div>

                  {/* Email */}
                  <div>
                      <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white mb-1"
                      >
                          Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                          required
                      />
                  </div>

                  {/* Password */}
                  <div>
                      <label
                          htmlFor="password"
                          className="block text-sm font-medium text-white mb-1"
                      >
                          Password
                      </label>
                      <input
                          type="password"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                          required
                      />
                  </div>

                  {/* Confirm Password */}
                  <div>
                      <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-white mb-1"
                      >
                          Confirm Password
                      </label>
                      <input
                          type="password"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                          required
                      />
                  </div>

                  <button
                      disabled={isLoading}
                      type="submit"
                      className="w-full bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600 disabled:opacity-50"
                  >
                      {isLoading ? "Registering..." : "Register"}
                  </button>

                  {isLoading && <Loader />}
              </form>

              <div className="mt-4 text-white">
                  <p>
                      Already a customer?{" "}
                      <Link
                          to={redirect ? `/login?redirect=${redirect}` : "/login"}
                          className="text-pink-500 hover:underline"
                      >
                          Login
                      </Link>
                  </p>
              </div>
          </div>

          {/* Image container */}
          <div className="hidden md:block md:w-1/2">
              <img
                  src="https://img.freepik.com/premium-vector/letter-d-with-red-heart-monogram-d-heart-icon_302321-2755.jpg?semt=ais_hybrid&w=740"
                  alt="Heart Monogram"
                  className="rounded-lg object-contain max-h-[500px] w-full"
              />
          </div>
      </section>
    );
};

export default Register;
