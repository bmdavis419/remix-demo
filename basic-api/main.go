package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	app := fiber.New()

	app.Use(limiter.New(limiter.Config{Max: 30, Expiration: 10 * time.Second}))
	app.Use(auth_check)

	// setup mongodb
	uri := get_db_uri()
	db := "insiderviz"
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err = client.Disconnect(context.Background()); err != nil {
			panic(err)
		}
	}()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Get("/aapl", func(c *fiber.Ctx) error {
		// set the query
		query := bson.M{"issuer.issuerCik": "0000320193", "reporters.reporterCik": "0001214156"}
		opts := options.Find().SetLimit(10).SetSort(bson.D{{Key: "periodOfReport", Value: -1}})

		// get the collection
		collection := client.Database(db).Collection("DeltaForm")

		// find the documents
		cursor, err := collection.Find(context.Background(), query, opts)
		if err != nil {
			log.Fatal(err)
		}

		// create a slice to store the documents in
		var results []DB_DeltaForm

		// iterate over the documents
		if err = cursor.All(context.Background(), &results); err != nil {
			log.Fatal(err)
		}

		return c.JSON(results)
	})

	app.Get("/amzn", func(c *fiber.Ctx) error {
		// set the query
		query := bson.M{"issuer.issuerCik": "0001018724", "reporters.reporterCik": "0001043298"}
		opts := options.Find().SetLimit(10).SetSort(bson.D{{Key: "periodOfReport", Value: -1}})

		// get the collection
		collection := client.Database(db).Collection("DeltaForm")

		// find the documents
		cursor, err := collection.Find(context.Background(), query, opts)
		if err != nil {
			log.Fatal(err)
		}

		// create a slice to store the documents in
		var results []DB_DeltaForm

		// iterate over the documents
		if err = cursor.All(context.Background(), &results); err != nil {
			log.Fatal(err)
		}

		return c.JSON(results)
	})

	app.Get("/meta", func(c *fiber.Ctx) error {
		// set the query
		query := bson.M{"issuer.issuerCik": "0001326801", "reporters.reporterCik": "0001548760"}
		opts := options.Find().SetLimit(10).SetSort(bson.D{{Key: "periodOfReport", Value: -1}})

		// get the collection
		collection := client.Database(db).Collection("DeltaForm")

		// find the documents
		cursor, err := collection.Find(context.Background(), query, opts)
		if err != nil {
			log.Fatal(err)
		}

		// create a slice to store the documents in
		var results []DB_DeltaForm

		// iterate over the documents
		if err = cursor.All(context.Background(), &results); err != nil {
			log.Fatal(err)
		}

		return c.JSON(results)
	})

	app.Get("/tsla", func(c *fiber.Ctx) error {
		// set the query
		query := bson.M{"issuer.issuerCik": "0001318605", "reporters.reporterCik": "0001494730"}
		opts := options.Find().SetLimit(10).SetSort(bson.D{{Key: "periodOfReport", Value: -1}})

		// get the collection
		collection := client.Database(db).Collection("DeltaForm")

		// find the documents
		cursor, err := collection.Find(context.Background(), query, opts)
		if err != nil {
			log.Fatal(err)
		}

		// create a slice to store the documents in
		var results []DB_DeltaForm

		// iterate over the documents
		if err = cursor.All(context.Background(), &results); err != nil {
			log.Fatal(err)
		}

		return c.JSON(results)
	})

	app.Get("/:cik", func(c *fiber.Ctx) error {
		// get cik from url
		cik := c.Params("cik")

		// set the query
		query := bson.M{"issuer.issuerCik": cik}
		opts := options.Find().SetLimit(10).SetSort(bson.D{{Key: "periodOfReport", Value: -1}})

		// get the collection
		collection := client.Database(db).Collection("DeltaForm")

		// find the documents
		cursor, err := collection.Find(context.Background(), query, opts)
		if err != nil {
			log.Fatal(err)
		}

		// create a slice to store the documents in
		var results []DB_DeltaForm

		// iterate over the documents
		if err = cursor.All(context.Background(), &results); err != nil {
			log.Fatal(err)
		}

		return c.JSON(results)
	})

	app.Listen(":" + get_port())
}

func auth_check(c *fiber.Ctx) error {
	// check the header
	sentAuth := c.Get("x-api-key")
	realAuth := get_api_key()

	if sentAuth != realAuth {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	return c.Next()
}

func get_port() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	return port
}

func get_api_key() string {
	// check if prod
	if os.Getenv("PROD") == "true" {
		return os.Getenv("API_KEY")
	}

	return "123456"
}

func get_db_uri() string {
	// check if prod
	if os.Getenv("PROD") == "true" {
		return os.Getenv("MONGODB_URI")
	}

	// get the db uri from the .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return os.Getenv("MONGODB_URI")
}

type DB_DeltaForm struct {
	AccessionNumber       string          `json:"accessionNumber" bson:"accessionNumber"`
	FormClass             string          `json:"formClass" bson:"formClass"`
	PeriodOfReport        string          `json:"periodOfReport" bson:"periodOfReport"`
	AveragePricePerShare  float32         `json:"averagePricePerShare" bson:"averagePricePerShare"`
	NetTotal              float32         `json:"netTotal" bson:"netTotal"`
	SharesTraded          float32         `json:"sharesTraded" bson:"sharesTraded"`
	PostTransactionShares float32         `json:"postTransactionShares" bson:"postTransactionShares"`
	BuyOrSell             string          `json:"buyOrSell" bson:"buyOrSell"`
	Url                   string          `json:"url" bson:"url"`
	DateAdded             string          `json:"dateAdded" bson:"dateAdded"`
	PercentChange         int             `json:"percentChange" bson:"percentChange"`
	Issuer                DB_Issuer       `json:"issuer" bson:"issuer"`
	Reporters             []DB_Reporter   `json:"reporters" bson:"reporters"`
	IssuerEmailInfo       DB_Issuer_Email `json:"issuerEmailInfo" bson:"issuerEmailInfo"`
}

type DB_Issuer_Email struct {
	InsiderBuys   bool `json:"insiderBuys" bson:"insiderBuys"`
	InsiderSells  bool `json:"insiderSells" bson:"insiderSells"`
	CongressBuys  bool `json:"congressBuys" bson:"congressBuys"`
	CongressSells bool `json:"congressSells" bson:"congressSells"`
}

type DB_Issuer struct {
	IssuerCik      string `json:"issuerCik" bson:"issuerCik"`
	IssuerName     string `json:"issuerName" bson:"issuerName"`
	IssuerTicker   string `json:"issuerTicker" bson:"issuerTicker"`
	IssuerSector   string `json:"issuerSector" bson:"issuerSector"`
	IssuerIndustry string `json:"issuerIndustry" bson:"issuerIndustry"`
}

type DB_Reporter struct {
	ReporterCik     string `json:"reporterCik" bson:"reporterCik"`
	ReporterName    string `json:"reporterName" bson:"reporterName"`
	ReporterTitle   string `json:"reporterTitle" bson:"reporterTitle"`
	ReporterAddress string `json:"reporterAddress" bson:"reporterAddress"`
}
