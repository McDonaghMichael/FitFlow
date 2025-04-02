package routes

import (
	"backend/methods"
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"net/http"
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
