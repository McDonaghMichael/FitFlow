package models

type Account struct {
	ID                 string   json:"id,omitempty"`
	Username           string   `json:"username"`
	Email              string   `json:"email"`
	Password           string   `json:"password"`
	ProfileImage       string   `json:"profile_image"`
	ProfileDescription string   `json:"profile_description"`
	DarkMode           *bool    `json:"DarkMode,omitempty" bson:"dark_mode,omitempty"`
	Height             *float64 `json:"height,omitempty" bson:"height,omitempty"`
	Weight             *float64 `json:"weight,omitempty" bson:"weight,omitempty"`
	Gender             *float64 `json:"gender,omitempty" bson:"gender,omitempty"`
	DailyProteinIntake *int     `json:"DailyProteinIntake,omitempty" bson:"daily_protein_intake,omitempty"`
	DailyStepGoal      *int     `json:"DailyStepGoal,omitempty" bson:"daily_step_goal,omitempty"`
	CalorieIntake      *int     `json:"CalorieIntake,omitempty" bson:"calorie_intake,omitempty"`
	WaterReminder      *bool    `json:"WaterReminder,omitempty" bson:"water_reminder,omitempty"`
	CreatedDate        int      `json:"created_date"`
	UpdatedDate        int      `json:"updated_date"`
}
