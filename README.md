# MascotasApp

Aplicación web desarrollada en React que permite gestionar mascotas mediante una API REST. El sistema permite registrar mascotas, visualizar sus detalles, actualizar su información, eliminar registros y administrar comentarios asociados a cada mascota.

# Distribución del trabajo

El desarrollo del proyecto se realizó de manera colaborativa utilizando GitHub.

Las principales responsabilidades se distribuyeron de la siguiente forma:

- Desarrollo del módulo de mascotas (CRUD, vista de detalle, edición, manejo de errores y diseño).
- Desarrollo del módulo de comentarios (crear, listar y eliminar comentarios).

# Tecnologías utilizadas

- React
- React Router DOM
- Axios
- Bootstrap 5
- Vite
- JavaScript
- HTML5
- CSS3

# Instalación del proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/ChrisFullHD/MascotasApp-Sumativa4.git
```

2. Ingresar a la carpeta del proyecto:

```bash
cd mascotas-front
```

3. Instalar las dependencias:

```bash
npm install
```

4. Ejecutar el proyecto:

```bash
npm run dev
```

5. Abrir el navegador en la dirección indicada por Vite (por ejemplo):

```
http://localhost:5173
```

---

# Funcionalidades

El proyecto permite:

- Visualizar el listado de mascotas.
- Registrar una nueva mascota.
- Visualizar el detalle de una mascota.
- Editar información de una mascota.
- Actualizar el estado de una mascota.
- Eliminar mascotas.
- Crear comentarios.
- Eliminar comentarios.
- Manejo básico de errores provenientes de la API.

---

# Buenas prácticas

Durante el desarrollo se utilizaron:

- Commits atómicos y descriptivos.
- Repositorio compartido en GitHub.
- ESLint para revisión del código.

Se corrigieron las advertencias relacionadas con variables e importaciones sin uso. Las advertencias restantes corresponden a recomendaciones de optimización de React (`react-hooks/set-state-in-effect`), las cuales no afectan el funcionamiento de la aplicación.

---

# Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó ChatGPT (OpenAI) como herramienta de apoyo para:

- Resolver dudas sobre React.
- Implementar operaciones CRUD.
- Mejorar la estructura del código.
- Implementar manejo de errores.
- Diseñar la interfaz utilizando Bootstrap.
- Analizar advertencias generadas por ESLint.

La implementación, integración y validación del proyecto fueron realizadas por los integrantes del equipo utilizando estas sugerencias como apoyo durante el desarrollo.

# Preguntas Conceptuales

a. ¿Qué es destructuring y en qué situaciones lo utilizaron en el proyecto?

El destructuring es una característica de JavaScript que permite extraer valores de objetos o arreglos y asignarlos directamente a variables.
En este proyecto se utilizó, por ejemplo, para obtener parámetros de la URL mediante React Router:
const { id } = useParams();
También se utilizó para acceder a la información devuelta por la API o para recibir propiedades (props) dentro de los componentes

b. ¿Qué hace async/await y qué problema resuelve frente al uso de .then()?

async/await permite trabajar con operaciones asíncronas de una forma más sencilla y legible. async significa que una función es asíncrona, por el otro lado await hace que el código espere la respuesta antes de continuar con la siguiente instrucción, evitando un bloqueo en la aplicación
En lugar de escribir varias llamadas encadenadas con .then(), el código se ejecuta como si fuera secuencial, facilitando su lectura y el manejo de errores mediante try...catch. En el proyecto se utilizó para realizar las solicitudes a la API con Axios (GET, POST, PATCH y DELETE).

c. ¿Cómo funciona FormData y por qué es necesario para enviar la imagen de una mascota?

FormData permite construir un formulario que puede contener tanto texto como archivos.
En este proyecto fue necesario porque las mascotas incluyen una imagen. Si los datos se enviaran como JSON, la imagen no podría enviarse correctamente. Por eso se creó un objeto FormData y se agregaron todos los campos, incluyendo el archivo de imagen, antes de enviarlo a la API

d. ¿Qué son las props en React?

Las props (properties) son datos que un componente padre envía a un componente hijo.
Permiten reutilizar componentes y compartir información o funciones entre ellos.
En este proyecto, por ejemplo, MascotasPage envía a MascotasList la lista de mascotas y funciones como eliminar o actualizar una mascota.

e. ¿Qué son los componentes en React?

Los componentes son bloques reutilizables de la interfaz de usuario.
Cada componente representa una parte independiente de la aplicación y puede tener su propia lógica y estado.
En este proyecto se utilizaron componentes como:
•    MascotasList 
•    MascotasForm 
•    MascotasDetail 
•    ComentariosList 
•    ComentariosForm 
Esta organización facilita el mantenimiento y la reutilización del código.

f. ¿Por qué no es una buena práctica mostrar al usuario final el mensaje de error tal como lo entrega la API?

Porque los mensajes de la API suelen estar orientados al desarrollador y pueden ser técnicos, estar en otro idioma o incluso exponer información interna del sistema.
Lo recomendable es capturar esos errores y mostrar mensajes claros y comprensibles para el usuario.
Por ejemplo, en lugar de mostrar un error técnico del servidor, se puede mostrar un mensaje como:
"No fue posible actualizar la mascota. Intente nuevamente."