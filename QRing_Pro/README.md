# QRing Pro

## Estrategia, Arquitectura y Operativa

### 1. Descripción General
QRing Pro es una solución integral para control de accesos y gestión de visitantes en edificios, barrios y consorcios. El sistema se compone de:
- **App móvil** (usuarios finales: residentes/inquilinos)
- **Panel web admin** (administradores: consorcio, encargado, portero)
- **Backend cloud** (Firebase: Firestore, Auth, Functions, FCM)

### 2. Arquitectura y Flujos

```
[Visitante] --escanea QR--> [Web visitante: elige timbre] --notifica--> [Usuario final (app)]
                                                                                  |
                                                                                  v
[Administrador (WebAdmin)] --genera links--> [Usuarios finales (app)]
```

- **QR en la puerta:** Solo para visitantes. Permite anunciarse/tocar timbre.
- **Links de invitación:** El admin los genera desde la web y los reparte a cada usuario final.
- **App móvil:** Todos los usuarios usan la misma app, se asocian mediante link único.
- **Web admin:** Solo para el administrador, gestiona todo el paquete de timbres y usuarios.

### 3. Operativa y Roles

#### SuperAdmin (Proveedor)
- Accede a la WebAdmin con usuario especial.
- Gestiona todos los clientes y paquetes vendidos.
- Puede crear, editar, eliminar y asignar paquetes a cada cliente.
- Puede aumentar la cantidad de timbres de un paquete existente o vender nuevos paquetes al mismo cliente.
- Ve estadísticas, logs globales, y administra upgrades.

#### Administrador (WebAdmin)
- Accede a la web con usuario/contraseña o link único tras la compra.
- Gestiona su paquete de timbres (nombra, asigna, libera, transfiere).
- Genera y reparte links de invitación a usuarios finales.
- Descarga/imprime el QR para visitantes.
- Ve historial de accesos, logs, permisos.

#### Usuario final (App móvil)
- Recibe link de invitación, descarga la app y queda asociado a su timbre.
- Puede abrir la puerta (si tiene permiso), recibir notificaciones, ver historial.
- No puede gestionar otros usuarios ni timbres.

#### Visitante
- Escanea el QR en la puerta.
- Elige el timbre al que quiere llamar.
- El sistema notifica al usuario correspondiente.

### 4. Base de Datos (Firestore)
- **Clientes**: { idCliente, nombre, email, paquetesAsignados, ... }
- **PaquetesVendidos**: { idPaquete, idCliente, cantidadTimbres, estado, ... }
- **Timbres**: { idTimbre, nombre, estado, usuarioAsignado, idPaquete }
- **Usuarios**: { id, nombre, email, idTimbre, idPaquete, rol }
- **Invitaciones**: { id, idTimbre, idPaquete, token, estado }
- **Accesos/Logs**: { id, idUsuario, idTimbre, fecha, tipo }

### 5. Modelo Comercial y Escalabilidad
- El sistema se vende en **paquetes** de X cantidad de timbres (ej: 5, 10, 20, ...).
- Cada paquete tiene un **ID único** (IDPaqueteVendido) y un QR asociado para visitantes.
- El admin gestiona todo desde la web, los usuarios finales solo usan la app.
- **Usuarios por paquete:**
  - Por cada timbre, normalmente 1 usuario principal, pero se pueden permitir invitados/familiares (configurable).
  - Ejemplo: Paquete de 10 timbres = 10 usuarios principales + invitados.
- **Escalabilidad:**
  - El sistema puede crecer ilimitadamente en cantidad de paquetes y timbres, limitado solo por el plan de Firebase y la arquitectura cloud.
  - Paquetes sugeridos: X5, X10, X20, X50, X100, etc.
  - **Límite:** El límite lo define el plan comercial y la capacidad de Firestore (decenas de miles de usuarios/timbres por proyecto sin problemas en el plan pago).
  - En el plan gratuito de Firebase, se recomienda hasta 100 usuarios/timbres por paquete para evitar límites de uso.
  - Si un cliente necesita más, se le puede vender un paquete adicional o migrar a un plan superior.

### 6. Ejemplo de flujo comercial y upgrades
1. Cliente compra paquete de 10 timbres → recibe acceso a WebAdmin y QR de visitantes.
2. Admin nombra y asigna los 10 timbres, genera links de invitación y los reparte a los usuarios.
3. Usuarios descargan la app, se asocian automáticamente a su timbre.
4. Visitantes escanean el QR en la puerta para anunciarse.
5. Si el cliente compra más timbres, el SuperAdmin le amplía el paquete o le asigna uno nuevo desde la WebAdmin.
6. Todo el acceso y la gestión se realiza desde la web y la app, con notificaciones y logs en tiempo real.

### 7. Recursos útiles
- [Firebase](https://firebase.google.com/)
- [Vercel](https://vercel.com/)
- [Expo](https://expo.dev/)
- [Next.js](https://nextjs.org/)

### 8. Frase clave para retomar el hilo
**el pájaro vuela bajo**

(Si escribes esto en el chat, seguimos exactamente desde este plan.)

### 9. Contacto y soporte
- Documenta cada decisión y avance en este archivo.
- Si necesitas ayuda, ¡consulta a tu asistente AI favorito! 😄

---

# QRing Pro - Información para el Cliente

## ¿Qué es QRing Pro?
QRing Pro es una solución moderna y escalable para controlar accesos y gestionar visitantes en edificios, barrios y consorcios. Permite a los administradores gestionar timbres y usuarios desde una web, y a los residentes recibir notificaciones y abrir puertas desde una app móvil.

## ¿Cómo funciona?
- **Paquete de timbres:** Comprás un paquete (ej: 10 timbres) y recibís acceso a un panel web exclusivo.
- **Gestión web:** Desde la web podés nombrar cada timbre, asignar usuarios y generar links de invitación.
- **App móvil:** Los usuarios reciben su invitación, descargan la app y quedan asociados a su timbre.
- **QR para visitantes:** El sistema te da un QR único para que los visitantes lo escaneen y puedan anunciarse.
- **Escalabilidad:** Si necesitás más timbres, podés comprar paquetes adicionales y se suman a tu panel.

## ¿Qué puede hacer cada uno?
- **Administrador:** Gestiona todo desde la web (timbres, usuarios, invitaciones, historial, permisos, QR de visitantes).
- **Usuario final:** Usa la app para abrir la puerta, recibir notificaciones y ver su historial.
- **Visitante:** Escanea el QR en la puerta para anunciarse.

## ¿Cuántos usuarios puedo tener?
- Por cada timbre, normalmente 1 usuario principal, pero podés agregar invitados/familiares si lo necesitás.
- Si necesitás más timbres, podés ampliar tu paquete en cualquier momento.

## ¿Qué ventajas tiene QRing Pro?
- Fácil de usar y administrar
- Escalable y seguro
- Sin límites prácticos en la cantidad de usuarios/timbres (según plan)
- Soporte y actualizaciones constantes

## ¿Cómo empiezo?
1. Comprá tu paquete de timbres.
2. Accedé a la web con tu usuario/contraseña.
3. Configurá tus timbres y usuarios.
4. Compartí los links de invitación y el QR de visitantes.
5. ¡Listo! Tus usuarios ya pueden usar la app y tus visitantes pueden anunciarse.

---
