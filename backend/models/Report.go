package models

type Report struct {
	Reporter    string `json:"reporter"`
	Message     string `json:"message"`
	CreatedDate string `json:"created_date"`
}
