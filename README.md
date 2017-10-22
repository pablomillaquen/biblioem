# Bibliotecaem

Esta aplicación fue hecha para practicar los conocimientos adquiridos, usando Angular 4. 
Lo hice para poder almacenar los manuales, folletos y toda la información técnica de mi trabajo. Yo trabajo actualmente en una empresa de mantenimiento y reparación de Equipos Médicos, por lo que se requiere contar con información que permita hacer el trabajo más eficientemente. Lo dejo disponible en esta página para ser usado por quién necesite una herramienta así. 

ACLARACIÓN: El proyecto no cuenta con los archivos, manuales ni datos técnicos de los equipos. El objetivo de este proyecto es crear un sistema que los almacene y que permita acceder a ellos de mejor forma.

Cuenta con una página principal, con la información básica, accesible a todos. 
Además contiene una sección de administración, donde se puede subir la información:
- Manuales: de usuario, de servicio, manuales técnicos avanzados.
- Protocolos: Son los documentos que se utilizan para hacer las mantenciones de los equipos, se consideran checklist, mediciones, etc.
- Apuntes: Tips, que entreguen una ayuda rápida. Por ejemplo, contraseñas de servicio, fotos de circuitos, apuntes varios. (En esta sección también se puede adjuntar archivos, como fotos, pdfs, docs, etc.)
- Repuestos: Sección para almacenar un catálogo de repuestos, que se requieren para los equipos, incluyendo referencia, modelo, etc.


También tiene 4 mantenedores de tablas: Marcas, Modelos, Tipo de Equipo y Empleado.

La información se obtiene desde la API creada usando SlimPHP, disponible en https://github.com/pablomillaquen/apibiblioem . En ese repositorio también está la base de datos del sistema. Se utiliza un token JWT para el acceso al área de administración, asegurando que no sea posible entrar a esa sección y modificar datos.

El proyecto aún no está terminado. Estoy terminando la documentación, pero hay varias funciones que se pueden agregar, porque la idea era hacer un "esqueleto" para luego seguir mejorándolo. No guardaré nuevas versiones en este repositorio, por lo que no habrá actualizaciones de mejoras para este proyecto. Queda a su disposición para futuras upgrades.


# UTILIZACIÓN:
	El proyecto está creado usando Angular-CLI. Se debe usar el comando "ng serve" para iniciarlo en modo de desarrollo.
	En la carpeta "dist" se encuentra la aplicación en modo de producción.


Desarrollador: Pablo Millaquén G.
Email: pablomillaquen@gmail.com
Valparaíso, Chile.