# Restricciones REST

Las restricciones REST (Representational State Transfer) son un conjunto de principios arquitectónicos que deben seguirse al diseñar sistemas web para crear servicios web escalables, interoperables y de alto rendimiento. Estas restricciones, propuestas por Roy Fielding en su tesis doctoral, son fundamentales para asegurar una arquitectura RESTful coherente y consistente.

A continuación, se describen brevemente las seis restricciones principales de REST:

1. **Cliente-servidor**: Esta restricción establece una clara separación de responsabilidades entre el cliente y el servidor. El cliente es responsable de la interfaz de usuario y la interacción con el usuario, mientras que el servidor es responsable del almacenamiento de datos y la lógica de negocio. Esta separación permite una mayor escalabilidad y la posibilidad de evolucionar de forma independiente.

2. **Sin estado (Stateless)**: Según esta restricción, cada solicitud del cliente al servidor debe contener toda la información necesaria para comprender y procesar dicha solicitud. El servidor no debe almacenar ningún estado sobre el cliente entre solicitudes. Esto facilita la escalabilidad del servidor y permite una mayor fiabilidad, ya que las solicitudes pueden tratarse de forma aislada.

3. **Cacheable (Almacenamiento en caché)**: REST promueve el uso de caché en el lado del cliente para mejorar el rendimiento y la eficiencia de la red. Las respuestas del servidor pueden ser etiquetadas como cacheables o no cacheables, lo que permite a los clientes almacenar en caché las respuestas y reutilizarlas para solicitudes futuras idénticas o similares.

4. **Interfaz uniforme**: REST define una interfaz uniforme entre el cliente y el servidor para simplificar la arquitectura y mejorar la interoperabilidad. Esta interfaz se compone de cuatro restricciones adicionales:

   - **Identificación de recursos**: Cada recurso en un sistema RESTful debe ser identificado de forma única mediante una URI (Uniform Resource Identifier).
   
   - **Manipulación de recursos a través de representaciones**: Los clientes manipulan los recursos a través de la manipulación de representaciones. Por ejemplo, utilizando los métodos HTTP como GET, POST, PUT y DELETE para recuperar, crear, actualizar y eliminar recursos respectivamente.
   
   - **Mensajes autodescriptivos**: Cada mensaje entre el cliente y el servidor debe contener suficiente información para describir cómo procesar el mensaje. Esto permite que los mensajes sean entendidos sin la necesidad de un estado adicional.
   
   - **HATEOAS (Hypermedia as the Engine of Application State)**: El servidor debe proporcionar enlaces hipertextuales en las respuestas para permitir la navegación y descubrimiento de recursos relacionados. Esto permite una mayor flexibilidad y evolución de la arquitectura.

5. **Sistema en capas**: REST permite que un sistema esté compuesto por capas jerárquicas. Cada capa solo puede comunicarse con las capas adyacentes, lo que proporciona una mayor modularidad y escalabilidad.

6. **Código bajo demanda (Opcional)**: Esta restricción es opcional y permite que el servidor envíe código ejecutable al cliente bajo demanda. Sin embargo, esta restricción no es ampliamente utilizada en la práctica y muchos servicios RESTful no la implementan.

Siguiendo estas restricciones, se puede lograr una arquitectura RESTful coherente, escalable y altamente interoperable, lo que facilita el desarrollo y mantenimiento de sistemas web.