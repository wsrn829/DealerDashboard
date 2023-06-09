# CarCar

This is a program to help you manage your car dealership.

Brought to you by:

* Alan Y.C. Cheng - Service Microservice
* Sarina Wu - Sales Microservice

## Step-by-step Instructions to Run the Project

1. Open Terminal in your computer

2. Go to your folder where you want to save this program (replace the path with the path to your folder destination):

```
cd {path to your folder}
```

3. Run the following command in your Terminal to download the code of this program to your computer via the "Clone with HTTPS" method:

```
git clone https://gitlab.com/alanyccheng/project-beta.git
```

4. Dive into the newly downloaded program folder:

```
cd project-beta
```

5. Create a new database (Docker Volume) with the name "beta-data" in your local computer for this program to store data in:

```
docker volume create beta-data
```

6. Create the blueprints (Docker Images) for the program:

```
docker-compose build
```

7. Create the isolated environments (Docker Containers) for the program:

```
docker-compose up
```

8. The program is now running, please go to the following link to visit the front end in your browser:

http://localhost:3000

9. Enjoy the program.


## Diagram of the Project

<img src="project-beta-diagram.png"
     alt="Project Diagram"
     style="width: 700px;" />






## Explicitly defined URLs and ports for each of the services

Program Front End: http://localhost:3000/

Inventory (Monolith): http://localhost:8100/

Service Microservice: http://localhost:8080/

Sales Microservice: http://localhost:8090/


### Inventory (Monolith) Frontend

(Placeholder)





### Service Microservice

Response data shape:
```
{
	"date_time": "2023-06-07T23:04:00+00:00",
	"reason": "Oil Not Change",
	"status": "finished",
	"vin": "SDGFEWHWEHW",
	"customer": "asdfgasdg",
	"technician": {
		"first_name": "Barack",
		"last_name": "Clinton",
		"employee_id": 1266,
		"id": 3
	},
	"id": 5,
	"vip_status": false
}
```




### Sales microservice CRUD Route Documentation

List salespeople (GET)
http://localhost:8090/api/salespeople/

Response data shape:
```
{
	"salesperson": [
		{
			"id": 1,
			"first_name": "Sarina",
			"last_name": "Wu",
			"employee_id": "000065"
		}
	]
}
```


Create a salesperson (POST)
http://localhost:8090/api/salespeople/

Request data shape:
```
{
  "id": 50,
  "first_name": "Ella",
  "last_name": "Wu",
  "employee_id": "000066"
}
```

Response data shape:
```
{
	"id": 50,
	"first_name": "Ella",
	"last_name": "Wu",
	"employee_id": "000066"
}
```


Delete a specific salesperson (DELETE)
http://localhost:8090/api/salespeople/:id/

Response data shape:
```
{
	"deleted": true
}
```


List customers	(GET)
http://localhost:8090/api/customers/

Response data shape:
```
{
	"customer": [
		{
			"id": 3,
			"first_name": "Sarina",
			"last_name": "Wu",
			"address": "Seattle",
			"phone_number": "1111111111"
		}
	]
}
```


Create a customer	(POST)
http://localhost:8090/api/customers/

Request data shape:
```
{
  "id": 51,
  "first_name": "Emma",
  "last_name": "Wu",
  "address": "LA",
	"phone_number": 2222222222
}
```

Response data shape:
```
{
	"id": 51,
	"first_name": "Emma",
	"last_name": "Wu",
	"address": "LA",
	"phone_number": 2222222222
}
```


Delete a specific customer	(DELETE)
http://localhost:8090/api/customers/:id/

Response data shape:
```
{
	"deleted": true
}
```


List sales	(GET)
http://localhost:8090/api/sales/

Response data shape:
```
{
	"sale": [
		{
			"id": 3,
			"price": 500000,
			"automobile": {
				"id": 15,
				"vin": "1C3CC5FB2AN120176",
				"color": "white",
				"year": 2020,
				"sold": false
			},
			"salesperson": {
				"id": 1,
				"first_name": "Sarina",
				"last_name": "Wu",
				"employee_id": "000065"
			},
			"customer": {
				"id": 3,
				"first_name": "Sarina",
				"last_name": "Wu",
				"address": "Seattle",
				"phone_number": "1111111111"
			}
		}
	]
}
```


Create a sale	(POST)
http://localhost:8090/api/sales/

Request data shape:
```
{
  "id": 50,
  "price": 300000,
	"automobile": "1C3CC5FB2AN120177",
	"salesperson": 3,
	"customer": 2
}
```

Response data shape:
```
{
	"id": 50,
	"price": 300000,
	"automobile": {
		"id": 16,
		"vin": "1C3CC5FB2AN120177",
		"color": "blue",
		"year": 2020,
		"sold": false
	},
	"salesperson": {
		"id": 3,
		"first_name": "Ella",
		"last_name": "Cheng",
		"employee_id": "000062"
	},
	"customer": {
		"id": 2,
		"first_name": "Emma",
		"last_name": "Wu",
		"address": "LA",
		"phone_number": "2222222222"
	}
}
```


Delete a sale	(DELETE)
http://localhost:8090/api/sales/:id/

Response data shape:
```
{
	"deleted": true
}
```
