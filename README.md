# **Calculator Microservice**  

## **Overview**  
The **Calculator Microservice** is a simple REST API built using **Node.js** and **Express.js** that performs basic arithmetic operations. It also includes **logging with Winston** for error tracking and debugging.

## **Features**  
- Supports arithmetic operations:
  - **Addition** (`/add`)
  - **Subtraction** (`/subtract`)
  - **Multiplication** (`/multiply`)
  - **Division** (`/divide`)
  - **Exponentiation** (`/power`)
  - **Square Root** (`/sqrt`)
  - **Modulo** (`/mod`)
- Input validation to prevent invalid calculations (e.g., division by zero).
- Logging with **Winston** for monitoring requests and errors.

---

## **Installation**  

### **Prerequisites**  
Ensure you have the following installed:  
- **Node.js** (>= v14)
- **npm** (Node Package Manager)

### **Clone the Repository**  
```sh
git clone https://github.com/Chandrakanth540/sit737-2025-prac4c.git
cd sit737-2025-prac4c
```

### **Install Dependencies**  
```sh
npm install
```

---

## **Usage**  

### **Start the Server**  
Run the following command:  
```sh
node index.js
```
The service will be available at:  
```
http://localhost:3000
```

### **API Endpoints**  
Each operation requires `num1` and `num2` as **query parameters**.

| Operation      | Endpoint Example                               | Description                          |
|---------------|----------------------------------------------|--------------------------------------|
| **Addition**    | `/add?num1=10&num2=5`                        | Returns `10 + 5 = 15`               |
| **Subtraction** | `/subtract?num1=10&num2=5`                   | Returns `10 - 5 = 5`                |
| **Multiplication** | `/multiply?num1=10&num2=5`                 | Returns `10 * 5 = 50`               |
| **Division**    | `/divide?num1=10&num2=5`                     | Returns `10 / 5 = 2`                |
| **Power**       | `/power?num1=2&num2=3`                       | Returns `2^3 = 8`                   |
| **Square Root** | `/sqrt?num1=16`                              | Returns `√16 = 4`                   |
| **Modulo**      | `/mod?num1=10&num2=3`                        | Returns `10 % 3 = 1`                |

#### **Example Request** (Addition)
```sh
curl "http://localhost:3000/add?num1=10&num2=5"
```
#### **Example Response**
```json
{ "result": 15 }
```

---

## **Error Handling**  
The API validates inputs and returns appropriate error messages.

### **Examples**
#### **Invalid Input**
```
http://localhost:3000/add?num1=hello&num2=5
```
**Response**
```json
{ "error": "Invalid input: num1 must be a valid number." }
```

#### **Division by Zero**
```
http://localhost:3000/divide?num1=10&num2=0
```
**Response**
```json
{ "error": "Math error: Cannot divide by zero." }
```

Errors are logged in the `logs/error.log` file.

---

## **Logging with Winston**  
This microservice uses **Winston** for logging. Logs are saved in:
- `logs/error.log` (for errors)
- `logs/combined.log` (for all logs)

Example **error log**:
```
[ERROR] Invalid input: num1 is missing or not a number
```

---

## **Testing**  
To test the service, you can:  
- Use a web browser (`http://localhost:3000/add?num1=10&num2=5`).
- Use **cURL**:
  ```sh
  curl "http://localhost:3000/multiply?num1=10&num2=5"
  ```

---


## **License**  
This project is free to use.

