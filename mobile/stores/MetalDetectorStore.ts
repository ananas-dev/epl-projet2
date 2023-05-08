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
  status: MetalDetectorStatus;
  detecting: boolean;
  connect: () => void;
}

const useMetalDetectorStore = create<MetalDetectorState>()( subscribeWithSelector((set) => ({
  ws: null,
  status: MetalDetectorStatus.Disconnected,
  detecting: false,
  connect: () => {
    const ws = new WebSocket("ws://192.168.4.1:9273");

    set({ status: MetalDetectorStatus.Connecting })

    ws.onerror = () => {
      set({ status: MetalDetectorStatus.Error });
    };

    ws.onopen = () => set({ status: MetalDetectorStatus.Connected });

    ws.onclose = () => set({ status: MetalDetectorStatus.Disconnected });

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
  },
})));

export { MetalDetectorStatus, useMetalDetectorStore };
