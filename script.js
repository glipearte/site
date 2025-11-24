// Variáveis Globais
const appContent = document.getElementById('app-content');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

// --- 1. Lógica de Navegação Dinâmica ---

// Conteúdo das "páginas" como strings de template
const pages = {
    home: `
        <section id="home-section" class="page-content active">
            <div class="hero-section animate__animated animate__fadeInDown">
                <h1>Sua Festa Incrível Começa Aqui!</h1>
                <p>Aluguel de kits "Pegue e Monte" para tornar seu evento inesquecível com elegância e economia.</p>
                <a href="https://glipearte.github.io/site/#portfolio" class="cta-button">Veja Nossos Kits de Decoração</a>
            </div>

            <h2 class="animated-element">✨ Pegue e Monte: Como Funciona?</h2>
            <div class="kits-grid animated-element">
                <div class="kit-card">
                    <i class="fas fa-box fa-3x" style="color: var(--color-primary);"></i>
                    <h3>1. Alugue</h3>
                    <p>Escolha o kit ideal em nosso portfólio.</p>
                </div>
                <div class="kit-card">
                    <i class="fas fa-truck-loading fa-3x" style="color: var(--color-primary);"></i>
                    <h3>2. Retire e Monte</h3>
                    <p>Você retira, transporta, monta e decora no local do seu evento.</p>
                </div>
                <div class="kit-card">
                    <i class="fas fa-undo-alt fa-3x" style="color: var(--color-primary);"></i>
                    <h3>3. Devolva</h3>
                    <p>Devolva os itens no prazo e nas mesmas condições de retirada. Simples assim!</p>
                </div>
            </div>
        </section>
    `,
    quemsomos: `
        <section id="about-section" class="page-content">
            <h2 class="animated-element">Quem Somos e o Conceito Pegue e Monte</h2>
            <div class="about-details">
                <div class="about-text animated-element">
                    <h2>Nossa Missão</h2>
                    <p>A <strong>Glipearte Pegue e Monte</strong> nasceu com o objetivo de democratizar a decoração de festas, oferecendo kits de alta qualidade com um custo-benefício imbatível. Acreditamos que todos merecem uma festa linda e memorável, e nosso modelo simplifica esse processo.</p>

                    <h2>O Conceito Pegue e Monte</h2>
                    <p>O conceito é desenhado para a sua autonomia e economia:</p>
                    <ul>
                        <li><i class="fas fa-hand-holding-box"></i> O cliente <strong>aluga</strong> os itens (kits prontos).</li>
                        <li><i class="fas fa-car"></i> Ele é responsável pela <strong>retirada</strong> na loja, <strong>transporte</strong>, <strong>montagem</strong> e <strong>devolução</strong> dos itens.</li>
                        <li><i class="fas fa-shield-alt"></i> É essencial que todos os itens sejam devolvidos <strong>sem avarias</strong>, sob pena de multa.</li>
                    </ul>
                    <p>É a solução perfeita para quem busca personalizar a decoração com o próprio toque, economizando no frete e na montagem profissional.</p>
                </div>
                <div class="about-image animated-element">
                    <img src="conceito.png" alt="Ilustração do conceito Pegue e Monte"> </div>
            </div>
        </section>
    `,
    portfolio: `
        <section id="portfolio-section" class="page-content">
            <h2 class="animated-element">Portfólio & Galeria de Eventos</h2>
            <p class="animated-element">Inspire-se com algumas de nossas decorações e veja a versatilidade de nossos kits.</p>

            <div class="portfolio-grid">
                <div class="portfolio-item animated-element">
                    <img src="kit_bronze.png" alt="Kit Bronze" width="280" height="360"> <h3>Kit Bronze</h3>
                    <p>Uso do Kit Prata com arco de balões. Simples e impactante.</p>
                </div>
                <div class="portfolio-item animated-element">
                    <img src="kit_prata.png" alt="Kit Prata" width="280" height="360"> <h3>Kit Prata</h3>
                    <p>Destaque para o painel redondo e tapete opcional.</p>
                </div>
                <div class="portfolio-item animated-element">
                    <img src="kit_ouro.png" alt="Kit Ouro" width="280" height="360"> <h3>Kit Ouro</h3>
                    <p>Combinação do Kit Ouro com peças personalizadas.</p>
                </div>
            </div>
        </section>
    `,
    orcamento: `
        <section id="budget-section" class="page-content budget-section">
            <h2 class="animated-element">Tabela de Orçamento - Kits e Opcionais</h2>
            <p class="animated-element">Encontre o kit perfeito para sua festa. Lembre-se: Retirada, Montagem e Devolução são por conta do cliente.</p>

            ${generateBudgetTable()}
            
            <p class="animated-element" style="text-align: center; margin-top: 30px; font-weight: 600;">
                <i class="fas fa-exclamation-triangle" style="color: orange;"></i> 
                Observação: As capas de mesa e os Kits não acompanham as mesas.
            </p>
        </section>
    `,
    contato: `
        <section id="contact-section" class="page-content">
            <h2 class="animated-element">Fale Conosco</h2>
            <p class="animated-element" style="text-align: center;">Preencha o formulário ou utilize nossos canais diretos para um atendimento mais rápido!</p>

            <div class="contact-form animated-element">
                <form id="contactForm">
                    <div class="form-group">
                        <label for="name">Nome Completo</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Telefone / WhatsApp</label>
                        <input type="tel" id="phone">
                    </div>
                    <div class="form-group">
                        <label for="message">Mensagem (Qual o kit ou item de interesse?)</label>
                        <textarea id="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="cta-button">Enviar Mensagem</button>
                </form>
            </div>
        </section>
    `
};

/**
 * Função para gerar o HTML da tabela de orçamento a partir do arquivo PDF.
 * @returns {string} HTML da tabela.
 */
function generateBudgetTable() {
    return `
        <table class="budget-table animated-element">
            <caption>Kits Pegue e Monte</caption>
            <thead>
                <tr>
                    <th>Item/Kit</th>
                    <th>Descrição</th>
                    <th style="text-align: right;">Valor (R$)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="kit-name">Capa p/ 1 mesa 70x70</td>
                    <td>(Não acompanha mesa)</td>
                    <td class="price-value">60,00</td>
                </tr>
                <tr>
                    <td class="kit-name">Capa p/ 2 mesas 70x140</td>
                    <td>(Não acompanha mesa)</td>
                    <td class="price-value">75,00</td>
                </tr>
                <tr><th colspan="3" style="background-color: #5cb85c; color: white;">KIT BRONZE </th></tr>
                <tr>
                    <td class="kit-name">Opção 1</td>
                    <td>1 painel 50cm, 1 jarro, 3 bandejas, 1 boleira, 1 display</td>
                    <td class="price-value">70,00</td>
                </tr>
                <tr>
                    <td class="kit-name">Opção 2</td>
                    <td>1 painel 50cm, 1 jarro, 4 bandejas, 1 boleira, 2 displays, 1 mini-arco de balões</td>
                    <td class="price-value">130,00</td>
                </tr>
                <tr>
                    <td class="kit-name">Opção 3</td>
                    <td>1 painel 50cm, 1 jarro, 4 bandejas, 1 boleira, 3 displays, 1 mini-arco balões c/ fio de fada e mesa ripada quadrada</td>
                    <td class="price-value">200,00</td>
                </tr>
                
                <tr><th colspan="3" style="background-color: #007BFF; color: white;">KIT PRATA </th></tr>
                <tr>
                    <td class="kit-name">Kit Prata Completo</td>
                    <td>1 painel redondo 1,20m, 3 cilindros, 1 jarro, 2 bandejas, 1 boleira, 1 boleira cake, 2 displays</td>
                    <td class="price-value">250,00</td>
                </tr>
                
                <tr><th colspan="3" style="background-color: #FFC107; color: #333;">KIT OURO</th></tr>
                <tr>
                    <td class="kit-name">Kit Ouro Completo</td>
                    <td>1 painel redondo 1,20m, 1 painel retangular 1,50x2,20m, 3 cilindros, 1 jarro, 3 bandejas, 1 boleira, 1 tapete, 2 displays</td>
                    <td class="price-value">350,00</td>
                </tr>
                
                <tr><th colspan="3">OPCIONAIS (Para Kit Bronze, Prata, Ouro)</th></tr>
                <tr>
                    <td>Tapete</td>
                    <td>(Opcional Kit Bronze/Prata)</td>
                    <td class="price-value">20,00 </td>
                </tr>
                <tr>
                    <td>Mini Arco de Balões</td>
                    <td>(Opcional Kit Bronze)</td>
                    <td class="price-value">40,00</td>
                </tr>
                <tr>
                    <td>Escadinha</td>
                    <td>(Opcional Kits)</td>
                    <td class="price-value">20,00 </td>
                </tr>
                <tr>
                    <td>Arco de Balões</td>
                    <td>(Opcional Kit Prata/Ouro - Simples)</td>
                    <td class="price-value">200,00 </td>
                </tr>

                <tr><th colspan="3">BALÕES AVULSOS E ARCOS (Extras)</th></tr>
                <tr>
                    <td>Mini Arco de Balões (50x50cm)</td>
                    <td>Arco e Guirlanda de Balões</td>
                    <td class="price-value">40,00 </td>
                </tr>
                <tr>
                    <td>Arco de Balões Metalizados</td>
                    <td>Arco e Guirlanda de Balões</td>
                    <td class="price-value">300,00</td>
                </tr>
                <tr>
                    <td>Guirlanda de Balão Para Mesa</td>
                    <td>Arco e Guirlanda de Balões</td>
                    <td class="price-value">60,00</td>
                </tr>
                <tr><th colspan="3" style="background-color: #DC3545; color: white;">ITENS NATALINOS/ANO NOVO</th></tr>
                <tr><td>Caixa de Balão Presente</td><td>Cada</td><td class="price-value">15,00</td></tr>
                <tr><td>Árvore de Natal</td><td></td><td class="price-value">55,00</td></tr>
                <tr><td>Box de Balão Natalino 1</td><td></td><td class="price-value">35,00</td></tr>
                <tr><td>Box de Balão Natalino 2 (Papai Noel)</td><td></td><td class="price-value">40,00</td></tr>
                <tr><td>Box de Balão Natalino 3</td><td></td><td class="price-value">65,00</td></tr>
                <tr><td>Box de Balão Ano Novo Estrela Dourada</td><td></td><td class="price-value">45,00</td></tr>
            </tbody>
        </table>
    `;
}

/**
 * Renderiza o conteúdo da página solicitada.
 * @param {string} pageName O nome da página (chave no objeto 'pages').
 */
function renderPage(pageName) {
    // 1. Remove a classe 'active' da página atual (se houver)
    const oldContent = appContent.querySelector('.page-content');
    if (oldContent) {
        // Usa a classe animate__fadeOut para uma transição suave de saída
        oldContent.classList.remove('active');
        oldContent.classList.add('animate__animated', 'animate__fadeOut');
    }

    // 2. Espera a animação de saída terminar (opcional, mas melhora a UX)
    setTimeout(() => {
        // Limpa o conteúdo
        appContent.innerHTML = '';

        // 3. Adiciona o novo conteúdo
        const newContentHTML = pages[pageName] || pages.home; // Fallback para Home
        appContent.innerHTML = newContentHTML;

        // 4. Marca o link de navegação como ativo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });

        // 5. Inicia a animação de entrada (fade-in e slide-up) para a nova página
        const newContent = appContent.querySelector('.page-content');
        if (newContent) {
            // Remove a animação de saída e adiciona a de entrada
            newContent.classList.remove('animate__fadeOut');
            newContent.classList.add('active', 'animate__animated', 'animate__fadeIn');
            
            // Re-observa elementos para o scroll-reveal
            setupScrollReveal();
        }

        // 6. Fecha o menu hambúrguer no mobile
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
        }

        // 7. Rola para o topo do conteúdo
        window.scrollTo({ top: document.querySelector('.main-header').offsetHeight, behavior: 'smooth' });

    }, oldContent ? 300 : 0); // Tempo de espera para animação de saída (300ms)
}


// --- 2. Event Listeners e Inicialização ---

// Gerencia o clique nos links de navegação
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = e.currentTarget.dataset.page;
        history.pushState({ page: pageName }, '', `#${pageName}`); // Atualiza a URL
        renderPage(pageName);
    });
});

// Gerencia o botão do menu hambúrguer
menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times'); // Ícone de fechar
});

// Gerencia navegação pelo histórico do navegador (botão Voltar/Avançar)
window.addEventListener('popstate', (e) => {
    const pageName = e.state ? e.state.page : 'home';
    renderPage(pageName);
});

// Gerencia o envio do formulário de contato (apenas front-end)
document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'contactForm') {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        e.target.reset(); // Limpa o formulário
    }
});

// --- 3. Animações de Scroll Reveal (Intersection Observer) ---

function setupScrollReveal() {
    // Seleciona todos os elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.animated-element');

    // Opções para o observador (rootMargin negativo para só animar quando o elemento
    // estiver visível em 10% da viewport)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se estiver visível, adiciona a classe 'show' (que aplica o fadeInUp)
                entry.target.classList.add('show', 'animate__fadeInUp');
                // Para de observar o elemento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializa a página ao carregar
window.addEventListener('DOMContentLoaded', () => {
    // Determina a página inicial com base na hash da URL, se houver
    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'home';
    history.replaceState({ page: initialPage }, '', `#${initialPage}`);
    renderPage(initialPage);
});