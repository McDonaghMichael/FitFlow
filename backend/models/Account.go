package models

type Account struct {
	Username           string `json:"username"`
	Email              string `json:"email"`
	Password           string `json:"password"`
	ProfileImage       string `json:"profile_image"`
	ProfileDescription string `json:"profile_description"`
	CreatedDate        int    `json:"created_date"`
	UpdatedDate        int    `json:"updated_date"`
}
