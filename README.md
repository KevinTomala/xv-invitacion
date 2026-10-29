# Invitación XV Años – tema del sapo y la princesa

## 1. Editar datos
Abre `index.html` y busca el bloque `const CONFIG = {` (al final del archivo):
- nombre, fechaISO, diaSemana, fechaCorta, fechaLarga, hora
- lugar, ciudad, mapa (link de Google Maps)
- whatsapp (sin + ni espacios) y whatsappTxt
- fotos: ya apuntan a fotos/foto1.jpg, foto2.jpg, foto3.jpg (ver fotos/LEEME.txt)
- musica: "cancion.mp3" (vacío = cajita musical generada)
- También cambia el nombre en <title> y en las etiquetas og:title.

## 2. Archivos
- fotos/foto1.jpg, fotos/foto2.jpg (verticales), fotos/foto3.jpg (horizontal) → ~1080 px de ancho, < 300 KB c/u
- cancion.mp3 → ~2 min, < 3 MB
- portada.jpg → 1200x630, es la imagen que sale al compartir el link en WhatsApp

## 3. Publicar
    npx vercel --prod
Luego reemplaza TU-DOMINIO en la etiqueta og:image por el link final y vuelve a correr el comando.

## 4. Link personalizado por invitado
    https://tu-link.vercel.app/?para=Familia%20Pérez&pases=3

## Carpetas
- fotos/ → fotos de la quinceañera
- decoracion/ → ilustraciones del tema (pantano, nenúfares, flores). Puedes reemplazarlas con el mismo nombre.
