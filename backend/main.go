package main

import (
	"backend/routes"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"log"
	"net/http"
	"os"
)

func main() {

	envError := godotenv.Load("./.env")

	if envError != nil {
		log.Fatalln("[FAILURE] Error loading .env file")
	} else {
		log.Default().Println("[SUCCESS] Loaded .env file")
	}

	uri := os.Getenv("MONGO_DATABASE_URL")

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Print("[FAILURE]", err)
	} else {
		log.Default().Println("[SUCCESS] Connected to MongoDB!")
	}

	r := mux.NewRouter()
	r.HandleFunc("/", handleHome)
	r.HandleFunc("/log/create", routes.CreateLog(client)).Methods("POST")
	r.HandleFunc("/logs", routes.FetchLogs(client)).Methods("GET")
	r.HandleFunc("/log/id/{id}", routes.FetchLogsByAccountId(client)).Methods("GET")
	r.HandleFunc("/account/create", routes.CreateAccount(client)).Methods("POST")
	r.HandleFunc("/account/update", routes.EditAccount(client)).Methods("POST")
	r.HandleFunc("/account/id/{id}", routes.FetchAccountByID(client)).Methods("GET")
	r.HandleFunc("/account/authenticate", routes.AuthenticateAccount(client))
	r.HandleFunc("/accounts", routes.FetchAccounts(client)).Methods("GET")
	r.HandleFunc("/products", routes.FetchProducts(client)).Methods("GET")
	r.HandleFunc("/product/{barcode}", routes.FindProductByBarcode(client)).Methods("GET")
	r.HandleFunc("/reviews", routes.FetchReviews(client)).Methods("GET")
	r.HandleFunc("/reviews/{barcode}", routes.FetchReviewsByBarcode(client)).Methods("GET")
	r.HandleFunc("/review/create", routes.CreateReview(client)).Methods("POST")
	r.HandleFunc("/review/rating/{barcode}", routes.FetchRating(client)).Methods("GET")

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://185.81.166.93:4200", "http://localhost:4200", "https://fitflow.mcdonagh.xyz"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}).Handler(r)

	err = http.ListenAndServe(":8181", corsHandler)
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}
