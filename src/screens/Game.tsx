import {useEffect,useState} from "react"
import { useNavigate } from "react-router-dom"

import { ChessBoard } from "../components/ChessBoard"
import { Button } from "../components/Button"
import {useSocket } from "../hooks/useSocket";
import {Chess} from "chess.js"

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over"

export const Game = () => {
const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }
}, [navigate]);

const socket = useSocket();
const [chess] = useState(() => new Chess());
const [board,setBoard] = useState(() => chess.board());
const [started,setStarted] = useState(false);

const [color, setColor] = useState<"white" | "black" | null>(null);

const [isConnected,setIsConnected] = useState(() =>{
    return socket ? socket.readyState === WebSocket.OPEN : false;
});
useEffect(() => {
    if(!socket) return;
      
    const handleOpen = () => setIsConnected(true);
        const handleClose = () => setIsConnected(false);

        socket.addEventListener("open", handleOpen);
        socket.addEventListener("close", handleClose);
        
        return () => {
            socket.removeEventListener("open", handleOpen);
            socket.removeEventListener("close", handleClose);
    }
},[socket]);

   
useEffect(() => {
    if(!socket) return;
   
    const handleMessage = (event: MessageEvent) => {
        try{
            const message = JSON.parse(event.data);
           
            switch(message.type){
            case INIT_GAME:
                chess.reset();
                setBoard(chess.board());
                setStarted(true);
                setColor(message.payload.color);
                console.log("Game initialized as", message.payload.color);
                break;
            case MOVE:
              chess.move(message.payload);
                setBoard(chess.board());
                console.log("Move made");
                break;
            case GAME_OVER:
                console.log("Game over")
                setStarted(false);
                break;
        }
    }catch(err){
        console.log("Failed to process message:",err);
    }  
        };
        socket.addEventListener("message",handleMessage);
        return () => {
            socket.removeEventListener("message",handleMessage);
    }
},[socket,chess]);

  if(!socket || !isConnected){
     return <div className="flex justify-center pt-8 text-white">Connecting to server...</div>
  } 

    return  (
    <div className="justify-center flex">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 gap-4 ">
                <div className="col-span-4  w-full flex justify-center">
                    <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} color={color} />
                </div>
                <div className="col-span-2 bg-slate-900 w-full flex justify-center">
                    <div className="pt-8">
                   {!started && ( <Button onClick={() => {
                          if (socket.readyState === WebSocket.OPEN) {
                                        socket.send(JSON.stringify({
                                            type: INIT_GAME
                        }));
                    }
                    }} >
                        Play 
                    </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
