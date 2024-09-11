package main

import (
	"fmt"
	"time"
)

func hello() {
	fmt.Println("Hello from goroutine")
}

func numbers() {
	for i := 1; i < 5; i++ {
		time.Sleep(250 * time.Millisecond)
		fmt.Printf("%d ", i)
	}
	fmt.Printf("Numbers thread terminated ")
}

func alphabets() {
	for i := 'a'; i <= 'e'; i++ {
		time.Sleep(400 * time.Millisecond)
		fmt.Printf("%c ", i)
	}
	fmt.Printf("Alphabets thread terminated ")
}

func main() {
	go hello()
	time.Sleep(1 * time.Second)
	fmt.Println("In main function")

	go numbers()
	go alphabets()

	time.Sleep(3000 * time.Millisecond)
	fmt.Println("...main ends")
}