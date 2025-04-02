package models

type Account struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Username    string `json:"username"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	CreatedDate string `json:"created_date"`
	UpdatedDate string `json:"updated_date"`
}
