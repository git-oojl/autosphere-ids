<template>
  <div class="pp-page">
    <div class="pp-hero">
      <div class="pp-hero-content">
        <br /><br /><br />
        <span class="pp-eyebrow">AutoSphere · Legal</span>
        <h1 class="pp-hero-title">Política de Privacidad</h1>
        <p class="pp-hero-subtitle">
          Conoce cómo recopilamos, usamos y protegemos tu información personal
          dentro de nuestra plataforma.
        </p>
        <div class="pp-hero-meta">
          <span class="pp-meta-chip">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Última actualización: 1 de marzo de 2026
          </span>
          <span class="pp-meta-chip">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Lectura aprox. 7 min
          </span>
          <span class="pp-meta-chip">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            LFPDPPP · México
          </span>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════
         LAYOUT: TOC sticky + contenido
    ═══════════════════════════════════════ -->
    <div class="pp-layout">
      <!-- TABLE OF CONTENTS -->
      <aside class="pp-toc">
        <div class="pp-toc-card">
          <p class="pp-toc-title">Contenido</p>
          <nav class="pp-toc-nav">
            <a
              v-for="section in sections"
              :key="section.id"
              class="pp-toc-link"
              :class="{ active: activeSection === section.id }"
              href="#"
              @click.prevent="scrollTo(section.id)"
            >
              <span class="pp-toc-icon">{{ section.icon }}</span>
              <span class="pp-toc-text">{{ section.title }}</span>
            </a>
          </nav>
        </div>
      </aside>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="pp-content">
        <!-- Intro -->
        <div class="pp-intro">
          <p>
            En <strong>AutoSphere</strong> nos comprometemos a proteger tu
            privacidad y a tratar tus datos personales con total transparencia,
            responsabilidad y seguridad. Esta Política de Privacidad describe
            qué información recopilamos, con qué finalidad la usamos, cómo la
            protegemos y cuáles son tus derechos como titular de los datos.
          </p>
          <p>
            Esta política aplica a todos los usuarios de la plataforma
            AutoSphere — compradores, vendedores, arrendadores y visitantes — y
            cumple con lo dispuesto en la
            <strong
              >Ley Federal de Protección de Datos Personales en Posesión de los
              Particulares (LFPDPPP)</strong
            >
            y su Reglamento.
          </p>
        </div>

        <!-- ─── SECCIÓN 1: Uso de la plataforma ─── -->
        <section id="uso-plataforma" class="pp-section">
          <div class="pp-section-head">
            <div
              class="pp-section-icon-wrap"
              style="background: linear-gradient(135deg, #dbeafe, #bfdbfe)"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1e40af"
                stroke-width="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div>
              <span class="pp-section-num">01</span>
              <h2 class="pp-section-title">Uso de la Plataforma</h2>
            </div>
          </div>

          <div class="pp-section-body">
            <h3>1.1 Datos recopilados al registrarte</h3>
            <p>
              Cuando creas una cuenta en AutoSphere recopilamos los siguientes
              datos personales de identificación y contacto:
            </p>
            <ul class="pp-list">
              <li>Nombre completo y nombre de usuario.</li>
              <li>Dirección de correo electrónico.</li>
              <li>Número de teléfono móvil.</li>
              <li>
                Contraseña (almacenada de forma cifrada; nunca en texto plano).
              </li>
              <li>
                Ciudad o región de residencia (para resultados de búsqueda
                locales).
              </li>
            </ul>

            <h3>1.2 Datos generados durante el uso</h3>
            <p>
              Durante la navegación y el uso de funciones de la plataforma
              registramos automáticamente información técnica y de
              comportamiento:
            </p>
            <ul class="pp-list">
              <li>Dirección IP y tipo de dispositivo / navegador.</li>
              <li>Páginas visitadas, tiempo de sesión y clics realizados.</li>
              <li>Búsquedas realizadas e historial de vehículos vistos.</li>
              <li>Preferencias de idioma y configuración de la cuenta.</li>
            </ul>

            <h3>1.3 Base legal del tratamiento</h3>
            <p>
              El tratamiento de tus datos se fundamenta en: (a) la ejecución de
              la relación contractual contigo como usuario de AutoSphere; (b) tu
              consentimiento expreso otorgado al registrarte; y (c) el
              cumplimiento de obligaciones legales aplicables en México.
            </p>

            <div class="pp-highlight blue">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>
                Nunca recopilamos datos sensibles como origen racial, estado de
                salud, creencias religiosas o datos biométricos. Los únicos
                datos financieros que manejamos son los necesarios para la
                facturación de servicios de la plataforma.
              </p>
            </div>
          </div>
        </section>

        <!-- ─── SECCIÓN 2: Compra y venta ─── -->
        <section id="compra-venta" class="pp-section">
          <div class="pp-section-head">
            <div
              class="pp-section-icon-wrap"
              style="background: linear-gradient(135deg, #d1fae5, #a7f3d0)"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#065f46"
                stroke-width="2"
              >
                <path
                  d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div>
              <span class="pp-section-num">02</span>
              <h2 class="pp-section-title">Compra y Venta de Vehículos</h2>
            </div>
          </div>

          <div class="pp-section-body">
            <h3>2.1 Datos en anuncios de venta</h3>
            <p>
              Cuando publicas un vehículo en venta, parte de tu información de
              contacto (nombre de perfil y ciudad) se muestra públicamente para
              facilitar la comunicación con compradores interesados. Tu correo
              electrónico y teléfono
              <strong>nunca se muestran directamente</strong> — la comunicación
              se canaliza a través del sistema de mensajes interno de
              AutoSphere.
            </p>

            <h3>2.2 Datos del comprador</h3>
            <p>
              Cuando un comprador agenda una cita o envía un mensaje, AutoSphere
              comparte únicamente el nombre de perfil con el vendedor
              correspondiente. Los datos de contacto adicionales se intercambian
              exclusivamente si ambas partes acuerdan explícitamente hacerlo
              dentro de la plataforma.
            </p>

            <h3>2.3 Historial de transacciones</h3>
            <p>
              AutoSphere conserva un registro de las interacciones (mensajes,
              citas, anuncios) durante <strong>3 años</strong> contados a partir
              del cierre de la operación, en cumplimiento de obligaciones
              fiscales y legales. Pasado ese plazo, los datos son anonimizados
              de forma irreversible.
            </p>

            <h3>2.4 Compartición con terceros</h3>
            <p>
              No vendemos ni cedemos tu información a agencias de publicidad ni
              a corredores de datos. Solo compartimos datos cuando sea
              estrictamente necesario para la prestación del servicio, por
              ejemplo con procesadores de pago o servicios de verificación de
              identidad.
            </p>

            <div class="pp-highlight green">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p>
                Todos los terceros con quienes compartimos datos están obligados
                contractualmente a tratarlos con el mismo nivel de protección
                que AutoSphere aplica internamente, conforme a la LFPDPPP.
              </p>
            </div>
          </div>
        </section>

        <!-- ─── SECCIÓN 3: Renta ─── -->
        <section id="renta-vehiculos" class="pp-section">
          <div class="pp-section-head">
            <div
              class="pp-section-icon-wrap"
              style="background: linear-gradient(135deg, #cffafe, #a5f3fc)"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0e7490"
                stroke-width="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <span class="pp-section-num">03</span>
              <h2 class="pp-section-title">Renta de Vehículos</h2>
            </div>
          </div>

          <div class="pp-section-body">
            <h3>3.1 Datos del arrendador</h3>
            <p>
              Para publicar un vehículo en renta, el arrendador proporciona
              información del vehículo (marca, modelo, año, kilometraje, fotos)
              y datos logísticos (ciudad de entrega, disponibilidad, precio).
              Esta información es visible públicamente en el catálogo de rentas.
            </p>

            <h3>3.2 Datos del arrendatario</h3>
            <p>
              Quien solicita una renta debe proporcionar nombre, correo de
              contacto y, en algunos casos, una fotografía de identificación
              oficial para cumplir con requerimientos del arrendador. AutoSphere
              almacena este documento de forma cifrada y solo lo comparte con el
              arrendador involucrado en la operación específica.
            </p>

            <h3>3.3 Verificación de identidad</h3>
            <p>
              Cuando el arrendador solicita verificación de identidad del
              arrendatario, AutoSphere puede emplear servicios de terceros
              especializados. El resultado de la verificación (aprobado /
              rechazado) se comunica al arrendador sin revelar el contenido
              íntegro del documento.
            </p>

            <h3>3.4 Retención de datos de renta</h3>
            <ul class="pp-list">
              <li>
                Documentos de identificación: eliminados 30 días después del
                cierre de la renta.
              </li>
              <li>
                Contrato y condiciones acordadas: conservados 3 años por
                obligación legal.
              </li>
              <li>
                Historial de estado del vehículo: conservado 1 año, luego
                anonimizado.
              </li>
            </ul>

            <div class="pp-highlight cyan">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>
                Los documentos de identificación nunca se almacenan en texto
                plano ni son accesibles por personal de AutoSphere sin
                autorización expresa del área de cumplimiento legal.
              </p>
            </div>
          </div>
        </section>

        <!-- ─── SECCIÓN 4: Política de pagos ─── -->
        <section id="politica-pagos" class="pp-section">
          <div class="pp-section-head">
            <div
              class="pp-section-icon-wrap"
              style="background: linear-gradient(135deg, #fef9c3, #fde68a)"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#92400e"
                stroke-width="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <div>
              <span class="pp-section-num">04</span>
              <h2 class="pp-section-title">
                Política de Pagos y Datos Financieros
              </h2>
            </div>
          </div>

          <div class="pp-section-body">
            <h3>4.1 Datos de facturación</h3>
            <p>
              Cuando contratas un plan de publicación o un servicio de pago
              dentro de AutoSphere, recopilamos los datos fiscales necesarios
              para emitir el comprobante digital (CFDI): nombre o razón social,
              RFC y correo para entrega de factura. Estos datos se conservan
              mientras la relación comercial esté activa y por el período que
              exige el SAT.
            </p>

            <h3>4.2 Datos de tarjeta de crédito / débito</h3>
            <p>
              AutoSphere <strong>no almacena números de tarjeta</strong> en sus
              servidores. Los pagos se procesan a través de pasarelas
              certificadas (PCI-DSS) que tokenizan la información financiera.
              AutoSphere solo recibe un token de referencia y los últimos 4
              dígitos de la tarjeta para identificación de cobros.
            </p>

            <h3>4.3 Historial de pagos</h3>
            <p>
              Conservamos el historial de transacciones realizadas en la
              plataforma (fecha, monto, concepto) durante
              <strong>5 años</strong>, en cumplimiento de las disposiciones
              fiscales mexicanas. Este historial está disponible en tu panel de
              cuenta.
            </p>

            <h3>4.4 Prevención de fraude</h3>
            <p>
              AutoSphere utiliza sistemas automatizados de detección de fraude
              que analizan patrones de comportamiento en transacciones. Estos
              sistemas no toman decisiones autónomas sobre tu cuenta — cualquier
              acción requiere revisión humana del equipo de seguridad.
            </p>

            <div class="pp-highlight yellow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p>
                AutoSphere nunca solicita datos de tarjeta por correo
                electrónico, mensaje de texto ni llamada telefónica. Si recibes
                una solicitud así, repórtala a
                <strong>seguridad@autosphere.mx</strong>.
              </p>
            </div>
          </div>
        </section>

        <!-- ─── SECCIÓN 5: Privacidad y datos personales ─── -->
        <section id="privacidad-datos" class="pp-section">
          <div class="pp-section-head">
            <div
              class="pp-section-icon-wrap"
              style="background: linear-gradient(135deg, #ede9fe, #ddd6fe)"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5b21b6"
                stroke-width="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <span class="pp-section-num">05</span>
              <h2 class="pp-section-title">Privacidad y Datos Personales</h2>
            </div>
          </div>

          <div class="pp-section-body">
            <h3>5.1 Derechos ARCO</h3>
            <p>Como titular de tus datos personales tienes derecho a:</p>
            <ul class="pp-list">
              <li>
                <strong>Acceso:</strong> solicitar qué datos tuyos tenemos
                almacenados y cómo los usamos.
              </li>
              <li>
                <strong>Rectificación:</strong> corregir datos inexactos,
                incompletos o desactualizados.
              </li>
              <li>
                <strong>Cancelación:</strong> pedir la eliminación de tus datos
                cuando ya no sean necesarios.
              </li>
              <li>
                <strong>Oposición:</strong> oponerte al tratamiento de tus datos
                para fines específicos.
              </li>
            </ul>
            <p>
              Para ejercer tus derechos ARCO envía una solicitud a
              <strong>privacidad@autosphere.mx</strong> indicando tu nombre
              completo, datos de contacto, descripción de la solicitud y copia
              de identificación. Atenderemos tu solicitud en un plazo máximo de
              <strong>20 días hábiles</strong>.
            </p>

            <h3>5.2 Cookies y tecnologías de rastreo</h3>
            <p>AutoSphere utiliza cookies propias y de terceros para:</p>
            <ul class="pp-list">
              <li>Mantener tu sesión activa de forma segura.</li>
              <li>Recordar tus preferencias de búsqueda y configuración.</li>
              <li>
                Medir el rendimiento de la plataforma con herramientas de
                analítica.
              </li>
              <li>
                Mostrar contenido relevante según tu historial de navegación
                dentro del sitio.
              </li>
            </ul>
            <p>
              Puedes gestionar o deshabilitar las cookies desde la configuración
              de tu navegador. Ten en cuenta que desactivar cookies esenciales
              puede afectar el funcionamiento de algunas funciones de
              AutoSphere.
            </p>

            <h3>5.3 Transferencias internacionales</h3>
            <p>
              Algunos de nuestros proveedores de infraestructura (servidores en
              la nube, analítica) pueden estar ubicados fuera de México. En esos
              casos, AutoSphere garantiza que dichos proveedores cuentan con
              niveles de protección equivalentes o superiores a los exigidos por
              la LFPDPPP, mediante acuerdos contractuales específicos.
            </p>

            <h3>5.4 Menores de edad</h3>
            <p>
              AutoSphere no está dirigida a personas menores de 18 años. Si
              detectamos que un menor ha proporcionado datos sin consentimiento
              de sus tutores, procederemos a eliminar dicha información de
              inmediato. Si eres padre o tutor y detectas esta situación,
              contáctanos a <strong>privacidad@autosphere.mx</strong>.
            </p>

            <!-- Grid de contacto ARCO -->
            <div class="pp-contact-grid">
              <div class="pp-contact-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>privacidad@autosphere.mx</span>
              </div>
              <div class="pp-contact-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Respuesta en máx. 20 días hábiles</span>
              </div>
            </div>
          </div>
        </section>

        <!-- ─── SECCIÓN 6: Responsabilidades ─── -->
        <section id="responsabilidades" class="pp-section">
          <div class="pp-section-head">
            <div
              class="pp-section-icon-wrap"
              style="background: linear-gradient(135deg, #fee2e2, #fecaca)"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#991b1b"
                stroke-width="2"
              >
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <span class="pp-section-num">06</span>
              <h2 class="pp-section-title">Responsabilidades y Seguridad</h2>
            </div>
          </div>

          <div class="pp-section-body">
            <h3>6.1 Medidas de seguridad</h3>
            <p>
              AutoSphere implementa medidas técnicas y organizativas para
              proteger tus datos personales contra acceso no autorizado,
              pérdida, alteración o divulgación indebida:
            </p>
            <ul class="pp-list">
              <li>
                Cifrado TLS/HTTPS en todas las comunicaciones entre tu
                dispositivo y nuestros servidores.
              </li>
              <li>
                Contraseñas almacenadas con hash bcrypt — ningún empleado puede
                leer tu contraseña.
              </li>
              <li>
                Acceso a datos personales restringido por roles y registrado en
                bitácoras de auditoría.
              </li>
              <li>
                Revisiones periódicas de seguridad y pruebas de penetración por
                terceros certificados.
              </li>
              <li>
                Copias de seguridad cifradas con retención definida por política
                interna.
              </li>
            </ul>

            <h3>6.2 Notificación de brechas de seguridad</h3>
            <p>
              En caso de una brecha de seguridad que comprometa tus datos
              personales, AutoSphere se compromete a notificarte dentro de las
              <strong>72 horas</strong> siguientes a su detección, conforme a lo
              establecido en la LFPDPPP. La notificación incluirá la naturaleza
              de la brecha, los datos afectados y las medidas adoptadas.
            </p>

            <h3>6.3 Responsabilidad del usuario</h3>
            <p>
              Eres responsable de mantener la confidencialidad de tu contraseña
              y de las actividades que ocurran bajo tu cuenta. AutoSphere no se
              hace responsable por accesos no autorizados derivados del
              incumplimiento de estas obligaciones por tu parte.
            </p>

            <h3>6.4 Cambios a esta política</h3>
            <p>
              AutoSphere puede actualizar esta Política de Privacidad en
              cualquier momento. Los cambios sustanciales serán notificados por
              correo electrónico con al menos
              <strong>15 días de anticipación</strong>. El uso continuo de la
              plataforma tras la notificación implica aceptación de la nueva
              versión.
            </p>

            <h3>6.5 Responsable del tratamiento</h3>
            <div class="pp-contact-grid">
              <div class="pp-contact-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>legal@autosphere.mx</span>
              </div>
              <div class="pp-contact-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Av. Insurgentes Sur 1234, CDMX</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer note -->
        <div class="pp-footer-note">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p>
            AutoSphere trata tus datos personales con apego a la
            <strong
              >Ley Federal de Protección de Datos Personales en Posesión de los
              Particulares</strong
            >. Versión vigente desde el <strong>1 de marzo de 2026</strong>.
          </p>
        </div>
      </main>
    </div>
    <!-- /pp-layout -->
  </div>
  <!-- /pp-page -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeSection = ref('uso-plataforma');

const sections = [
  { id: 'uso-plataforma', title: 'Uso de la Plataforma' },
  { id: 'compra-venta', title: 'Compra y Venta' },
  { id: 'renta-vehiculos', title: 'Renta de Vehículos' },
  { id: 'politica-pagos', title: 'Pagos y Datos Financieros' },
  { id: 'privacidad-datos', title: 'Privacidad y Datos' },
  { id: 'responsabilidades', title: 'Responsabilidades' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 108;
  window.scrollTo({ top, behavior: 'smooth' });
};

const onScroll = () => {
  const offset = window.scrollY + 148;
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id);
    if (el && el.offsetTop <= offset) {
      activeSection.value = sections[i].id;
      break;
    }
  }
};

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped src="./styles.css"></style>
