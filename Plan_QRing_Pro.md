# PLAN QRING PRO

---

## 1. FLUJO OPERATIVO PROPUESTO

1. El visitante escanea el QR (contiene una URL con un ID único generado a partir de la dirección).
2. La URL lleva a un backend (web/app intermedia) que consulta una base de datos.
3. El sistema muestra los pisos y departamentos que usan la app en ese domicilio (solo los que tienen versión Pro activa).
4. El visitante elige el dpto y se inicia una llamada (voz o video) a la app del usuario correspondiente, sin exponer su número real.

---

## 2. COMPONENTES TÉCNICOS Y HERRAMIENTAS GRATUITAS

**Frontend:**
- App React Native para usuarios (inquilinos/propietarios).
- Web simple para visitantes (opcional).

**Backend:**
- Base de datos gratuita: Firebase (Firestore) o Supabase.
- Servidor backend: Cloud Functions (Firebase) o Vercel/Netlify Functions.
- Autenticación: Firebase Auth.

**Comunicación (llamadas y videollamadas):**
- WebRTC (gratis, estándar para llamadas y videollamadas P2P).
- Servidor de señalización: WebSocket en Heroku, Vercel, etc.
- Notificaciones push: Firebase Cloud Messaging.

**Pagos:**
- Stripe o MercadoPago (APIs gratuitas, solo cobran comisión por transacción).

---

## 3. VIABILIDAD Y DESAFÍOS

- Todo es viable usando servicios gratuitos para MVP/prototipo y bajo volumen.
- WebRTC es gratis, pero para producción y muchos usuarios puede requerir servidores TURN/STUN pagos.
- El backend tipo DNS es simple de implementar con Firebase/Supabase.
- El algoritmo para el ID puede ser un hash de la dirección normalizada.
- Listar solo usuarios Pro es fácil de filtrar en la base de datos.
- Escalabilidad: para pocos usuarios, todo es gratis; si crece, algunos servicios pueden requerir upgrade.

---

## 4. FLUJO DETALLADO

1. El usuario Pro registra su domicilio y paga.
2. El sistema genera un ID único para ese domicilio/dpto.
3. Se imprime un QR con la URL: `https://qring.app/visit?id=ID_GENERADO`
4. El visitante escanea el QR y accede a la web/app:
   - El backend busca el ID en la base de datos.
   - Muestra los pisos/dptos disponibles (Pro).
   - El visitante elige a quién llamar.
5. Se inicia la llamada (voz/video) vía WebRTC:
   - El backend notifica al usuario (push).
   - El usuario abre la app y atiende la llamada.
   - La comunicación es directa, sin exponer datos personales.

---

## 5. SIGUIENTE PASO (DETALLE Y ALGORITMO)

### a) Diagrama Visual del Flujo

1. **Visitante escanea QR**  
   ↓  
2. **Web/App intermedia recibe el ID**  
   ↓  
3. **Consulta a la base de datos (por ID)**  
   ↓  
4. **Muestra lista de pisos/dptos activos (Pro)**  
   ↓  
5. **Visitante elige dpto**  
   ↓  
6. **Se inicia la llamada (WebRTC)**  
   ↓  
7. **Notificación push al usuario**  
   ↓  
8. **Usuario atiende desde la app**  
   ↓  
9. **Comunicación directa (voz/video)**

---

### b) Funcionamiento del Algoritmo para el ID

**Objetivo:**  
Generar un ID único, seguro y no predecible para cada domicilio/dpto, basado en la dirección.

**Pasos:**
1. **Normalización de la dirección:**
   - Convertir todo a mayúsculas/minúsculas.
   - Eliminar tildes, caracteres especiales y espacios extra.
   - Ejemplo: "Rondeau 2542 PB 1" → "RONDEAU2542PB1"
2. **Concatenación de campos relevantes:**
   - Calle + Altura + Piso + Dpto (y cualquier otro campo necesario).
   - Ejemplo: "RONDEAU2542PB1"
3. **Hashing:**
   - Aplicar un algoritmo hash (ej: SHA-256) a la cadena resultante.
   - Esto genera un string único y seguro, imposible de adivinar.
   - Ejemplo:  
     `hash("RONDEAU2542PB1") = 7f9a8c... (ID_GENERADO)`
4. **Uso del ID:**
   - El QR contendrá la URL con ese ID:  
     `https://qring.app/visit?id=7f9a8c...`
   - El backend buscará ese ID en la base de datos para mostrar los dptos activos.

**Ventajas:**
- No se expone la dirección real en el QR.
- Es imposible adivinar el ID sin conocer la dirección exacta.
- Permite búsquedas rápidas y seguras en la base de datos. 