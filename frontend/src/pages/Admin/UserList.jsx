import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";
import {
    useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation
} from "../../redux/api/UserApiSlice";
import Message from "../../component/Message";

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUsername, setEditableUsername] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className="flex justify-center py-12 px-4 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">User List</h2>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger" className="text-center mb-4">
                        {error?.data?.message || error.message}
                    </Message>
                ) : (
                    <table className="w-full border border-gray-300 rounded-md overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-5 py-3 border-b border-gray-300 text-left text-gray-700 font-medium">ID</th>
                                <th className="px-5 py-3 border-b border-gray-300 text-left text-gray-700 font-medium">Name</th>
                                <th className="px-5 py-3 border-b border-gray-300 text-left text-gray-700 font-medium">Email</th>
                                <th className="px-5 py-3 border-b border-gray-300 text-center text-gray-700 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-5 py-3 border-b border-gray-300 text-sm text-gray-600">{user._id}</td>
                                        <td className="px-5 py-3 border-b border-gray-300 text-sm text-gray-600">{user.username}</td>
                                        <td className="px-5 py-3 border-b border-gray-300 text-sm text-gray-600">{user.email}</td>
                                        <td className="px-5 py-3 border-b border-gray-300 text-center space-x-4">
                                            <button
                                                className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                                onClick={() => {
                                                    setEditableUserId(user._id);
                                                    setEditableUsername(user.username);
                                                    setEditableUserEmail(user.email);
                                                }}
                                                aria-label="Edit user"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                                onClick={() => deleteUser(user._id).unwrap()
                                                    .then(() => toast.success('User deleted'))
                                                    .catch(err => toast.error(err.data.message || err.message))}
                                                aria-label="Delete user"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserList;
