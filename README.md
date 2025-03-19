# Descripción
Desarrollo para la prueba técnica de Marzo del 2025

# Ejecución 
Es necesario tener docker intalado. 

Para ejecutar en segundo plano:

```bash
  docker-compose up -d --build
```
Para ejecutar en primer plano y ver los logs: 

```bash
docker-compose up --build
```
Para la ejecución en local es necesario instalar Mosquitto y un base de datos MySQL, además de configurar los documentos .env de cada proyecto. 
Ejecutar `npm insall` y `npm start` en la raiz de cada proyecto.

Si se desea emplear firebase, comentar los apartados que empleen MySQL en subscriber y descomentar los de firebase. Completar los campos de configuración de firebase en .env de subscriber. Es necesario haber creado previametne una base de datos en firebase.

# Autor
Miguel San Bernardino Martín
