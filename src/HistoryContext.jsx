/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const HistoryContext = createContext();

export const useHistoryContext = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
    const { authToken } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = useCallback(async () => {
        if (authToken) {
            try {
                const rep = await fetch("https://tvshowdbapi.herokuapp.com/user/history", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (rep.ok) {
                    const data = await rep.json();
                    console.log("History data fetched: ", data);
                    setHistory(data);
                } else {
                    console.error("Failed to fetch history");
                }
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return (
        <HistoryContext.Provider value={{ history, loading, fetchHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
