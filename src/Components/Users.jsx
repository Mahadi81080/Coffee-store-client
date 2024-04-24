import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users,setUsers]=useState(loadedUsers)
  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://coffee-store-server-ruddy.vercel.app/user/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
              const remaining = users.filter((user) => user._id !== _id);
              setUsers(remaining)
            }
          });
      }
    });
  };
  return (
    <div>
      <h2>Users : {loadedUsers.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <td>Email</td>
              <td>CreatedAt</td>
              <td>lastSignInTimet</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user) => (
              <tr key={user._id} className="hover">
                <th>1</th>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.lastSignInTime}</td>
                <td><button onClick={()=>handleDelete(user._id)} className="btn">X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
