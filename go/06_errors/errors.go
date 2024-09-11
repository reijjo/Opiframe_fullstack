package main

import (
	"fmt"
	"errors"
)

func notDog(animal string) (string, error) {
	if animal == "dog" {
		return "", errors.New("Not working with a dog!")
	}
	return animal+" is not a dog. Will work fine.", nil
}

func main() {
	animals := []string{"cat", "dog"}

	for _, a := range animals {
		result, err := notDog(a)
		if err != nil {
			fmt.Println("Error:\t", err)
		} else {
			fmt.Println("Result:\t", result)
		}
	}
}