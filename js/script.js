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

function switchBrand(brand) {
    // Update active tab styles
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

    // Cross-fade: toggle opacity and pointer-events simultaneously, plus positioning
    ['dodo', 'drinkit', 'anybiz'].forEach(b => {
        const content = document.getElementById(`content-${b}`);
        if (b === brand) {
            content.classList.remove('opacity-0', 'pointer-events-none', 'absolute', 'top-0', 'left-0', 'w-full');
            content.classList.add('relative');
        } else {
            content.classList.remove('relative');
            content.classList.add('opacity-0', 'pointer-events-none', 'absolute', 'top-0', 'left-0', 'w-full');
        }
    });
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
