package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "<h2>Hello, World!</h2>")
	})
	http.ListenAndServe(":3001", nil)
}