// ----------------------------------------------------------------------
// 1. Datos de los Proyectos para el Modal
// ----------------------------------------------------------------------
const projectData = {
    'p_daw': {
        title: 'Gestor de cursos ',
        summary: 'Plataforma web Full Stack desarrollada en el ciclo DAW. Permite a los usuarios cargar archivos GPX/FIT de rutas, visualizarlas en un mapa y, lo más importante, utiliza un modelo de machine learning (TensorFlow/Keras) entrenado para predecir y clasificar la dureza de las rutas, aportando un valor añadido de análisis de datos.',
        skills: ['Java', 'Spring Boot', 'Thymeleaf', 'JPA', 'HTML/Bootstrap', 'JavaScript'],
        challenges: [

        ],
        repo: 'https://github.com/Pabloluma/ejercicio_Cursos',
        images: [
            '/img/cursos/AplicacionSpringbootPersonal.jpg',
            '/img/cursos/imagenFormularioSpringPersonal.jpg',
        ],
    },
    'p_dam': {
        title: 'Marvel details',
        summary: 'Aplicación Android nativa enfocada en la gestión de contenidos. Permite a los usuarios explorar, guardar y descargar información sobre vídeos. El proyecto se centró en el ciclo de vida de una App móvil, la persistencia de datos local y la integración con servicios cloud.',
        skills: ['Java', 'Firebase Authentication', 'Firebase Realtime Database', 'Firebase Storage', 'Biometrics Auth'],
        challenges: [],
        repo: 'https://github.com/Pabloluma/MarvelDetails',
        images: [
            'img/marvel/android.jpg',
            'img/marvel/spiderman.jpg',
            'img/marvel/descripcion.jpg',
        ],
    },
    'p_java': {
        title: 'Routes Lupion',
        summary: 'Proyecto modular de backend para simular la gestión de un inventario de almacén. Implementado con Spring Boot para aprovechar su robustez y convención. Se centra en la calidad de la API, la seguridad de los endpoints y el manejo de excepciones.',
        skills: ['Python', 'Django', 'Youtube API', 'HTML/BOOTSTRAP', 'JAVASCRIPT'],
        challenges: [

        ],
        repo: 'https://github.com/Pabloluma/RoutesLupion',
        images: [
            'img/routes/imagenDAW.jpg',
            'img/routes/videosRoutes.jpg',
            'img/routes/DurezaRoutes.jpg'
        ],
    },
    'p_agenda': {
        title: 'Agenda Contactos',
        sumary: '',
        skills: ['Java', 'Android', 'SQlite'],
        challenges: [],
        repo: 'https://github.com/Pabloluma/AgendaContactos',
        images: [
            'img/agendacontactos/imagenAgenda.jpg',
        ],
    },
    'p_clientes' : {
        title: 'Gestor de clientes y pedidos',
        sumary: '',
        skills: ['Java', 'Spring Boot', 'Thymeleaf', 'JPA'],
        challenges: [],
        repo: 'https://github.com/Pabloluma/cliente_uno_a_muchos_pedido',
        images: [
            'img/clientePedido/clientesPedido.jpg',
            'img/clientePedido/pedidos.jpg',
            'img/clientePedido/nuevoPedido.jpg',
            'img/clientePedido/productos.jpg',
        ],

    }
};


document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Inicializa Typed.js para el efecto de escritura
    new Typed('#typed-intro', {
        strings: ['Desarrollador Full Stack', 'Desarrollador Java y Python', 'Desarrollador Android Nativo'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    });

    setupProjectFiltering();
    setupProjectModal();
});


function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    const filterProjects = (filter) => {

        filterButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-filter') === filter;
            btn.classList.toggle('bg-sky-600', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('shadow-md', isActive);
            btn.classList.toggle('bg-white', !isActive);
            btn.classList.toggle('border', !isActive);
            btn.classList.toggle('hover:bg-slate-100', !isActive);
        });

        // Filtra las tarjetas
        projectCards.forEach(card => {
            const types = card.getAttribute('data-type').split(' ');
            if (filter === 'all' || types.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.currentTarget.getAttribute('data-filter');
            filterProjects(filter);
        });
    });


    filterProjects('all');
}

function createCarouselHTML(images, projectId) {
    if (!images || images.length === 0) {
        return '<div class="text-center text-slate-500 p-8">No hay imágenes disponibles para este proyecto.</div>';
    }
    if (images.length === 1) {
        return `
            <div class="h-64 md:h-96 flex justify-center items-center bg-gray-50 rounded-lg overflow-hidden">
                <img src="${images[0]}" class="block h-full w-full object-contain mx-auto rounded-lg shadow-md" alt="Captura del proyecto">
            </div>
        `;
    }
    // 1. Elementos del carrusel (Ítems)
    const items = images.map((src, index) => `
        <div class="duration-700 ease-in-out flex justify-center items-center h-96 bg-gray-50 rounded-xl" data-carousel-item="${index === 0 ? 'active' : ''}">
            <img src="${src}" class="block h-full w-full object-contain mx-auto rounded-lg shadow-md" alt="Captura del proyecto ${index + 1}">
        </div>
    `).join('');

    // 2. Indicadores (Puntos de navegación)
    const indicators = images.map((_, index) => `
        <button type="button" class="w-3 h-3 rounded-full bg-gray-700 dark:bg-gray-700 hover:bg-gray-500 transition-colors" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}" data-carousel-slide-to="${index}"></button>
    `).join('');

    // Carrusel completo
    return `
        <div id="project-carousel-${projectId}" class="relative w-full" data-carousel="static">
            <div class="relative h-64 md:h-96 overflow-hidden rounded-lg">
                ${items}
            </div>
            <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2" id="indicadores">
                ${indicators}
            </div>
            <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/30 group-hover:bg-slate-800/50 group-focus:ring-4 group-focus:ring-white">
                    <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/30 group-hover:bg-slate-800/50 group-focus:ring-4 group-focus:ring-white">
                    <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
        </div>
    `;
}

function logAriaCurrentValues() {

    const indicatorsContainer = document.getElementById('indicadores');

    if (!indicatorsContainer) {
        console.warn("Advertencia: No se encontró el elemento con ID 'indicadores'.");
        return;
    }

    console.log("--- Escaneo de aria-current después de la navegación ---");


    const indicatorButtons = indicatorsContainer.querySelectorAll('button');

    if (indicatorButtons.length === 0) {
        console.log("No se encontraron botones indicadores dentro de #indicadores.");
        return;
    }


    indicatorButtons.forEach((boton, index) => {
        const ariaCurrent = boton.getAttribute('aria-current');
        boton.className = '';
        if (ariaCurrent === 'true') {
            boton.classList.add('w-3', 'h-3', 'rounded-full', 'bg-green-700', 'dark:bg-green-700', 'hover:bg-green-500', 'transition-colors', 'bg-green', 'dark:bg-green-800');
        } else {
            boton.classList.add('w-3', 'h-3', 'rounded-full', 'bg-black-700', 'dark:bg-black-700', 'hover:bg-black-500', 'transition-colors', 'bg-black', 'dark:bg-black-800');
        }
    });
    console.log("---------------------------------------------------------");
}


function setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeModalButton = document.getElementById('close-modal');
    const stackContainer = document.getElementById('modal-skills');
    const carouselContainer = document.getElementById('modal-carousel-container');
    const repoLink = document.getElementById('modal-repo-link');
    const demoLink = document.getElementById('modal-demo-link');


    const updateLink = (linkElement, url) => {
        if (linkElement && url && url !== '#') {
            linkElement.href = url;
            linkElement.classList.remove('hidden');
        } else if (linkElement) {
            linkElement.classList.add('hidden');
        }
    };


    document.querySelectorAll('.btn-project').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-id');
            const data = projectData[projectId];

            if (!data) return;


            document.getElementById('modal-title').textContent = data.title;

            if (stackContainer) {
                stackContainer.innerHTML = '';
                data.skills.forEach(tech => {
                    const badge = document.createElement('span');
                    badge.className = 'px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium';
                    badge.textContent = tech;
                    stackContainer.appendChild(badge);
                });
            }


            if (carouselContainer) {
                carouselContainer.innerHTML = createCarouselHTML(data.images, projectId);
                if (typeof window.initFlowbite === 'function') {
                    window.initFlowbite();
                }

                const carouselContainerElement = document.getElementById(`project-carousel-${projectId}`);

                if (carouselContainerElement) {
                    logAriaCurrentValues()
                    const nextButton = carouselContainerElement.querySelector('[data-carousel-next]');

                    if (nextButton) {
                        nextButton.addEventListener('click', () => {
                            // Usamos un pequeño setTimeout (ej. 50ms) para
                            // dar tiempo a que Flowbite actualice aria-current ANTES de leerlo.
                            setTimeout(logAriaCurrentValues, 50);
                        });
                    }
                }
            }



            updateLink(repoLink, data.repo);

            updateLink(demoLink, data.demo);



            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            }
        });
    });


    const hideModal = () => {
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    };

    if (closeModalButton) {
        closeModalButton.addEventListener('click', hideModal);
    }

    if (modal) {

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });
}