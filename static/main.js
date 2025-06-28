
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
}

async function createProduct(productData) {
  try {
    const response = await fetch(`${API_URL}/products/`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('A resposta da rede não foi ok')
    }

    productForm.reset();
    fetchProducts(); // Re-busca todos os produtos para mostrar a lista atualizada
  } catch (error) {
    console.error('Houve um problema ao criar o produto:', error);
    alert('Erro ao criar o produto. Verifique o console para mais detalhes.')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

// Escuta o evento 'submit' do formulário de produto
productForm.addEventListener('submit', (event) => {
    // Previne o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    // Cria um objeto FormData para pegar facilmente os valores dos campos
    const formData = new FormData(productForm);

    // Converte os dados do formulário em um objeto simples de JavaScript
    const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        // Converte os valores para números, pois eles vêm como string do formulário
        price: parseFloat(formData.get('price')),
        quantity_in_stock: parseInt(formData.get('quantity_in_stock'), 10)
    };

    // Chama a função para criar o produto com os dados capturados
    createProduct(productData);
});