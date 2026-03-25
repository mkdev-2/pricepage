import './style.css'

// Smooth scroll para links da navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    try {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } catch (err) {
      console.error('Erro ao rolar para o alvo:', err);
    }

    // Close mobile menu on link click
    const nav = document.getElementById('main-nav');
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (nav && menuBtn) {
      nav.classList.remove('open');
      menuBtn.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('open');
    mainNav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
}

// Billing Toggle Logic
const billingToggle = document.getElementById('billing-toggle');
const monthlyLabel = document.querySelector('.toggle-label.mensal');
const yearlyLabel = document.querySelector('.toggle-label.anual');
const priceElements = document.querySelectorAll('.price');

if (billingToggle) {
  billingToggle.addEventListener('change', () => {
    const isYearly = billingToggle.checked;

    // Toggle active labels
    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
    if (yearlyLabel) yearlyLabel.classList.toggle('active', isYearly);

    // Update prices with a small animation
    priceElements.forEach(priceEl => {
      const monthly = priceEl.getAttribute('data-monthly');
      const yearly = priceEl.getAttribute('data-yearly');

      if (!monthly || !yearly) return;

      const span = priceEl.querySelector('span');
      if (!span) return;

      // Fade out effect
      span.style.opacity = '0';
      span.style.transform = 'translateY(-5px)';

      setTimeout(() => {
        span.textContent = isYearly ? yearly : monthly;
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 200);
    });

    // Sincronizar carrinho se houver plano selecionado
    if (typeof updateCartUI === 'function') {
      updateCartUI();
    }
  });
}

// Initialize Lucide Icons
if (window.lucide) {
  window.lucide.createIcons();
}

// Hero Animations
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    heroContent.style.transition = 'all 0.8s ease-out';

    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }

  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'rotateY(-20deg) scale(0.9)';
    heroVisual.style.transition = 'all 1s cubic-bezier(0.22, 1, 0.36, 1)';

    setTimeout(() => {
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = 'rotateY(-10deg) rotateX(5deg) scale(1)';
    }, 300);
  }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Modal Details Logic
const planDetails = {
  start: {
    name: "Loc10 START",
    desc: "Ideal para micro-locadores que estão organizando a operação básica.",
    features: [
      "Cadastro de Clientes PF e PJ",
      "Gestão de Catálogo de Produtos e Serviços",
      "Controle de Estoque unitário simples",
      "Emissão de Orçamentos em PDF",
      "Acesso exclusivo para 1 usuário",
      "Suporte via Central de Ajuda"
    ]
  },
  essencial: {
    name: "Loc10 ESSENCIAL",
    desc: "Para empresas que precisam de CRM e histórico comercial detalhado.",
    features: [
      "Tudo do Plano START",
      "Até 2 usuários simultâneos",
      "Multi-contatos por cliente",
      "Gestão de Unidade de Estoque (1 local)",
      "Histórico completo de Atividades",
      "Endereços de entrega ilimitados",
      "Livro Caixa (Lançamentos do dia)"
    ]
  },
  gestao: {
    name: "Loc10 GESTÃO",
    desc: "Foco total no controle financeiro e faturamento recorrente.",
    features: [
      "Tudo do Plano ESSENCIAL",
      "Até 5 usuários simultâneos",
      "Fluxo de Caixa (Pagar/Receber)",
      "Relatórios Financeiros Básicos",
      "Gestão Formal de Contratos",
      "Alertas de Vencimento e Vigência",
      "Faturamento Recorrente Automático"
    ]
  },
  logistica: {
    name: "Loc10 LOGÍSTICA",
    desc: "Domine a operação de campo, entregas e devoluções em tempo real.",
    features: [
      "Tudo do Plano GESTÃO",
      "Até 10 usuários e 2 Unidades de Estoque",
      "Agenda Logística Visual",
      "Emissão de Ordens de Serviço (OS)",
      "Assinatura Digital via Mobile",
      "Tombamento (Número de Série)",
      "Conferência Express (Checklist)",
      "Notas de Remessa Operacional"
    ]
  },
  master: {
    name: "Loc10 MASTER",
    desc: "Acelere suas vendas com automação, portal e inteligência comercial.",
    features: [
      "Tudo do Plano LOGÍSTICA",
      "Até 20 usuários e 5 Unidades de Estoque",
      "Portal Público para Aceite Online",
      "Kits e Combos Dinâmicos",
      "CRM com Funil de Vendas",
      "Gestão de Rentabilidade e Comissões",
      "Controle de Sublocação (Parceiros)",
      "Renovação Automática de Contratos"
    ]
  },
  enterprise: {
    name: "Loc10 ENTERPRISE",
    desc: "Potência máxima para grandes grupos, holdings e franquias.",
    features: [
      "Tudo do Plano MASTER",
      "Usuários e Unidades de Estoque ILIMITADOS",
      "Estrutura Multi-Empresa (Holding)",
      "Tabela de Preço por Cliente",
      "BI e Dashboards Avançados",
      "Acesso via API e Webhooks",
      "Suporte Prioritário 24/7",
      "Gerente de Conta Dedicado"
    ]
  }
};

const developedFeatures = [
  "Cadastro de Clientes PF e PJ",
  "Gestão de Catálogo de Produtos e Serviços",
  "Controle de Estoque unitário simples",
  "Emissão de Orçamentos em PDF",
  "Acesso exclusivo para 1 usuário",
  "Multi-contatos por cliente",
  "Fluxo de Caixa (Pagar/Receber)",
  "Relatórios Financeiros Básicos",
  "Agenda Logística Visual",
  "Emissão de Ordens de Serviço (OS)",
  "Assinatura Digital via Mobile",
  "Tombamento (Número de Série)",
  "Livro Caixa (Lançamentos do dia)"
];

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-details');
  const modal = document.getElementById('plan-modal');
  const modalBody = document.getElementById('modal-body');

  if (btn) {
    if (!modal || !modalBody) return;
    e.preventDefault();
    const planKey = btn.getAttribute('data-plan');
    const data = planDetails[planKey];
    if (data) {
      modalBody.innerHTML = `
          <div class="modal-header-content">
            <h2>${data.name}</h2>
            <p>${data.desc}</p>
          </div>
          <div class="features-grid-modal">
              ${data.features.map(f => {
        const isDeveloped = developedFeatures.includes(f) || f.startsWith("Até") || f.startsWith("Tudo") || f.includes("ILIMITADOS");
        return `
                  <div class="feature-item-modal ${isDeveloped ? 'developed' : 'pending'}">
                    <span class="feature-icon">${isDeveloped ? '✓' : '•'}</span>
                    <span class="feature-text">${f} ${isDeveloped ? '' : '<span class="tag-pending">Breve</span>'}</span>
                  </div>
                `;
      }).join('')}
          </div>
        `;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  const isCloseBtn = e.target.classList.contains('close-modal');
  const isBackdrop = e.target === modal;
  if (isCloseBtn || isBackdrop) {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
});

// Enhanced CAROUSEL & GRID LOGIC
const slider = document.querySelector('.pricing-slider');
const dotsContainer = document.querySelector('.slider-dots');
const CARDS_PER_VIEW = 1; // Used for dots calculation on mobile

if (slider && dotsContainer) {
  const cards = slider.querySelectorAll('.card');

  // Create Dots based on number of cards
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      const cardWidth = slider.querySelector('.card').offsetWidth + 30;
      slider.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  // Update active dot on scroll
  slider.addEventListener('scroll', () => {
    const scrollLeft = slider.scrollLeft;
    const cardWidth = slider.querySelector('.card').offsetWidth + 30;
    const activeIndex = Math.round(scrollLeft / cardWidth);

    document.querySelectorAll('.dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  });
}

// Slider Desktop Buttons (still present in HTML but may be hidden by media query)
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

if (slider && prevBtn && nextBtn) {
  nextBtn.addEventListener('click', () => {
    const card = slider.querySelector('.card');
    if (card) {
      const cardWidth = card.offsetWidth + 30;
      slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    const card = slider.querySelector('.card');
    if (card) {
      const cardWidth = card.offsetWidth + 30;
      slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  });

  slider.addEventListener('scroll', () => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    prevBtn.style.opacity = slider.scrollLeft <= 0 ? '0.3' : '1';
    prevBtn.style.pointerEvents = slider.scrollLeft <= 0 ? 'none' : 'auto';
    nextBtn.style.opacity = slider.scrollLeft >= maxScroll ? '0.3' : '1';
    nextBtn.style.pointerEvents = slider.scrollLeft >= maxScroll ? 'none' : 'auto';
  });
}

// Animação de entrada dos cards
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  if (question) {
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  }
});

// Cart State
const cartState = {
  plan: null,
  resources: []
};

function updateCartUI() {
  const cartElement = document.getElementById('floating-cart');
  if (!cartElement) return;

  const cartCount = cartElement.querySelector('.cart-count');
  const cartSummary = cartElement.querySelector('.cart-items-summary');
  const cartTotal = cartElement.querySelector('.cart-total-price');

  const totalQty = (cartState.plan ? 1 : 0) + cartState.resources.reduce((acc, curr) => acc + (curr.qty || 1), 0);
  const distinctItems = (cartState.plan ? 1 : 0) + cartState.resources.length;

  if (distinctItems > 0) {
    cartElement.classList.add('visible');
  } else {
    cartElement.classList.remove('visible');
  }

  if (cartCount) cartCount.textContent = totalQty;

  let summaryText = "";
  if (cartState.plan) {
    summaryText = `Plano ${cartState.plan.name}`;
    if (cartState.resources.length > 0) {
      const extraCount = cartState.resources.reduce((acc, curr) => acc + (curr.qty || 1), 0);
      summaryText += ` + ${extraCount} recurso(s)`;
    }
  } else if (cartState.resources.length > 0) {
    const totalResourceQty = cartState.resources.reduce((acc, curr) => acc + (curr.qty || 1), 0);
    summaryText = `${totalResourceQty} recurso(s) selecionado(s)`;
  } else {
    summaryText = "Selecionar itens...";
  }
  if (cartSummary) cartSummary.textContent = summaryText;

  // Calculate Total
  const isYearly = document.getElementById('billing-toggle')?.checked;
  let total = 0;
  if (cartState.plan) {
    total += isYearly ? cartState.plan.yearly : cartState.plan.monthly;
  }
  cartState.resources.forEach(res => {
    total += res.price * (res.qty || 1);
  });

  if (cartTotal) cartTotal.textContent = `Total: R$ ${total.toFixed(2)}/mês`;
}

// Global Click Actions (Plan & Resource Selection)
document.addEventListener('click', (e) => {
  // Plan Selection
  const planBtn = e.target.closest('.btn-select-plan');
  if (planBtn) {
    e.preventDefault();
    const card = planBtn.closest('.card');
    const planId = planBtn.getAttribute('data-plan-id');
    const planName = card.querySelector('h3').textContent;
    const priceEl = card.querySelector('.price');
    const monthly = parseFloat(priceEl.getAttribute('data-monthly')) || 0;
    const yearly = parseFloat(priceEl.getAttribute('data-yearly')) || 0;
    const grid = document.querySelector('.pricing-grid');

    if (cartState.plan && cartState.plan.id === planId) {
      cartState.plan = null;
      card.classList.remove('selected');
      if (grid) grid.classList.remove('plan-selected');
      planBtn.textContent = `Contratar ${planName}`;
    } else {
      document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
      if (grid) grid.classList.add('plan-selected');
      document.querySelectorAll('.btn-select-plan').forEach(btn => {
        const pName = btn.closest('.card').querySelector('h3').textContent;
        btn.textContent = `Contratar ${pName}`;
      });

      cartState.plan = { id: planId, name: planName, monthly, yearly };
      card.classList.add('selected');
      planBtn.textContent = "Selecionado";
    }
    updateCartUI();
    return;
  }

  // Resource Selection
  const resBtn = e.target.closest('.btn-add-resource');
  if (resBtn) {
    e.preventDefault();
    const card = resBtn.closest('.addon-card');
    const resId = resBtn.getAttribute('data-resource-id');
    const resName = card.querySelector('h3').textContent;
    const price = parseFloat(resBtn.getAttribute('data-price')) || 0;
    const qtySelector = card.querySelector('.addon-qty-selector');

    const index = cartState.resources.findIndex(r => r.id === resId);
    if (index > -1) {
      cartState.resources.splice(index, 1);
      card.classList.remove('selected');
      if (qtySelector) qtySelector.style.display = 'none';
      resBtn.textContent = "Adicionar Recurso";
    } else {
      cartState.resources.push({ id: resId, name: resName, price, qty: 1 });
      card.classList.add('selected');
      if (qtySelector) {
        qtySelector.style.display = 'flex';
        qtySelector.querySelector('.qty-value').textContent = '1';
      }
      resBtn.textContent = "Remover";
    }
    updateCartUI();
    return;
  }

  // Quantity Control
  const qtyBtn = e.target.closest('.qty-btn');
  if (qtyBtn) {
    const card = qtyBtn.closest('.addon-card');
    const resId = card.querySelector('.btn-add-resource').getAttribute('data-resource-id');
    const action = qtyBtn.getAttribute('data-action');
    const qtyValueDisplay = card.querySelector('.qty-value');
    const resource = cartState.resources.find(r => r.id === resId);
    if (resource) {
      if (action === 'increase') resource.qty++;
      else if (action === 'decrease' && resource.qty > 1) resource.qty--;
      if (qtyValueDisplay) qtyValueDisplay.textContent = resource.qty;
      updateCartUI();
    }
    return;
  }

  // Checkout Action
  if (e.target.closest('#cart-checkout')) {
    const isYearly = document.getElementById('billing-toggle')?.checked;
    const billingCycle = isYearly ? 'Anual' : 'Mensal';

    // Calculate total
    let total = 0;
    if (cartState.plan) {
      total += isYearly ? cartState.plan.yearly : cartState.plan.monthly;
    }
    cartState.resources.forEach(r => {
      total += r.price * (r.qty || 1);
    });

    let message = `Ola! Tenho interesse em contratar a *Loc10*.\n`;
    message += `Segue o resumo do meu pedido:\n`;
    message += `\n`;
    message += `------------------------------\n`;

    if (cartState.plan) {
      const planPrice = isYearly ? cartState.plan.yearly : cartState.plan.monthly;
      message += `\n`;
      message += `*Plano:* ${cartState.plan.name}\n`;
      message += `*Ciclo:* ${billingCycle}\n`;
      message += `*Valor:* R$ ${planPrice.toFixed(2)}/mes\n`;
    }

    if (cartState.resources.length > 0) {
      message += `\n`;
      message += `*Recursos adicionais:*\n`;
      cartState.resources.forEach(r => {
        const qty = r.qty || 1;
        const subtotal = r.price * qty;
        if (qty > 1) {
          message += `  - ${r.name} (${qty}x) - R$ ${subtotal.toFixed(2)}/mes\n`;
        } else {
          message += `  - ${r.name} - R$ ${r.price.toFixed(2)}/mes\n`;
        }
      });
    }

    message += `\n`;
    message += `------------------------------\n`;
    message += `*Total estimado:* R$ ${total.toFixed(2)}/mes\n`;
    message += `------------------------------\n`;
    message += `\n`;
    message += `Aguardo retorno para prosseguir!`;

    const phone = "5598999627641";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
});
