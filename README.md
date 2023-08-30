# Tech challenge BAX

La url ya no esta activa, por lo que no se puede obtener las palabras y el token.
pero estas eran las instucciones

```shell
curl https://challenge.bax-dev.com
```

# Bienvenido al reto automatizado de BAX.mx.
Para poder finalizar este reto debes seguir las instrucciones que te damos a continuación:
El reto consiste en hacer llamadas POST y GET con la información necesaria para poder generar la llave. Una vez que tengas la llave, deberás enviar un último POST request con esa llave y otros datos para poder
continuar con el proceso de reclutamiento.
Las instrucciones para obtener la llave es la siguiente:

1. Debes realizar un código en TypeScript* que realice de manera automática los pasos siguientes
2. Primero, deberás hacer un GET request al endpoint `/challenge/token' para obtener un challenge-token.
este token solo será válido por 30 segundos. Por lo que tu código debe poder llevar a cabo los siguientes
pasos antes de que termine el tiempo.
4. Al hacer todos los siguientes requests asegúrate de agregar tu token como un HEADER "Authorization"
del tipo Bearer (e.g. `Authorization: Bearer TU_TOKEN'
3. Después de obtener el token, deberás hacer GET requests al endpoint `/challenge/word para obtener
la siguiente palabra. Guarda esta palabra. Deberás seguir haciendo requests a este endpont hasta que te regrese un
HTTP code 404. Esto significa que no hay más palabras para ttu token
A continuación deberás generar la clave utilizando todas las palabras que te gregresaron los pasos anteriores
para esto deberás procesar las palabra de la siguiente manera:
Primero ordena la lista de palabras alfabéticamente ignorando su primera letra (por ejemplo, para las palabras
a)
[ARBOL, FUENTE, CASA] debess ordenarlas como: [CASA, ARBOL, FUENTE] ya que ignorando la C, A y F quedan ordenadas
alfabéticamente)
b) Después, junta todas las cadenas en una sola
c) Obten una cadena seleccionando las letras en la posición según la secuencia de fibonnaci
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...]. El largo de esta cadena dependera del total de letras de la cadena inicial.
2
d) Esa cadena es tu clave de acceso.
5. Una vez que tengas tu clave de acceso, envía un POST request al endpoint: `/challenge/apply` con un Body de tipo JSON
con los siguientes values:
"name": "Tu Nombre Completo"
"email"
"tu-email@dominio.com",
"key" : "tu-clave-de-acceso-generada"
"source": "El código fuente de tu script codificado en BASE64"
Nota que tienes que incluir tu código fuente TypeScript como UN solo archivo que pueda ser ejecutado ts-node archivo.ts
y debes enviarlo codificado en BASE64
Si todo salió bien, recibirás una respuesta 200 OK de tu último POST y podrás pasar a la siguiente etapa.