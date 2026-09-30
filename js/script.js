/* ==========================================================================
   PADARIA VILLA QUITAÚNA - MAIN JAVASCRIPT & VUE INSTANCE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar scroll effect
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Set Active Navigation Link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-custom');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 3. Smooth scroll for interior links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

/* ==========================================================================
   PRODUCTS DATA & VUE.JS APPLICATION
   ========================================================================== */

const productDatabase = [
  // Pães
  {
    id: 1,
    name: 'Pão Francês Tradicional',
    category: 'paes',
    categoryLabel: 'Pães',
    desc: 'Casquinha dourada e crocante, miolo macio e aerado. Assado em vários horários para garantir frescor total.',
    badge: 'Mais Vendido',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Farinha de trigo selecionada, água mineral, fermento, sal marinho.'
  },
  {
    id: 2,
    name: 'Pão de Fermentação Natural (Levain)',
    category: 'paes',
    categoryLabel: 'Pães',
    desc: 'Produzido artesanalmente com 36 horas de fermentação lenta. Casca rústica, sabor suavemente acidulado.',
    badge: 'Artesanal',
    badgeClass: 'badge-tag badge-olive',
    img: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Farinha italiana tipo 00, levain próprio, água, sal marinho.'
  },
  {
    id: 3,
    name: 'Brioche Mantiqueira',
    category: 'paes',
    categoryLabel: 'Pães',
    desc: 'Massa leve, aerada e enriquecida com manteiga de primeira qualidade. Perfeito para o café da manhã ou da tarde.',
    badge: 'Receita Especial',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Farinha de trigo, manteiga fresca artesanal, gemas de ovos caipiras, açúcar, fermento.'
  },
  {
    id: 4,
    name: 'Ciabatta Tradicional',
    category: 'paes',
    categoryLabel: 'Pães',
    desc: 'Pão italiano de alta hidratação com alvéolos marcantes, casca levemente crocante e azeite extra virgem.',
    badge: 'Italiano',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Farinha especial, azeite extra virgem, água, fermento e sal.'
  },

  // Bolos
  {
    id: 5,
    name: 'Bolo Caseiro de Cenoura com Brigadeiro',
    category: 'bolos',
    categoryLabel: 'Bolos',
    desc: 'O clássico irresistível! Massa fofinha de cenoura fresca coberta com farta camada de brigadeiro gourmet.',
    badge: 'Favorito da Casa',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Cenouras selecionadas, cacau 50%, leite condensado artesanal, ovos e farinha.'
  },
  {
    id: 6,
    name: 'Bolo Red Velvet Especial',
    category: 'bolos',
    categoryLabel: 'Bolos',
    desc: 'Camadas aveludadas de massa suave com toque de cacau e recheio cremoso de frosting de cream cheese.',
    badge: 'Festivo',
    badgeClass: 'badge-tag badge-olive',
    img: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Cream cheese, extrato natural de baunilha, cacau fino, manteiga sem sal.'
  },
  {
    id: 7,
    name: 'Bolo Cremoso de Fubá com Goiabada',
    category: 'bolos',
    categoryLabel: 'Bolos',
    desc: 'Tradição brasileira na medida certa. Fubá moinho d’água com pedaços macios de goiabada cascão derretida.',
    badge: 'Tradição',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Fubá de milho, leite integral, goiabada cascão, queijo meia cura ralado.'
  },

  // Doces
  {
    id: 8,
    name: 'Croissant Manteiga & Amêndoas',
    category: 'doces',
    categoryLabel: 'Doces',
    desc: 'Massa folhada artesanal laminada com manteiga pura, recheada com creme frangipane e amêndoas laminadas.',
    badge: 'Sofisticado',
    badgeClass: 'badge-tag badge-olive',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Farinha francesa, manteiga sem sal, amêndoas selecionadas, açúcar de confeiteiro.'
  },
  {
    id: 9,
    name: 'Sonho Recheado de Creme de Baunilha',
    category: 'doces',
    categoryLabel: 'Doces',
    desc: 'Massa fofinha frita na temperatura exata, recheada generosamente com creme confeiteiro feito com fava de baunilha.',
    badge: 'Clássico',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Fava de baunilha Bourbon, gemas frescas, leite, farinha, açúcar impalpável.'
  },
  {
    id: 10,
    name: 'Pastel de Nata / Belém',
    category: 'doces',
    categoryLabel: 'Doces',
    desc: 'Massa folhada extremamente crocante recheada com cremoso creme de ovos assado até dourar levemente com canela.',
    badge: 'Especialidade',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Massa folhada especial, gemas caipiras, canela do Ceilão, raspas de limão.'
  },

  // Salgados
  {
    id: 11,
    name: 'Coxinha Cremosa de Frango com Catupiry',
    category: 'salgados',
    categoryLabel: 'Salgados',
    desc: 'Massa leve de batata, recheio farto de peito de frango desfiado bem temperado e requeijão cremoso original.',
    badge: 'Campeão de Vendas',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Peito de frango, batata Asterix, Catupiry original, temperos naturais, farinha panko.'
  },
  {
    id: 12,
    name: 'Empada de Palmito Pupunha',
    category: 'salgados',
    categoryLabel: 'Salgados',
    desc: 'Massa podre tradicional derrete na boca, recheada com creme leve de palmito pupunha fresco e ervas finas.',
    badge: 'Artesanal',
    badgeClass: 'badge-tag badge-olive',
    img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Palmito pupunha fresco, manteiga, farinha, salsa fresca, azeite.'
  },
  {
    id: 13,
    name: 'Pão de Queijo Mineiro',
    category: 'salgados',
    categoryLabel: 'Salgados',
    desc: 'Feito com polvilho artesanal e queijo canastra curado de verdade. Crocante por fora e bem puxa por dentro.',
    badge: 'Sem Glúten',
    badgeClass: 'badge-tag badge-olive',
    img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Polvilho azedo e doce, queijo meia cura, queijo Canastra, leite, ovos.'
  },

  // Café e Bebidas
  {
    id: 14,
    name: 'Espresso Blend Villa Quitaúna',
    category: 'bebidas',
    categoryLabel: 'Café & Bebidas',
    desc: 'Grãos 100% arábica de torra média-escura provenientes do Sul de Minas, extraído no ponto correto com cremagem densa.',
    badge: 'Grãos Selecionados',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Café Especial 100% Arábica em grãos moídos na hora.'
  },
  {
    id: 15,
    name: 'Cappuccino Artesanal com Chocolate',
    category: 'bebidas',
    categoryLabel: 'Café & Bebidas',
    desc: 'Espresso duplo, leite vaporizado de textura aveludada, toque de cacau em pó 70% e raspas de chocolate amargo.',
    badge: 'Aconchegante',
    badgeClass: 'badge-tag',
    img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Espresso Villa Quitaúna, leite vaporizado, cacau 70%, canela.'
  },
  {
    id: 16,
    name: 'Suco Natural de Laranja com Morango',
    category: 'bebidas',
    categoryLabel: 'Café & Bebidas',
    desc: 'Frutas frescas espremidas na hora da montagem do seu pedido, sem adição de conservantes ou água.',
    badge: '100% Natural',
    badgeClass: 'badge-tag badge-olive',
    img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Laranjas pera selecionadas, morangos frescos higienizados.'
  }
];

// Vue.js Mounting Helper if Vue is available
if (typeof Vue !== 'undefined') {
  const { createApp } = Vue;

  // Mount Products App if #app-products exists
  if (document.getElementById('app-products')) {
    createApp({
      data() {
        return {
          products: productDatabase,
          selectedCategory: 'todos',
          searchQuery: '',
          selectedProductModal: null
        }
      },
      computed: {
        filteredProducts() {
          return this.products.filter(item => {
            const matchesCat = this.selectedCategory === 'todos' || item.category === this.selectedCategory;
            const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                                  item.desc.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
          });
        }
      },
      methods: {
        setCategory(cat) {
          this.selectedCategory = cat;
        },
        openProductModal(product) {
          this.selectedProductModal = product;
          const modalEl = document.getElementById('productDetailModal');
          if (modalEl && typeof bootstrap !== 'undefined') {
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
          }
        }
      }
    }).mount('#app-products');
  }

  // Mount Featured Products preview on Index if #app-featured-products exists
  if (document.getElementById('app-featured-products')) {
    createApp({
      data() {
        return {
          featuredProducts: productDatabase.slice(0, 6),
          selectedProductModal: null
        }
      },
      methods: {
        openProductModal(product) {
          this.selectedProductModal = product;
          const modalEl = document.getElementById('productDetailModal');
          if (modalEl && typeof bootstrap !== 'undefined') {
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
          }
        }
      }
    }).mount('#app-featured-products');
  }

  // Mount Gallery Lightbox if #app-gallery exists
  if (document.getElementById('app-gallery')) {
    createApp({
      data() {
        return {
          galleryItems: [
            { id: 1, title: 'Pães Rústicos de Fermentação', category: 'paes', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80' },
            { id: 2, title: 'Croissants Recém-Assados', category: 'doces', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80' },
            { id: 3, title: 'Bolo Caseiro de Cenoura', category: 'bolos', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80' },
            { id: 4, title: 'Espresso Blend Villa Quitaúna', category: 'cafe', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80' },
            { id: 5, title: 'Nossa Produção Artesanal', category: 'ambiente', img: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1000&q=80' },
            { id: 6, title: 'Ambiente Acolhedor da Padaria', category: 'ambiente', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80' },
            { id: 7, title: 'Variedade de Doces e Tortas', category: 'doces', img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1000&q=80' },
            { id: 8, title: 'Pães de Queijo Fressquinhos', category: 'salgados', img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80' }
          ],
          activeModalImage: null
        }
      },
      methods: {
        openGalleryModal(item) {
          this.activeModalImage = item;
          const modalEl = document.getElementById('galleryLightBoxModal');
          if (modalEl && typeof bootstrap !== 'undefined') {
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
          }
        }
      }
    }).mount('#app-gallery');
  }

  // Mount Contact Form App if #app-contact-form exists
  if (document.getElementById('app-contact-form')) {
    createApp({
      data() {
        return {
          form: {
            name: '',
            email: '',
            phone: '',
            subject: 'Dúvidas Gerais',
            message: ''
          },
          submitted: false,
          isSubmitting: false
        }
      },
      methods: {
        handleSubmit() {
          this.isSubmitting = true;
          setTimeout(() => {
            this.isSubmitting = false;
            this.submitted = true;
            this.form = { name: '', email: '', phone: '', subject: 'Dúvidas Gerais', message: '' };
          }, 1000);
        }
      }
    }).mount('#app-contact-form');
  }
}
