package main

import (
	"html/template"
	"net/http"
)

type Item struct {
	Type	string
	Count	int
	Price	int
}

type ShoppingData struct {
	ShoppingList	string
	Items					[]Item
}

func main() {
	tmpl := template.Must(template.ParseFiles("layout.html"))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := ShoppingData{
			ShoppingList: "My Shoppinglist",
			Items: []Item{
				{Type: "Apple", Count: 5, Price: 5},
				{Type: "Banana", Count: 15, Price: 15},
				{Type: "Orange", Count: 12, Price: 12},
			},
		}
		tmpl.Execute(w, data)
	})
	http.ListenAndServe(":3001", nil)

}