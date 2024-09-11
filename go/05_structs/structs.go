package main

import "fmt"

type cat struct {
	name, breed string
}

type dog struct {
	name, breed string
}

// Interfaces are implements by structs by implementing each function separately
type animal interface {
	move()
	speak()
}

// The (d dog) is called a 'receiver type' and it ties the struct to the function.
// Function then becomes a method to type dog struct. Non interfaces use pointer
// receivers (d *dog)
func (d dog) move() {
	fmt.Printf("%s runs. See %s run.\n", d.name, d.name)
}

func (d dog) speak() {
	fmt.Printf("%s barks. %s is a %s.\n", d.name, d.name, d.breed)
}

func (c cat) move()  {
	fmt.Printf("%s sneaks!\n", c.name)
}

func (c cat) speak() {
	fmt.Printf("%s meows. %s is a %s.\n", c.name, c.name, c.breed)
}

func act(a animal) {
	a.move()
	a.speak()
}

func main() {
	duke := dog{name: "Duke", breed: "Sitter"}
	whiskers := cat{name: "Whiskers", breed: "Persian"}

	fmt.Println("Accessing directly through struct methods")

	duke.move()
	duke.speak()
	whiskers.move()
	whiskers.speak()

	fmt.Println("Accessing through interface")

	act(duke)
	act(whiskers)
}
