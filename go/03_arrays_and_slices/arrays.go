package main

import "fmt"

func main() {
	// In GO arrays are fixed length and the are initialized to default values
	// unless initialized properly

	var myArray [6]int

	fmt.Println("myArray: ", myArray)
	fmt.Println("MyArray length: ", len(myArray))

	myArray[3] = 50
	fmt.Println("myArray again: ", myArray)

	myInitializedArray := [3]int{1, 2, 3}
	fmt.Println("myInitializedArray: ", myInitializedArray)

	fmt.Println("------ Slices ------")

	// This is a slice. Slices are dynimaccly created and can change in size.
	var mySlice []int // Does not allocate memory

	var myAllocatedSlice = make([]int, 10) // Slice with 10 dynimacally allocated ints of value zero

	fmt.Println("mySlice: ", mySlice)
	fmt.Println("mySlice length: ", len(mySlice))

	fmt.Println("myAllocatedSlice: ", myAllocatedSlice)
	fmt.Println("myAllocatedSlice length: ", len(myAllocatedSlice))

	// You cant add to unallocated slice directly by mySlice[0] = 10. This will crash
	// Instead we use append
	mySlice = append(mySlice, 0)

	//When appending slice or an array we use the three-dot syntax...
	mySlice = append(mySlice, []int{10, 100}...)
	fmt.Println("mySlice: ", mySlice)
	fmt.Println("mySlice length: ", len(mySlice))

	copiedSlice := make([]int, len(mySlice))

	copy(copiedSlice, mySlice)

	fmt.Println("copiedSlice: ", copiedSlice)

	partialSlice := mySlice[1:3]
	fmt.Println("partialSlice: ", partialSlice)

	fmt.Println("------ Maps ------")

	// Maps use key value pairs. Use make to create a map

	intStrMap := make(map[int]string)
	strIntMap := make(map[string]int)

	intStrMap[1] = "One"
	intStrMap[2] = "Two"

	strIntMap["One"] = 1
	strIntMap["Two"] = 2

	fmt.Println("intStrMap: ", intStrMap)
	fmt.Println("strIntMap: ", strIntMap)

	// Remove by key using delete
	delete(strIntMap, "Two")
	fmt.Println("strIntMap after delete: ", strIntMap)

	// Initializing map with initial values
	initialMap := map[int]string{1: "One", 2: "Two"}

	// Checking if a map has a key or a value
	if val, ok := initialMap[2]; ok {
		fmt.Printf("Iniatialized map contains %s\n", val)
	}

	if _, ok := initialMap[3]; !ok {
		fmt.Println("Iniatialized map does contain that value or key")
	}
}