# 📖 Documentación - Sunset Registro de Gastos

## Índice

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Cómo Agregar/Modificar Categorías](#cómo-agregarmodificar-categorías)
3. [Cómo Agregar/Modificar Gastos Rápidos](#cómo-agregarmodificar-gastos-rápidos)
4. [Cómo Quitar la Sección de Gastos Rápidos](#cómo-quitar-la-sección-de-gastos-rápidos)
5. [Cómo Agregar/Modificar Usuarios](#cómo-agregarmodificar-usuarios)
6. [Configuración de n8n](#configuración-de-n8n)
7. [Cambiar Estilos Visuales](#cambiar-estilos-visuales)
8. [Cambiar URL del Webhook](#cambiar-url-del-webhook)
9. [Solución de Problemas](#solución-de-problemas)

---

## Estructura del Proyecto

```
sunset-web-form/
├── index.html          # Estructura HTML del formulario
├── sunset-gastos.css   # Estilos visuales
├── sunset-gastos.js    # Lógica y conexión con n8n
└── DOCUMENTACION.md    # Este archivo
```

| Archivo | Qué modificar aquí |
|---------|-------------------|
| `index.html` | Botones rápidos, usuarios, estructura visual |
| `sunset-gastos.css` | Colores, tamaños, fuentes, espaciado |
| `sunset-gastos.js` | Categorías, URL webhook, lógica |

---

## Cómo Agregar/Modificar Categorías

Las categorías aparecen en **2 lugares** que debes mantener sincronizados:

### 1. En el archivo `sunset-gastos.js` (línea ~15)

Busca el objeto `CATALOGO`:

```javascript
const CATALOGO = {
    'MD-01': 'Blanks (tabla)',
    'MD-02': 'Vinilo (forros)',
    // ... más categorías
};
```

**Para agregar una nueva categoría:**

```javascript
const CATALOGO = {
    'MD-01': 'Blanks (tabla)',
    'MD-02': 'Vinilo (forros)',
    'MD-07': 'Nueva Categoría',  // ← Agregar aquí
    // ... resto
};
```

### 2. En el archivo `index.html` (línea ~100 aprox)

Busca el `<select id="aiCodigo">`:

```html
<select class="modal-select" id="aiCodigo">
    <option value="MD-01">MD-01 - Blanks (tabla)</option>
    <option value="MD-02">MD-02 - Vinilo (forros)</option>
    <!-- Agregar nueva opción aquí -->
    <option value="MD-07">MD-07 - Nueva Categoría</option>
</select>
```

### 3. En n8n - Prompt del AI (nodo OpenAI)

Actualiza el prompt del sistema para incluir la nueva categoría:

```
CATÁLOGO DE CÓDIGOS:
- MD-01: Blanks (tabla) - Foam, resina, tela
- MD-02: Vinilo (forros) - Vinilos PVC, pegamento
- MD-07: Nueva Categoría - Descripción de qué incluye  ← Agregar
```

---

## Cómo Agregar/Modificar Gastos Rápidos

### Ubicación en `index.html`

Busca la sección `<!-- Quick Expenses -->` (línea ~45 aprox):

```html
<div class="quick-buttons">
    <button class="quick-btn" 
            data-code="GV-06" 
            data-category="Servicio Envíos / Repartos" 
            data-description="Movilidad y taxi">
        <span class="quick-btn-icon">🚕</span>
        Movilidad
        <span class="quick-btn-label">GV-06</span>
    </button>
    <!-- Más botones... -->
</div>
```

### Para agregar un nuevo botón rápido

Copia y pega este template dentro de `<div class="quick-buttons">`:

```html
<button class="quick-btn" 
        data-code="CODIGO-AQUI" 
        data-category="Nombre de la Categoría" 
        data-description="Descripción corta">
    <span class="quick-btn-icon">🆕</span>
    Nombre Botón
    <span class="quick-btn-label">CODIGO-AQUI</span>
</button>
```

### Atributos del botón

| Atributo | Qué es | Ejemplo |
|----------|--------|---------|
| `data-code` | Código que va a Google Sheets | `GV-06` |
| `data-category` | Categoría que va a Sheets | `Servicio Envíos / Repartos` |
| `data-description` | Descripción del gasto | `Movilidad y taxi` |
| `quick-btn-icon` | Emoji del botón | 🚕 |
| Texto del botón | Lo que ve el usuario | `Movilidad` |
| `quick-btn-label` | Código visible debajo | `GV-06` |

### Ejemplo: Agregar botón "Almuerzo"

```html
<button class="quick-btn" 
        data-code="GA-01" 
        data-category="Sueldos Administrativos" 
        data-description="Almuerzo equipo">
    <span class="quick-btn-icon">🍽️</span>
    Almuerzo
    <span class="quick-btn-label">GA-01</span>
</button>
```

### Emojis útiles para gastos

| Emoji | Uso sugerido |
|-------|--------------|
| 🚕 | Taxi, movilidad |
| ⚡ | Luz, electricidad |
| 💧 | Agua |
| 📦 | Materiales, paquetes |
| 🚚 | Envíos, courier |
| 🍽️ | Comida, almuerzo |
| ⛽ | Gasolina |
| 📱 | Teléfono, celular |
| 💻 | Computadora, tech |
| 🏠 | Alquiler, local |
| 🧾 | Impuestos, facturas |
| 👷 | Mano de obra |
| ✈️ | Viajes |
| 📢 | Publicidad |

---

## Cómo Quitar la Sección de Gastos Rápidos

Si el cliente prefiere usar **solo el AI** sin botones rápidos:

### Opción A: Ocultar con CSS (recomendado - fácil revertir)

En `sunset-gastos.css`, agrega al final:

```css
/* Ocultar gastos rápidos */
.quick-buttons {
    display: none !important;
}
```

O para ocultar toda la tarjeta:

```css
/* Ocultar toda la sección de gastos rápidos */
section.card:nth-of-type(2) {
    display: none !important;
}
```

### Opción B: Eliminar del HTML (permanente)

En `index.html`, elimina toda esta sección (líneas ~43-80 aprox):

```html
<!-- ELIMINAR DESDE AQUÍ -->
<section class="card">
    <h2 class="card-title">
        <span class="card-title-icon">⚡</span>
        Gastos Rápidos
    </h2>
    <div class="quick-buttons">
        <!-- ... todos los botones ... -->
    </div>
</section>
<!-- HASTA AQUÍ -->
```

### Opción C: En n8n - Eliminar ruta Quick

Si eliminaste los botones, puedes simplificar n8n:

1. En el nodo **Switch**, elimina la regla `quick`
2. Elimina el nodo **Guardar Gasto Rápido**
3. El workflow queda solo con la ruta AI

---

## Cómo Agregar/Modificar Usuarios

### Ubicación en `index.html`

Busca el `<select id="userSelect">` (línea ~30 aprox):

```html
<select class="user-select" id="userSelect">
    <option value="">Seleccionar...</option>
    <option value="Andres">Andrés</option>
    <option value="Lucia">Lucía</option>
    <option value="Matias">Matías</option>
    <option value="Otro">Otro</option>
</select>
```

### Para agregar un usuario

```html
<option value="NombreSinTilde">Nombre Con Tilde</option>
```

**Ejemplo:**

```html
<option value="Maria">María</option>
<option value="Carlos">Carlos</option>
```

### Para eliminar un usuario

Simplemente borra la línea `<option>` correspondiente.

---

## Configuración de n8n

### Estructura del Workflow

```
[Recibir Datos] → [Tipo de Registro] ─┬─→ [Guardar Gasto Rápido]
     (Webhook)        (Switch)        │
                                      ├─→ [Categorizar con AI] → [Responder al Formulario]
                                      │        (OpenAI)              (Respond Webhook)
                                      │
                                      └─→ [Guardar Gasto AI]
                                              (Google Sheets)
```

### Nodo: Recibir Datos (Webhook)

| Campo | Valor |
|-------|-------|
| HTTP Method | POST |
| Path | `sunset-gastos` |
| Response Mode | Respond to Webhook |

**URL Producción:** `https://tu-n8n.com/webhook/sunset-gastos`
**URL Test:** `https://tu-n8n.com/webhook-test/sunset-gastos`

### Nodo: Tipo de Registro (Switch)

| Regla | Condición | Salida |
|-------|-----------|--------|
| 1 | `$json.tipo` equals `quick` | Quick |
| 2 | `$json.tipo` equals `ai` | AI |
| 3 | `$json.tipo` equals `confirm` | Confirm |

### Nodo: Categorizar con AI (OpenAI)

**Modelo:** `gpt-4o-mini`

**System Prompt:**
```
Eres un asistente que categoriza gastos para Sunset Surf Shop.

CATÁLOGO DE CÓDIGOS:
- MD-01: Blanks (tabla) - Foam, resina, tela
- MD-02: Vinilo (forros) - Vinilos PVC, pegamento
[... resto del catálogo ...]

Responde ÚNICAMENTE con JSON válido:
{"codigo":"XX-00","categoria":"nombre","descripcion":"desc","monto":0,"nota":"nota"}
```

**User Prompt:** `{{ $json.texto }}`

### Nodo: Responder al Formulario

| Campo | Valor |
|-------|-------|
| Respond With | JSON |
| Response Body | `{{ JSON.parse($json.output[0].content[0].text) }}` |

### Nodos: Google Sheets (ambos)

| Campo | Valor |
|-------|-------|
| Operation | Append Row |
| Document | Tu Google Sheet |
| Sheet | `Registros` |

**Columnas:**

| Columna | Expresión |
|---------|-----------|
| Fecha | `{{ $json.fecha }}` |
| Codigo | `{{ $json.codigo }}` |
| Categoria | `{{ $json.categoria }}` |
| Descripcion | `{{ $json.descripcion }}` |
| Monto | `{{ $json.monto }}` |
| Nota | `{{ $json.nota }}` |
| Registrado_por | `{{ $json.registrado_por }}` |
| Timestamp | `{{ $json.timestamp }}` |

### Agregar Nueva Categoría al Prompt AI

Edita el nodo OpenAI y agrega la categoría en el System Prompt:

```
CATÁLOGO DE CÓDIGOS:
- MD-01: Blanks (tabla) - Foam, resina, tela
- MD-07: Nueva Categoría - Descripción de qué incluye  ← AGREGAR
```

---

## Cambiar Estilos Visuales

### Colores principales

En `sunset-gastos.css`, busca `:root` (línea ~10):

```css
:root {
    --sunset-orange: #FF6B35;    /* Naranja principal */
    --sunset-yellow: #FFB547;    /* Amarillo acentos */
    --ocean-blue: #1E3A5F;       /* Azul fondo oscuro */
    --ocean-light: #2E5077;      /* Azul fondo claro */
    --sand: #FFF8F0;             /* Beige tarjetas */
    --sand-dark: #F5EBE0;        /* Beige bordes */
    --success: #4CAF50;          /* Verde éxito */
    --error: #e74c3c;            /* Rojo error */
    --text-dark: #1a1a1a;        /* Texto oscuro */
    --text-light: #666;          /* Texto claro */
}
```

### Cambiar color del fondo

```css
body {
    background: linear-gradient(135deg, #1E3A5F 0%, #2E5077 100%);
    /* Cambia los colores hex por los que quieras */
}
```

### Cambiar fuentes

En `index.html`, busca los links de Google Fonts y cámbialos:

```html
<link href="https://fonts.googleapis.com/css2?family=NUEVA+FUENTE&display=swap" rel="stylesheet">
```

Luego en `sunset-gastos.css`:

```css
body {
    font-family: 'NUEVA FUENTE', sans-serif;
}
```

### Cambiar tamaño de botones rápidos

```css
.quick-btn {
    padding: 20px 16px;  /* Más grande */
    font-size: 16px;     /* Texto más grande */
}

.quick-btn-icon {
    font-size: 32px;     /* Emoji más grande */
}
```

---

## Cambiar URL del Webhook

### Para pasar de Test a Producción

En `sunset-gastos.js`, busca `CONFIG` (línea ~10):

```javascript
const CONFIG = {
    // Test (para desarrollo)
    WEBHOOK_URL: 'https://n8n.srv1211249.hstgr.cloud/webhook-test/sunset-gastos'
    
    // Producción (quitar -test)
    // WEBHOOK_URL: 'https://n8n.srv1211249.hstgr.cloud/webhook/sunset-gastos'
};
```

**Importante:** En n8n, activa el workflow (toggle arriba a la derecha) para que funcione la URL de producción.

---

## Solución de Problemas

### "Error al enviar" al confirmar gasto

| Causa | Solución |
|-------|----------|
| Webhook no activo | Activa "Listen for test event" en n8n |
| URL incorrecta | Verifica la URL en `sunset-gastos.js` |
| Workflow desactivado | Activa el toggle del workflow en n8n |

### AI no categoriza bien

| Causa | Solución |
|-------|----------|
| Categoría no está en el prompt | Agrégala al System Prompt del nodo OpenAI |
| Descripción muy ambigua | El usuario puede editar antes de confirmar |

### No llega a Google Sheets

| Causa | Solución |
|-------|----------|
| Credenciales expiradas | Re-autoriza el Service Account |
| Nombre de hoja incorrecto | Verifica que sea `Registros` |
| Columnas no coinciden | Verifica nombres exactos de columnas |

### Formulario no carga estilos

| Causa | Solución |
|-------|----------|
| Archivos en carpetas diferentes | Los 3 archivos deben estar juntos |
| Nombre incorrecto | Verifica que sea `sunset-gastos.css` |

### Modal no aparece al hacer clic

| Causa | Solución |
|-------|----------|
| JavaScript no carga | Verifica que `sunset-gastos.js` existe |
| Error en consola | Abre F12 → Console y revisa errores |

---

## Checklist para Cambios

Cuando hagas modificaciones, verifica:

- [ ] Cambié en **todos** los lugares necesarios (HTML, JS, n8n)
- [ ] Probé en modo test antes de producción
- [ ] Los datos llegan correctamente a Google Sheets
- [ ] Funciona en móvil
- [ ] Subí los cambios a Vercel/GitHub

---

## Contacto

Si necesitas ayuda adicional con modificaciones más complejas, consulta con el desarrollador.

---

*Última actualización: Enero 2026*