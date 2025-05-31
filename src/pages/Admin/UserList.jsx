import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";

import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
} from '../../redux/api/userApiSlice'

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

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUser(id).unwrap();
                toast.success("User deleted successfully");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err?.error || "Delete failed");
            }
        }
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUsername(username);
        setEditableUserEmail(email);
    };

    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUsername,
                email: editableUserEmail,
            }).unwrap();

            toast.success("User updated successfully");
            setEditableUserId(null);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err?.error || "Update failed");
        }
    };

    return (
        <div className="p-4 flex">
            {isLoading ? (
                <Loader />
            ) : error ? (
                    <Message variant="danger">
                        {error?.data?.message || error.message}
                    </Message>
                ) : (
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Admin</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{user._id}</td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableUsername}
                                                    onChange={(e) =>
                                                        setEditableUsername(e.target.value)
                                                    }
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.username}
                                                <button
                                                        onClick={() =>
                                                            toggleEdit(user._id, user.username, user.email)
                                                        }
                                                    >
                                                        <FaEdit className="ml-4" />
                                                    </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <input
                                                type="email"
                                                value={editableUserEmail}
                                                onChange={(e) =>
                                                    setEditableUserEmail(e.target.value)
                                                }
                                                className="w-full p-2 border rounded-lg"
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <button
                                                onClick={() => deleteHandler(user._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                                ) : (
                                    <tr>
                                <td colSpan="5" className="py-6 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
