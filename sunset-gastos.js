/* ============================================
   SUNSET SURF SHOP - Registro de Gastos
   JavaScript del formulario
   ============================================ */

// ============================================
// CONFIGURACIÓN - CAMBIAR ESTOS VALORES
// ============================================
const CONFIG = {
    // URL del webhook de n8n (cambiar a producción cuando esté listo)
    WEBHOOK_URL: 'https://n8n.srv1211249.hstgr.cloud/webhook/sunset-gastos'
};

// Catálogo de códigos para obtener la categoría
const CATALOGO = {
    'MD-01': 'Blanks (tabla)',
    'MD-02': 'Vinilo (forros)',
    'MD-03': 'Accesorios Tablas',
    'MD-04': 'Cuerdas Fundas Otros',
    'MD-05': 'Embalaje y otros',
    'MD-06': 'Fibra de vidrio',
    'GV-01': 'Sueldos y Comisiones',
    'GV-02': 'Publicidad',
    'GV-03': 'Contenido Audiovisual',
    'GV-04': 'Dalias Alquiler/Servicios',
    'GV-05': 'Página Web',
    'GV-06': 'Servicio Envíos/Repartos',
    'GA-01': 'Sueldos Administrativos',
    'GA-02': 'Impuestos y otros',
    'GA-03': 'Servicios Admin',
    'GA-04': 'Otros Admin',
    'CI-01': 'Servicios fábrica',
    'CI-02': 'Insumos y mantenimiento',
    'CI-03': 'Servicios de terceros',
    'CI-04': 'Activos y alquileres',
    'MO-01': 'Mano de Obra',
    'IL-01': 'Importaciones',
    'IL-02': 'Productos Locales',
    'CF-01': 'Café Sunset Dalias'
};

// ============================================
// ELEMENTOS DEL DOM
// ============================================
const userSelect = document.getElementById('userSelect');
const quickBtns = document.querySelectorAll('.quick-btn');

// Modal Quick
const quickModal = document.getElementById('quickModal');
const quickModalIcon = document.getElementById('quickModalIcon');
const quickModalTitle = document.getElementById('quickModalTitle');
const quickModalSubtitle = document.getElementById('quickModalSubtitle');
const quickAmount = document.getElementById('quickAmount');
const quickNote = document.getElementById('quickNote');
const quickCancel = document.getElementById('quickCancel');
const quickConfirm = document.getElementById('quickConfirm');

// Modal AI
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('aiSendBtn');
const aiModal = document.getElementById('aiModal');
const aiLoading = document.getElementById('aiLoading');
const aiForm = document.getElementById('aiForm');
const aiButtons = document.getElementById('aiButtons');
const aiCancel = document.getElementById('aiCancel');
const aiConfirm = document.getElementById('aiConfirm');

// AI Form fields
const aiCodigo = document.getElementById('aiCodigo');
const aiDescripcion = document.getElementById('aiDescripcion');
const aiMonto = document.getElementById('aiMonto');
const aiMoneda = document.getElementById('aiMoneda')
const aiNota = document.getElementById('aiNota');

// Toast
const toast = document.getElementById('toast');

// Estado actual
let currentQuickData = null;

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

function getTimestamp() {
    return new Date().toISOString();
}

function getDate() {
    return new Date().toLocaleDateString('es-PE');
}

function closeModal(modal) {
    modal.classList.remove('active');
}

function openModal(modal) {
    modal.classList.add('active');
}

// ============================================
// GASTOS RÁPIDOS
// ============================================
quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!validateUser()) return;

        currentQuickData = {
            code: btn.dataset.code,
            category: btn.dataset.category,
            description: btn.dataset.description,
            icon: btn.querySelector('.quick-btn-icon').textContent
        };

        // Llenar modal
        quickModalIcon.textContent = currentQuickData.icon;
        quickModalTitle.textContent = currentQuickData.description;
        quickModalSubtitle.textContent = `${currentQuickData.code} • ${currentQuickData.category}`;
        quickAmount.value = '';
        quickNote.value = '';
        
        openModal(quickModal);
        setTimeout(() => quickAmount.focus(), 300);
    });
});

quickCancel.addEventListener('click', () => {
    closeModal(quickModal);
    currentQuickData = null;
});

quickConfirm.addEventListener('click', async () => {
    const amount = parseFloat(quickAmount.value);
    if (!amount || amount <= 0) {
        alert('Por favor ingresa un monto válido');
        quickAmount.focus();
        return;
    }

    const data = {
        tipo: 'quick',
        fecha: getDate(),
        codigo: currentQuickData.code,
        categoria: currentQuickData.category,
        descripcion: currentQuickData.description,
        monto: amount,
        nota: quickNote.value || '',
        registrado_por: userSelect.value,
        timestamp: getTimestamp()
    };

    quickConfirm.disabled = true;
    quickConfirm.textContent = 'Enviando...';

    try {
        const response = await fetch(CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closeModal(quickModal);
            showToast();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al enviar', true);
    }

    quickConfirm.disabled = false;
    quickConfirm.textContent = 'Registrar';
    currentQuickData = null;
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
    
    const text = aiInput.value.trim();
    if (!text) {
        alert('Por favor escribe el gasto');
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

function showAIResult(data) {
    // Ocultar loading, mostrar formulario
    aiLoading.style.display = 'none';
    aiForm.style.display = 'block';
    aiButtons.style.display = 'flex';

    // Llenar campos con datos del AI
    aiCodigo.value = data.codigo || 'MD-01';
    aiDescripcion.value = data.descripcion || '';
    aiMonto.value = data.monto || 0;
    aiMoneda.value = data.moneda || "PEN"
    aiNota.value = data.nota || '';

    // Focus en monto para verificar
    setTimeout(() => aiMonto.focus(), 100);
}

aiCancel.addEventListener('click', () => {
    closeModal(aiModal);
});

aiConfirm.addEventListener('click', async () => {
    const monto = parseFloat(aiMonto.value);
    const moneda = aiMoneda.value;
    if (!monto || monto <= 0) {
        alert('Por favor ingresa un monto válido');
        aiMonto.focus();
        return;
    }

    aiConfirm.disabled = true;
    aiConfirm.textContent = 'Enviando...';

    // Obtener categoría del catálogo
    const codigo = aiCodigo.value;
    const categoria = CATALOGO[codigo] || '';

    const data = {
        tipo: 'confirm',
        fecha: getDate(),
        codigo: codigo,
        categoria: categoria,
        descripcion: aiDescripcion.value,
        monto: monto,
        moneda: moneda,
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
            aiInput.value = '';
            showToast();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al guardar', true);
    }

    aiConfirm.disabled = false;
    aiConfirm.textContent = '✓ Confirmar';
});

// ============================================
// CERRAR MODALES CON CLICK AFUERA
// ============================================
quickModal.addEventListener('click', (e) => {
    if (e.target === quickModal) {
        closeModal(quickModal);
    }
});

aiModal.addEventListener('click', (e) => {
    if (e.target === aiModal) {
        closeModal(aiModal);
    }
});

// ============================================
// CERRAR MODALES CON ESC
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(quickModal);
        closeModal(aiModal);
    }
});