#!/usr/bin/env python

import asyncio
import RPi.GPIO as GPIO
import websockets

GPIO.setmode(GPIO.BCM)
GPIO.setup(5, GPIO.IN, pull_up_down=GPIO.PUD_UP)

CONNECTIONS = set()

async def register(websocket):
    CONNECTIONS.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        CONNECTIONS.remove(websocket)

async def server():
    pressed = False

    while True:
        input_state = GPIO.input(5)
        if input_state == False:
            if pressed == False:
                websockets.broadcast(CONNECTIONS, "on")
                print("on")
                pressed = True
        else:
            if pressed == True:
                websockets.broadcast(CONNECTIONS, "off")
                print("off")
                pressed = False
        await asyncio.sleep(0.1)

async def main():
    async with websockets.serve(register, "0.0.0.0", 9273):
        await server()

if __name__ == "__main__":
    asyncio.run(main())