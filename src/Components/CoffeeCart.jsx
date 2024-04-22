import { FaRegEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const CoffeeCart = ({ coffee, coffees, setCoffees }) => {
  const { _id, Name, Chef, Supplier, Photo } = coffee;
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
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });
              const remaining = coffees.filter((cof) => cof._id !== _id);
              setCoffees(remaining)
            }
          });
      }
    });
  };
  return (
    <div>
      <div className="card card-side bg-[#f5f4f1] shadow-xl my-3">
        <figure>
          <img src={Photo} alt="Movie" />
        </figure>
        <div className=" flex justify-between w-full pr-3">
          <div className="mt-6 pl-3 space-y-3">
            <h3 className="text-lg font-semibold">
              Name : <span className="text-base font-normal">{Name}</span>
            </h3>
            <h3 className="text-lg font-semibold">
              Chef : <span className="text-base font-normal">{Chef}</span>
            </h3>
            <h3 className="text-lg font-semibold">
              Price : <span className="text-base font-normal">{Supplier}</span>
            </h3>
          </div>
          <div>
            <div className="join join-vertical space-y-3">
              <button className="btn  bg-[#d2b48c] text-white">
                <FaRegEye />
              </button>
              <Link to={`updateCoffee/${_id}`}>
                <button className="btn bg-black text-white">
                  <MdEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="btn  bg-red-500 text-white"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCart;
