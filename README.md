# Invitación XV Años – Kyara Pita Correa

## Archivos
- index.html → la invitación. Datos generales en el bloque `const CONFIG` (nombre, fecha, hora, lugar, textos).
- panel.html → panel de la anfitriona (con contraseña): agregar invitados, decidir pases, enviar links firmados, marcar confirmados, imprimir lista, exportar Excel, respaldo.
- herramientas/nueva-clave.mjs → cambia la contraseña del panel.
- cancion.mp3 → música de fondo.
- fotos/ → foto1.jpg, foto2.jpg (verticales), foto3.jpg (horizontal).
- decoracion/personajes/ → PNG de personajes (se animan con CSS).
- decoracion/flores/ y decoracion/rosas/ → flores (se mecen con CSS).

## Flujo de invitados (lo hace la clienta, sin tocar código)
1. Abre TU-LINK/panel.html y escribe la contraseña del panel.
2. Agrega cada invitado con nombre, pases, mesa y teléfono.
3. Toca WhatsApp (o Copiar link) para enviarle su invitación.
4. Marca las confirmaciones en la columna Estado. "Imprimir lista" sirve para la puerta.
5. Usa "Descargar respaldo" seguido: la lista vive en el navegador donde se creó.

Seguridad: cada link lleva una firma digital. Si alguien cambia el nombre o los pases, la invitación lo rechaza; sin la contraseña nadie puede crear links. Los links sin firma no permiten confirmar (CONFIG.permitirLinkGeneral).
Cambiar contraseña: node herramientas/nueva-clave.mjs "nueva-contraseña" (los links anteriores dejan de valer).

## Publicar
git add . && git commit -m "cambios" && git push
Luego cambia TU-DOMINIO en la etiqueta og:image por tu link real.
