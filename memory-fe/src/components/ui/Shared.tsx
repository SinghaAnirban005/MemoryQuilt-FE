import { useParams } from "react-router-dom";
import { Card } from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";

export const Shared = () => {
    const { shareLink } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sharedContent, setSharedContent] = useState([]);
    const [username, setUsername] = useState("");
    const [scrollDirection, setScrollDirection] = useState("up");

    useEffect(() => {
        const fetchSharedBrains = async () => {
            try {
                setLoading(true);
                const fetchReq = await axios.get(`https://memory-quilt-backend.onrender.com/api/v1/memory/${shareLink}`);
                setUsername(fetchReq.data.username);
                setSharedContent(fetchReq.data.content);
                console.log(sharedContent)
            } catch (err) {
                setError("Failed to fetch shared content.");
            } finally {
                setLoading(false);
            }
        };

    
        fetchSharedBrains();
    
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setScrollDirection("down");
            } else {
                setScrollDirection("up");
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header
                className={`flex fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 transition-transform duration-300 ${
                    scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
                }`}
            >
                <img src="https://i.pinimg.com/736x/7f/c6/d6/7fc6d64079f1142bc636fb622eb1576f.jpg" className="w-[4vw] h-[2vw]" />
                <h1 className="text-xl font-bold text-gray-800">Second Brain</h1>
            </header>

            <div className="pt-20 px-6">
                {username && (
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Shared by: {username}
                    </h2>
                )}
                {loading && <p className="text-gray-600">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sharedContent.map((item) => {
                        //@ts-ignore
                        const date = new Date(item.createdAt);
                        const formattedDate1 = date.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        });
                        return <div>
                        <Card
                            //@ts-ignore
                            key={item._id}
                            //@ts-ignore
                            title={item.title}
                            //@ts-ignore
                            contentType={item.type}
                            createdOn={formattedDate1}
                            size={"md"}
                            //@ts-ignore
                            url={item.link}
                            //@ts-ignore
                            cardId={item._id}
                        />
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};
