# PyStock-Manager: API de Gerenciamento de Estoque 🐍📦

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render)

Este repositório contém o código de uma aplicação full-stack de gerenciamento de estoque, composta por uma API RESTful em Python (FastAPI) e uma interface de usuário reativa em JavaScript puro.

## 🚀 Aplicação no Ar!

Este projeto foi implantado na nuvem usando Render.com e está totalmente funcional.

*   **🔗 Interface do Usuário (Front-End):** **[Acesse o PyStock-Manager Aqui](https://pystock-manager-api.onrender.com)**
*   **🔗 Documentação da API (Back-End):** **[Acesse a Documentação Interativa da API](https://pystock-manager-api.onrender.com/docs)**

## ✨ Funcionalidades Principais

*   **API RESTful Completa:** Operações CRUD (Create, Read, Update, Delete) para gerenciamento de produtos.
*   **Interface Reativa:** Front-end de página única (SPA) que interage com a API em tempo real, sem a necessidade de recarregar a página.
*   **Design Responsivo:** A interface se adapta para uso em desktops e dispositivos móveis.
*   **Implantação na Nuvem:** O back-end e o front-end foram implantados como serviços separados, seguindo as melhores práticas de arquitetura moderna.

## 🛠️ Stack de Tecnologias

*   **Back-End:** Python 3, FastAPI, SQLAlchemy
*   **Banco de Dados:** SQLite (com possibilidade de migração para PostgreSQL)
*   **Front-End:** HTML5, CSS3 (com Flexbox), JavaScript (Vanilla JS com Fetch API)
*   **Deployment:** Render.com

## ⚙️ Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/CodeWithEdgard/PyStock-Manager.git
    cd PyStock-Manager
    ```
2.  **Crie e ative o ambiente virtual:**
    ```bash
    python -m venv .venv
    source .venv/Scripts/activate  # No Windows
    # source .venv/bin/activate    # No macOS/Linux
    ```
3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Execute o servidor da API:**
    ```bash
    uvicorn app.main:app --reload
    ```
5.  Abra seu navegador no endereço [http://127.0.0.1:8000](http://127.0.0.1:8000) para ver a aplicação em ação.

---
Desenvolvido por Edgar Mendes.
