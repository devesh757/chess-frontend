import { Color, PieceSymbol, Square,Chess } from "chess.js"
import { useState,Dispatch,SetStateAction } from 'react'
import { MOVE } from "../screens/Game"

const pieceSymbols: Record<Color, Record<PieceSymbol, string>> = {
    w: { k: '\u2654', q: '\u2655', r: '\u2656', b: '\u2657', n: '\u2658', p: '\u2659' },
    b: { k: '\u265A', q: '\u265B', r: '\u265C', b: '\u265D', n: '\u265E', p: '\u265F' },
}

type BoardSquare = {
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null;


interface ChessBoardProps {
    chess: Chess;
    board: BoardSquare[][];
    socket: WebSocket;
    setBoard: Dispatch<SetStateAction<BoardSquare[][]>>;
    color: "white" | "black" | null;
}
export const ChessBoard = ({ chess, board, socket, setBoard, color }:ChessBoardProps) => {
    const [from, setFrom] = useState<null | Square>(null);

    return (
        <div className="text-slate-200">
            {board.map((row, i) => {
                return (
                    <div key={i} className="flex">
                        {row.map((square, j) => {
                            const file = String.fromCharCode(97 + j);
                            const rank = 8 - i;
                            const squareRepresentation = `${file}${rank}` as Square;

                            const isSelected = from === squareRepresentation;

                            return (
                                <div
                                    onClick={() => {
                                        if (!from) {
                                            if (square && color && square.color === (color === "white" ? "w" : "b")) {
                                                setFrom(squareRepresentation);
                                            }
                                        } else {
                                            try {
                                                const moveData = {
                                                    from,
                                                    to: squareRepresentation
                                                };

                                                chess.move(moveData);
                                                setBoard(chess.board());

                                                socket.send(JSON.stringify({
                                                    type: MOVE,
                                                    payload: {
                                                        move: moveData
                                                    }
                                                }));
                                            } catch (e) {
                                                console.warn("Illegal chess move attempted locally:", e);
                                            } finally {
                                                setFrom(null);
                                            }
                                        }
                                    }}
                                    key={j}
                                    className={`w-16 h-16 text-3xl flex items-center justify-center cursor-pointer transition-colors
                                        ${isSelected ? 'bg-yellow-300' : (i + j) % 2 === 0 ? 'bg-green-600' : 'bg-amber-100'}`}
                                >
                                    {square ? (
                                        <span className={`select-none ${square.color === 'w'
                                            ? 'text-stone-100 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]'
                                            : 'text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]'}`}
                                        >
                                            {pieceSymbols[square.color][square.type]}
                                        </span>
                                    ) : ""}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
