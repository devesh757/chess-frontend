import { useEffect, useRef } from "react";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8080";

export const useSocket = () => {
    const socketRef = useRef<WebSocket | null>(null);

    if (!socketRef.current) {
        socketRef.current = new WebSocket(WS_URL);
    }

    useEffect(() => {
        const socket = socketRef.current!;
        return () => {
            try {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.close();
                }
            } catch {
            }
        };
    }, []);

    return socketRef.current;
};

