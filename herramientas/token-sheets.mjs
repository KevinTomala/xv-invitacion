// Muestra el TOKEN de Google Apps Script para la contraseña actual del panel
// y lo escribe en herramientas/google-sheets.gs.
// Uso (desde la carpeta del proyecto):  node herramientas/token-sheets.mjs "contraseña-del-panel"
import { webcrypto as c } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
const pass = process.argv[2];
if (!pass) { console.error('Escribe la contraseña del panel entre comillas.'); process.exit(1); }
const s = c.subtle, fb = t => Buffer.from(t, 'base64url');
const L = JSON.parse(readFileSync('panel.html', 'utf8').match(/const LLAVE_CIFRADA = (\{.*?\});/s)[1]);
const base = await s.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
const aes = await s.deriveKey({ name: 'PBKDF2', salt: fb(L.salt), iterations: L.it, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
let jwk;
try { jwk = JSON.parse(new TextDecoder().decode(await s.decrypt({ name: 'AES-GCM', iv: fb(L.iv) }, aes, fb(L.ct)))); }
catch { console.error('Contraseña incorrecta.'); process.exit(1); }
const token = Buffer.from(await s.digest('SHA-256', new TextEncoder().encode('xv-sheets:' + jwk.d))).toString('hex');
const f = 'herramientas/google-sheets.gs';
writeFileSync(f, readFileSync(f, 'utf8').replace(/const TOKEN = '[0-9a-f]*';/, "const TOKEN = '" + token + "';"));
console.log('TOKEN: ' + token);
console.log('Ya quedó en herramientas/google-sheets.gs. Pégalo en Apps Script y crea una nueva versión de la implementación.');
