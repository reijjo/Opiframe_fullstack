fn main() {
	/*
		Array is data inside square brackets:
			- Arrays must not change size
			- Arrays must contain same type
	*/
	let array1 = ["One", "Two"]; //[ &str;2]
	let array2 = ["One", "Two", "Three"]; //[ &str;3]

	println!("Array one {:?} and array two {:?}", array1, array2);

	let my_array = ["a";10];
	println!("{:?}", my_array);

	let array_of_ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	// Slices
	let three_to_five = &array_of_ten[2..5];
	let start_at_two = &array_of_ten[1..];
	let end_at_five = &array_of_ten[..5];
	let everything = &array_of_ten[..];

	println!("\nThree to five{:?},\nStart at two:{:?},\nEnd at five:{:?},\nEverything:{:?}", three_to_five, start_at_two, end_at_five, everything);

	// Slices work with strings
	let s = String::from("Hello");
	let len = s.len();

	let slice = &s[3..len];
	let slice2 = &s[1..];

	println!("\nFirst slice {} and second slice {}", slice, slice2);

	// Vectors are to arrays what String is to &str
	let name1 = String::from("Matti");
	let name2 = String::from("Jaska");

	let mut my_vec = Vec::new(); // This vector is created without an associated type. It will not work. Pushing a type into vector type chains it.
	my_vec.push(name1);
	my_vec.push(name2); // Pushing String into typeless vector changes it to Vec<String>

	println!("\n{:?}", my_vec);

	let vec_of_ten = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	let three_to_five = &vec_of_ten[2..5];

	println!("\nThree to five: {:?}", three_to_five);

	// Tuples are collections that can house multiple different types. Empty function is a tuple
	let random_tuple = ("Here is a name", 8, vec!['a'], 'b', [8, 9, 10], 7.7);

	println!("\nInside the tuple are: \n1. {:?} \n2. {:?} \n3. {:?} \n4. {:?} \n5. {:?} \n6. {:?}", random_tuple.0, random_tuple.1, random_tuple.2, random_tuple.3, random_tuple.4, random_tuple.5, );

}