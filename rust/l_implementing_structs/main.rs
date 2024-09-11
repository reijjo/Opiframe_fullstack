#[derive(Debug)]
struct Animal {
    age: u8,
    animal_type: AnimalType,
}

#[derive(Debug)]
enum AnimalType {
    Dog,
    Cat,
}

impl Animal {
    // Implementations often have new()-functionality in them for instance creation
    fn new(age: u8, animal_type: AnimalType) -> Self {
        Self {
            age: age,
            animal_type: animal_type,
        }
    }

    fn change_to_dog(&mut self) {
        println!("Changing to dog");
        self.animal_type = AnimalType::Dog;
    }

    fn change_to_cat(&mut self) {
        println!("Changing to cat");
        self.animal_type = AnimalType::Cat;
    }

    fn check_type(&self) {
        match self.animal_type {
            AnimalType::Dog => println!("It's a dog"),
            AnimalType::Cat => println!("It's a cat"),
        }
    }
}

fn main() {
    let mut new_animal = Animal::new(5, AnimalType::Dog);
    println!("This animal is {} years old", new_animal.age);

    new_animal.check_type();
    new_animal.change_to_cat();
    new_animal.check_type();
    new_animal.change_to_dog();
    new_animal.check_type();
}