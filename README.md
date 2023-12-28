# DealerDashboard

This is a program to help you manage your car dealership.

Brought to you by:

* Alan Y.C. Cheng - Service Microservice
* Sarina Wu - Sales Microservice

## Step-by-step Instructions to Run the Project

1. Open Terminal on your computer

2. Go to the folder where you want to save this program (replace the path with the path to your folder destination):

```
cd {path to your folder}
```

3. Run the following command in your Terminal to download the code of this program to your computer via the "Clone with HTTPS" method:

```
git clone https://github.com/wsrn829/DealerDashboard.git
```

4. Dive into the newly downloaded program folder:

```
cd DealerDashboard
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


### Inventory (Monolith) CRUD Route Documentation

List Manufacturers (GET)
http://localhost:8100/api/manufacturers/

Response data shape:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Tesla"
    }
  ]
}
```


Create a Manufacturer (POST)
http://localhost:8100/api/manufacturers/

Request data shape:
```
{
  "name": "Tesla"
}
```


Response data shape:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Tesla"
    }
  ]
}
```


Get a specific manufacturer	(GET)
http://localhost:8100/api/manufacturers/:id/

Response data shape:
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Tesla"
}
```


Update a specific manufacturer	(PUT)
http://localhost:8100/api/manufacturers/:id/

Request data shape:
```
{
  "name": "Chrysler"
}
```


Response data shape:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Chrysler"
    }
  ]
}
```


Delete a specific manufacturer	(DELETE)
http://localhost:8100/api/manufacturers/:id/

Response data shape:
```
{
	"id": null,
	"name": "Chrysler"
}
```


List vehicle models	(GET)
http://localhost:8100/api/models/

Response data shape:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

Create a vehicle model	(POST)
http://localhost:8100/api/models/

Request data shape:
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

Response data shape:
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```


Get a specific vehicle model	(GET)
http://localhost:8100/api/models/:id/

Response data shape:
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```


Update a specific vehicle model	(PUT)
http://localhost:8100/api/models/:id/

Request data shape:
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

Response data shape:
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```


Delete a specific vehicle model	(DELETE)
http://localhost:8100/api/models/:id/

Response data shape:
```
{
	"id": null,
	"name": "Camry",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/2/",
		"id": 2,
		"name": "Toyota"
	}
}
```


List automobiles	(GET)
http://localhost:8100/api/automobiles/

Response data shape:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```


Create an automobile	(POST)
http://localhost:8100/api/automobiles/

Request data shape:
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

Response data shape:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```


Get a specific automobile	(GET)
http://localhost:8100/api/automobiles/:vin/

Response data shape:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```


Update a specific automobile	(PUT)
http://localhost:8100/api/automobiles/:vin/

Request data shape:
```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```


Response data shape:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": true
}
```


Delete a specific automobile	(DELETE)
http://localhost:8100/api/automobiles/:vin/

Response data shape:

```
{
	"href": "/api/automobiles/1C3CC5FB2AN120155/",
	"id": null,
	"color": "black",
	"year": 2020,
	"vin": "1C3CC5FB2AN120155",
	"model": {
		"href": "/api/models/3/",
		"id": 3,
		"name": "Civic",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/3/",
			"id": 3,
			"name": "Honda"
		}
	},
	"sold": false
}
```





### Service Microservice CRUD Route Documentation

List Technicians (GET)
http://localhost:8080/api/technicians/

Response data shape:
```
{
	"technicians": [
		{
			"first_name": "Bill",
			"last_name": "Clinton",
			"employee_id": 1233,
			"id": 2
		}
	]
}
```


Create a Technician (POST)
http://localhost:8080/api/technicians/

Request data shape:
```
{
	"first_name": "Barack",
	"last_name": "Clinton",
	"employee_id": 1267
}
```

Response data shape:
```
{
	"first_name": "Barack",
	"last_name": "Clinton",
	"employee_id": 1267,
	"id": 6
}
```


Delete a Technician (DELETE)
http://localhost:8080/api/technicians/:id/

Response data shape:
```
{
	"deleted": true
}
```


List Appointments (GET)
http://localhost:8080/api/appointments/

Response data shape:
```
{
	"appointments": [
		{
			"date_time": "2023-06-07T23:04:00+00:00",
			"reason": "Oil Not Change",
			"status": "created",
			"vin": "SDGHSDFHRRRHR",
			"customer": "asdfgasdg",
			"technician": {
				"first_name": "Barack",
				"last_name": "Clinton",
				"employee_id": 1266,
				"id": 3
			},
			"id": 1,
			"vip_status": false
		}
	]
}
```


Create an Appointment (POST)
http://localhost:8080/api/appointments/

Request data shape:
```
		{
			"date_time": "2023-06-07T23:04:00+00:00",
			"reason": "Oil Not Change",
			"status": "created",
			"vin": "SDGFWERHWHER",
			"customer": "asdfgasdg",
			"technician": 1266,
			"id": 7
		}
```

Response data shape:
```
{
	"date_time": "2023-06-07T23:04:00+00:00",
	"reason": "Oil Change",
	"status": "created",
	"vin": "SDGFWERHWHER",
	"customer": "asdfgasdg",
	"technician": {
		"first_name": "Barack",
		"last_name": "Clinton",
		"employee_id": 1266,
		"id": 3
	},
	"id": 7,
	"vip_status": false
}
```


Delete an Appointment (DELETE)
http://localhost:8080/api/appointments/:id/

Response data shape:
```
{
	"deleted": true
}
```


Cancel an Appointment (PUT)
http://localhost:8080/api/appointments/:id/cancel/

Response data shape:
```
{
	"date_time": "2023-06-07T23:04:00+00:00",
	"reason": "Oil Change",
	"status": "canceled",
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


Mark an Appointment as Finished (PUT)
http://localhost:8080/api/appointments/:id/finish/

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
