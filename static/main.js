
const productTableBody = document.getElementById('product-table-body');
const productForm = document.getElementById('product-form');

const API_URL = 'https://pystock-manager-api.onrender.com';

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
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>${product.quantity_in_stock}</td>
            <td>
                <button class="action-button edit-button" data-product-id="${product.id}" title="Editar Produto">
                <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="action-button delete-button" data-product-id="${product.id}" title="Deletar Produto">
                <i class="fas fa-trash-alt"></i>
                </button>
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

async function deleteProduct(productId) {
  const confirmDelete = confirm(`Tem certeza que deseja deletar o produto com ID ${productId} ?`);
  
  if(!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/products/${productId}` , {
      method: 'DELETE'
    });
  
  if (!response.ok) {
    if(response.status === 404) {
      alert('Erro: Produto não encontrado.')
    } else {
      throw new Error('A resposta da rede não foi ok')
    }
  } else {
    console.log(`Produto com ID ${productId} deletado com sucesso.`)
    fetchProducts();
  }
} catch (error) {
  console.error('Houve um problema ao deletar o produto:', error);
  alert('Erro ao deletar o produto.');
} 
} 

function populateFormForEdit(product) {

  document.getElementById('product-id').value = product.id;
  document.getElementById('name').value = product.name;
  document.getElementById('description').value = product.description;
  document.getElementById('price').value = product.price;
  document.getElementById('quantity').value = product.quantity_in_stock;

  // Muda o texto do botão e o título do formulário
  const submitButton = productForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'Salvar Alterações';
  document.getElementById('form-section').querySelector('h2').textContent = `Editando Produto ID: ${product.id}`

}

async function updateProduct (productId, productData) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
            throw new Error('A resposta da rede não foi ok');
        }

        // Limpa o formulário, reseta o título/botão, e atualiza a lista
        productForm.reset();
        document.getElementById('form-section').querySelector('h2').textContent = 'Adicionar Novo Produto';
        productForm.querySelector('button[type="submit"]').textContent = 'Adicionar Produto';
        fetchProducts();

    } catch (error) {
        console.error('Houve um problema ao atualizar o produto:', error);
        alert('Erro ao atualizar o produto.');
    }
  }

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

// Escuta o evento 'submit' do formulário de produto
productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(productForm);
    const productId = formData.get('product-id'); // Pega o ID do campo escondido

    const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        quantity_in_stock: parseInt(formData.get('quantity_in_stock'), 10)
    };

    // Se houver um ID, estamos editando. Se não, estamos criando.
    if (productId) {
        updateProduct(productId, productData);
    } else {
        createProduct(productData);
    }
});

// Adiciona um listener para toda a tabela usando Delegação de Eventos
productTableBody.addEventListener('click', async (event) => {
    
    // --- LÓGICA DE DELEÇÃO (usando closest) ---
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton) {
        const productId = deleteButton.getAttribute('data-product-id');
        deleteProduct(productId);
        return; // Sai da função após lidar com o clique
    }

    // --- LÓGICA DE EDIÇÃO (usando closest) ---
    const editButton = event.target.closest('.edit-button');
    if (editButton) {
        const productId = editButton.getAttribute('data-product-id');

        if (!productId) {
            console.error('ERRO: Não foi possível obter o product-id do botão de edição!');
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}/products/${productId}`);
            if (!response.ok) {
                throw new Error('Produto não encontrado para edição.');
            }
            const product = await response.json();
            populateFormForEdit(product);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('ERRO ao buscar produto para edição:', error);
            alert('Não foi possível carregar os dados do produto para edição.');
        }
    }
});