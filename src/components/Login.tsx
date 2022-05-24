interface Props {
  onSubmitUser: (args: any) => void;
  setUser: (args: string) => void;
  user: string;
}

const Login = ({ onSubmitUser, setUser, user }: Props) => {
  return (
    <div className="flex items-center justify-center bg-gray-200 h-screen p-4">
      <form onSubmit={(e) => onSubmitUser(e)}>
        <input
          type="text"
          className="border-4 border-blue-500 p-1 rounded-l-xl pl-3"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          placeholder="Ingrese Nombre"
        />
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-xl cursor-pointer -ml-5 "
          value="Enviar"
        />
      </form>
    </div>
  );
};

export default Login;
