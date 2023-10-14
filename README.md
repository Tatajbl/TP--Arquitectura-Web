correr db : 
C:\Program Files\MongoDB\Server\7.0\bin>mongod

correr node y el proyecto:

C:\ProjectHTML\TP>node app.js

abrir postman y correr: 

http://localhost:8000/api/animals


Para obtener uso el GET: 

HEADERS :
- KEY Content-Type 
- Value application/json
BODY:
{"name": "Nombre del animal", "species": "Especie del animal", "age": "Edad del animal"}

Para cargr uso el POST:

HEADERS :
- KEY Content-Type 
- Value application/json
BODY:

{
  "name": "Estefano",
  "species": "Pastor Aleman",
  "age": 11,
  "owner": "Juan castro"
}

