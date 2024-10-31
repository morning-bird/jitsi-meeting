"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        JitsiMeetExternalAPI: any;
    }
}

const appId = process.env.NEXT_PUBLIC_JITSI_APP_ID;
export default function Home() {
    useEffect(() => {
        // Mendapatkan roomName dari query string
        const urlParams = new URLSearchParams(window.location.search);
        const roomName = urlParams.get("room") || "default-room";

        const script = document.createElement("script");
        script.src = `https://8x8.vc/${appId}/external_api.js`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const api = new window.JitsiMeetExternalAPI("8x8.vc", {
                roomName: `${appId}/${roomName}`,
                parentNode: document.querySelector("#jaas-container"),
            });
        };

        // Cleanup
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <main className="flex min-h-screen flex-col">
            <div id="jaas-container" style={{ height: "100vh" }} />
        </main>
    );
}
