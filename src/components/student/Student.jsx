import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  deleteStudent,
  updateStudent,
} from "../../app/features/student/studentApiSlice";
import CloudinaryImageUpload from "haq-cloudinary";
import Loader from "../loader/Loader";
import {
  loaderStart,
  setMsgEmpty,
} from "../../app/features/student/studentSlice";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";
import { createAlert } from "../../helpers/alert";

const Student = () => {
  const dispatch = useDispatch();
  const { students, loading, success, error } = useSelector(
    (state) => state.student
  );
  const [modal, setModal] = useState(false);
  const [single, setSingle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [student, setStudent] = useState({});
  const [input, setInput] = useState({
    name: "",
    skill: "",
    age: "",
    location: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      try {
        const compressedFile = await imageCompression(selectedFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        setFile(compressedFile);
      } catch (error) {
        console.error("Error compressing file:", error.message);
      }
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleStudent = async (e) => {
    e.preventDefault();
    try {
      dispatch(loaderStart());

      const fileData = await CloudinaryImageUpload({
        file: file,
        preset: "devzone_upload",
        cloudName: "dikawe21k",
      });

      await dispatch(createStudent({ ...input, photo: fileData.secure_url }));

      setInput({ name: "", skill: "", age: "", location: "" });
      setModal(false);
    } catch (error) {
      console.error("Error creating student:", error.message);
      alert("An error occurred while creating the student.");
    }
  };

  // Handle SweetAlert
  useEffect(() => {
    if (success) {
      createAlert({
        title: success,
        icon: "success",
      });
      dispatch(setMsgEmpty());
    }
    if (error) {
      createAlert({
        title: error,
        icon: "error",
      });
      dispatch(setMsgEmpty());
    }
  }, [success, dispatch, error]);

  // Handle Student Delete
  const handelStudentDelete = (id) => {
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
        dispatch(deleteStudent(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Handle single data
  const handleSingleData = (id) => {
    setStudent(students.find((data) => data.id == id));
    setSingle(true);
  };

  // Handle edit data
  const handleEditStudent = (id) => {
    setInput(students.find((data) => data.id == id));
    setEdit(true);
  };

  // Handle update Student data
  const handleStudentUpdate = async (e) => {
    e.preventDefault();

    dispatch(loaderStart());

    let photoUrl = input.photo;
    if (file) {
      const fileUpdata = await CloudinaryImageUpload({
        file: file,
        preset: "devzone_upload",
        cloudName: "dikawe21k",
      });
      photoUrl = fileUpdata.secure_url;
    }

    dispatch(updateStudent({ ...input, photo: photoUrl }));

    if (!loading) {
      Swal.fire({
        title: "Updated!",
        text: "Your file has been Updated.",
        icon: "success",
      });
      setEdit(false);
    }
  };

  return (
    <div className="p-4">
      <Loader isOn={loading} />
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setModal(true)}
          className="py-2 px-5 bg-red-500 text-white rounded-md flex items-center gap-3"
        >
          Create New Student
          <FaPlus />
        </button>
      </div>
      <hr className="my-2 border-1 border-gray-300" />
      <Modal
        onClose={() => setModal(false)}
        isOpen={modal}
        title="Create New Student"
      >
        <form onSubmit={handleStudent}>
          <label className="my-2 block">
            Name
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </label>
          <label className="my-2 block">
            Age
            <input
              name="age"
              value={input.age}
              onChange={handleInputChange}
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <label className="my-2 block">
            Skill
            <input
              name="skill"
              value={input.skill}
              onChange={handleInputChange}
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <label className="my-2 block">
            Location
            <input
              name="location"
              value={input.location}
              onChange={handleInputChange}
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <label className="my-2 block">
            Photo
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <button
            type="submit"
            className="mt-3 w-full px-4 bg-red-500 text-white rounded-md"
          >
            Create Now
          </button>
        </form>
      </Modal>
      <Modal
        onClose={() => setSingle(false)}
        isOpen={single}
        title="View Single Student"
      >
        <img src={student?.photo} alt="" />
        <h1>{student?.name}</h1>
        <p>{student?.skill}</p>
      </Modal>
      <Modal
        onClose={() => setEdit(false)}
        isOpen={edit}
        title="Edit Single Student"
      >
        <form onSubmit={handleStudentUpdate}>
          <label className="my-2 block">
            Name
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </label>
          <input
            type="hidden"
            className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            name="id"
            value={input.id}
          />
          <label className="my-2 block">
            Age
            <input
              name="age"
              value={input.age}
              onChange={handleInputChange}
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <label className="my-2 block">
            Skill
            <input
              name="skill"
              value={input.skill}
              onChange={handleInputChange}
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <label className="my-2 block">
            Location
            <input
              name="location"
              value={input.location}
              onChange={handleInputChange}
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <label>
            <img src={input.photo} alt="" />
            <input type="hidden" value={input.photo} name="photo" />
          </label>
          <label className="my-2 block">
            Photo
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <button
            type="submit"
            className="mt-3 w-full p-2 px-4 bg-red-500 text-white rounded-md"
          >
            Update Now
          </button>
        </form>
      </Modal>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-center">#</th>
              <th className="py-2 px-4 text-center">Name</th>
              <th className="py-2 px-4 text-center">Age</th>
              <th className="py-2 px-4 text-center">Skill</th>
              <th className="py-2 px-4 text-center">Location</th>
              <th className="py-2 px-4 text-center">Photo</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-300 text-gray-700 ${
                  index % 2 === 0 ? "" : "bg-gray-200"
                }`}
              >
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">{item.name}</td>
                <td className="py-2 px-4 border-b text-center">{item.age}</td>
                <td className="py-2 px-4 border-b text-center">{item.skill}</td>
                <td className="py-2 px-4 border-b text-center">
                  {item.location}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <img
                    src={item.photo}
                    alt="Student"
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleSingleData(item.id)}
                    className="p-2 text-blue-500"
                  >
                    <IoEyeOutline />
                  </button>
                  <button
                    onClick={() => handleEditStudent(item.id)}
                    className="p-2 text-yellow-500"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handelStudentDelete(item.id)}
                    className="p-2 text-red-500"
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
