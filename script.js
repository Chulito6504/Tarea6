document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu');
    const menuForm = document.getElementById('menuForm');
    const eliminarBtn = document.getElementById('eliminarBtn');
    let menuData = [];

    // Cargar datos desde LocalStorage o desde el archivo JSON
    function cargarDatos() {
        const datosGuardados = localStorage.getItem('menuData');
        if (datosGuardados) {
            // Si hay datos en LocalStorage, usarlos
            menuData = JSON.parse(datosGuardados);
            renderMenu();
        } else {
            // Si no hay datos en LocalStorage, cargar desde el archivo JSON
            fetch('menu.json')
                .then(response => response.json())
                .then(data => {
                    menuData = data.menu;
                    guardarDatos(); // Guardar los datos iniciales en LocalStorage
                    renderMenu();
                })
                .catch(error => console.error('Error cargando el menú:', error));
        }
    }

    // Guardar datos en LocalStorage
    function guardarDatos() {
        localStorage.setItem('menuData', JSON.stringify(menuData));
    }

    // Renderizar el menú
    function renderMenu() {
        menuContainer.innerHTML = '';
        menuData.forEach(item => {
            const link = document.createElement('a');
            link.href = item.enlace;
            link.textContent = item.nombre;
            menuContainer.appendChild(link);
        });
    }

    // Agregar o modificar una opción del menú
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('id').value);
        const nombre = document.getElementById('nombre').value;
        const enlace = document.getElementById('enlace').value;

        // Verificar si el ID ya existe
        const existingItemIndex = menuData.findIndex(item => item.id === id);

        if (existingItemIndex !== -1) {
            // Modificar opción existente
            menuData[existingItemIndex] = { id, nombre, enlace };
        } else {
            // Agregar nueva opción
            menuData.push({ id, nombre, enlace });
        }

        // Guardar datos en LocalStorage y renderizar el menú
        guardarDatos();
        renderMenu();
        menuForm.reset();
    });

    // Eliminar una opción del menú
    eliminarBtn.addEventListener('click', () => {
        const id = parseInt(document.getElementById('id').value);

        // Filtrar el menú para eliminar la opción con el ID especificado
        menuData = menuData.filter(item => item.id !== id);

        // Guardar datos en LocalStorage y renderizar el menú
        guardarDatos();
        renderMenu();
        menuForm.reset();
    });

    // Cargar datos al iniciar la página
    cargarDatos();
});