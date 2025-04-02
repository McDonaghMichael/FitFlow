package routes

import (
	"backend/methods"
	"context"
	"encoding/json"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"log"
	"net/http"
	"strconv"
)

func CreateReview(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "application/json")

		var review map[string]interface{}

		err := json.NewDecoder(r.Body).Decode(&review)
		if err != nil {
			log.Println("Error decoding JSON:", err)
			http.Error(w, "Invalid JSON request", http.StatusBadRequest)
			return
		}

		collection := client.Database(methods.GetDatabaseName()).Collection("reviews")

		result, err := collection.InsertOne(context.TODO(), bson.M{
			"reviewer":      review["reviewer"],
			"message":       review["message"],
			"rating":        review["rating"],
			"barcodeNumber": review["barcodeNumber"],
			"created_date":  review["createdDate"],
		})
		if err != nil {
			log.Println("MongoDB Insert Error:", err)
			http.Error(w, "Failed to create review", http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"message": "Review has been posted",
			"id":      result.InsertedID,
			"review":  review,
		}

		json.NewEncoder(w).Encode(response)
	}
}

func FetchReviews(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		coll := client.Database(methods.GetDatabaseName()).Collection("reviews")

		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}

		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}

		json.NewEncoder(w).Encode(results)
	}
}

func FetchRating(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		barcodeNumber := vars["barcode"]

		coll := client.Database(methods.GetDatabaseName()).Collection("reviews")

		barCodeNumberInt, err := strconv.Atoi(barcodeNumber)
		log.Println(barCodeNumberInt)

		cursor, err := coll.Find(context.TODO(), bson.M{"barcodeNumber": barCodeNumberInt})
		if err != nil {
			http.Error(w, "Error fetching reviews", http.StatusInternalServerError)
			return
		}

		var reviews []bson.M
		if err := cursor.All(context.TODO(), &reviews); err != nil {
			http.Error(w, "Error decoding reviews", http.StatusInternalServerError)
			return
		}

		var ratings int

		for i := 0; i < len(reviews); i++ {
			log.Println(reviews[i]["rating"])

			ratingValue, ok := reviews[i]["rating"].(float64)
			if ok {
				ratings += int(ratingValue)
			} else {
				log.Println("Error: Rating value is not of type float64")
			}
		}

		var avgRating int
		if len(reviews) > 0 {
			avgRating = ratings / len(reviews)
		} else {
			avgRating = 0
		}
		json.NewEncoder(w).Encode(avgRating)
	}
}

func FetchReviewsByBarcode(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		barcodeNumber := vars["barcode"]

		coll := client.Database(methods.GetDatabaseName()).Collection("reviews")

		barCodeNumberInt, err := strconv.Atoi(barcodeNumber)
		log.Println(barCodeNumberInt)

		cursor, err := coll.Find(context.TODO(), bson.M{"barcodeNumber": barCodeNumberInt})
		if err != nil {
			http.Error(w, "Error fetching reviews", http.StatusInternalServerError)
			return
		}

		var reviews []bson.M
		if err := cursor.All(context.TODO(), &reviews); err != nil {
			http.Error(w, "Error decoding reviews", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(reviews)
	}
}
