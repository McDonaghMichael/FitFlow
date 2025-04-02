package models

type Account struct {
	FirstName          string `json:"first_name"`
	LastName           string `json:"last_name"`
	Username           string `json:"username"`
	Email              string `json:"email"`
	Password           string `json:"password"`
	ProfileImage       string `json:"profile_image"`
	ProfileDescription string `json:"profile_description"`
	CreatedDate        string `json:"created_date"`
	UpdatedDate        string `json:"updated_date"`
}
