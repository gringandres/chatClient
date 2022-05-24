interface mensajeInterface {
  message: string;
  user: string;
  date: string;
  id: string;
}

interface Props {
  mensajeEnviado: mensajeInterface[];
  userName: string | null;
}

const Mensajes = ({ mensajeEnviado, userName }: Props) => {
  const dateEditor = (date: string) => {
    const newTime = date.split(" ", 5);
    return newTime.at(-1)?.slice(0, -3);
  };
  return (
    <section>
      <div
        className="bg-white flex p-4 m-3 flex-col overflow-auto"
        style={{ height: "700px" }}
      >
        {mensajeEnviado.map((mensaje) => {
          const { user, date } = mensaje;
          const sameUser = user === userName;
          const color = sameUser ? "green" : "blue";
          const cssStylesMessage = sameUser
            ? "mensaje-enviado border mb-2 rounded-xl max-w-1/2 w-max py-2 px-4 self-end text-white"
            : "mensaje-enviado border mb-2 rounded-xl max-w-1/2 w-max py-2 px-4 self-start text-white";
          const cssText = sameUser ? "text-right" : "text-left";

          return (
            <>
              <div
                key={mensaje.id}
                className={cssStylesMessage}
                style={{ backgroundColor: color }}
              >
                {!sameUser && (
                  <div className="text-left font-bold text-teal-400 text-xs">
                    {user}
                  </div>
                )}
                <div className={cssText}>{mensaje.message}</div>
                <div className="text-right font-bold text-gray-400 text-xs">
                  {dateEditor(date)}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Mensajes;
