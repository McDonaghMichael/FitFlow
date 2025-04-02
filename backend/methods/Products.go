package methods

import (
	"context"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"log"
	"strconv"
)

func FindProductByBarcode(client *mongo.Client, barcodeNumber string) any {

	collection := client.Database(GetDatabaseName()).Collection("products")

	var result bson.M

	b, _ := strconv.Atoi(barcodeNumber)
	filter := bson.D{{"barcodeNumber", b}}

	err := collection.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		log.Print(err)
	}

	return result
}
