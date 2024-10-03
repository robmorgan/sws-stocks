package api

import (
	"database/sql"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/robmorgan/sws-stocks/backend/internal/services"
)

type Handler struct {
	CompanyService *services.CompanyService
}

func NewHandler(companyService *services.CompanyService) *Handler {
	return &Handler{CompanyService: companyService}
}

func (h *Handler) Home(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to sws-stocks API",
	})
}

func (h *Handler) GetCompanies(c *gin.Context) {
	sort := c.Query("sort")
	filter := make(map[string]string)
	if exchangeSymbol := c.Query("exchange_symbol"); exchangeSymbol != "" {
		filter["exchange_symbol"] = exchangeSymbol
	}
	if minScore := c.Query("min_score"); minScore != "" {
		filter["min_score"] = minScore
	}

	includePrices := c.Query("includePrices") == "true"

	companies, err := h.CompanyService.GetCompanies(sort, filter, includePrices)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, companies)
}

func SetupRoutes(router *gin.Engine, db *sql.DB) {
	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	router.Use(cors.New(config))

	companyService := services.NewCompanyService(db)
	handler := NewHandler(companyService)

	router.GET("/", handler.Home)
	router.GET("/v1/companies", handler.GetCompanies)
}
