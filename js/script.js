const prices = {
    dodo: {
        gc: {
            '8': { price: '6 990 ₽', desc: 'в месяц • постоплата • за 1 объект' },
            '12': { price: '9 890 ₽', desc: 'в месяц • постоплата • за 1 объект' }
        },
        full: {
            '8': { price: '13 990 ₽', desc: 'в месяц • постоплата • за 1 объект' },
            '12': { price: '19 890 ₽', desc: 'в месяц • постоплата • за 1 объект' }
        }
    },
    drinkit: {
        gc: {
            '8': { price: '5 990 ₽', desc: 'в месяц • постоплата • за 1 объект' },
            '12': { price: '8 490 ₽', desc: 'в месяц • постоплата • за 1 объект' }
        },
        full: {
            '8': { price: '9 990 ₽', desc: 'в месяц • постоплата • за 1 объект' },
            '12': { price: '14 190 ₽', desc: 'в месяц • постоплата • за 1 объект' }
        }
    }
};

function updatePrice(brand, type, plan) {
    const priceEl = document.getElementById(`price-${brand}-${type}`);
    const descEl = document.getElementById(`desc-${brand}-${type}`);
    if (priceEl && descEl && prices[brand] && prices[brand][type] && prices[brand][type][plan]) {
        priceEl.innerText = prices[brand][type][plan].price;
        descEl.innerText = prices[brand][type][plan].desc;
    }
}

let isTransitioning = false;

function switchBrand(brand) {
    if (isTransitioning) return;

    // Find currently active brand
    const activeTab = document.querySelector('.toggle-tab.active');
    const currentBrand = activeTab ? activeTab.id.replace('tab-', '') : null;
    if (currentBrand === brand) return;

    isTransitioning = true;

    // Update active tab styles immediately for responsiveness
    ['dodo', 'drinkit', 'anybiz'].forEach(b => {
        const tab = document.getElementById(`tab-${b}`);
        if (b === brand) {
            tab.classList.remove('inactive');
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
            tab.classList.add('inactive');
        }
    });

    const currentContent = document.getElementById(`content-${currentBrand}`);
    const newContent = document.getElementById(`content-${brand}`);

    if (currentContent) {
        // Fade out current content smoothly
        currentContent.classList.add('opacity-0');

        setTimeout(() => {
            // Once faded out, hide it completely so it leaves the layout flow
            currentContent.classList.add('hidden');

            if (newContent) {
                // Show new content structure in DOM
                newContent.classList.remove('hidden');
                // Force layout reflow so the transition functions correctly
                newContent.offsetHeight;
                // Fade in new content smoothly
                newContent.classList.remove('opacity-0');
            }
            isTransitioning = false;
        }, 200); // Match Tailwind's duration-200 (200ms)
    } else {
        if (newContent) {
            newContent.classList.remove('hidden');
            newContent.offsetHeight;
            newContent.classList.remove('opacity-0');
        }
        isTransitioning = false;
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const line1 = document.getElementById('burger-line-1');
    const line2 = document.getElementById('burger-line-2');
    const line3 = document.getElementById('burger-line-3');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        line1.style.transform = 'translateY(8px) rotate(45deg)';
        line2.style.opacity = '0';
        line3.style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        menu.classList.add('hidden');
        line1.style.transform = 'none';
        line2.style.opacity = '1';
        line3.style.transform = 'none';
    }
}

document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
