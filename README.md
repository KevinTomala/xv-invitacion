# Invitación XV Años – Kyara Pita Correa

## Archivos
- index.html → la invitación. Datos generales en el bloque `const CONFIG` (nombre, fecha, hora, lugar, textos).
- invitados.js → lista de invitados con sus pases. NO lo edites a mano: usa panel.html.
- panel.html → tu panel: agregar invitados, decidir pases, copiar/enviar links, marcar confirmados, imprimir lista, exportar Excel.
- cancion.mp3 → música de fondo.
- fotos/ → foto1.jpg, foto2.jpg (verticales), foto3.jpg (horizontal).
- decoracion/personajes/ → PNG de personajes (se animan con CSS).
- decoracion/flores/ y decoracion/rosas/ → flores (se mecen con CSS).

## Flujo de invitados
1. Abre panel.html (doble clic en tu PC, o TU-LINK/panel.html).
2. Escribe el link de la invitación arriba, agrega invitados con su nombre, pases y teléfono.
3. Toca "Descargar invitados.js", reemplaza el archivo en esta carpeta y haz git add . / git commit / git push.
4. Envía a cada invitado su link (botón WhatsApp o Copiar link). Cada link tiene un código ?i=XXXXXX.
5. Cuando te confirmen por WhatsApp, márcalos en la columna Estado. "Imprimir lista" saca la lista con casilla "Llegó" para la puerta.

El link sin código vale para 1 persona (CONFIG.pasesLinkGeneral).

## Publicar
git add . && git commit -m "cambios" && git push
Luego cambia TU-DOMINIO en la etiqueta og:image por tu link real.
