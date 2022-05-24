import { useState, useEffect } from "react";
import socket from "../sockets";
import Mensajes from "./Mensajes";
import Login from "./Login";

interface mensajeInterface {
  message: string;
  user: string;
  date: string;
  id: string;
}

const Chat = () => {
  const [mensaje, setMensaje] = useState("");
  const [user, setUser] = useState("");
  const [userSet, setUserSet] = useState(false);

  const [mensajeEnviado, setMensajeEnviado] = useState<mensajeInterface[]>([]);
  const userName = window.sessionStorage.getItem("user");

  const data = { message: mensaje, user: userName };

  const fetchData = () => {
    const url = "https://chat-server-ruddy.vercel.app/api/message";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMensajeEnviado(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [mensajeEnviado]);

  useEffect(() => {
    if (!userName) {
      setUser("");
      setUserSet(false);
    }
  }, [userName]);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!mensaje) {
      return;
    }

    socket.emit("sendMessage", data);
    setMensaje("");
  };

  const onSubmitUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!user || user.trim() === "") {
      return;
    }
    window.sessionStorage.setItem("user", user);
    setUser("");
    setUserSet(true);
  };
  return (
    <div className="flex items-center justify-center bg-gray-200 h-screen p-4">
      <section className="w-5/12">
        {!userSet && (
          <Login onSubmitUser={onSubmitUser} setUser={setUser} user={user} />
        )}

        {userSet && (
          <div>
            <Mensajes mensajeEnviado={mensajeEnviado} userName={userName} />
            <form onSubmit={onSubmit}>
              <input
                type="text"
                className="border-4 border-green-500 p-1 rounded-l-xl pl-3 w-9/12"
                onChange={(e) => setMensaje(e.target.value)}
                value={mensaje}
              />
              <input
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-xl cursor-pointer -ml-5 "
                value="Enviar"
              />
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Chat;
