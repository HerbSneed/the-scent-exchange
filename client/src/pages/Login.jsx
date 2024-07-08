// client/src/pages/Login.js
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { LOGIN_USER } from "../utils/mutations";

import { useCurrentUserContext } from "../context/CurrentUser";


const Login = () => {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  // Mutation hooks
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });

      const { token, currentUser } = mutationResponse.data.login;
      loginUser(currentUser, token);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };


    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value });
    };

  return (
    <div>
      {error ? (
        <div>
          <p className="error-text">The provided credentials are incorrect</p>
        </div>
      ) : null}

      <h1>Login</h1>

      <form
        id="login-form"
        onSubmit={handleLogin}
        className=" flex flex-col px-6 rounded m-4  mx-auto sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/6 2xl:w-2/6"
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>

        <p className="font-bold text-right">
          Need an account?{" "}
          <Link to="/register" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
