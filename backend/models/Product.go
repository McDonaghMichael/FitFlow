package models

type Product struct {
	Name          string `json:"brand"`
	Brand         string `json:"brand"`
	Calories      int    `json:"calories"`
	Carbs         int    `json:"carbs"`
	Protein       int    `json:"protein"`
	Fibre         int    `json:"fibre"`
	Grams         int    `json:"grams"`
	BarcodeNumber int    `json:"barcodeNumber"`
}
