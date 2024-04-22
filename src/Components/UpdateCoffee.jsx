import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const updateCoffee = useLoaderData();
  const { _id,Name, Chef, Supplier, Tast, Category, Details, Photo } = updateCoffee;
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // Send data to the server
    fetch(`http://localhost:5000/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
        if (data.modifiedCount>0) {
          Swal.fire({
            title: "Success",
            text: "Coffee Updared Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
    );
  };
  return (
    <div>
      <section className="p-6 bg-[#f4f3f0]">
        <h2 className="text-2xl font-semibold">Update coffee : {Name}</h2>
        <p className="max-w-2xl mx-auto">
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className=" p-6 rounded-md shadow-sm">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <label className="form-control col-span-full sm:col-span-3">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  defaultValue={Name}
                  className="input input-bordered "
                  {...register("Name")}
                />
              </label>
              <label className="form-control col-span-full sm:col-span-3">
                <div className="label">
                  <span className="label-text">Chef</span>
                </div>
                <input
                  type="text"
                  name="chef"
                  defaultValue={Chef}
                  className="input input-bordered "
                  {...register("Chef")}
                />
              </label>
              <label className="form-control col-span-full sm:col-span-3">
                <div className="label">
                  <span className="label-text">Supplier</span>
                </div>
                <input
                  type="text"
                  name="supplier"
                  defaultValue={Supplier}
                  className="input input-bordered "
                  {...register("Supplier")}
                />
              </label>
              <label className="form-control col-span-full sm:col-span-3">
                <div className="label">
                  <span className="label-text">Taste</span>
                </div>
                <input
                  type="text"
                  name="taste"
                  defaultValue={Tast}
                  className="input input-bordered "
                  {...register("Tast")}
                />
              </label>
              <label className="form-control col-span-full sm:col-span-3">
                <div className="label">
                  <span className="label-text">Category</span>
                </div>
                <input
                  type="text"
                  name="category"
                  defaultValue={Category}
                  className="input input-bordered "
                  {...register("Category")}
                />
              </label>
              <label className="form-control col-span-full sm:col-span-3">
                <div className="label">
                  <span className="label-text">Details</span>
                </div>
                <input
                  type="text"
                  name="details"
                  defaultValue={Details}
                  className="input input-bordered "
                  {...register("Details")}
                />
              </label>
              <label className="form-control col-span-full">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  name="photo"
                  defaultValue={Photo}
                  className="input input-bordered "
                  {...register("Photo")}
                />
              </label>
              <input
                type="submit"
                value="Update Coffee"
                className="btn btn-block bg-[#d2b48c] col-span-full"
              />
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default UpdateCoffee;
