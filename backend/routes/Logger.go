package routes

import (
	"backend/methods"
	"backend/models"
	"context"
	"encoding/json"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"log"
	"net/http"
)

func CreateLog(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "application/json")

		var record models.Logger

		err := json.NewDecoder(r.Body).Decode(&record)
		if err != nil {
			log.Println("Error decoding JSON:", err)
			http.Error(w, "Invalid JSON request", http.StatusBadRequest)
			return
		}

		collection := client.Database(methods.GetDatabaseName()).Collection("logs")

		result, err := collection.InsertOne(context.TODO(), bson.M{
			"accountId":     record.AccountID,
			"barcodeNumber": record.BarcodeNumber,
		})
		if err != nil {
			log.Println("MongoDB Insert Error:", err)
			http.Error(w, "Failed to create log", http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"message": "Record has been logged",
			"id":      result.InsertedID,
			"log":     record,
		}

		json.NewEncoder(w).Encode(response)
	}
}

func FetchLogs(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")

		collection := client.Database(methods.GetDatabaseName()).Collection("logs")

		cursor, err := collection.Find(context.TODO(), bson.D{})
		if err != nil {
			log.Println(err)
			return
		}

		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			log.Println(err)
		}

		json.NewEncoder(w).Encode(results)
	}
}

func FetchLogsByAccountId(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		accountId := vars["id"]

		coll := client.Database(methods.GetDatabaseName()).Collection("logs")

		cursor, err := coll.Find(context.TODO(), bson.M{"accountId": accountId})
		if err != nil {
			http.Error(w, "Error fetching logs", http.StatusInternalServerError)
			return
		}

		var records []bson.M
		if err := cursor.All(context.TODO(), &records); err != nil {
			http.Error(w, "Error decoding logs", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(records)
	}
}
