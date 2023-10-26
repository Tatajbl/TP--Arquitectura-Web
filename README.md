correr db : 
C:\Program Files\MongoDB\Server\7.0\bin>mongod

correr node y el proyecto:
C:\ProjectHTML\TP>node app.js



abrir postman y correr:
http://localhost:8000/api/animals

---------------------------------------GETS----------------------------
Para obtener datos de los animales uso :
http://localhost:8000/api/animals


HEADERS :
- KEY Content-Type 
- Value application/json
BODY:
{"name": "Nombre del animal", "species": "Especie del animal", "age": "Edad del animal"}

para obtener datos por especie :
Puede ser por especie completa, o por primer letra y tmb por primer string
http://localhost:8000/api/animals/species/p

para obtener animales que su nombre tiene la misma cantidad de letras que su edad:
http://localhost:8000/api/animalsedadigualnombre

para obtener vacunados o no:
http://localhost:8000/api/animals?vaccinated=false

para obtener por rango de edades:
http://localhost:8000/api/animals/age/2/20

para obtener por ID de animal:
http://localhost:8000/api/animals/6529f688c7e031d74a614317



----------------- POST---------------------------------------

Para generar nuevos animales: 
http://localhost:8000/api/animals

HEADERS :
- KEY Content-Type 
- Value application/json
BODY:

{
  "name": "Estefano",
  "species": "Pastor Aleman",
  "age": 11,
  "owner": "Juan castro",
"vaccinesUpdated": true
}

Para generar nuevos animales en formato BATCH: 

http://localhost:8000/api/animals/batch

[
{
"name": "Mittens",
"species": "Gato",
"age": 3,
"owner": "Juan Rizzo",
"vaccinesUpdated": true
},
{
"name": "Fido",
"species": "Perro",
"age": 4,
"owner": "Juan roman",
"vaccinesUpdated": false
}
]


-------------------- delete-----------------

Borrar todos los animales:

http://localhost:8000/api/animals

Borrar animal por ID:

http://localhost:8000/api/animals/ID