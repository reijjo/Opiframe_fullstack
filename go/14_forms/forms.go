package main

import (
	"html/template"
	"net/http"
)

type Item struct {
	Type	string
	Count string
	Price string
}

type ShoppingData struct {
	ShoppingList	string
	Items 				[]Item
	Success				bool
}

func main() {
	data := ShoppingData{"My Data", []Item{}, false}

	tmpl := template.Must(template.ParseFiles("form.html"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			tmpl.Execute(w, nil)
			data.Success = true
			return
		}
		details := Item{
			Type: r.FormValue("type"),
			Count: r.FormValue("count"),
			Price: r.FormValue("price"),
		}
		data.Items = append(data.Items, details)

		tmpl.Execute(w, data)
		data.Success = false
	})

	http.ListenAndServe(":3001", nil)
}