import { useEffect, useState } from "react";

export function useLocalIp() {
  const [ip, setIp] = useState<string>();

  useEffect(() => {
    async function getLocalIPAddress() {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel(""); // Create a data channel

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const candidate = event.candidate.candidate;
          const localIP = candidate.match(/\d+\.\d+\.\d+\.\d+/);
          if (localIP) {
            console.log(localIP[0]);
          }
        }
      };

      pc.createOffer().then((offer) => pc.setLocalDescription(offer));
    }

    getLocalIPAddress();
  }, []);

  return ip;
}
