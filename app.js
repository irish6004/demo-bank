document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Drawer Implementation ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const backdrop = document.querySelector('.backdrop');

  if (menuToggle && mobileNavDrawer && mobileNavClose && backdrop) {
    const openMenu = () => {
      mobileNavDrawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileNavDrawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    mobileNavClose.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
  }

  // --- Search Overlay Toggle ---
  const searchBtn = document.querySelector('.search-btn');
  const searchModal = document.querySelector('.search-modal');
  const searchCloseBtn = document.querySelector('.search-close-btn');

  if (searchBtn && searchModal && searchCloseBtn) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      const input = searchModal.querySelector('input');
      if (input) input.focus();
    });

    searchCloseBtn.addEventListener('click', () => {
      searchModal.classList.remove('active');
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchModal.classList.remove('active');
      }
    });
  }

  // --- Interactive Find My Loan Simulator & Link Driver ---
  const lookupBtn = document.getElementById('lookup-submit');
  const lookupInput = document.getElementById('loan-number-input');
  const spinnerContainer = document.getElementById('lookup-loading');
  const resultContainer = document.getElementById('lookup-result');

  if (lookupBtn && lookupInput && spinnerContainer && resultContainer) {
    lookupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = lookupInput.value.trim();

      if (!val) {
        alert('Please enter a loan search query or Loan ID.');
        return;
      }

      // Hide previous results
      resultContainer.style.display = 'none';
      spinnerContainer.style.display = 'flex';

      // Simulate network request duration
      setTimeout(() => {
        spinnerContainer.style.display = 'none';

        // Fictional logic to construct status
        const randomStatuses = [
          { status: 'In Review', description: 'Your application is currently being reviewed by underwriting. We may contact you for verification documentation shortly.' },
          { status: 'Conditional Approval', description: 'Congratulations! Your loan has conditional approval. Please review outstanding checklist requirements in your email.' },
          { status: 'Processing', description: 'Our loan processor is validating your submitted documents. No action is required at this stage.' },
          { status: 'Closing Prep', description: 'We are preparing your final loan closing documentation. Your loan officer will reach out to schedule signatures.' }
        ];

        // Pick status based on input hashing or random
        const idx = Math.abs(val.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % randomStatuses.length;
        const selected = randomStatuses[idx];

        resultContainer.innerHTML = `
          <h4 style="color: var(--primary-dark-blue); margin-bottom: 8px;">Simulated Status: ${selected.status}</h4>
          <p style="font-size: 0.95rem; margin-bottom: 16px;">${selected.description}</p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="font-size: 0.8rem; color: #888; margin-bottom: 8px;">Loan Identifier queried: "${val}"</p>
            <a href="[INSERT_FIND_MY_LOAN_LINK_HERE]" class="btn btn-primary btn-sm" style="align-self: flex-start;">View Portal & Submit Docs</a>
          </div>
        `;
        resultContainer.style.display = 'block';
      }, 1200);
    });
  }

  // --- Digital Business Card Modal Controller ---
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal-close');
  
  if (modal && modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
      }
    });
  }

  // Global helper function to trigger Business Card modal
  window.openBusinessCard = (name, title, phone, email, nmls, cardUrl) => {
    if (!modal) return;

    // Inject data into card mockup
    const cardName = modal.querySelector('.card-lo-name');
    const cardTitle = modal.querySelector('.card-lo-title');
    const cardPhone = modal.querySelector('.card-phone-txt');
    const cardEmail = modal.querySelector('.card-email-txt');
    const cardNmls = modal.querySelector('.card-nmls-txt');
    const qrCaption = modal.querySelector('.qr-caption');
    const cardActionBtn = modal.querySelector('.card-action-btn');

    if (cardName) cardName.textContent = name;
    if (cardTitle) cardTitle.textContent = title;
    if (cardPhone) cardPhone.textContent = phone;
    if (cardEmail) cardEmail.textContent = email;
    if (cardNmls) cardNmls.textContent = `NMLS # ${nmls}`;
    if (qrCaption) qrCaption.textContent = `Scan QR Code to save ${name}`;
    if (cardActionBtn) {
      cardActionBtn.href = cardUrl || '#';
      cardActionBtn.textContent = `View Digital Card Profile`;
    }

    modal.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
  };

  // --- Real-time Loan Officer Directory Filters ---
  const loSearchInput = document.getElementById('lo-search-input');
  
  if (loSearchInput) {
    loSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const loCards = document.querySelectorAll('.lo-card');

      loCards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const title = card.getAttribute('data-title').toLowerCase();
        const nmls = card.getAttribute('data-nmls').toLowerCase();
        const location = card.getAttribute('data-location').toLowerCase();

        const match = name.includes(query) || 
                      title.includes(query) || 
                      nmls.includes(query) || 
                      location.includes(query);

        if (match) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});
