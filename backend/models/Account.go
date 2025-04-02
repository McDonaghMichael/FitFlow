package models

import "go.mongodb.org/mongo-driver/v2/bson"

type Account struct {
	ID                 bson.ObjectID `bson:"_id" json:"id,omitempty"`
	Username           string        `json:"username"`
	Email              string        `json:"email"`
	Password           string        `json:"password"`
	ProfileImage       string        `json:"profile_image"`
	ProfileDescription string        `json:"profile_description"`
	CreatedDate        int           `json:"created_date"`
	UpdatedDate        int           `json:"updated_date"`
}
