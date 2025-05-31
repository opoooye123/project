import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

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

      try {
          const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
    } catch (error) {
        toast.error(error?.data?.message || error.message || "Failed to sign in");
    }
    };

    return (
      <section className="flex items-start justify-center min-h-screen p-10 gap-10 bg-gray-900">
          {/* Form container */}
          <div className="w-full max-w-md">
              <h1 className="text-2xl font-semibold mb-4 text-white">Sign In</h1>

              <form
                  onSubmit={submitHandler}
                  className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                  {/* Email */}
                  <div>
                      <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white mb-1"
                      >
                          Email Address
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

                  <button
                      disabled={isLoading}
                      type="submit"
                      className="w-full bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600 disabled:opacity-50"
                  >
                      {isLoading ? "Signing in..." : "Sign in"}
                  </button>

                  {isLoading && <Loader />}
              </form>

              <div className="mt-4 text-white">
                  <p>
                      New Customer?{" "}
                      <Link
                          to={redirect ? `/register?redirect=${redirect}` : "/register"}
                          className="text-pink-500 hover:underline"
                      >
                          Register
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

export default Login;
