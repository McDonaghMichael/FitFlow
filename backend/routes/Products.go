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

func FetchProducts(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		coll := client.Database(methods.GetDatabaseName()).Collection("products")

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

func FindProductByBarcode(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		barcodeNumber, _ := vars["barcode"]

		collection := client.Database(methods.GetDatabaseName()).Collection("products")

		var result bson.M

		b, _ := strconv.Atoi(barcodeNumber)
		filter := bson.D{{"barcodeNumber", b}}

		err := collection.FindOne(context.TODO(), filter).Decode(&result)

		if err != nil {
			log.Print(err)
		}

		json.NewEncoder(w).Encode(result)
	}
}
