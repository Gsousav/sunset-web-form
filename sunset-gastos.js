/* ============================================
   SUNSET SURF SHOP - Registro de Gastos
   JavaScript del formulario v2
   ============================================ */

// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
    WEBHOOK_URL: 'https://n8n.srv1211249.hstgr.cloud/webhook/sunset-gastos'
};

// ============================================
// CATÁLOGO COMPLETO (Rubro → Categoría → Descripción → Código)
// ============================================
const CATALOGO = {
    "1. MATERIALES DIRECTOS": {
        "Blanks (tabla)": {
            codigo: "MD-01",
            descripciones: [
                "Foam EPS - Nexpol - ETSA",
                "Almas de aluminio + Arenado",
                "Resina y Tela - Wilhelmi",
                "Planchas Mylar - Nanta, Rayben (ó PET)",
                "KURESA - Cinta PP, PVC, masking, duplo"
            ]
        },
        "Vinilo (forros)": {
            codigo: "MD-02",
            descripciones: [
                "Vinilos PVC - Viplastic",
                "Pegamento PVC y solvente - Artecola y HAC",
                "Tintas UV - Futura- D. & Arkam",
                "Etafoam (Epolsac - Insulex)",
                "Micas 3M o Korea",
                "Otros"
            ]
        },
        "Accesorios Tablas": {
            codigo: "MD-03",
            descripciones: [
                "Perfilplast y GBS Plastic - Quillas, Tapones, Asas etc",
                "Cristian Blister, Troquel, stickers, serigrafia etc",
                "Grips/ Tracks - Indelat",
                "Adhesivo Grip - Puryquimica",
                "Cordon Elastico - Mapasac",
                "Manguera Sled - Malvinas, Cardsilplast (tarpuy, ferhua)",
                "Hallen, tornillos, otros - Pernos y tuercas",
                "Mabel costura",
                "Vents - China (Import)",
                "Otros"
            ]
        },
        "Cuerdas Fundas Otros": {
            codigo: "MD-04",
            descripciones: [
                "Velcro 25, 50 El Amigo - China",
                "Drisa 180, 240 - Distribuidores Universales",
                "Manguita Cuerdas y Remos - Wilson Electric, Rayben",
                "Girador mosqueton Cuerdas, Sled - Distribuidores Universales / Mariños",
                "Grabación Laser Mats y grips paul",
                "Etiquetas bordadas Cuerdas - ZALAQUETT REY",
                "Varios - Multitop",
                "CORPORACION REY (CIERRES) / importacion",
                "Varios William: telas, cintas, cierres, hilos, ETA Foam, Strech Film, acc etc",
                "Otros"
            ]
        },
        "Embalaje y otros": {
            codigo: "MD-05",
            descripciones: [
                "Cartón corrugado 165 cm - Perupack-ICyP",
                "stretch film - Bolsas mat - Notex",
                "Afiches - Indigo, Grupo Felix Luis",
                "Bolsos tela Tienda dalias",
                "Termocontraible - CIP",
                "Manga - Sr. Moreno",
                "Otros"
            ]
        },
        "Fibra de vidrio": {
            codigo: "MD-06",
            descripciones: [
                "Materiales fibra de vidrio",
                "Servicios de tercero para fibra de vidrio",
                "Tela, resina, insumos fibra de vidrio"
            ]
        }
    },
    "2. GASTOS DE VENTAS": {
        "Sueldos y Comisiones": {
            codigo: "GV-01",
            descripciones: [
                "Comisiones Vendedores",
                "PAI / Innovate y Otros",
                "POS Dalias (vazech culqi web y PO, vendemas, otros)",
                "POS Dalias - RUS (Betty y Lucia) Culqi POS o vendemas",
                "MERCADO PAGO Lucia y Betty (no se factura)",
                "Paypal",
                "Certificado Origen",
                "Otros"
            ]
        },
        "Web y Publicidad digital": {
            codigo: "GV-02",
            descripciones: [
                "DU Diego",
                "Google ads",
                "META (linktree $5)",
                "Tik Tok",
                "Desarrollo sunset - SEO Sergio Olavarria RH",
                "Web rescue, indexa, dominios",
                "Dropbox + chat gpt",
                "Otros"
            ]
        },
        "Audiovisual, activaciones, diseño grafico": {
            codigo: "GV-03",
            descripciones: [
                "Viajes - viáticos",
                "Producción audiovisual",
                "Fotografía / Otros",
                "Activaciones/ Camp eventos",
                "Equipos Film Activac.",
                "Diseño gráfico (alex o jorge)",
                "Merch y bolsas tela",
                "Otros"
            ]
        },
        "Dalias: Alquiler, Activos, Servicios": {
            codigo: "GV-04",
            descripciones: [
                "Alquiler Dalias (CE)",
                "Tiendas suministros",
                "Tiendas (remodelacion) / activos Roger",
                "Aire acondicionado / camaras Dalias",
                "Solusoft + Easy Fact",
                "Alarmas Verisure dalias",
                "Luz Dalias Sum. 94740",
                "Telf 445 0206 Oficina",
                "SEDAPAL - DALIAS",
                "Internet 5G Claro Dalias codigo. H48637798"
            ]
        },
        "Servicio Envíos / Repartos": {
            codigo: "GV-06",
            descripciones: [
                "William Poma reparto clientes y movilidades otras",
                "Uber rappis",
                "CDS / shalom envios flete peru",
                "DHL / SERPOST Export",
                "Handling - EXPORTACIONES (StarCargo-La Hanseatica-DHL-Rox trans.Gamma)"
            ]
        }
    },
    "3. GASTOS ADMINSTRATIVOS": {
        "Sueldos Administrativos": {
            codigo: "GA-01",
            descripciones: [
                "Sueldo adm",
                "Sueldos de Ventas",
                "Contador",
                "William SERVIC SUNSET - servic ADM",
                "Celebraciones personal + comida/Café"
            ]
        },
        "Impuestos y otros": {
            codigo: "GA-02",
            descripciones: [
                "Imp. RUS Ventas tienda",
                "Uso de cuentas y de RUS (eli, Betty, Ana, Lucia)",
                "Imp. Renta Vazech 1.5%",
                "Regalias a CE $350",
                "Impuesto Sunat CE 5% (Alquileres dalias y fabrica, Boz y otros)",
                "Comisión uso RE daniel y andres 1% 2024",
                "Imp. Renta RE 1.5% +IGV 18% + DETRACCIONES",
                "Renta de 4TA - RETENCIONES 8%",
                "Interes Letras Dep.export etc",
                "Legalización, Notarias, Legal, utiles de oficina",
                "SISTEMA SISCONT - LICENCIAS FACTURADOR",
                "Gtos financieros BCP cta PAI y Innovate",
                "IGV compras de luc, and, mat, dan, charo, claudio",
                "Patentes y Registros Marcas",
                "Otros"
            ]
        },
        "Servicios": {
            codigo: "GA-03",
            descripciones: [
                "Alarmas Verisure fabrica (antes G4S)",
                "Telf e internet Fabrica - Movistar 12540430-13403017",
                "Celulares Entel y claro Lucia",
                "arreglo Compus, Laptop, Soporte Digital",
                "Recarga extintores",
                "Estacionamiento dalias"
            ]
        },
        "Movilidad Gasolina Carro Compu": {
            codigo: "GA-04",
            descripciones: [
                "Gasolina - Movilidad",
                "Seguros vehicular/ Carro otros",
                "Compus, Equipos uso ADM",
                "Otros"
            ]
        },
        "Gastos casa Juan Fanning - Depa Vasco - Caballeros": {
            codigo: "GA-05",
            descripciones: [
                "Limpieza, y activos JF PV",
                "Depa CE y charo",
                "Imp. Municipales",
                "compra activos y remodelaciones Casa JF",
                "Caballeros"
            ]
        }
    },
    "4. COSTOS INDIRECTOS-FABRICACIÓN": {
        "Servicios básicos y operación": {
            codigo: "CI-01",
            descripciones: [
                "Luz Fabrica sum. 629585",
                "Agua Fabrica sum. 2616483",
                "Movilidad (y) Rojas",
                "Servicios generales"
            ]
        },
        "Equipo Fibra de vidrio - Flaco - Equipo y mantt. de fábrica": {
            codigo: "CI-01",
            descripciones: [
                "Insumos de producción (fibra de vidrio, consumibles)",
                "Flaco compras",
                "Insumos para mantenimiento",
                "Mantenimiento de equipos (A/C, cámaras, otros)"
            ]
        },
        "Servicios de 3ros y MOI": {
            codigo: "CI-02",
            descripciones: [
                "Limpieza de fábrica",
                "Construcción, arreglos y mejoras - Roger",
                "Servicios técnicos especializados",
                "Servicios operativos externos"
            ]
        },
        "Activos, alquileres e impuestos": {
            codigo: "CI-04",
            descripciones: [
                "Activos fijos (AC/camaras)",
                "matrices",
                "Alquiler de fabrica",
                "Impuestos municipales fabrica",
                "Licencias y Permisos"
            ]
        }
    },
    "5. MANO DE OBRA": {
        "Mano Obra": {
            codigo: "MO-01",
            descripciones: [
                "Planilla MOD y MOI - Flaco",
                "Esalud, ONP, CTS y AFP + Seguro vida planilla vazech",
                "Otros / Martin Bici / Biella"
            ]
        }
    },
    "6. IMPORTACIONES": {
        "Importaciones": {
            codigo: "IL-01",
            descripciones: [
                "Gath y cascos china",
                "Skates Slide",
                "CHALECOS - CHINA",
                "Aletas",
                "REMOS y ISUP - NeoKudo",
                "Aquashoes",
                "Paddle inflable China",
                "Mats",
                "Otros - No wax - SurfCo Hawaii",
                "BB - CHINA / NINGBO BEYOUNG - Star cargo",
                "Yatu Outdoors - Drybag",
                "SCHARF - FEDEX - UPS - DHL import / MUESTRAS",
                "Accesorios Fibra",
                "Aletas Dafin",
                "VEIA USA"
            ]
        },
        "Productos Locales": {
            codigo: "IL-02",
            descripciones: [
                "LOPEZ CALDAS ROSA Polos/Lycras/ponchos",
                "Bloqueadores Sun bum",
                "Bloqueadores Surf Natural (olcese)",
                "Todo Surf shop",
                "Quillas FCS - (Blacksheep) - TRUE",
                "UNITRADE - Kayac Unikayac",
                "WM cera sticky bump / tracks / quillas futures",
                "Balance Boards (seven corporation peru)",
                "Sassa Home - Toallas",
                "Quillas de Fibra - Luis Valega B2",
                "Ceras Sunset (proveed. Inkawax Daniel Ruiz)",
                "Boz wetsuits - medias neopreno",
                "LENTES CARVE - SURFHOLDING",
                "KLIMAX",
                "FEELINGBOARD",
                "AMIGOS DEL MAR - LATAM (Protect solar)",
                "Holders (Nicolas Fisher)",
                "KOMBUCHA- QAMBU",
                "Otros"
            ]
        }
    }
};

// ============================================
// ELEMENTOS DEL DOM
// ============================================
const userSelect = document.getElementById('userSelect');

// Payment buttons
const paymentBtns = document.querySelectorAll('.payment-btn');
const extraTransferencia = document.getElementById('extraTransferencia');
const extraOtros = document.getElementById('extraOtros');
const inputTransferencia = document.getElementById('inputTransferencia');
const inputOtros = document.getElementById('inputOtros');

// AI elements
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('aiSendBtn');
const aiModal = document.getElementById('aiModal');
const aiLoading = document.getElementById('aiLoading');
const aiForm = document.getElementById('aiForm');
const aiButtons = document.getElementById('aiButtons');
const aiCancel = document.getElementById('aiCancel');
const aiConfirm = document.getElementById('aiConfirm');

// Form fields
const aiFecha = document.getElementById('aiFecha');
const aiFechaDisplay = document.getElementById('aiFechaDisplay');
const aiRubro = document.getElementById('aiRubro');
const aiCategoria = document.getElementById('aiCategoria');
const aiDescripcion = document.getElementById('aiDescripcion');
const aiCodigo = document.getElementById('aiCodigo');
const aiMonto = document.getElementById('aiMonto');
const aiMoneda = document.getElementById('aiMoneda');
const aiNota = document.getElementById('aiNota');

// Toast
const toast = document.getElementById('toast');

// Estado
let selectedPayment = null;

// ============================================
// FUNCIONES UTILITARIAS
// ============================================
function showToast(message = '¡Gasto registrado!', isError = false) {
    toast.textContent = (isError ? '✗ ' : '✓ ') + message;
    toast.classList.toggle('error', isError);
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

function validateUser() {
    if (!userSelect.value) {
        alert('Por favor selecciona quién está registrando');
        userSelect.focus();
        return false;
    }
    return true;
}

function validatePayment() {
    if (!selectedPayment) {
        alert('Por favor selecciona una forma de pago');
        return false;
    }
    // Validar campos extra si es necesario
    if (selectedPayment === 'Transferencia' && !inputTransferencia.value.trim()) {
        alert('Por favor indica desde qué cuenta se transfirió');
        inputTransferencia.focus();
        return false;
    }
    if (selectedPayment === 'Otros' && !inputOtros.value.trim()) {
        alert('Por favor especifica la forma de pago');
        inputOtros.focus();
        return false;
    }
    return true;
}

function getPaymentValue() {
    if (selectedPayment === 'Transferencia') {
        return `Transferencia: ${inputTransferencia.value.trim()}`;
    }
    if (selectedPayment === 'Otros') {
        return inputOtros.value.trim();
    }
    return selectedPayment;
}

function getTimestamp() {
    const now = new Date();

    const parts = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).formatToParts(now);

    const get = (type) => parts.find(p => p.type === type).value;

    return `${get('year')}-${get('month')}-${get('day')}T` +
           `${get('hour')}:${get('minute')}:${get('second')}.000Z`;
}


function getDate() {
    return new Date().toLocaleDateString('es-PE');
}

function getTodayISO() {
    const now = new Date();
    const peruDate = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(now);
    return peruDate; // Formato YYYY-MM-DD
}

function formatDateDisplay(isoDate) {
    if (!isoDate) return 'Hoy';
    const [year, month, day] = isoDate.split('-');
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy - ' + `${day}/${month}/${year}`;
    if (diffDays === 1) return 'Ayer - ' + `${day}/${month}/${year}`;
    return `${day}/${month}/${year}`;
}

function formatDateForDisplay(isoDate) {
    if (!isoDate) return new Date().toLocaleDateString('es-PE');
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
}

function initDateField() {
    const today = getTodayISO();
    aiFecha.value = today;
    aiFecha.max = today;
    aiFechaDisplay.textContent = formatDateDisplay(today);
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

// ============================================
// FORMAS DE PAGO
// ============================================
paymentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Deseleccionar todos
        paymentBtns.forEach(b => b.classList.remove('selected'));
        
        // Seleccionar este
        btn.classList.add('selected');
        selectedPayment = btn.dataset.payment;
        
        // Mostrar/ocultar campos extra
        extraTransferencia.classList.remove('visible');
        extraOtros.classList.remove('visible');
        inputTransferencia.value = '';
        inputOtros.value = '';
        
        if (btn.dataset.payment === 'Transferencia') {
            extraTransferencia.classList.add('visible');
            setTimeout(() => inputTransferencia.focus(), 100);
        } else if (btn.dataset.payment === 'Otros') {
            extraOtros.classList.add('visible');
            setTimeout(() => inputOtros.focus(), 100);
        }
    });
});

// ============================================
// DROPDOWNS ENCADENADOS
// ============================================
aiRubro.addEventListener('change', () => {
    const rubro = aiRubro.value;
    
    // Reset categoría y descripción
    aiCategoria.innerHTML = '<option value="">Seleccionar categoría...</option>';
    aiDescripcion.innerHTML = '<option value="">Primero selecciona una categoría...</option>';
    aiDescripcion.disabled = true;
    aiCodigo.value = '';
    
    if (rubro && CATALOGO[rubro]) {
        aiCategoria.disabled = false;
        const categorias = Object.keys(CATALOGO[rubro]);
        categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            aiCategoria.appendChild(option);
        });
    } else {
        aiCategoria.disabled = true;
    }
});

aiCategoria.addEventListener('change', () => {
    const rubro = aiRubro.value;
    const categoria = aiCategoria.value;
    
    // Reset descripción
    aiDescripcion.innerHTML = '<option value="">Seleccionar descripción...</option>';
    aiCodigo.value = '';
    
    if (rubro && categoria && CATALOGO[rubro][categoria]) {
        aiDescripcion.disabled = false;
        const data = CATALOGO[rubro][categoria];
        aiCodigo.value = data.codigo;
        
        data.descripciones.forEach(desc => {
            const option = document.createElement('option');
            option.value = desc;
            option.textContent = desc;
            aiDescripcion.appendChild(option);
        });
    } else {
        aiDescripcion.disabled = true;
    }
});

// Actualizar display cuando cambia la fecha
aiFecha.addEventListener('change', () => {
    aiFechaDisplay.textContent = formatDateDisplay(aiFecha.value);
});

document.querySelector('.date-field').addEventListener('click', () => {
    aiFecha.showPicker();
});

// ============================================
// AI - TEXTO LIBRE
// ============================================
aiSendBtn.addEventListener('click', sendToAI);
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendToAI();
    }
});

async function sendToAI() {
    if (!validateUser()) return;
    if (!validatePayment()) return;
    
    const text = aiInput.value.trim();
    if (!text) {
        alert('Por favor describe el gasto');
        aiInput.focus();
        return;
    }

    // Mostrar modal con loading
    openModal(aiModal);
    aiLoading.style.display = 'block';
    aiForm.style.display = 'none';
    aiButtons.style.display = 'none';

    try {
        const response = await fetch(CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                tipo: 'ai',
                texto: text,
                usuario: userSelect.value
            })
        });

        if (response.ok) {
            const data = await response.json();
            showAIResult(data);
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        closeModal(aiModal);
        showToast('Error al analizar', true);
    }
}

// Normalizar texto para comparación
function normalizeText(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/[^a-z0-9]/g, '') // Solo letras y números
        .trim();
}

// Buscar mejor match en un select
function findBestMatch(selectElement, searchValue) {
    if (!searchValue) return false;
    
    const normalizedSearch = normalizeText(searchValue);
    const options = selectElement.options;
    
    // Primero intentar match exacto
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === searchValue) {
            selectElement.value = options[i].value;
            return true;
        }
    }
    
    // Luego intentar match normalizado
    for (let i = 0; i < options.length; i++) {
        if (normalizeText(options[i].value) === normalizedSearch) {
            selectElement.value = options[i].value;
            return true;
        }
    }
    
    // Luego intentar match parcial (contiene)
    for (let i = 0; i < options.length; i++) {
        const normalizedOption = normalizeText(options[i].value);
        if (normalizedOption.includes(normalizedSearch) || normalizedSearch.includes(normalizedOption)) {
            selectElement.value = options[i].value;
            return true;
        }
    }
    
    // Match por palabras clave
    const searchWords = normalizedSearch.split(/\s+/).filter(w => w.length > 2);
    for (let i = 0; i < options.length; i++) {
        const normalizedOption = normalizeText(options[i].value);
        const matchedWords = searchWords.filter(word => normalizedOption.includes(word));
        if (matchedWords.length >= Math.ceil(searchWords.length / 2)) {
            selectElement.value = options[i].value;
            return true;
        }
    }
    
    return false;
}

function showAIResult(data) {
    console.log('AI Response:', data); // Debug
    
    // Ocultar loading, mostrar formulario
    aiLoading.style.display = 'none';
    aiForm.style.display = 'block';
    aiButtons.style.display = 'flex';

    // Llenar Rubro si existe
    if (data.rubro) {
        const rubroFound = findBestMatch(aiRubro, data.rubro);
        console.log('Rubro match:', rubroFound, aiRubro.value); // Debug
        
        if (rubroFound) {
            aiRubro.dispatchEvent(new Event('change'));
            
            // Esperar a que se llenen las categorías
            setTimeout(() => {
                if (data.categoria) {
                    const catFound = findBestMatch(aiCategoria, data.categoria);
                    console.log('Categoria match:', catFound, aiCategoria.value); // Debug
                    
                    if (catFound) {
                        aiCategoria.dispatchEvent(new Event('change'));
                        
                        // Esperar a que se llenen las descripciones
                        setTimeout(() => {
                            if (data.descripcion) {
                                const descFound = findBestMatch(aiDescripcion, data.descripcion);
                                console.log('Descripcion match:', descFound, aiDescripcion.value); // Debug
                            }
                        }, 100);
                    }
                }
            }, 100);
        }
    }

    // Llenar otros campos
    initDateField();
    aiMonto.value = data.monto && data.monto > 0 ? data.monto : '';    aiMoneda.value = data.moneda || 'PEN';
    aiNota.value = data.nota || '';

    // Focus en monto para verificar
    setTimeout(() => aiMonto.focus(), 300);
}

aiCancel.addEventListener('click', () => {
    closeModal(aiModal);
    resetForm();
});

aiConfirm.addEventListener('click', async () => {
    // Validaciones
    if (!aiRubro.value) {
        alert('Por favor selecciona un rubro');
        aiRubro.focus();
        return;
    }
    if (!aiCategoria.value) {
        alert('Por favor selecciona una categoría');
        aiCategoria.focus();
        return;
    }
    if (!aiDescripcion.value) {
        alert('Por favor selecciona una descripción');
        aiDescripcion.focus();
        return;
    }
    
    const monto = parseFloat(aiMonto.value);
    if (!monto || monto <= 0) {
        alert('Por favor ingresa un monto válido');
        aiMonto.focus();
        return;
    }

    aiConfirm.disabled = true;
    aiConfirm.textContent = 'Enviando...';

    const data = {
        tipo: 'confirm',
        fecha: formatDateForDisplay(aiFecha.value),
        rubro: aiRubro.value,
        codigo: aiCodigo.value,
        categoria: aiCategoria.value,
        descripcion: aiDescripcion.value,
        monto: monto,
        moneda: aiMoneda.value,
        forma_pago: getPaymentValue(),
        nota: aiNota.value || '',
        registrado_por: userSelect.value,
        timestamp: getTimestamp()
    };

    try {
        const response = await fetch(CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closeModal(aiModal);
            resetForm();
            showToast();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al guardar', true);
    }

    aiConfirm.disabled = false;
    aiConfirm.textContent = '✓ Registrar';
});

function resetForm() {
    aiInput.value = '';
    aiFecha.value = '';
    aiRubro.value = '';
    aiCategoria.innerHTML = '<option value="">Primero selecciona un rubro...</option>';
    aiCategoria.disabled = true;
    aiDescripcion.innerHTML = '<option value="">Primero selecciona una categoría...</option>';
    aiDescripcion.disabled = true;
    aiCodigo.value = '';
    aiMonto.value = '';
    aiMoneda.value = 'PEN';
    aiNota.value = '';
}

// ============================================
// CERRAR MODALES
// ============================================
aiModal.addEventListener('click', (e) => {
    if (e.target === aiModal) {
        closeModal(aiModal);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(aiModal);
    }
});