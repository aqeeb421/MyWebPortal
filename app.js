/**
 * A² TECH SOLUTIONS — ULTRA-MODERN GLASSMORPHIC INTERACTIVE ENGINE
 * Fluid animations, 3D mouse tracking, live interactive simulators & WhatsApp bridge
 */

window.app = {
  activeSimulator: null,

  init() {
    this.initIcons();
    this.initSpotlight();
    this.initScrollHeader();
    this.initMobileMenu();
    this.initDemoModal();
    this.initLeadForm();
    this.initDemoBookingForm();
    this.initSmoothScroll();
  },

  // 1. Initialize Lucide Vector Icons
  initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  },

  // 2. Dynamic Mousemove Spotlight for Glass Cards
  initSpotlight() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  },

  // 3. Glass Header Scroll Effects & ScrollSpy
  initScrollHeader() {
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      if (navbar) {
        if (scrollY > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // ScrollSpy
      sections.forEach(sec => {
        const top = sec.offsetTop - 140;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  },

  // 4. Mobile Menu Drawer
  initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const drawer = document.getElementById('mobileDrawer');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        btn.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        drawer.classList.add('open');
        btn.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('open');
        btn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  },

  // 5. Smooth Scroll Offset
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: pos,
            behavior: 'smooth'
          });
        }
      });
    });
  },

  // 6. Demo Booking Modal (15-Minute Free Demo)
  initDemoModal() {
    const modal = document.getElementById('demoModal');
    const triggers = document.querySelectorAll('.open-demo-modal');
    const prefSelect = document.getElementById('demoSolution');

    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const pref = btn.getAttribute('data-pref');
        if (pref && prefSelect) {
          for (let i = 0; i < prefSelect.options.length; i++) {
            if (prefSelect.options[i].value.includes(pref) || pref.includes(prefSelect.options[i].value)) {
              prefSelect.selectedIndex = i;
              break;
            }
          }
        }
        this.openDemoModal();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDemoModal();
        this.closeSimulator();
      }
    });
  },

  openDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      this.initIcons();
    }
  },

  closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  // 7. Interactive Feature Simulator (Kirana, Textile, Hardware, Auto)
  openSimulator(type) {
    const modal = document.getElementById('simulatorModal');
    const title = document.getElementById('simTitle');
    const body = document.getElementById('simBody');
    const ctaBtn = document.getElementById('simCtaBtn');

    if (!modal || !title || !body) return;

    this.activeSimulator = type;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (type === 'kirana') {
      title.innerText = 'Kirana & Supermarket POS Billing Simulator';
      ctaBtn.setAttribute('data-pref', 'Kirana & Supermarkets');
      body.innerHTML = `
        <div class="sim-container">
          <div class="sim-screen-card">
            <div class="sim-header">
              <span class="sim-badge"><i data-lucide="scan"></i> HIGH-SPEED BARCODE COUNTER</span>
              <span style="font-size: 0.8rem; color: var(--neon-emerald);">● SCANNER ONLINE (<100ms)</span>
            </div>
            <p style="font-size: 0.85rem; margin-bottom: 12px; color: var(--text-secondary);">
              Simulate barcode scan by clicking any product below or entering an SKU:
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <button class="btn btn-sm btn-glass-secondary" onclick="app.addBarcodeItem('8901030', 'Parle-G Glucose 800g', 85)">+ Scan Parle-G (₹85)</button>
              <button class="btn btn-sm btn-glass-secondary" onclick="app.addBarcodeItem('8901058', 'Aashirvaad Atta 5kg', 245)">+ Scan Atta 5kg (₹245)</button>
              <button class="btn btn-sm btn-glass-secondary" onclick="app.addBarcodeItem('8901725', 'Tata Tea Gold 500g', 310)">+ Scan Tata Tea (₹310)</button>
            </div>

            <!-- Receipt Canvas -->
            <div class="sim-bill-receipt">
              <div class="receipt-head">
                <strong style="font-size: 1rem; color: #0f172a;">A² SMART KIRANA MART</strong><br>
                <span>Counter #01 • Cashier: Anand • Offline Sync Active</span>
              </div>
              <table class="receipt-items-table" id="receiptTable">
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>QTY</th>
                    <th>RATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody id="receiptRows">
                  <tr>
                    <td>Parle-G Glucose 800g</td>
                    <td>1</td>
                    <td>₹85.00</td>
                    <td>₹85.00</td>
                  </tr>
                </tbody>
              </table>
              <div class="receipt-total-row">
                <span>NET PAYABLE (GST INCL):</span>
                <span id="receiptTotalVal">₹85.00</span>
              </div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 16px;">
              <button class="btn btn-sm btn-glow-primary" onclick="alert('⚡ Thermal Receipt Dispatched to USB/Bluetooth 58mm Printer in 0.2s!')">
                <i data-lucide="printer"></i> Print Thermal Receipt
              </button>
              <button class="btn btn-sm btn-whatsapp-glass" onclick="alert('📲 WhatsApp Digital Bill link sent to customer phone: +91 98765 43210!')">
                <i data-lucide="send"></i> Send WhatsApp Bill
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'textile') {
      title.innerText = 'Textile B2B Bulk Order Matrix Simulator';
      ctaBtn.setAttribute('data-pref', 'Textile & Apparel Wholesalers');
      body.innerHTML = `
        <div class="sim-container">
          <div class="sim-screen-card">
            <div class="sim-header">
              <span class="sim-badge"><i data-lucide="grid"></i> SIZE × COLOR MATRIX</span>
              <span style="font-size: 0.8rem; color: var(--neon-purple);">STYLE #TX-8042 • PREMIUM COTTON SHIRTS</span>
            </div>
            <p style="font-size: 0.85rem; margin-bottom: 12px; color: var(--text-secondary);">
              Retailers enter quantities per size/color in 1 click without texting loose photos:
            </p>
            <table class="sim-matrix-table">
              <thead>
                <tr>
                  <th>Color / Shade</th>
                  <th>S</th>
                  <th>M</th>
                  <th>L</th>
                  <th>XL</th>
                  <th>XXL</th>
                  <th>Row Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="color: #60a5fa; font-weight: 600;">Royal Navy</td>
                  <td><input type="number" class="matrix-qty-input" value="6" onchange="app.recalcMatrix()"></td>
                  <td><input type="number" class="matrix-qty-input" value="12" onchange="app.recalcMatrix()"></td>
                  <td><input type="number" class="matrix-qty-input" value="18" onchange="app.recalcMatrix()"></td>
                  <td><input type="number" class="matrix-qty-input" value="12" onchange="app.recalcMatrix()"></td>
                  <td><input type="number" class="matrix-qty-input" value="6" onchange="app.recalcMatrix()"></td>
                  <td style="font-weight: 700; color: var(--neon-cyan);">54 pcs</td>
                </tr>
                <tr>
                  <td style="color: #e2e8f0; font-weight: 600;">Crisp White</td>
                  <td><input type="number" class="matrix-qty-input" value="12" onchange="app.recalcMatrix()"></td>
                  <td><input type="number" class="matrix-qty-input" value="24" onchange="app.recalcMatrix()"></td>
                  <td><input type="number" class="matrix-qty-input" value="24" onchange="app.recalcMatrix()"></td>
                  <td><input type="number" class="matrix-qty-input" value="12" onchange="app.recalcMatrix()"></td>
                  <td><input type="number" class="matrix-qty-input" value="6" onchange="app.recalcMatrix()"></td>
                  <td style="font-weight: 700; color: var(--neon-cyan);">78 pcs</td>
                </tr>
              </tbody>
            </table>

            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.9); padding: 16px; border-radius: var(--radius-sm); margin-top: 16px; border: 1px solid var(--border-glass-bright);">
              <div>
                <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">ORDER VOLUME & PRICING</span>
                <strong style="font-size: 1.1rem; color: var(--text-white);" id="matrixTotalSummary">132 Pieces • ₹450 / pc Wholesale</strong>
              </div>
              <strong style="font-size: 1.4rem; color: var(--neon-emerald);" id="matrixGrossSummary">₹59,400 Total</strong>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'hardware') {
      title.innerText = 'Hardware 15,000+ SKU Search & Margin Tier Simulator';
      ctaBtn.setAttribute('data-pref', 'Hardware & Sanitary Ware');
      body.innerHTML = `
        <div class="sim-container">
          <div class="sim-screen-card">
            <div class="sim-header">
              <span class="sim-badge"><i data-lucide="database"></i> OFFLINE SQLITE INSTANT SEARCH</span>
              <span style="font-size: 0.8rem; color: var(--neon-cyan);">SEARCH SPEED: 38ms</span>
            </div>
            
            <div class="sim-barcode-input-row">
              <input type="text" id="hardwareSearchInput" class="glass-input" placeholder="Try typing: 'CPVC', 'Elbow', 'Valve', 'Brass'..." value="CPVC" oninput="app.filterHardwareSkus(this.value)" style="padding-left: 16px;">
            </div>

            <div style="display: flex; gap: 8px; margin-bottom: 16px;">
              <span style="font-size: 0.8rem; color: var(--text-muted); align-self: center;">Select Trade Tier:</span>
              <button class="btn btn-sm btn-glass-secondary tier-btn active" id="tierRetail" onclick="app.setHardwareTier('retail', 0)">Retail (MRP)</button>
              <button class="btn btn-sm btn-glass-secondary tier-btn" id="tierPlumber" onclick="app.setHardwareTier('plumber', 18)">Plumber (-18%)</button>
              <button class="btn btn-sm btn-glass-secondary tier-btn" id="tierBuilder" onclick="app.setHardwareTier('builder', 26)">Builder Bulk (-26%)</button>
            </div>

            <div id="hardwareResultsList" style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Populated via script -->
            </div>
          </div>
        </div>
      `;
      setTimeout(() => {
        this.filterHardwareSkus('CPVC');
      }, 50);
    } else if (type === 'auto') {
      title.innerText = 'Used Vehicle EMI & Inspection Portal Simulator';
      ctaBtn.setAttribute('data-pref', 'Refurbished Auto & Two-Wheeler Dealers');
      body.innerHTML = `
        <div class="sim-container">
          <div class="sim-screen-card">
            <div class="sim-header">
              <span class="sim-badge"><i data-lucide="calculator"></i> DYNAMIC EMI & TEST DRIVE CALCULATOR</span>
              <span style="font-size: 0.8rem; color: var(--neon-emerald);">VEHICLE: 2023 ROYAL ENFIELD CLASSIC 350</span>
            </div>

            <div style="background: rgba(15, 23, 42, 0.7); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary); font-size: 0.85rem;">Vehicle Selling Price:</span>
                <strong style="color: var(--text-white);">₹1,45,000</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                <span style="color: var(--text-secondary); font-size: 0.85rem;">40-Point Condition Score:</span>
                <span style="color: var(--neon-emerald); font-weight: 700;">9.2 / 10 (Accident-Free Certified)</span>
              </div>
            </div>

            <div class="sim-slider-row">
              <div class="sim-slider-label">
                <span>Down Payment:</span>
                <strong id="downPaymentDisplay" style="color: var(--neon-cyan);">₹35,000 (24%)</strong>
              </div>
              <input type="range" class="sim-range-input" id="downPaymentRange" min="20000" max="100000" step="5000" value="35000" oninput="app.recalcEmi()">
            </div>

            <div class="sim-slider-row">
              <div class="sim-slider-label">
                <span>Loan Tenure:</span>
                <strong id="tenureDisplay" style="color: var(--neon-cyan);">36 Months (3 Years)</strong>
              </div>
              <input type="range" class="sim-range-input" id="tenureRange" min="12" max="48" step="6" value="36" oninput="app.recalcEmi()">
            </div>

            <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(37, 99, 235, 0.15)); border: 1px solid var(--border-glass-cyan); padding: 16px; border-radius: var(--radius-sm); text-align: center; margin-top: 16px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">Estimated Monthly EMI</span>
              <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--text-white); margin: 4px 0;" id="emiMonthlyVal">₹3,736 / month</div>
              <span style="font-size: 0.75rem; color: var(--neon-cyan);">@ 12.5% Bank Financing Rate</span>
            </div>

            <button class="btn btn-whatsapp-glass btn-block" style="margin-top: 16px;" onclick="window.open('https://wa.me/918073804900?text=Hi%20A2%20Tech%20Solutions!%20I%20tested%20your%20used%20auto%20showroom%20and%20EMI%20simulator%20and%20want%20to%20deploy%20it.')">
              <i data-lucide="message-circle"></i> Reserve Test Drive via WhatsApp
            </button>
          </div>
        </div>
      `;
    }

    this.initIcons();
  },

  closeSimulator() {
    const modal = document.getElementById('simulatorModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  // Kirana Simulator helpers
  currentKiranaItems: [
    { sku: '8901030', name: 'Parle-G Glucose 800g', price: 85, qty: 1 }
  ],

  addBarcodeItem(sku, name, price) {
    const existing = this.currentKiranaItems.find(i => i.sku === sku);
    if (existing) {
      existing.qty += 1;
    } else {
      this.currentKiranaItems.push({ sku, name, price, qty: 1 });
    }
    this.renderKiranaReceipt();
  },

  renderKiranaReceipt() {
    const tbody = document.getElementById('receiptRows');
    const totalEl = document.getElementById('receiptTotalVal');
    if (!tbody || !totalEl) return;

    let html = '';
    let grandTotal = 0;

    this.currentKiranaItems.forEach(item => {
      const lineTotal = item.price * item.qty;
      grandTotal += lineTotal;
      html += `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>₹${item.price.toFixed(2)}</td>
          <td>₹${lineTotal.toFixed(2)}</td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
    totalEl.innerText = `₹${grandTotal.toFixed(2)}`;
  },

  // Textile Simulator recalc
  recalcMatrix() {
    const inputs = document.querySelectorAll('.matrix-qty-input');
    let totalPcs = 0;
    inputs.forEach(inp => {
      totalPcs += parseInt(inp.value, 10) || 0;
    });
    const pricePerPc = 450;
    const gross = totalPcs * pricePerPc;

    const summary = document.getElementById('matrixTotalSummary');
    const grossEl = document.getElementById('matrixGrossSummary');
    if (summary) summary.innerText = `${totalPcs} Pieces • ₹${pricePerPc} / pc Wholesale`;
    if (grossEl) grossEl.innerText = `₹${gross.toLocaleString('en-IN')} Total`;
  },

  // Hardware Simulator helpers
  hardwareDiscount: 0,
  hardwareDb: [
    { sku: 'HW-01', name: 'CPVC High-Pressure Pipe 1-inch (3m)', mrp: 420 },
    { sku: 'HW-02', name: 'CPVC 90-Degree Brass Elbow 1-inch', mrp: 95 },
    { sku: 'HW-03', name: 'CPVC Ball Valve Solvent Weld 1-inch', mrp: 210 },
    { sku: 'HW-04', name: 'UPVC Brass Threaded Tee 0.75-inch', mrp: 130 },
    { sku: 'HW-05', name: 'Brass Angle Cock Ceramic Disc', mrp: 380 },
    { sku: 'HW-06', name: 'Stainless Steel Waste Coupling 4-inch', mrp: 165 }
  ],

  setHardwareTier(tier, discount) {
    this.hardwareDiscount = discount;
    document.querySelectorAll('.tier-btn').forEach(btn => btn.classList.remove('active'));
    if (tier === 'retail') document.getElementById('tierRetail')?.classList.add('active');
    if (tier === 'plumber') document.getElementById('tierPlumber')?.classList.add('active');
    if (tier === 'builder') document.getElementById('tierBuilder')?.classList.add('active');
    
    const input = document.getElementById('hardwareSearchInput');
    this.filterHardwareSkus(input ? input.value : '');
  },

  filterHardwareSkus(query) {
    const container = document.getElementById('hardwareResultsList');
    if (!container) return;

    const q = (query || '').toLowerCase().trim();
    const filtered = this.hardwareDb.filter(item => 
      item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      container.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No SKUs matching "${query}". Try searching 'CPVC' or 'Brass'.</div>`;
      return;
    }

    let html = '';
    filtered.forEach(item => {
      const discounted = item.mrp * (1 - this.hardwareDiscount / 100);
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.7); padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-glass);">
          <div>
            <strong style="color: var(--text-white); font-size: 0.9rem;">${item.name}</strong>
            <span style="display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">${item.sku} • In Stock: 340 Units</span>
          </div>
          <div style="text-align: right;">
            <span style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--neon-cyan);">₹${Math.round(discounted)}</span>
            ${this.hardwareDiscount > 0 ? `<span style="display: block; font-size: 0.72rem; color: var(--text-muted); text-decoration: line-through;">MRP ₹${item.mrp}</span>` : ''}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  // Auto EMI Simulator
  recalcEmi() {
    const downInput = document.getElementById('downPaymentRange');
    const tenureInput = document.getElementById('tenureRange');
    const downDisplay = document.getElementById('downPaymentDisplay');
    const tenureDisplay = document.getElementById('tenureDisplay');
    const emiVal = document.getElementById('emiMonthlyVal');

    if (!downInput || !tenureInput || !downDisplay || !tenureDisplay || !emiVal) return;

    const totalCost = 145000;
    const down = parseInt(downInput.value, 10);
    const months = parseInt(tenureInput.value, 10);

    downDisplay.innerText = `₹${down.toLocaleString('en-IN')} (${Math.round((down / totalCost) * 100)}%)`;
    tenureDisplay.innerText = `${months} Months (${(months / 12).toFixed(1)} Years)`;

    const principal = totalCost - down;
    const annualRate = 0.125;
    const monthlyRate = annualRate / 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    emiVal.innerText = `₹${Math.round(emi).toLocaleString('en-IN')} / month`;
  },

  // 8. Lead Capture Inquiry Form with Auto WhatsApp Dispatch
  initLeadForm() {
    const form = document.getElementById('leadInquiryForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;
      const name = document.getElementById('clientName')?.value.trim();
      const type = document.getElementById('businessType')?.value;
      const city = document.getElementById('clientCity')?.value.trim();
      const phone = document.getElementById('clientPhone')?.value.trim();
      const notes = document.getElementById('clientNotes')?.value.trim() || 'Custom requirements to be discussed';

      // Validation
      const setGroupError = (id, isErr) => {
        const el = document.getElementById(id);
        const group = el ? el.closest('.form-group') : null;
        if (group) {
          if (isErr) group.classList.add('has-error');
          else group.classList.remove('has-error');
        }
      };

      if (!name) { setGroupError('clientName', true); hasError = true; } else { setGroupError('clientName', false); }
      if (!type) { setGroupError('businessType', true); hasError = true; } else { setGroupError('businessType', false); }
      if (!city) { setGroupError('clientCity', true); hasError = true; } else { setGroupError('clientCity', false); }
      
      const phoneClean = phone.replace(/[^0-9]/g, '');
      if (phoneClean.length < 10) { setGroupError('clientPhone', true); hasError = true; } else { setGroupError('clientPhone', false); }

      if (hasError) return;

      // Construct prefilled WhatsApp dispatch message
      const text = encodeURIComponent(
        `*NEW CLIENT INQUIRY // A² TECH SOLUTIONS*\n\n` +
        `👤 *Name:* ${name}\n` +
        `🏢 *Business Type:* ${type}\n` +
        `📍 *City / Town:* ${city}\n` +
        `📱 *Contact Phone:* ${phone}\n` +
        `📝 *Requirements:* ${notes}\n\n` +
        `_Dispatched via A² Tech Solutions Web Portal (Q4 2026)_`
      );

      const targetWaUrl = `https://wa.me/918073804900?text=${text}`;

      // Show success glass card
      form.style.display = 'none';
      const successState = document.getElementById('formSuccessState');
      const directWa = document.getElementById('directWhatsAppLink');
      if (successState) successState.classList.add('active');
      if (directWa) directWa.setAttribute('href', targetWaUrl);

      // Open WhatsApp tab automatically
      window.open(targetWaUrl, '_blank');
    });
  },

  resetInquiryForm() {
    const form = document.getElementById('leadInquiryForm');
    const successState = document.getElementById('formSuccessState');
    if (form) {
      form.reset();
      form.style.display = 'flex';
    }
    if (successState) {
      successState.classList.remove('active');
    }
  },

  // 9. Demo Booking Form in Modal
  initDemoBookingForm() {
    const form = document.getElementById('demoBookingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('demoName')?.value.trim();
      const phone = document.getElementById('demoPhone')?.value.trim();
      const date = document.getElementById('demoDate')?.value || 'Earliest Available';
      const sol = document.getElementById('demoSolution')?.value;

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      const text = encodeURIComponent(
        `*15-MINUTE FREE DEMO RESERVATION // A² TECH SOLUTIONS*\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `📱 *WhatsApp Number:* ${phone}\n` +
        `📅 *Preferred Slot Date:* ${date}\n` +
        `⚡ *Solution Choice:* ${sol}\n\n` +
        `_Requested via A² Tech Solutions Portal_`
      );

      const waUrl = `https://wa.me/918073804900?text=${text}`;
      this.closeDemoModal();
      window.open(waUrl, '_blank');
    });
  }
};

// Bootstrap engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
