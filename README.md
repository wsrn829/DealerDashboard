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

The application comes with a fully-accessible Inventory API that can keep track of the automobile inventory for the automobile dealership.

It has fully functional RESTful endpoints for the following entities:

Manufacturer: the company that manufactures the automobile
VehicleModel: the model of a vehicle created by the manufacturer
Automobile: the actual automobile of a specific vehicle model
The following documentation describes the available functionality in the Inventory API.

Manufacturers
From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

Action	Method	URL
List manufacturers	GET	http://localhost:8100/api/manufacturers/
Create a manufacturer	POST	http://localhost:8100/api/manufacturers/
Get a specific manufacturer	GET	http://localhost:8100/api/manufacturers/:id/
Update a specific manufacturer	PUT	http://localhost:8100/api/manufacturers/:id/
Delete a specific manufacturer	DELETE	http://localhost:8100/api/manufacturers/:id/
Creating and updating a manufacturer requires only the manufacturer's name.

{
  "name": "Chrysler"
}
The return value of creating, getting, and updating a single manufacturer is its name, href, and id.

{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.

{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
Vehicle models
From Insomnia and your browser, you can access the vehicle model endpoints at the following URLs.

Action	Method	URL
List vehicle models	GET	http://localhost:8100/api/models/
Create a vehicle model	POST	http://localhost:8100/api/models/
Get a specific vehicle model	GET	http://localhost:8100/api/models/:id/
Update a specific vehicle model	PUT	http://localhost:8100/api/models/:id/
Delete a specific vehicle model	DELETE	http://localhost:8100/api/models/:id/
Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.

{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.

{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.

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
Getting a list of vehicle models returns a list of the detail information with the key "models".

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
Automobile information
From Insomnia and your browser, you can access the automobile endpoints at the following URLs.

Note: The identifiers for automobiles in this API are not integer ids. They are the Vehicle Identification Number (VIN) for the specific automobile.

Action	Method	URL
List automobiles	GET	http://localhost:8100/api/automobiles/
Create an automobile	POST	http://localhost:8100/api/automobiles/
Get a specific automobile	GET	http://localhost:8100/api/automobiles/:vin/
Update a specific automobile	PUT	http://localhost:8100/api/automobiles/:vin/
Delete a specific automobile	DELETE	http://localhost:8100/api/automobiles/:vin/
You can create an automobile with its color, year, VIN, and the id of the vehicle model.

{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
As noted, you query an automobile by its VIN. For example, you would use the URL

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.

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
You can update the color, year, and sold status of an automobile.

{
  "color": "red",
  "year": 2012,
  "sold": true
}
Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.

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




### Service Microservice CRUD Route Documentation

(Placeholder)




### Sales microservice

(Placeholder)
