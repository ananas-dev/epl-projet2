import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

enum MetalDetectorStatus {
  Connecting,
  Connected,
  Disconnected,
  Error,
}

interface MetalDetectorState {
  ws: WebSocket;
  connected: boolean;
  detecting: boolean;
  connect: () => void;
}

const useMetalDetectorStore = create<MetalDetectorState>()(
  subscribeWithSelector((set) => ({
    ws: null,
    connected: false,
    detecting: false,
    connect: () => {
      const wrapper = () => {
        console.debug("Trying to connect...");
        //const url = "ws://192.168.0.40:9273";
        const url = "ws://192.168.4.1:9273"
        const ws = new WebSocket(url);

        ws.onerror = () => ws.close();
        ws.onopen = () => set({ connected: true });

        ws.onclose = () => {
          set({ connected: false });
          setTimeout(wrapper, 2000);
        };

        ws.onmessage = (e) => {
          switch (e.data) {
            case "on":
              set({ detecting: true });
              break;
            case "off":
              set({ detecting: false });
              break;
          }
        };

        set({ ws });
      };
      wrapper();
    },
  }))
);

export { MetalDetectorStatus, useMetalDetectorStore };
