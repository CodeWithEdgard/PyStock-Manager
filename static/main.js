
const productTableBody = document.getElementById('product-table-body');
const productForm = document.getElementById('product-form');

const API_URL = 'http://127.0.0.1:8000';

// Função assíncrona para buscar todos os produtos da API.
async function fetchProducts() {
  try {
  const response = await fetch(`${API_URL}/products/`);
  if (!response.ok) {
    throw new Error('A resposta da rede não foi ok')
  }

  const products = await response.json();
  renderProducts(products);
} catch (error) {
        console.error('Houve um problema ao buscar os produtos:', error);
    }
}

function renderProducts(products) {
  productTableBody.innerHTML = '';

  if (products.length === 0) {
    const row = `<tr><td colspan="6" style="text-align:center;">Nenhum produto encontrado.</td></tr>`;
    productTableBody.innerHTML = row;
    return;
  }
}

products.forEach(product => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.description}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>${product.quantity_in_stock}</td>
    <td>
        <button class="action-button edit-button">✏️</button>
        <button class="action-button delete-button">🗑️</button>
    </td>
  `;
  
  productTableBody.appendChild(row);
});

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
