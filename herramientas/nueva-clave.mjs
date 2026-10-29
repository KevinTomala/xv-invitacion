// Cambia la contraseña del panel generando un par de llaves nuevo.
// Uso (desde la carpeta del proyecto):  node herramientas/nueva-clave.mjs "nueva-contraseña"
// OJO: los links enviados antes de cambiar la clave dejan de funcionar; hay que reenviarlos.
import { webcrypto as c } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
const pass = process.argv[2];
if (!pass || pass.length < 10) { console.error('Escribe una contraseña de al menos 10 caracteres.'); process.exit(1); }
const s = c.subtle, b64u = b => Buffer.from(b).toString('base64url');
const kp = await s.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
const j = await s.exportKey('jwk', kp.publicKey);
const pub = { kty: j.kty, crv: j.crv, x: j.x, y: j.y };
const priv = new TextEncoder().encode(JSON.stringify(await s.exportKey('jwk', kp.privateKey)));
const salt = c.getRandomValues(new Uint8Array(16)), iv = c.getRandomValues(new Uint8Array(12));
const base = await s.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
const aes = await s.deriveKey({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const ct = await s.encrypt({ name: 'AES-GCM', iv }, aes, priv);
const llave = { salt: b64u(salt), iv: b64u(iv), ct: b64u(ct), it: 310000 };
const patch = (file, re, val) => { const t = readFileSync(file, 'utf8'); if (!re.test(t)) throw new Error('No encontré la llave en ' + file); writeFileSync(file, t.replace(re, val)); };
patch('index.html', /const LLAVE_PUBLICA = \{.*?\};/s, 'const LLAVE_PUBLICA = ' + JSON.stringify(pub) + ';');
patch('panel.html', /const LLAVE_CIFRADA = \{.*?\};/s, 'const LLAVE_CIFRADA = ' + JSON.stringify(llave) + ';');
console.log('Listo. Nueva contraseña aplicada. Haz git add . && git commit && git push, y reenvía los links desde el panel.');
