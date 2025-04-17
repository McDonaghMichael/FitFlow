**LIVE Preview:** https://fitflow.mcdonagh.xyz

## Project Background

**FitFlow** is a mobile application developed by myself that allows for people to track their calories, carbs from food and drinks, as well as leave reviews on different items to allow others to know what is being said in regard to the item. There are many other different features including *goal tracking*, *change appearance of the app from light to dark mode which is synced across platforms along as you log in via the same accoun*t and *ability to edit your own profile.*

## Problem Statement

The problem I had with existing fitness and calorie tracking applications is that they rarely give you a sense of how other users actually experience a product. These apps tend to focus on calories, macros, ingredients, but they completely overlook *how did someone feel after using this product?* *Did it actually help with energy, recovery, or performance?* *Was the taste tolerable? Did it cause any side effects?* **There are so many questions that numbers alone can’t answer.** Far too often, we rely on product labels or marketing claims that can create a false sense of confidence, suggesting that a product is effective or beneficial, when in reality, it might not be the right fit for everyone. What’s missing is a space where people can openly share their real-world experiences and insights, helping others make more informed and personalized decisions based on actual outcomes, not just what the label or app says. That’s the gap I want to bridge, giving users the ability to explore honest feedback that reflects real use.

## System Architecture

### Backend

When it comes to developing the backend of applications/websites, **GoLang** is the language of choice due to its impressive *speed*, *low memory usage* and much *better concurrency* for handling requests. This makes it a perfect language for having a fast responsive backend that can scale well.

The go package used was `gorilla/mux` which is a fast light weight and easy to use http handler which let me manage all the `CRUD` operations with ease, as well as choosing which routes are `GET`, `POST`, etc.

### Database

The database of choice was **MongoDB** due to its **NoSQL** structure and **JSON** style approach. Choosing **MongoDB** made handling account creation, product logging, etc a lot easier rather than using something such as **MySQL**. There is also a lot less of a learning curve with **MongoDB** and very user friendly.

## Technologies Used

### Framework

The framework of choice for my application was **Ionic**. One of the many reasons for choosing **Ionic** was due to its large library of pre built components which makes creating a responsive flush User Interface a lot easier. Another reason was due to its *built in dark mode* which allowed me to seamlessly integrate the switch from dark and light mode for my application much easier without any hassle.

### Asynchronous Operations

Throughout my application you can see the use of my custom services such as `account.service.ts`, `product.service.ts` and `logging.service.ts` which manage the `GET`, `PUT` and `POST` operations of my application alongside the use of **observables**.

### Backend Integration

In order to have full control over my application and ensure **maximum flexibility**, I made the decision to integrate it with a custom backend API that I developed from scratch using **Golang**. By building my own backend, I wasn’t limited by the constraints of third-party services like **firebase**. I could control every endpoint, data structure, and response specifically to the needs of the application. **Golang** was a natural choice due to its *performance*, *scalability*, and *low memory usage*, making it ideal for handling high volumes of API requests efficiently. This custom API manages everything from barcode scanning and product data retrieval to user authentication, review submissions, and real-time syncing between devices.

### Native Mobile Features

The Camera feature was the core feature of my application as it allowed users to scan the barcode of an item and see the relevant information about it. The NPM package used for integrating the application was `@zxing/ngx-scanner` which was really straight forward in its integration process and allowed me to use not only 8 digit barcodes but QR Codes and many others!

### Encryption

Since my application stores users passwords, I implemented a encryption using the GoLang package `crypto/bcrypt` which allowed me to hash and very passwords without any issues, keeping users data safe! The tutorial I followed to implemented it is here: https://medium.com/@rnp0728/secure-password-hashing-in-go-a-comprehensive-guide-5500e19e7c1f

## Challenges

There weren’t too many challenges I had faced when developing the application, the primary challenge however was accessing the camera of the device over a http protocol. Many devices such as iPhone which I have, don't allow access to the devices hardware when the protocol isn't secure. Although this is a very important check to have to keep our data secure and safe, it led me down many different paths to resolve this issue. At first I decided to use ngrok which allows redirecting the website over a secure network, there was some set backs with this implementation however. One of which is the domain has to be changed every time the system restarts, which when you must make various changes, it can be a mess!

The solution I came up with was to purchase a domain [**mcdonagh.xyz**](http://mcdonagh.xyz) and host both the backend and frontend on my server which I pay for every month anyways. The server is Linux and I used nginx for handling the routing of the domains. Once I had install my application and setup the domain DNS correcting I was able to access the devices system hardware over a secure network. In addition I also used **certbot** to allow me to self sign a certificate to use with my sub domains.

## Solutions Implemented

The solution to my original problem was fully realized through the development of this application. With it, users can simply scan the barcode of any product and instantly access detailed information, not just the standard facts, but also real, user-generated reviews and experiences. This added layer of insight gives users a much more realistic understanding of what to expect when purchasing or using the product. Instead of relying solely on marketing claims or vague label descriptions, you can now see how others have actually reacted to the product, whether it met their expectations, improved their routine, or caused any issues. It’s a way to cut through the noise and get honest feedback that empowers more informed decisions.