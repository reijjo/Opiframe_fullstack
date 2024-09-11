fn print_country(country_name:String) {
	println!{"{}", country_name};
}

fn print_country_returns_country(country_name:String) -> String {
	println!("{}", country_name);
	country_name
}

fn print_country_using_reference(country_name:&String) {
	println!("{}", country_name);
}

fn add_country(country_name:&mut String) {
	country_name.push_str("-Sweden");
	println!("{}", country_name);
}

fn main() {
	let country = String::from("Finland");

	print_country(country);
	// print_country(country);

	// Rust ownership rules state that only on owner. Ownership of String country is moved to print_country function when the String is passed on.
	let country = String::from("Finland");
	let country = print_country_returns_country(country);
	print_country_returns_country(country);

	// Borrowing of passing a reference to the function. Ownership does not change.
	let country = String::from("Finland");
	print_country_using_reference(&country);
	print_country_using_reference(&country);

	let mut country = String::from("Finland");
	add_country(&mut (country));

}