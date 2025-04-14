package models

import "go.mongodb.org/mongo-driver/v2/bson"

type Account struct {
	ID                 bson.ObjectID `bson:"_id" json:"id,omitempty"`
	Username           string        `json:"username"`
	Email              string        `json:"email"`
	Password           string        `json:"password"`
	ProfileImage       string        `json:"profile_image"`
	ProfileDescription string        `json:"profile_description"`
	DarkMode           *bool         `json:"dark_mode,omitempty"`
	Height             int           `json:"height"`
	Weight             int           `json:"weight"`
	Gender             string        `json:"gender"`
	DailyProteinIntake int           `json:"daily_protein_intake"`
	DailyStepGoal      int           `json:"daily_step_goal"`
	CalorieIntake      int           `json:"calorie_intake"`
	WaterReminder      bool          `json:"water_reminder"`
	CreatedDate        int           `json:"created_date"`
	UpdatedDate        int           `json:"updated_date"`
}
