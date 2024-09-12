package main

import (
	"net"
	"fmt"
	"bufio"
	"os"
)

func main() {
	fmt.Println("Starting server at port 3001...")

	ln, _ := net.Listen("tcp", ":3001")
	fmt.Println("Waiting for connections!")
	conn, _ := ln.Accept()

	message, _ := bufio.NewReader(conn).ReadString('\n')
	fmt.Print("Message from client: ", string(message))

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Message to client:")
	text, _ := reader.ReadString('\n')
	fmt.Fprintf(conn, text + "\n")
}