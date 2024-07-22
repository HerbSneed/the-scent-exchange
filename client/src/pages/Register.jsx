import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../utils/mutations";
import { useCurrentUserContext } from "../context/CurrentUser";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";

const Register = () => {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [error, setErrors] = useState({});
  const [registerUser] = useMutation(REGISTER_USER);
  const editorRef = useRef(null);

  const [formState, setFormState] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [scale, setScale] = useState(1);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const fieldErrors = {};

    if (formState.password !== formState.confirmPassword) {
      fieldErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return; // Exit early if there are validation errors
    }

    let imageUrl = "";
    if (formState.profilePicture && editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      const formData = new FormData();
      formData.append("file", canvas); // Use the canvas data URL instead of the file
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_USER_PROFILE_UPLOAD_PRESET
      );
      formData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrors({ ...error, profilePicture: "Image upload failed" });
        return; // Exit early if image upload fails
      }
    }

    try {
      const variables = {
        email: formState.email,
        userName: formState.userName,
        password: formState.password,
        profilePicture: imageUrl,
      };

      console.log("variables", variables);

      const mutationResponse = await registerUser({
        variables,
      });

      console.log("mutationResponse", mutationResponse);

      const { token, currentUser } = mutationResponse.data.registerUser;

      loginUser(currentUser, token);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormState({
      ...formState,
      profilePicture: event.target.files[0],
    });
  };

  return (
    <form className="flex flex-col" onSubmit={handleFormSubmit}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        required
      />
      <label>UserName</label>
      <input
        type="text"
        name="userName"
        value={formState.userName}
        onChange={handleChange}
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleChange}
        required
      />
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleChange}
        required
      />
      {error.confirmPassword && (
        <p className="error">{error.confirmPassword}</p>
      )}
      <label>Profile Picture</label>
      <input type="file" name="profilePicture" onChange={handleFileChange} />
      {formState.profilePicture && (
        <div>
          <AvatarEditor
            ref={editorRef}
            image={formState.profilePicture}
            width={200}
            height={200}
            borderRadius={100}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={0}
          />
          <input
            type="range"
            value={scale}
            min="1"
            max="2"
            step="0.01"
            onChange={(e) => setScale(parseFloat(e.target.value))}
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-newsBlue text-white p-2 rounded hover:bg-blue-600 mt-4 w-full mb-2"
      >
        Sign Up
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
