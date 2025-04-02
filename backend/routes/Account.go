package routes

import (
	"backend/methods"
	"backend/models"
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"log"
	"net/http"
)

func CreateAccount(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "application/json")

		var account models.Account

		err := json.NewDecoder(r.Body).Decode(&account)
		if err != nil {
			log.Println("Error decoding JSON:", err)
			http.Error(w, "Invalid JSON request", http.StatusBadRequest)
			return
		}

		collection := client.Database(methods.GetDatabaseName()).Collection("accounts")

		hashedPassword, err := methods.HashPassword(account.Password)
		result, err := collection.InsertOne(context.TODO(), bson.M{
			"first_name":   account.FirstName,
			"last_name":    account.LastName,
			"username":     account.Username,
			"email":        account.Email,
			"password":     hashedPassword,
			"created_date": account.CreatedDate,
			"updated_date": account.UpdatedDate,
		})
		if err != nil {
			log.Println("MongoDB Insert Error:", err)
			http.Error(w, "Failed to create page", http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"message": "Account has been successfully created",
			"id":      result.InsertedID,
			"account": account,
		}

		json.NewEncoder(w).Encode(response)
	}
}
