<template>
  <div class="terminos-page">
    <!-- HERO HEADER -->
    <div class="tc-hero">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="hero-content">
        <br />
        <br />

        <span class="hero-eyebrow">Conoce AutoSphere</span>
        <h1 class="hero-title">Términos y Condiciones</h1>
        <p class="hero-subtitle">
          Lee con atención las condiciones que rigen el uso de la plataforma
          AutoSphere.
        </p>
        <div class="hero-meta">
          <span class="meta-chip">
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
          <span class="meta-chip">
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
            Lectura aprox. 8 min
          </span>
        </div>
      </div>
    </div>

    <!-- LAYOUT: TOC + CONTENT -->
    <div class="tc-layout">
      <!-- TABLE OF CONTENTS — sticky -->
      <aside class="tc-toc">
        <div class="toc-card">
          <h3 class="toc-title">Contenido</h3>
          <nav class="toc-nav">
            <a
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              class="toc-link"
              :class="{ active: activeSection === section.id }"
              @click.prevent="scrollToSection(section.id)"
            >
              <span class="toc-icon">{{ section.icon }}</span>
              <span class="toc-text">{{ section.title }}</span>
            </a>
          </nav>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="tc-content">
        <!-- INTRO -->
        <div class="intro-card">
          <p>
            Bienvenido a <strong>AutoSphere</strong>, la plataforma digital para
            la compra, venta y renta de vehículos en México. Al acceder o
            utilizar nuestros servicios, aceptas cumplir con los presentes
            Términos y Condiciones. Si no estás de acuerdo con alguna de estas
            condiciones, te pedimos que no utilices la plataforma.
          </p>
          <p>
            Estos términos aplican a todos los usuarios registrados y visitantes
            de AutoSphere, incluyendo compradores, vendedores y arrendadores.
          </p>
        </div>

        <!-- SECCIÓN 1: USO DE LA PLATAFORMA -->
        <section id="uso-plataforma" class="tc-section">
          <div class="section-header">
            <div
              class="section-icon-wrap"
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
              <span class="section-number">01</span>
              <h2 class="section-title">Uso de la Plataforma</h2>
            </div>
          </div>
          <div class="section-body">
            <h3>1.1 Elegibilidad</h3>
            <p>
              Para utilizar AutoSphere debes ser mayor de 18 años y tener
              capacidad legal para celebrar contratos conforme a la legislación
              mexicana. Al registrarte, declaras que cumples con estos
              requisitos.
            </p>

            <h3>1.2 Creación de cuenta</h3>
            <p>
              El registro en la plataforma es gratuito. Cada usuario puede tener
              una sola cuenta activa. Eres responsable de mantener la
              confidencialidad de tus credenciales de acceso y de todas las
              actividades que ocurran bajo tu cuenta.
            </p>

            <h3>1.3 Uso aceptable</h3>
            <p>
              El uso de AutoSphere está limitado a fines lícitos. Queda
              expresamente prohibido:
            </p>
            <ul class="tc-list">
              <li>
                Publicar información falsa, engañosa o fraudulenta sobre
                vehículos.
              </li>
              <li>
                Usar la plataforma para actividades ilegales, incluyendo el
                lavado de dinero o la venta de vehículos robados.
              </li>
              <li>
                Intentar acceder sin autorización a sistemas, datos o cuentas de
                otros usuarios.
              </li>
              <li>
                Reproducir, distribuir o modificar el contenido de AutoSphere
                sin permiso previo por escrito.
              </li>
              <li>
                Publicar contenido difamatorio, ofensivo o que viole derechos de
                terceros.
              </li>
            </ul>

            <h3>1.4 Suspensión de cuenta</h3>
            <p>
              AutoSphere se reserva el derecho de suspender o cancelar cuentas
              que incumplan estos términos, sin previo aviso y sin
              responsabilidad alguna hacia el usuario afectado.
            </p>

            <div class="highlight-box blue">
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
                AutoSphere actúa únicamente como intermediario entre
                compradores, vendedores y arrendadores. No somos parte de ningún
                contrato celebrado entre usuarios.
              </p>
            </div>
          </div>
        </section>

        <!-- SECCIÓN 2: COMPRA Y VENTA -->
        <section id="compra-venta" class="tc-section">
          <div class="section-header">
            <div
              class="section-icon-wrap"
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
              <span class="section-number">02</span>
              <h2 class="section-title">Compra y Venta de Vehículos</h2>
            </div>
          </div>
          <div class="section-body">
            <h3>2.1 Publicación de anuncios</h3>
            <p>
              Los vendedores son responsables de la exactitud y veracidad de la
              información publicada en sus anuncios, incluyendo precio,
              kilometraje, condición general, historial de mantenimiento y
              fotografías del vehículo.
            </p>

            <h3>2.2 Verificación de vehículos</h3>
            <p>
              AutoSphere no verifica la autenticidad ni el estado físico de los
              vehículos publicados. Recomendamos a los compradores solicitar una
              inspección mecánica independiente antes de concretar cualquier
              transacción.
            </p>

            <h3>2.3 Proceso de negociación</h3>
            <p>
              Los precios publicados son referenciales y sujetos a negociación
              entre las partes. AutoSphere provee herramientas de comunicación
              (mensajes, citas) para facilitar este proceso, pero no interviene
              en la negociación ni garantiza ningún resultado.
            </p>

            <h3>2.4 Obligaciones del vendedor</h3>
            <ul class="tc-list">
              <li>
                Entregar el vehículo en las condiciones descritas en el anuncio.
              </li>
              <li>
                Proporcionar toda la documentación legal del vehículo (factura,
                tenencia, verificación).
              </li>
              <li>
                Notificar cualquier cambio en la disponibilidad del vehículo.
              </li>
              <li>
                No publicar el mismo vehículo más de una vez simultáneamente.
              </li>
            </ul>

            <h3>2.5 Obligaciones del comprador</h3>
            <ul class="tc-list">
              <li>
                Verificar la documentación del vehículo antes de concretar la
                compra.
              </li>
              <li>
                Asistir puntualmente a las citas programadas o cancelar con al
                menos 24 horas de anticipación.
              </li>
              <li>
                No comprometer la compra de un vehículo sin intención real de
                adquirirlo.
              </li>
            </ul>

            <div class="highlight-box green">
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
                AutoSphere no es responsable de los vicios ocultos, daños o
                defectos del vehículo que no hayan sido declarados por el
                vendedor. La responsabilidad recae directamente en las partes
                involucradas.
              </p>
            </div>
          </div>
        </section>

        <!-- SECCIÓN 3: RENTA -->
        <section id="renta-vehiculos" class="tc-section">
          <div class="section-header">
            <div
              class="section-icon-wrap"
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
              <span class="section-number">03</span>
              <h2 class="section-title">Renta de Vehículos</h2>
            </div>
          </div>
          <div class="section-body">
            <h3>3.1 Condiciones generales de renta</h3>
            <p>
              El servicio de renta de vehículos en AutoSphere conecta a
              propietarios (arrendadores) con personas interesadas en rentar
              (arrendatarios). Cada arrendador establece sus propias condiciones
              de renta, sujetas a los lineamientos de AutoSphere.
            </p>

            <h3>3.2 Depósito de garantía</h3>
            <p>
              El arrendador puede requerir un depósito de garantía previo a la
              entrega del vehículo. Este depósito debe estar claramente
              especificado en el anuncio. El monto y las condiciones de
              devolución del depósito son pactados directamente entre las
              partes.
            </p>

            <h3>3.3 Kilómetros incluidos</h3>
            <p>
              Cada anuncio de renta especifica el número de kilómetros incluidos
              por día. El excedente de kilómetros genera un cargo adicional
              definido por el arrendador y debe ser acordado antes de la entrega
              del vehículo.
            </p>

            <h3>3.4 Estado del vehículo</h3>
            <ul class="tc-list">
              <li>
                El arrendatario debe documentar el estado del vehículo al
                momento de la recepción (fotografías, video).
              </li>
              <li>
                El vehículo debe ser devuelto en el mismo estado en que fue
                recibido, salvo desgaste natural.
              </li>
              <li>
                Los daños ocurridos durante el período de renta son
                responsabilidad del arrendatario.
              </li>
              <li>
                El arrendatario es responsable de cubrir el costo de combustible
                utilizado durante la renta.
              </li>
            </ul>

            <h3>3.5 Cancelaciones</h3>
            <p>
              Las políticas de cancelación son definidas por cada arrendador en
              su anuncio. En ausencia de política específica, se aplicará la
              siguiente:
            </p>
            <div class="policy-grid">
              <div class="policy-item">
                <span class="policy-time">+48 hrs antes</span>
                <span class="policy-result green-text">Reembolso completo</span>
              </div>
              <div class="policy-item">
                <span class="policy-time">24–48 hrs antes</span>
                <span class="policy-result yellow-text">Reembolso 50%</span>
              </div>
              <div class="policy-item">
                <span class="policy-time">Menos de 24 hrs</span>
                <span class="policy-result red-text">Sin reembolso</span>
              </div>
            </div>

            <div class="highlight-box cyan">
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
                AutoSphere recomienda que arrendadores y arrendatarios firmen un
                contrato de arrendamiento por escrito antes de la entrega del
                vehículo, independientemente del acuerdo registrado en la
                plataforma.
              </p>
            </div>
          </div>
        </section>

        <!-- SECCIÓN 4: POLÍTICA DE PAGOS -->
        <section id="politica-pagos" class="tc-section">
          <div class="section-header">
            <div
              class="section-icon-wrap"
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
              <span class="section-number">04</span>
              <h2 class="section-title">Política de Pagos</h2>
            </div>
          </div>
          <div class="section-body">
            <h3>4.1 Medios de pago</h3>
            <p>
              AutoSphere actualmente no procesa pagos entre usuarios
              directamente. Las transacciones económicas (compraventa o renta)
              se realizan de manera directa entre las partes mediante los medios
              que acuerden: efectivo, transferencia bancaria, cheque certificado
              u otros.
            </p>

            <h3>4.2 Comisiones de la plataforma</h3>
            <p>
              La publicación de anuncios en AutoSphere puede estar sujeta a
              tarifas según el plan contratado por el vendedor o arrendador.
              Estas tarifas serán informadas claramente al momento del alta del
              anuncio y son independientes de la transacción entre usuarios.
            </p>

            <h3>4.3 Facturación</h3>
            <p>
              Los cobros realizados por AutoSphere (planes, anuncios destacados,
              servicios adicionales) serán facturados electrónicamente al correo
              registrado en la cuenta del usuario, conforme a las disposiciones
              fiscales vigentes en México.
            </p>

            <h3>4.4 Contracargos y disputas</h3>
            <p>
              En caso de disputas relacionadas con pagos realizados a través de
              métodos externos a la plataforma, AutoSphere no tiene
              responsabilidad ni capacidad de intervenir. Cualquier conflicto
              debe resolverse directamente entre las partes o mediante las
              instancias legales correspondientes.
            </p>

            <div class="highlight-box yellow">
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
                AutoSphere recomienda encarecidamente no realizar pagos
                anticipados sin antes verificar la identidad del
                vendedor/arrendador y la documentación del vehículo. Desconfía
                de solicitudes de pago por canales externos a la plataforma.
              </p>
            </div>
          </div>
        </section>

        <!-- SECCIÓN 5: PRIVACIDAD -->
        <section id="privacidad-datos" class="tc-section">
          <div class="section-header">
            <div
              class="section-icon-wrap"
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
              <span class="section-number">05</span>
              <h2 class="section-title">Privacidad y Datos Personales</h2>
            </div>
          </div>
          <div class="section-body">
            <h3>5.1 Recopilación de datos</h3>
            <p>
              AutoSphere recopila datos personales necesarios para el
              funcionamiento de la plataforma, incluyendo nombre, correo
              electrónico, número de teléfono, y datos de la cuenta. Esta
              información es tratada conforme a la Ley Federal de Protección de
              Datos Personales en Posesión de los Particulares (LFPDPPP).
            </p>

            <h3>5.2 Uso de la información</h3>
            <p>Los datos recopilados se utilizan exclusivamente para:</p>
            <ul class="tc-list">
              <li>Gestionar tu cuenta y perfil de usuario.</li>
              <li>
                Facilitar la comunicación entre compradores, vendedores y
                arrendadores.
              </li>
              <li>
                Mejorar los servicios y la experiencia dentro de la plataforma.
              </li>
              <li>
                Enviar notificaciones relevantes sobre tu actividad (nuevos
                mensajes, citas, etc.).
              </li>
              <li>Cumplir con obligaciones legales y fiscales.</li>
            </ul>

            <h3>5.3 Compartición de datos</h3>
            <p>
              AutoSphere no vende ni comparte tus datos personales con terceros
              con fines comerciales. Únicamente compartiremos información cuando
              sea requerido por autoridades competentes mediante orden judicial
              o cuando sea estrictamente necesario para la prestación del
              servicio.
            </p>

            <h3>5.4 Derechos ARCO</h3>
            <p>
              Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (ARCO)
              al tratamiento de tus datos personales. Puedes ejercer estos
              derechos enviando una solicitud a
              <strong>privacidad@autosphere.mx</strong> con tu nombre, datos de
              contacto y descripción de la solicitud.
            </p>

            <h3>5.5 Cookies</h3>
            <p>
              AutoSphere utiliza cookies para mejorar la experiencia de
              navegación, analizar el tráfico y personalizar el contenido.
              Puedes configurar tu navegador para rechazar cookies, aunque esto
              puede afectar la funcionalidad de la plataforma.
            </p>
          </div>
        </section>

        <!-- SECCIÓN 6: RESPONSABILIDADES -->
        <section id="responsabilidades" class="tc-section">
          <div class="section-header">
            <div
              class="section-icon-wrap"
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
              <span class="section-number">06</span>
              <h2 class="section-title">Responsabilidades y Garantías</h2>
            </div>
          </div>
          <div class="section-body">
            <h3>6.1 Limitación de responsabilidad</h3>
            <p>
              AutoSphere no asume responsabilidad por daños directos,
              indirectos, incidentales o consecuentes derivados del uso de la
              plataforma o de las transacciones realizadas entre usuarios,
              incluyendo pero no limitado a:
            </p>
            <ul class="tc-list">
              <li>
                Pérdidas económicas por transacciones fallidas o fraudulentas
                entre usuarios.
              </li>
              <li>
                Daños materiales o personales derivados del uso del vehículo
                comprado o rentado.
              </li>
              <li>
                Pérdida de datos o interrupciones del servicio por causas de
                fuerza mayor.
              </li>
              <li>Conducta de usuarios que incumplan estos términos.</li>
            </ul>

            <h3>6.2 Disponibilidad del servicio</h3>
            <p>
              AutoSphere no garantiza disponibilidad ininterrumpida de la
              plataforma. Nos reservamos el derecho de realizar mantenimientos
              programados o no programados que puedan afectar temporalmente el
              acceso al servicio.
            </p>

            <h3>6.3 Modificaciones a los términos</h3>
            <p>
              AutoSphere puede modificar estos Términos y Condiciones en
              cualquier momento. Los cambios serán notificados al correo
              registrado de cada usuario con al menos 15 días de anticipación.
              El uso continuo de la plataforma tras la notificación implica la
              aceptación de los nuevos términos.
            </p>

            <h3>6.4 Legislación aplicable</h3>
            <p>
              Estos Términos y Condiciones se rigen por las leyes de los Estados
              Unidos Mexicanos. Cualquier controversia derivada de su
              interpretación o aplicación será sometida a los tribunales
              competentes de la Ciudad de México, renunciando las partes a
              cualquier otro fuero que pudiera corresponderles.
            </p>

            <h3>6.5 Contacto</h3>
            <p>
              Para cualquier duda, aclaración o reporte relacionado con estos
              Términos y Condiciones, puedes contactarnos a través de:
            </p>
            <div class="contact-grid">
              <div class="contact-item">
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
              <div class="contact-item">
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

        <!-- FOOTER DE LA PÁGINA -->
        <div class="tc-footer-note">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <p>
            Al utilizar AutoSphere confirmas que has leído, entendido y aceptado
            estos Términos y Condiciones en su totalidad. Versión vigente desde
            el <strong>1 de marzo de 2026</strong>.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeSection = ref('uso-plataforma');

const sections = [
  { id: 'uso-plataforma', title: 'Uso de la Plataforma' },
  { id: 'compra-venta', title: 'Compra y Venta' },
  { id: 'renta-vehiculos', title: 'Renta de Vehículos' },
  { id: 'politica-pagos', title: 'Política de Pagos' },
  { id: 'privacidad-datos', title: 'Privacidad y Datos' },
  { id: 'responsabilidades', title: 'Responsabilidades' },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 100;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

const handleScroll = () => {
  const scrollY = window.scrollY + 140;
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id);
    if (el && el.offsetTop <= scrollY) {
      activeSection.value = sections[i].id;
      break;
    }
  }
};

onMounted(() =>
  window.addEventListener('scroll', handleScroll, { passive: true })
);
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped src="./styles.css"></style>
