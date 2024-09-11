package main

import (
	"fmt"
	"time"
)

func worker(done chan bool) {
	fmt.Println("Worker: Lets do some work!")
	time.Sleep(3 * time.Second)
	fmt.Println("Worker: Done with work!")
	fmt.Println("Worker: Sending data to channel indicating that we are done")
	done <- true
}

func main() {
	messages := make(chan string)

	// Creates new channel with make(chan val-type). Channels are typed by the values they convey.
	// By default sends and receives block until both the sender and receiver are ready.
	go func() {
		fmt.Println("Pinger: Pinging the main")
		messages <- "ping"
	}()

	fmt.Println("Main: reading the channel")
	msg := <- messages
	fmt.Println(msg)

	time.Sleep(1 * time.Second)

	fmt.Println("------ Buffered Channel ------")

	buffered := make(chan string, 2)

	buffered <- "buffered "
	buffered <- "channel"

	fmt.Print(<- buffered)
	fmt.Println(<- buffered)

	fmt.Println("------ Channel Synchronization ------")

	done := make(chan bool)

	go worker(done)
	fmt.Println("Main: Waiting for worker to finish")
	<- done
	fmt.Println("Main: Worker finished. Exiting main")
}