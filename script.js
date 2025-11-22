const menuItems = [
    {
        id: 1,
        name: "Tacos de Res",
        description: "Deliciosos tacos de Res con cebolla asada y guacamole",
        price: "$180",
        category: "tacos",
        url: 'images/food/TacosDeRes.jpg'
    },
    {
        id: 2,
        name: "Parrillada Texana",
        description: "Mix de carnes para 4 personas con chorizo, costilla y arrachera",
        price: "$650",
        category: "parrilladas",
        url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Hamburguesa Ranchera",
        description: "Hamburguesa con queso, tocino, aguacate y salsa especial",
        price: "$120",
        category: "hamburguesas",
        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Combo Familiar",
        description: "Incluye parrillada, guarniciones y refrescos para 4 personas",
        price: "$850",
        category: "combos",
        url: 'images/food/ComboRes.jpg'
    },
    {
        id: 5,
        name: "Queso Flameado",
        description: "Queso fundido con chorizo, servido con tortillas de harina",
        price: "$95",
        category: "entradas",
        url: 'images/food/QuesoFlameado.jpg'
    },
    {
        id: 6,
        name: "Costilla BBQ",
        description: "Costilla de cerdo bañada en nuestra salsa barbacoa especial",
        price: "$320",
        category: "parrilladas",
        url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Tacos de Trompo",
        description: "Tacos tradicionales de Trompo con piña, cebolla y cilantro",
        price: "$150",
        category: "tacos",
        url: 'images/food/TacosDeTrompo.jpg'
    },
    {
        id: 8,
        name: "Hamburguesa Texana",
        description: "Doble carne, queso cheddar, jalapeños y salsa BBQ",
        price: "$140",
        category: "hamburguesas",
        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

function renderMenu(category = 'todos') {
    const menuGrid = document.getElementById('menu-grid');
    const filteredItems = category === 'todos' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.url}" alt="${item.name}" loading="lazy">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">${item.price}</div>
                <button class="order-btn" onclick="orderItem(${item.id})">PEDIR AHORA</button>
            </div>
        </div>
    `).join('');
}

function filterMenu(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderMenu(category);
}

function orderItem(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
        showOrderModal(item);
    }
}

function showOrderModal(item) {
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        ">
            <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">¡Excelente elección!</h3>
            <p style="margin-bottom: 0.5rem;"><strong>${item.name}</strong></p>
            <p style="margin-bottom: 1rem; color: var(--primary-color); font-weight: bold;">${item.price}</p>
            <p style="margin-bottom: 2rem;">${item.description}</p>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="closeModal()" style="
                    padding: 0.5rem 1rem;
                    border: 2px solid var(--secondary-color);
                    background: white;
                    color: var(--secondary-color);
                    border-radius: 5px;
                    cursor: pointer;
                ">Seguir viendo</button>
                <button onclick="redirectToDelivery('${item.name}')" style="
                    padding: 0.5rem 1rem;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Ordenar ahora</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.order-modal');
    if (modal) {
        modal.remove();
    }
}

// Funcion para redirigir a apps
function redirectToDelivery(itemName) {
    closeModal();
    
    const apps = {
        rappi: 'https://www.rappi.com.mx/',
        didi: 'https://www.didi-food.com/es-MX/food/',
        uber: 'https://www.ubereats.com/'
    };
    
    window.open(apps.rappi, '_blank');// POR AHORA, redirige a Rappi al pedir
}

function redirectToApp(app) {
    const apps = {
        rappi: 'https://www.rappi.com.mx/',
        didi: 'https://www.didi-food.com/es-MX/food/',
        uber: 'https://www.ubereats.com/'
    };
    window.open(apps[app], '_blank');
}

// Funcion para redirigir a redes sociales
function redirectToSocial(social) {
    const socialUrls = {
        facebook: 'https://www.facebook.com/ElTexanitoOficial',
        instagram: 'https://www.instagram.com/texanitoficial/'
    };
    window.open(socialUrls[social], '_blank');
}

// Funcion para scroll al menú
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Menu movil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        navMenu.classList.remove('active');
    });

    renderMenu();
});

// scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("dark-mode-toggle");

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        toggleBtn.textContent = "☀️";
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark);

        updateDeliveryIcons(isDark);

        toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
});

function updateDeliveryIcons(isDark) {
    const icons = document.querySelectorAll(".delivery-apps img");

    icons.forEach(img => {
        if (isDark) {
            // Reemplaza el 3 del final por 2 → versión modo oscuro
            img.src = img.src.replace(/3\.png$/, "2.png");
        } else {
            // Regresa al modo normal → 2 vuelve a 3
            img.src = img.src.replace(/2\.png$/, "3.png");
        }
    });
}
