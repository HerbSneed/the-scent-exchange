import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../utils/mutations";
import { useCurrentUserContext } from "../context/CurrentUser";

const Register = () => {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [ error, setErrors ] = useState();

  const [formState, setFormState] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [ registerUser ] = useMutation(REGISTER_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let variables = {
        email: formState.email,
        userName: formState.userName,
        password: formState.password,
        confirmPassword: formState.confirmPassword,
        profilePicture: formState.profilePicture,
      };
    const fieldErrors = {};

    if (formState.password !== formState.confirmPassword) {
      fieldErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    const mutationResponse = await registerUser({
      variables, 
    });

    const { token, currentUser } = mutationResponse.data.registerUser;

    loginUser(currentUser, token);
      navigate('/dashboard');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

    const handleChange = event => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };



  return (
    <form className="flex flex-col" onSubmit={handleFormSubmit}>
      <label> Email </label>
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        required
      />
      <label> UserName </label>
      <input
        type="text"
        name="userName"
        value={formState.userName}
        onChange={handleChange}
        required
      />
      <label> Password </label>
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleChange}
        required
      />

      <label> Confirm Password </label>
      <input
        type="password"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleChange}
        required
      />

      <label> Profile Picture </label>
      <input
        type="file"
        name="profilePicture"
        onChange={handleChange}
      />
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
