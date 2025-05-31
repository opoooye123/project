import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/UserApiSlice";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] =
        useProfileMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username || "");
            setEmail(userInfo.email || "");
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
      }

      try {
        const res = await updateProfile({
            _id: userInfo._id,
            username,
            email,
            password,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        setPassword("");
        setConfirmPassword("");
    } catch (err) {
        toast.error(err?.data?.message || "Failed to update profile");
        console.error(err);
    }
  };

    return (
        <section className="min-h-screen bg-gray-900 p-10 flex justify-center items-start">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-white text-center">
                    Update Profile
                </h2>

              <form onSubmit={submitHandler} className="space-y-5">
                  {/* Username */}
                  <div>
                      <label className="block text-white mb-2">Name</label>
                      <input
                          type="text"
                          placeholder="Enter name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                          required
                      />
                  </div>

                  {/* Email */}
                  <div>
                      <label className="block text-white mb-2">Email</label>
                      <input
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                          required
                      />
                  </div>

                  {/* Password */}
                  <div>
                      <label className="block text-white mb-2">Password</label>
                      <input
                          type="password"
                          placeholder="Enter new password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                      />
                  </div>

                  {/* Confirm Password */}
                  <div>
                      <label className="block text-white mb-2">Confirm Password</label>
                      <input
                          type="password"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                      />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between items-center">
                      <button
                          type="submit"
                          disabled={loadingUpdateProfile}
                          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded disabled:opacity-50"
                      >
                          {loadingUpdateProfile ? "Updating..." : "Update"}
                      </button>

                      <Link
                          to="/user-orders"
                          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
                      >
                          My Orders
                      </Link>
                  </div>

                  {loadingUpdateProfile && <Loader />}
              </form>
          </div>
        </section>
    );
};

export default Profile;
