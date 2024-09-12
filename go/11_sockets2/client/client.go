package main

import (
	"fmt"
	"net"
	"bufio"
	"os"
	"strings"
)

func main() {
	conn, err := net.Dial("tcp", "localhost:3001")
	if err != nil {
		fmt.Println("Error connecting to server: ", err.Error())
		os.Exit(1)
	}
	defer conn.Close()

	reader := bufio.NewReader(os.Stdin)
	for {
		fmt.Print("Text to send (quit quits): ")
		input, _ := reader.ReadString('\n')
		conn.Write([]byte(input))
		fmt.Printf("Message sent: %s\n", input)
		if strings.TrimRight(input, "\n") == "quit" {
			return
		}
	}
}