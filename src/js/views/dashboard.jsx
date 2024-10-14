import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router";
import { AiFillEye } from "react-icons/ai";
import Modal from "../component/Modal";
import Swal from "sweetalert2";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = async () => {
    const response = await actions.getData();
    setUsers(response);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, stay logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        actions.logout();
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        ).then(() => {
          <Navigate to={"/"} />;
        });
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setmodalOpen(true);
  };

  const closeModal = () => {
    setmodalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <div className="min-h-screen items-start bg-slate-300">
          <div className=" flex justify-end mr-10 pt-6">
            <button
              className="bg-red-600 rounded-full p-3 shadow-md text-base font-medium text-white mt-2"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
          <div className="flex justify-center max-h-[800px] overflow-hidden mt-9">
            <div className="overflow-x-auto ">
              <div className="hidden lg:block">
                <table className="table-auto border-collapse border border-gray-300 w-full shadow-lg rounded-lg">
                  <thead className="uppercase border-collapse border border-t-black border-t-8 bg-blue-600 text-white sticky top-0 z-10">
                    <tr>
                      <th className="border border-gray-200 px-5 py-2 text-center bg-blue-600">
                        ID
                      </th>
                      <th className="border border-gray-200 px-5 py-2 text-center bg-blue-600">
                        Name
                      </th>
                      <th className="border border-gray-200 px-5 py-2 text-center bg-blue-600">
                        Email
                      </th>
                      <th className="px-6 py-3 text-center bg-blue-600">
                        Info
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-100 transition duration-300"
                      >
                        <td className="border border-gray-200 px-3 py-1 text-center">
                          {user.id}
                        </td>
                        <td className="border border-gray-200 px-3 py-1 text-center">
                          {user.name}
                        </td>
                        <td className="border border-gray-200 px-3 py-1 text-center">
                          {user.email}
                        </td>
                        <td className="flex justify-center items-center px-3 py-1">
                          <AiFillEye
                            className="text-2xl cursor-pointer"
                            onClick={() => openModal(user)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="border border-gray-300 p-4 m-2 rounded-lg bg-white shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-grow">
                        <p className="font-bold">ID: {user.id}</p>
                        <p>
                          <strong>Name: </strong>
                          {user.name}
                        </p>
                        <p>
                          <strong>Email: </strong> {user.email}
                        </p>
                      </div>
                      <AiFillEye
                        className="text-2xl cursor-pointer flex-shrink-0"
                        onClick={() => openModal(user)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Modal
              openModal={modalOpen}
              closeModal={closeModal}
              user={selectedUser}
            />
          </div>
        </div>
      )}
    </>
  );
};
