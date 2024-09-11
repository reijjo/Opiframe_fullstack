package main

import "fmt"

func main() {
	var b int = 15
	var a int
	var t int = 10

	// Short cut for inintialization of an array. You can initialize it partially

	numbers := [6]int{1, 2, 3, 4}

	for a := 0; a < 10; a++ {
		fmt.Printf("value of a: %d\n", a)
	}

	for a < b {
		a++
		fmt.Printf("value of a: %d\n", a)
	}

	for i, x := range numbers {
		fmt.Printf("value of x = %d at %d\n", x, i)
	}

	if t > 5 {
		fmt.Printf("%d is greater than 5\n", t)
	} else {
		fmt.Printf("%d is less than or equal to 5\n", t)
	}

	j := 2
	fmt.Print("Write ", j, " as ")
	switch j {
		case 1:
			fmt.Println("one")
		case 2:
			fmt.Println("two")
		case 3:
			fmt.Println("three")
		default:
			fmt.Println("no case for the value")
		}

		whatAmI := func(i interface{}) {
			switch t := i.(type) {
				case bool:
					fmt.Println("I'm a bool")
				case int:
					fmt.Println("I'm an int")
				default:
					fmt.Printf("Don't know type %T\n", t)
			}
		}

		whatAmI(true)
		whatAmI(1)
		whatAmI("hey")
}