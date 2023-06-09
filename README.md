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
http://localhost:8080/api/technicians/<id>/

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
http://localhost:8080/api/appointments/<id>/

Response data shape:
```
{
	"deleted": true
}
```



Cancel an Appointment (PUT)
http://localhost:8080/api/appointments/<id>/cancel/

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
http://localhost:8080/api/appointments/<id>/finish/

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




### Sales microservice

(Placeholder)
