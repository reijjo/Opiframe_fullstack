package main

import (
	"fmt"
	"net"
	"bufio"
	"os"
)

func handleClient(conn net.Conn) {
	var stringbuffer string
	for stringbuffer != "quit" {
		buffer, err := bufio.NewReader(conn).ReadBytes('\n')

		if err != nil {
			fmt.Println("Client left.")
			conn.Close()
			return
		}
		stringbuffer = string(buffer[:len(buffer) - 1])
		fmt.Println("Client message: ", stringbuffer)
	}
	conn.Close()
}

func main() {
	fmt.Println("Accepting connections at 3001")
	l, err := net.Listen("tcp", ":3001")
	if err != nil {
		fmt.Println("Error listening socket: ", err.Error())
		os.Exit(1)
	}
	defer l.Close()

	for {
		c, err := l.Accept()
		if err != nil {
			fmt.Println("Error accepting connection: ", err.Error())
			continue
		}
		fmt.Println("Client ", c.RemoteAddr(), " connected.")

		go handleClient(c)
	}
}