import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

const ContactList = () => {
  const [state, setState] = useState({
    list: [
      {
        firstname: "Wade",
        lastname: "Madden",
        autoincrement: 1,
      },
      {
        firstname: "Ariana",
        lastname: "Patterson",
        autoincrement: 2,
      },
      {
        firstname: "Aiko",
        lastname: "Keith",
        autoincrement: 3,
      },
      {
        firstname: "Kirsten",
        lastname: "Sparks",
        autoincrement: 4,
      },
      {
        firstname: "Sonya",
        lastname: "Nixon",
        autoincrement: 5,
      },
      {
        firstname: "Ainsley",
        lastname: "Fuentes",
        autoincrement: 6,
      },
      {
        firstname: "Brynn",
        lastname: "Woods",
        autoincrement: 7,
      },
      {
        firstname: "Melyssa",
        lastname: "Carter",
        autoincrement: 8,
      },
      {
        firstname: "Brielle",
        lastname: "Salinas",
        autoincrement: 9,
      },
      {
        firstname: "Jerome",
        lastname: "Randolph",
        autoincrement: 10,
      },
      {
        firstname: "Stewart",
        lastname: "Johnston",
        autoincrement: 11,
      },
      {
        firstname: "Mariam",
        lastname: "Patel",
        autoincrement: 12,
      },
      {
        firstname: "Camille",
        lastname: "Branch",
        autoincrement: 13,
      },
      {
        firstname: "Irma",
        lastname: "Craig",
        autoincrement: 14,
      },
      {
        firstname: "Forrest",
        lastname: "Buchanan",
        autoincrement: 15,
      },
      {
        firstname: "Lance",
        lastname: "Webster",
        autoincrement: 16,
      },
      {
        firstname: "Isadora",
        lastname: "Weiss",
        autoincrement: 17,
      },
      {
        firstname: "Elijah",
        lastname: "Gamble",
        autoincrement: 18,
      },
      {
        firstname: "Desirae",
        lastname: "Romero",
        autoincrement: 19,
      },
      {
        firstname: "Melanie",
        lastname: "Massey",
        autoincrement: 20,
      },
      {
        firstname: "Deacon",
        lastname: "Becker",
        autoincrement: 21,
      },
      {
        firstname: "Holmes",
        lastname: "Bruce",
        autoincrement: 22,
      },
      {
        firstname: "Yael",
        lastname: "Evans",
        autoincrement: 23,
      },
      {
        firstname: "Willa",
        lastname: "O'Neill",
        autoincrement: 24,
      },
      {
        firstname: "Lev",
        lastname: "Donaldson",
        autoincrement: 25,
      },
      {
        firstname: "Evelyn",
        lastname: "Vazquez",
        autoincrement: 26,
      },
      {
        firstname: "Channing",
        lastname: "Weber",
        autoincrement: 27,
      },
      {
        firstname: "Giselle",
        lastname: "Reeves",
        autoincrement: 28,
      },
      {
        firstname: "Dahlia",
        lastname: "Vazquez",
        autoincrement: 29,
      },
      {
        firstname: "Vera",
        lastname: "Foley",
        autoincrement: 30,
      },
      {
        firstname: "Mohammad",
        lastname: "Savage",
        autoincrement: 31,
      },
      {
        firstname: "Justina",
        lastname: "Hartman",
        autoincrement: 32,
      },
      {
        firstname: "Ashton",
        lastname: "Navarro",
        autoincrement: 33,
      },
      {
        firstname: "Aaron",
        lastname: "Dixon",
        autoincrement: 34,
      },
      {
        firstname: "Deborah",
        lastname: "Tate",
        autoincrement: 35,
      },
      {
        firstname: "Diana",
        lastname: "Salas",
        autoincrement: 36,
      },
      {
        firstname: "Christen",
        lastname: "Price",
        autoincrement: 37,
      },
      {
        firstname: "Kasper",
        lastname: "Allen",
        autoincrement: 38,
      },
      {
        firstname: "Zoe",
        lastname: "Buck",
        autoincrement: 39,
      },
      {
        firstname: "Arthur",
        lastname: "Hawkins",
        autoincrement: 40,
      },
      {
        firstname: "Amelia",
        lastname: "Gonzales",
        autoincrement: 41,
      },
      {
        firstname: "Jenette",
        lastname: "Golden",
        autoincrement: 42,
      },
      {
        firstname: "Maisie",
        lastname: "Atkinson",
        autoincrement: 43,
      },
      {
        firstname: "Cole",
        lastname: "Golden",
        autoincrement: 44,
      },
      {
        firstname: "Hermione",
        lastname: "Cannon",
        autoincrement: 45,
      },
      {
        firstname: "Ralph",
        lastname: "Daniels",
        autoincrement: 46,
      },
      {
        firstname: "Jasper",
        lastname: "Hamilton",
        autoincrement: 47,
      },
      {
        firstname: "Zephania",
        lastname: "Mueller",
        autoincrement: 48,
      },
      {
        firstname: "Erasmus",
        lastname: "Clay",
        autoincrement: 49,
      },
      {
        firstname: "Emi",
        lastname: "Landry",
        autoincrement: 50,
      },
      {
        firstname: "Gillian",
        lastname: "Atkins",
        autoincrement: 51,
      },
      {
        firstname: "Coby",
        lastname: "O'donnell",
        autoincrement: 52,
      },
      {
        firstname: "Bryar",
        lastname: "Saunders",
        autoincrement: 53,
      },
      {
        firstname: "Bree",
        lastname: "Hutchinson",
        autoincrement: 54,
      },
      {
        firstname: "Samuel",
        lastname: "Herring",
        autoincrement: 55,
      },
      {
        firstname: "Quynn",
        lastname: "Mckenzie",
        autoincrement: 56,
      },
      {
        firstname: "Lev",
        lastname: "Clark",
        autoincrement: 57,
      },
      {
        firstname: "Tanek",
        lastname: "Fischer",
        autoincrement: 58,
      },
      {
        firstname: "Ivana",
        lastname: "Woods",
        autoincrement: 59,
      },
      {
        firstname: "Joan",
        lastname: "Morgan",
        autoincrement: 60,
      },
      {
        firstname: "Brooke",
        lastname: "Stark",
        autoincrement: 61,
      },
      {
        firstname: "Sandra",
        lastname: "Glass",
        autoincrement: 62,
      },
      {
        firstname: "Holly",
        lastname: "Potter",
        autoincrement: 63,
      },
      {
        firstname: "Rylee",
        lastname: "Reeves",
        autoincrement: 64,
      },
      {
        firstname: "Eagan",
        lastname: "Pate",
        autoincrement: 65,
      },
      {
        firstname: "Teagan",
        lastname: "Dalton",
        autoincrement: 66,
      },
      {
        firstname: "Amaya",
        lastname: "Rasmussen",
        autoincrement: 67,
      },
      {
        firstname: "Dara",
        lastname: "George",
        autoincrement: 68,
      },
      {
        firstname: "Yuli",
        lastname: "Gonzales",
        autoincrement: 69,
      },
      {
        firstname: "Winter",
        lastname: "Lee",
        autoincrement: 70,
      },
      {
        firstname: "Graham",
        lastname: "Roach",
        autoincrement: 71,
      },
      {
        firstname: "Christian",
        lastname: "Farrell",
        autoincrement: 72,
      },
      {
        firstname: "Scott",
        lastname: "Bright",
        autoincrement: 73,
      },
      {
        firstname: "Dara",
        lastname: "Wyatt",
        autoincrement: 74,
      },
      {
        firstname: "Eric",
        lastname: "Barnett",
        autoincrement: 75,
      },
      {
        firstname: "Paul",
        lastname: "Pittman",
        autoincrement: 76,
      },
      {
        firstname: "Tad",
        lastname: "Mendez",
        autoincrement: 77,
      },
      {
        firstname: "Malik",
        lastname: "Juarez",
        autoincrement: 78,
      },
      {
        firstname: "Candice",
        lastname: "Boyle",
        autoincrement: 79,
      },
      {
        firstname: "Indigo",
        lastname: "Barlow",
        autoincrement: 80,
      },
      {
        firstname: "Jacob",
        lastname: "Trujillo",
        autoincrement: 81,
      },
      {
        firstname: "Vincent",
        lastname: "Orr",
        autoincrement: 82,
      },
      {
        firstname: "Joelle",
        lastname: "Burks",
        autoincrement: 83,
      },
      {
        firstname: "Camille",
        lastname: "Noel",
        autoincrement: 84,
      },
      {
        firstname: "James",
        lastname: "Bray",
        autoincrement: 85,
      },
      {
        firstname: "Ann",
        lastname: "Willis",
        autoincrement: 86,
      },
      {
        firstname: "Keith",
        lastname: "Gross",
        autoincrement: 87,
      },
      {
        firstname: "Tamekah",
        lastname: "Santiago",
        autoincrement: 88,
      },
      {
        firstname: "Michael",
        lastname: "Malone",
        autoincrement: 89,
      },
      {
        firstname: "Nora",
        lastname: "Rogers",
        autoincrement: 90,
      },
      {
        firstname: "Hayden",
        lastname: "Stuart",
        autoincrement: 91,
      },
      {
        firstname: "Irene",
        lastname: "Olsen",
        autoincrement: 92,
      },
      {
        firstname: "Oscar",
        lastname: "Jennings",
        autoincrement: 93,
      },
      {
        firstname: "Paloma",
        lastname: "Mosley",
        autoincrement: 94,
      },
      {
        firstname: "Nerea",
        lastname: "Woodard",
        autoincrement: 95,
      },
      {
        firstname: "Allegra",
        lastname: "Pearson",
        autoincrement: 96,
      },
      {
        firstname: "Mercedes",
        lastname: "Hayes",
        autoincrement: 97,
      },
      {
        firstname: "Thomas",
        lastname: "Blair",
        autoincrement: 98,
      },
      {
        firstname: "Cassady",
        lastname: "Hardin",
        autoincrement: 99,
      },
      {
        firstname: "Bree",
        lastname: "Guerra",
        autoincrement: 100,
      },
    ],
  });

  const removeContact = (autoincrement) => {
    setState((state) => {
      let tempList = state.list.filter(
        (contact) => contact.autoincrement !== autoincrement
      );
      return {
        list: tempList,
      };
    });
  };

  return (
    <View>
      <FlatList
        data={state.list}
        renderItem={({ item }) => {
          return (
            <View style={styles.rowStyle}>
              <Text style={styles.textStyle}>
                {item.firstname} {item.lastname}
              </Text>
              <Pressable
                style={styles.buttonStyle}
                onPress={() => removeContact(item.autoincrement)}
              >
                <Text style={styles.buttonTextStyle}>Remove</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  textStyle: {
    fontFamily: "Arial",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonStyle: {
    width: 80,
    height: 50,
    borderRadius: 5,
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    color: "white",
  },
});

export default ContactList;
