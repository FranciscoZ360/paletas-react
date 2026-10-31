# Paletas de colores (React)

Generador de paletas de colores hecho con **React** y **Vite**. Es la evolución de mi [Generador de Colores](https://github.com/FranciscoZ360/Generador-de-Colores) en JavaScript puro: el mismo problema, ahora con componentes, estado y pruebas.

## Qué hace

- Genera una paleta de 5 colores aleatorios (botón o barra espaciadora).
- **Bloquea** los colores que quieras conservar mientras generas el resto.
- Copia el código hexadecimal con un clic.
- **Guarda** paletas en el navegador (`localStorage`), las vuelve a cargar y las quita.
- Elige texto blanco o negro según el contraste de cada color (fórmula de luminosidad WCAG).
- Se adapta a móvil y respeta el modo claro/oscuro del sistema.

## Ejecutarlo

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev      # servidor de desarrollo
npm test         # pruebas con Vitest
npm run build    # versión para publicar en dist/
```

## Cómo está organizado

| Archivo | Responsabilidad |
|---|---|
| `src/colors.js` | Lógica pura: generar colores, bloqueos, contraste y validación de datos guardados |
| `src/colors.test.js` | 7 pruebas de esa lógica |
| `src/App.jsx` | Interfaz y estado (`useState`, `useEffect`) |
| `src/styles.css` | Estilos y tema claro/oscuro |

La lógica está separada de los componentes para poder probarla sin navegador. Lo que se lee de `localStorage` se valida antes de usarse, así datos corruptos no rompen la app.

## Qué aprendí construyéndolo

Componentes y estado en React, efectos con limpieza (`useEffect`), separar lógica de interfaz, pruebas con Vitest y compilación con Vite.

## Limitaciones y próximos pasos

- Solo paletas de 5 colores y generación totalmente aleatoria (sin armonías de color).
- Faltan pruebas de los componentes.
- Ideas: exportar la paleta como CSS o JSON, generar a partir de un color base.
