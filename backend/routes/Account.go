package routes

import (
	"backend/methods"
	"backend/models"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"log"
	"net/http"
)

func CreateAccount(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		var account models.Account

		err := json.NewDecoder(r.Body).Decode(&account)
		if err != nil {
			log.Println("Error decoding JSON:", err)
			http.Error(w, "Invalid JSON request", http.StatusBadRequest)
			return
		}

		collection := client.Database(methods.GetDatabaseName()).Collection("accounts")

		var existing models.Account

		filter := bson.M{"username": account.Username}
		err = collection.FindOne(context.TODO(), filter).Decode(&existing)

		filter2 := bson.M{"email": account.Email}
		err2 := collection.FindOne(context.TODO(), filter2).Decode(&existing)

		if err == nil {
			http.Error(w, "Username is taken", http.StatusConflict)
			log.Println("username conflict:", account.Username)
			return
		} else if err2 == nil {
			http.Error(w, "Email is taken", http.StatusConflict)
			log.Println("Email conflict:", account.Email)
			return
		} else if err != mongo.ErrNoDocuments {
			http.Error(w, "Database error", http.StatusInternalServerError)
			log.Println("MongoDB FindOne error:", err)
			return
		}

		hashedPassword, err := methods.HashPassword(account.Password)
		result, err := collection.InsertOne(context.TODO(), bson.M{
			"username":    account.Username,
			"email":       account.Email,
			"password":    hashedPassword,
			"createdDate": account.CreatedDate,
			"updatedDate": account.UpdatedDate,
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

func FetchAccounts(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		collection := client.Database(methods.GetDatabaseName()).Collection("accounts")

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

func FetchAccountByID(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")

		vars := mux.Vars(r)
		id, _ := bson.ObjectIDFromHex(vars["id"])

		collection := client.Database(methods.GetDatabaseName()).Collection("accounts")

		filter := bson.D{{"_id", id}}

		var result bson.M
		err := collection.FindOne(context.TODO(), filter).Decode(&result)

		if err != nil {
			log.Print(err)
			return
		}

		json.NewEncoder(w).Encode(result)
	}
}

func AuthenticateAccount(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")

		var account models.Account
		err := json.NewDecoder(r.Body).Decode(&account)

		if err != nil {
			http.Error(w, "Invalid JSON request", http.StatusBadRequest)
			fmt.Println("Error decoding JSON:", err)
			return
		}

		collection := client.Database(methods.GetDatabaseName()).Collection("accounts")

		filter := bson.D{
			{Key: "email", Value: account.Email}}

		var result models.Account
		error := collection.FindOne(context.TODO(), filter).Decode(&result)

		if error != nil {
			http.Error(w, "Account not found", http.StatusNotFound)
			log.Println(error)
			return
		}

		auth := methods.VerifyPassword(account.Password, result.Password)
		if auth == false {
			log.Println(error)
			return
		}

		response := map[string]interface{}{
			"message":       "Account has been successfully authenticated",
			"authenticated": auth,
			"account": map[string]interface{}{
				"id":    result.ID,
				"email": result.Email,
			},
		}

		json.NewEncoder(w).Encode(response)
	}
}

func EditAccount(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		collection := client.Database(methods.GetDatabaseName()).Collection("accounts")

		var account models.Account
		err := json.NewDecoder(r.Body).Decode(&account)
		if err != nil {
			http.Error(w, "Invalid JSON request", http.StatusBadRequest)
			log.Println("Error decoding JSON:", err)
			return
		}

		objectID, err := bson.ObjectIDFromHex(account.ID)
		if err != nil {
			http.Error(w, "Invalid ID format", http.StatusBadRequest)
			log.Println("Invalid ObjectID:", err)
			return
		}

		filter := bson.M{"_id": objectID}

		updateFields := bson.M{
			"updated_date": account.UpdatedDate,
		}

		if account.Username != "" {
			updateFields["username"] = account.Username
		}

		if account.Email != "" {
			updateFields["email"] = account.Email
		}

		if account.Height != nil {
			updateFields["height"] = *account.Height
		}

		if account.Weight != nil {
			updateFields["weight"] = *account.Weight
		}

		if account.Gender != nil {
			updateFields["gender"] = *account.Gender
		}

		if account.DarkMode != nil {
			updateFields["dark_mode"] = *account.DarkMode
		}

		if account.WaterReminder != nil {
			updateFields["water_reminder"] = *account.WaterReminder
		}

		if account.DailyProteinIntake != nil {
			updateFields["daily_protein_intake"] = *account.DailyProteinIntake
		}

		if account.DailyStepGoal != nil {
			updateFields["daily_step_goal"] = *account.DailyStepGoal
		}

		if account.CalorieIntake != nil {
			updateFields["calorie_intake"] = *account.CalorieIntake
		}

		if account.Password != "" {
			hashedPassword, err := methods.HashPassword(account.Password)
			if err != nil {
				http.Error(w, "Error hashing password", http.StatusInternalServerError)
				log.Println("Error hashing password:", err)
				return
			}
			updateFields["password"] = hashedPassword
		}

		update := bson.M{"$set": updateFields}

		result, err := collection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			http.Error(w, "Failed to update account", http.StatusInternalServerError)
			log.Println("MongoDB Update Error:", err)
			return
		}

		if result.ModifiedCount == 0 {
			http.Error(w, "No account updated", http.StatusNotFound)
			log.Println("No account updated for:", account.ID)
			return
		}

		response := map[string]string{"message": "Account updated successfully"}
		json.NewEncoder(w).Encode(response)
	}
}
