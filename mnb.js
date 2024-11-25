
const products = [
    {
        name: "Samsung Galaxy S24 Ultra",
        price: "Rp 19.999.000",
        specs: "Snapdragon 8 Gen 3, 12GB RAM, 512GB Storage, 6.8\" Dynamic AMOLED 2X",
        image: "https://i.ebayimg.com/images/g/aSIAAOSwVVhl0x5W/s-l400.jpg"
    },
    {
        name: "Samsung Galaxy A55",
        price: "Rp 5.999.000",
        specs: "Exynos 1450, 8GB RAM, 256GB Storage, 6.7\" Dynamic AMOLED 2X",
        image: "https://i.ebayimg.com/images/g/ys4AAOSwMqFmASHD/s-l400.jpg"
    },
    {
        name: "Xiaomi 14T",
        price: "Rp 6.999.000",
        specs: "Snapdragon 8s Gen 3, 12GB RAM, 512GB Storage, 6.73\" LTPO AMOLED",
        image: "https://i.ebayimg.com/images/g/eL4AAOSw-pNm-ijk/s-l400.jpg"
    },
    {
        name: "VIVO X100 Pro",
        price: "Rp 16.999.000",
        specs: "Mediatek Dimensity 9300, 12GB RAM, 512GB Storage, 6.82\" LTPO AMOLED",
        image: "https://i.ebayimg.com/images/g/pdUAAOSw-dRlsy2C/s-l400.jpg"
    },
    {
        name: "ASUS ROG Phone 8 Pro",
        price: "Rp 10.499.000",
        specs: "Snapdragon 8 Gen 3, 16GB RAM, 256GB Storage, 6.78\" AMOLED",
        image: "https://i.ebayimg.com/images/g/xMQAAOSw8tBl4X8g/s-l400.jpg"
    },
    {
        name: "Infinix Note 40",
        price: "Rp 2.199.000",
        specs: "Mediatek Helio G99 Ultimate, 12GB RAM, 256GB Storage, 6.7\" AMOLED",
        image: "https://i.ebayimg.com/images/g/2fIAAOSwheRmARnS/s-l1200.jpg"
    }
];


let cart = [];


function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-specs">${product.specs}</p>
                <button class="btn" onclick="addToCart('${product.name}', '${product.price}')">Tambah ke Keranjang</button>
            </div>
        </div>
    `;
}


function renderProducts() {
    const productContainer = document.getElementById('productContainer');

    productContainer.innerHTML = products.map(product => createProductCard(product)).join(''); }
    
    renderProducts();

        document.querySelector('.search-bar input').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.specs.toLowerCase().includes(searchTerm)
            );
            const productContainer = document.getElementById('productContainer');
            productContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        });
  
    productContainer.innerHTML = '';
    
   
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.innerHTML += productCard;
    });


function addToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    updateCartIcon();
    alert(`${productName} ditambahkan ke keranjang!`);
}


function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartIcon.innerHTML = `🛒 (${totalQuantity})`;
}


function showCartModal() {
    const modalHTML = `
        <div id="cart-modal" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 80%;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">
            <h2 style="margin-bottom: 1rem;">Keranjang Belanja</h2>
            ${cart.length > 0 ? 
                cart.map(item => `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; padding: 0.5rem; border-bottom: 1px solid #eee;">
                        <span>${item.name}</span>
                        <div>
                            <button onclick="changeQuantity('${item.name}', -1)">-</button>
                            <span style="margin: 0 0.5rem;">${item.quantity}</span>
                            <button onclick="changeQuantity('${item.name}', 1)">+</button>
                            <span style="margin-left: 1rem;">${formatPrice(parsePrice(item.price) * item.quantity)}</span>
                        </div>
                    </div>
                `).join('') : 
                '<p>Keranjang kosong</p>'
            }
            ${cart.length > 0 ? `
                <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <strong>Total: ${formatPrice(calculateTotal())}</strong>
                    <button onclick="proceedToCheckout()" style="
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Lanjutkan Pembayaran</button>
                </div>
            ` : ''}
            <button onclick="closeCartModal()" style="
                margin-top: 1rem;
                background-color: #f44336;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                width: 100%;
            ">Tutup</button>
        </div>
        <div id="cart-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        "></div>
    `;


            



    document.body.insertAdjacentHTML('beforeend', modalHTML);
}


function changeQuantity(productName, change) {
    const productIndex = cart.findIndex(item => item.name === productName);
    
    if (productIndex > -1) {
        cart[productIndex].quantity += change;
        
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }
        
        closeCartModal();
        showCartModal();
        updateCartIcon();
    }
}


function calculateTotal() {
    return cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
}


function parsePrice(priceString) {
    return parseInt(priceString.replace(/[^0-9]/g, ''), 10);
}


function formatPrice(price) {
    return `Rp ${price.toLocaleString('id-ID')}`;
}


function proceedToCheckout() {
    alert('Nanti dulu, belum jadi nih fiturnya!');
}


function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-overlay');
    
    if (modal) modal.remove();
    if (overlay) overlay.remove();
}


document.addEventListener('DOMContentLoaded', () => {

    renderProducts();
    
 
    updateCartIcon();
    

    document.querySelector('.cart-icon').addEventListener('click', showCartModal);
});
  
