package models

type Goals struct {
	DailyProteinIntake int `json:"daily_protein_intake"`
	DailyStepGoal      int `json:"daily_step_goal"`
	CalorieIntake      int `json:"calorie_intake"`
}
