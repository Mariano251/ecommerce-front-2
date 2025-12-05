# 🛒 Ecommerce Front - Panel de Administración y Tienda Online

Panel de administración completo y tienda online construida con React + Vite + Material-UI. Sistema full-stack con gestión de productos, pedidos, categorías y autenticación de administrador.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![Material-UI](https://img.shields.io/badge/Material--UI-6.1.1-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#️-instalación)
- [Configuración](#️-configuración)
- [Ejecución](#-ejecución)
- [Credenciales de Acceso](#-credenciales-de-acceso)
- [Scripts Disponibles](#-scripts-disponibles)
- [Rutas de la Aplicación](#-rutas-de-la-aplicación)
- [Características Detalladas](#-características-detalladas)
- [Deploy](#-deploy)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

---

## ✨ Características

### 🔐 Sistema de Autenticación
- Login de administrador con protección de rutas
- Sesión persistente con localStorage
- Rutas protegidas con ProtectedRoute component
- Botón de cerrar sesión en navbar

### 📊 Panel de Administración (Dashboard)
- **6 Cards de Estadísticas en Tiempo Real:**
  - Total de Productos Activos
  - Total de Pedidos Gestionados
  - Ventas Totales (Ingresos)
  - Stock Total en Unidades
  - Pedidos Pendientes
  - Categorías Activas
- **Pedidos Recientes:** Últimos 3 pedidos con estado visual
- **Acciones Rápidas:** Acceso directo a funciones principales
- **Alertas de Stock Bajo:** Card naranja con lista de productos críticos
- **Análisis por Categoría:** Distribución del inventario con valores

### 📦 Gestión de Productos
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Modal moderno para agregar productos con gradiente morado
- Modal oscuro para editar productos existentes
- Filtros avanzados:
  - Búsqueda por nombre
  - Filtro por categoría
  - Filtro por estado de stock (Disponible, Bajo, Agotado)
- Tabla con información completa y acciones
- Vista detallada de producto individual
- Chips de estado visual para stock

### 🛍️ Gestión de Pedidos
- Lista completa de todos los pedidos
- Estados visuales con chips de colores:
  - 🟡 Pendiente
  - 🔵 En Progreso
  - 🟢 Entregado
  - 🔴 Cancelado
- Vista detallada de cada pedido
- Información del cliente y productos

### 🏪 Tienda Online (Cliente)
- Página principal con productos destacados
- Catálogo completo con filtros por categoría
- Vista detallada de producto
- Sistema de carrito de compras funcional
- Proceso de checkout completo
- Seguimiento de pedidos
- Historial de pedidos del usuario

### 🎨 Diseño y UX
- Diseño completamente responsive
- Material-UI con tema personalizado
- Transiciones y animaciones suaves
- Notificaciones toast para feedback
- Colores consistentes en toda la aplicación
- Navbar sticky con navegación intuitiva

---

## 🚀 Tecnologías

### Core
- **React 18.3.1** - Biblioteca de UI
- **Vite 5.4.2** - Build tool ultra rápido
- **React Router DOM 6.27.0** - Enrutamiento SPA

### UI/Styling
- **Material-UI (MUI) 6.1.1** - Componentes de UI
- **@emotion/react 11.13.3** - CSS-in-JS
- **@emotion/styled 11.13.0** - Styled components

### Estado y Datos
- **Context API** - Manejo de estado global
- **LocalStorage** - Persistencia de datos
- **React Toastify 10.0.6** - Notificaciones

### Utilidades
- **date-fns** - Formateo de fechas
- **Custom formatters** - Formateo de precios y datos

---

## 📁 Estructura del Proyecto
```
ecommerce-front-2/
│
├── public/                      # Archivos públicos estáticos
│
├── src/
│   ├── assets/                  # Imágenes, iconos, etc
│   │
│   ├── components/              # Componentes reutilizables
│   │   ├── cart/               # Componentes del carrito
│   │   │   ├── CartEmpty.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── CartSummary.jsx
│   │   │
│   │   ├── categories/         # Componentes de categorías
│   │   │   └── CategoryGrid.jsx
│   │   │
│   │   ├── common/             # Componentes comunes
│   │   │   ├── Loading.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── ProtectedRoute.jsx  # Protección de rutas admin
│   │   │
│   │   ├── layout/             # Layouts principales
│   │   │   ├── AdminLayout.jsx     # Layout del admin
│   │   │   ├── AdminNavbar.jsx     # Navbar verde del admin
│   │   │   ├── Footer.jsx          # Footer del sitio
│   │   │   ├── Layout.jsx          # Layout público
│   │   │   └── Navbar.jsx          # Navbar del sitio público
│   │   │
│   │   ├── orders/             # Componentes de pedidos
│   │   │   ├── OrderCard.jsx
│   │   │   └── OrderTimeline.jsx
│   │   │
│   │   └── products/           # Componentes de productos
│   │       ├── ProductCard.jsx
│   │       ├── ProductFilters.jsx
│   │       └── ProductGrid.jsx
│   │
│   ├── context/                # Contextos de React
│   │   ├── AuthContext.jsx     # Autenticación y sesión
│   │   ├── CartContext.jsx     # Estado del carrito
│   │   └── ProductContext.jsx  # Productos y categorías
│   │
│   ├── pages/                  # Páginas de la aplicación
│   │   │
│   │   ├── admin/             # Páginas de administración
│   │   │   ├── AddProductModal.jsx        # Modal agregar producto
│   │   │   ├── AdminOrderDetail.jsx       # Detalle de pedido admin
│   │   │   ├── AdminProductDetail.jsx     # Detalle de producto admin
│   │   │   ├── Dashboard.jsx              # Dashboard principal ⭐
│   │   │   ├── OrderManagement.jsx        # Gestión de pedidos
│   │   │   ├── ProductManagement.jsx      # Gestión de productos
│   │   │   └── AdminLogin.jsx             # Login de admin
│   │   │
│   │   ├── Cart.jsx            # Página del carrito
│   │   ├── Checkout.jsx        # Proceso de checkout
│   │   ├── Home.jsx            # Página principal
│   │   ├── MyOrders.jsx        # Mis pedidos (usuario)
│   │   ├── OrderTracking.jsx   # Seguimiento de pedido
│   │   ├── ProductDetailPage.jsx  # Detalle de producto
│   │   └── Products.jsx        # Catálogo de productos
│   │
│   ├── services/               # Servicios y APIs
│   │
│   ├── styles/                 # Estilos globales
│   │
│   ├── utils/                  # Utilidades
│   │   └── formatters.js       # Formateo de precios y fechas
│   │
│   ├── App.jsx                 # Componente principal con rutas
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos base
│
├── .gitignore                  # Archivos ignorados por Git
├── eslint.config.js            # Configuración ESLint
├── index.html                  # HTML principal
├── package.json                # Dependencias y scripts
├── package-lock.json           # Lock de dependencias
├── README.md                   # Este archivo
└── vite.config.js              # Configuración de Vite
```

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v16.0.0 o superior ([Descargar aquí](https://nodejs.org/))
- **npm** v7.0.0 o superior (viene con Node.js)
- **Git** ([Descargar aquí](https://git-scm.com/))

Verifica las versiones instaladas:
```bash
node --version
npm --version
git --version
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/ecommerce-front-2.git
cd ecommerce-front-2
```

### 2. Instalar dependencias
```bash
npm install
```

Esto instalará todas las dependencias listadas en `package.json`:

- React y React DOM
- React Router DOM
- Material-UI y componentes relacionados
- React Toastify
- ESLint y plugins

**Tiempo estimado:** 2-3 minutos

---

## 🛠️ Configuración

### Variables de Entorno (Opcional)

Si planeas conectar con un backend, crea un archivo `.env` en la raíz:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Tech Store
```

### Datos Iniciales

El proyecto usa **localStorage** para persistir datos. Los datos iniciales se cargan automáticamente desde el contexto:

- **Productos:** 30 productos de ejemplo en 7 categorías
- **Categorías:** Celulares, Computadoras, Televisores, Audio, Tablets, Accesorios, Consolas
- **Pedidos:** Se crean cuando los usuarios finalizan compras

---

## 🚀 Ejecución

### Modo Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en:
```
http://localhost:5173
```

**Características del modo desarrollo:**
- ⚡ Hot Module Replacement (HMR)
- 🔄 Recarga automática al guardar cambios
- 🐛 Source maps para debugging
- ⚠️ Mensajes de error detallados

### Compilar para Producción
```bash
npm run build
```

Esto creará una carpeta `dist/` con los archivos optimizados:
- ✅ Minificación de código
- ✅ Tree-shaking
- ✅ Optimización de assets
- ✅ Code splitting

### Previsualizar Build de Producción
```bash
npm run preview
```

Esto inicia un servidor local para probar el build de producción:
```
http://localhost:4173
```

---

## 🔑 Credenciales de Acceso

### Panel de Administración

Para acceder al panel de administración (`/admin/login`):
```
Usuario: admin
Contraseña: admin123
```

### Rutas Protegidas

Las siguientes rutas requieren autenticación:
- `/admin` - Dashboard
- `/admin/products` - Gestión de productos
- `/admin/products/:id` - Detalle de producto admin
- `/admin/orders` - Gestión de pedidos
- `/admin/orders/:id` - Detalle de pedido admin

Si intentas acceder sin estar autenticado, serás redirigido a `/admin/login`.

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm run dev` | Inicia servidor de desarrollo en puerto 5173 |
| **Build** | `npm run build` | Compila la aplicación para producción |
| **Preview** | `npm run preview` | Previsualiza el build de producción |
| **Lint** | `npm run lint` | Ejecuta ESLint para verificar código |

### Scripts adicionales que puedes agregar:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css,md}\"",
    "clean": "rm -rf dist node_modules",
    "reinstall": "npm run clean && npm install"
  }
}
```

---

## 🗺️ Rutas de la Aplicación

### Rutas Públicas (Tienda)

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Home.jsx` | Página principal con productos destacados |
| `/products` | `Products.jsx` | Catálogo completo con filtros |
| `/products/:id` | `ProductDetailPage.jsx` | Detalle de producto individual |
| `/cart` | `Cart.jsx` | Carrito de compras |
| `/checkout` | `Checkout.jsx` | Proceso de pago y finalización |
| `/orders/:id` | `OrderTracking.jsx` | Seguimiento de pedido específico |
| `/my-orders` | `MyOrders.jsx` | Historial de pedidos del usuario |

### Rutas de Administración (Protegidas)

| Ruta | Componente | Descripción | Protegida |
|------|------------|-------------|-----------|
| `/admin/login` | `AdminLogin.jsx` | Login de administrador | ❌ No |
| `/admin` | `Dashboard.jsx` | Dashboard con estadísticas | ✅ Sí |
| `/admin/products` | `ProductManagement.jsx` | Gestión de productos | ✅ Sí |
| `/admin/products/:id` | `AdminProductDetail.jsx` | Detalle de producto admin | ✅ Sí |
| `/admin/orders` | `OrderManagement.jsx` | Gestión de pedidos | ✅ Sí |
| `/admin/orders/:id` | `AdminOrderDetail.jsx` | Detalle de pedido admin | ✅ Sí |

---

## 🎯 Características Detalladas

### Dashboard de Administración

#### Estadísticas en Tiempo Real (6 Cards)
```
┌─────────────────────────────────────────────────────────────┐
│  📦 Total      🛒 Pedidos    💰 Ventas    📊 Stock          │
│  Productos     Totales       Totales      Total             │
│     30            3         $4,199.97      823              │
│   Activos    Gestionados    Ingresos    Unidades           │
│                                                             │
│  ⏰ Pedidos    📁 Categorías                               │
│  Pendientes   Activas                                      │
│      1            7                                         │
│  Por procesar  Activas                                     │
└─────────────────────────────────────────────────────────────┘
```

#### Layout de 3 Columnas
- **Columna 1 (41.6%):** Pedidos Recientes
- **Columna 2 (33.3%):** Acciones Rápidas + Stock Bajo
- **Columna 3 (25%):** Productos por Categoría

### Gestión de Productos

**Filtros Disponibles:**
- 🔍 Búsqueda por nombre
- 📁 Filtro por categoría (dropdown)
- 📊 Filtro por stock:
  - Todos
  - Disponibles (stock > 0)
  - Stock bajo (< 15 unidades)
  - Sin stock (= 0)

**Acciones por Producto:**
- 👁️ Ver detalle completo
- ✏️ Editar información
- 🗑️ Eliminar producto

**Modal de Agregar Producto:**
- Fondo morado con gradiente
- Validación de campos requeridos
- Campos: Nombre, Descripción, Precio, Stock, Categoría, URL de imagen

**Modal de Editar Producto:**
- Fondo oscuro (#1a1d2e)
- Pre-carga datos existentes
- Mismos campos que agregar

### Sistema de Carrito

**Funcionalidades:**
- ➕ Agregar productos
- ➖ Reducir cantidad
- 🗑️ Eliminar del carrito
- 💰 Cálculo automático de subtotal, envío y total
- 💾 Persistencia en localStorage
- 🔔 Notificaciones toast

**Métodos de Envío:**
1. 🏪 Retiro en tienda (Gratis)
2. 🚚 Envío estándar ($500)
3. ⚡ Envío express ($1000)

---

## 🎨 Tema y Colores

### Paleta de Colores Principal
```javascript
{
  primary: '#1976d2',      // Azul principal
  secondary: '#dc004e',    // Rosa/Rojo
  success: '#2e7d32',      // Verde (navbar admin)
  warning: '#ed6c02',      // Naranja (stock bajo)
  error: '#d32f2f',        // Rojo error
  
  // Gradientes
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  orange: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
  
  // Backgrounds
  background: '#f8f9fa',   // Fondo general
  paper: '#ffffff',        // Cards
  dark: '#1a1a2e',        // Textos oscuros
}
```

### Estados de Pedidos

| Estado | Color | Icono |
|--------|-------|-------|
| Pendiente | 🟡 Naranja (#ff9800) | ⏰ AccessTime |
| En Progreso | 🔵 Azul (#1976d2) | 🚚 LocalShipping |
| Entregado | 🟢 Verde (#2e7d32) | ✅ CheckCircle |
| Cancelado | 🔴 Rojo (#d32f2f) | ❌ Cancel |

---

## 🚢 Deploy

### Vercel (Recomendado)

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Deploy a producción:
```bash
vercel --prod
```

### Netlify

1. Instala Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build del proyecto:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

### Variables de Entorno en Deploy

Asegúrate de configurar las variables de entorno en tu plataforma de deploy:
```
VITE_API_URL=https://tu-api.com
VITE_APP_NAME=Tech Store
```

---

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error de puerto en uso
```bash
# Cambia el puerto en vite.config.js
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Errores de ESLint
```bash
# Desactiva temporalmente ESLint
npm run dev -- --no-lint
```

### Build falla
```bash
# Verifica versiones de Node y npm
node --version  # Debe ser >= 16
npm --version   # Debe ser >= 7

# Actualiza dependencias
npm update
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Commits
```
Add: Nueva funcionalidad
Fix: Corrección de bug
Update: Actualización de código existente
Remove: Eliminación de código
Docs: Cambios en documentación
Style: Cambios de formato
Refactor: Refactorización de código
```

---

## 📝 TODO / Mejoras Futuras

- [ ] Conectar con backend real (API REST)
- [ ] Implementar paginación en productos
- [ ] Agregar búsqueda avanzada
- [ ] Sistema de reseñas de productos
- [ ] Panel de reportes y gráficos
- [ ] Exportar datos a Excel/PDF
- [ ] Sistema de notificaciones push
- [ ] Chat de soporte en vivo
- [ ] Integración con pasarelas de pago
- [ ] Modo oscuro completo

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**

- GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/tu-perfil)
- Email: tu.email@example.com

---

## 🙏 Agradecimientos

- [React](https://react.dev/) - La biblioteca de UI
- [Vite](https://vitejs.dev/) - El build tool
- [Material-UI](https://mui.com/) - Los componentes UI
- [React Router](https://reactrouter.com/) - El enrutamiento

---

## 📸 Screenshots

### Dashboard
```
[Aquí puedes agregar una captura de pantalla del dashboard]
```

### Gestión de Productos
```
[Aquí puedes agregar una captura de pantalla de productos]
```

### Tienda Online
```
[Aquí puedes agregar una captura de pantalla de la tienda]
```

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

---

*Última actualización: Diciembre 2024*