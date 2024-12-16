import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Error } from "../components/error";
import userServices from "../services/userServices";
import { useDispatch } from "react-redux";
import gastosServices from "../services/gastosServices.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  function formSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      setError("Datos incompletos");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (password.length < 8) {
      setError("Contraseña muy corta");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    userServices
      .getUser({ email, password })
      .then((response) => {
        console.log(response);
        dispatch({
          type: "getUser",
          payload: response._id,
        });
        gastosServices.getGastos(response._id).then((response) => {
          dispatch({
            type: "GASTOS_BACKEND",
            payload: response,
          });
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <header className="  flex absolute left-0 right-0  justify-center bg-blue-700 py-2 rounded-b-3xl mx-3 ">
        <h1 className="text-2xl text-white font-semibold  ">Iniciar sesión</h1>
      </header>
      <section className="mx-auto h-screen absolute z-10 left-0 right-0 flex flex-col justify-center items-center ">
        <form
          onSubmit={formSubmit}
          className="flex flex-col  shadow    p-4  h-72   rounded-xl"
        >
          <button
            type="button"
            className="flex shadow items-center justify-center  h-fit py-2 rounded-xl mx-10 mb-5"
          >
            <img
              src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
              alt=""
              className="w-8 h-8 mr-2"
            />
            <p>Iniciar con google</p>
          </button>
          <input
            type="text"
            name="email"
            placeholder="Correo electronico"
            className="flex border-solid border-2 border-gray-500 items-center justify-center  h-fit p-3  rounded-xl mx-5 mb-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            minLength={8}
            className="flex border-solid border-2 border-gray-500  items-center justify-center  h-fit p-3  rounded-xl mx-5 mb-5"
          />
          <div className="flex row mx-2">
            <p className="text-sm max-w-40">
              No tengo una cuenta{" "}
              <Link
                to="/register"
                className="underline text-blue-700 "
              >
                Registrarme
              </Link>
            </p>
            <button
              type="submit"
              className="flex  items-center justify-center w-fit h-fit py-2 px-7 rounded-xl mb-5 bg-blue-700"
            >
              <p className="text-white text-lg">Iniciar</p>
            </button>
          </div>
        </form>
      </section>
      {error ? <Error message={error} /> : ""}
    </>
  );
}
export default Login;
