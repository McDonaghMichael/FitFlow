package models

type Review struct {
	Reviewer      string `json:"reviewer"`
	Message       string `json:"message"`
	BarcodeNumber int    `json:"barcodeNumber"`
	Rating        int    `json:"rating"`
	CreatedDate   string `json:"created_date"`
}
