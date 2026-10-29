/**
 * Lista de invitados XV Kyara en Google Sheets.
 * Pega este código en: Hoja de cálculo → Extensiones → Apps Script → Código.gs
 * Luego: Implementar → Nueva implementación → Tipo: Aplicación web
 *        Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario → Implementar
 * Copia la URL que termina en /exec y pégala en panel.html (const SHEETS_URL).
 *
 * TOKEN: se deriva de la contraseña del panel. Si cambias la contraseña con
 * herramientas/nueva-clave.mjs, ese script te imprime el TOKEN nuevo para pegarlo aquí.
 */
const TOKEN = '23c65e11e9b53cae2e7628c4af9116b0efe655aa4e49a5a5f6d16f5eac5f42b6';
const HOJA = 'Invitados';
// Solo si el script NO se creó desde la hoja (Extensiones → Apps Script): pega aquí el ID de la hoja
// (lo que va entre /d/ y /edit en la URL de la hoja). Si se creó desde la hoja, déjalo vacío.
const SHEET_ID = '';
const COLS = ['id', 'nombre', 'pases', 'mesa', 'telefono', 'estado', 'q', 'firmado', 'actualizado'];

function hoja_() {
  const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('El script no está unido a la hoja: créalo desde la hoja (Extensiones → Apps Script) o pon SHEET_ID');
  let sh = ss.getSheetByName(HOJA);
  if (!sh) sh = ss.insertSheet(HOJA);
  if (sh.getLastRow() === 0) {
    sh.appendRow(COLS);
    sh.getRange(1, 1, 1, COLS.length).setFontWeight('bold').setBackground('#e4ecd8');
    sh.setFrozenRows(1);
    sh.hideColumns(7, 2); // q y firmado: datos técnicos del link
  }
  return sh;
}
function leer_(sh) {
  const n = sh.getLastRow() - 1;
  if (n < 1) return [];
  return sh.getRange(2, 1, n, COLS.length).getValues()
    .filter(r => r[0])
    .map(r => Object.fromEntries(COLS.map((c, i) => [c, r[i] instanceof Date ? r[i].toISOString() : String(r[i])])));
}
function fila_(g) { return COLS.map(c => c === 'actualizado' ? new Date() : (g[c] == null ? '' : g[c])); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// Prueba rápida: abre la URL /exec en el navegador
function doGet() {
  let hoja = 'ok';
  try { hoja_(); } catch (err) { hoja = String(err.message || err); }
  return json_({ ok: true, servicio: 'Invitados XV Kyara', hoja: hoja, token: TOKEN.slice(0, 8) });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const req = JSON.parse(e.postData.contents || '{}');
    if (req.token !== TOKEN) return json_({ ok: false, error: 'No autorizado' });
    lock.waitLock(20000);
    const sh = hoja_();

    if (req.action === 'list') return json_({ ok: true, rows: leer_(sh) });

    if (req.action === 'upsert') {
      const ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(r => String(r[0])) : [];
      (req.rows || []).forEach(g => {
        const i = ids.indexOf(String(g.id));
        if (i >= 0) sh.getRange(i + 2, 1, 1, COLS.length).setValues([fila_(g)]);
        else { sh.appendRow(fila_(g)); ids.push(String(g.id)); }
      });
      return json_({ ok: true });
    }

    if (req.action === 'delete') {
      const ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(r => String(r[0])) : [];
      const i = ids.indexOf(String(req.id));
      if (i >= 0) sh.deleteRow(i + 2);
      return json_({ ok: true });
    }

    if (req.action === 'replace') {
      if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, COLS.length).clearContent();
      const rows = (req.rows || []).map(fila_);
      if (rows.length) sh.getRange(2, 1, rows.length, COLS.length).setValues(rows);
      return json_({ ok: true });
    }
    return json_({ ok: false, error: 'Acción desconocida' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}
