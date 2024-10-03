package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/robmorgan/sws-stocks/backend/internal/api"
	"github.com/robmorgan/sws-stocks/backend/internal/database"
)

func main() {
	db, err := database.InitDB("../../../database/sws.sqlite3")
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()

	router := gin.Default()

	api.SetupRoutes(router, db)

	log.Println("Server is running on http://localhost:8080")
	http.ListenAndServe(":8080", router)
}
