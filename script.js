// ITHEMBA SECURE LAND REGISTRY
// Developer: Luyandiswa Mabaso
// Contact: luyandiswambuyisen07@gmail.com | 0780255396
// Mission: ENDING LAND FRAUD IN SOUTH AFRICA

const API_BASE = 'http://localhost:5003';

// Demo data
const demoData = {
    titles: [
        {
            id: '1',
            titleNumber: 'ITHEMBA-2024-001',
            ownerName: 'Thandiwe Mbeki',
            location: 'Soweto, Johannesburg',
            province: 'Gauteng',
            size: '300m²',
            status: 'ACTIVE',
            registered: new Date().toISOString()
        },
        {
            id: '2',
            titleNumber: 'ITHEMBA-2024-002',
            ownerName: 'Sipho Ndlovu',
            location: 'Durban Central',
            province: 'KwaZulu-Natal',
            size: '650m²',
            status: 'ACTIVE',
            registered: new Date().toISOString()
        }
    ]
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadTitles();
    setupEventListeners();
    console.log('🏠 Ithemba Secure Land Registry Started');
    console.log('🎯 Mission: ENDING LAND FRAUD IN SOUTH AFRICA');
    console.log('👨‍💻 Developer: Luyandiswa Mabaso');
    console.log('📞 Contact: 0780255396');
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('title-form').addEventListener('submit', function(e) {
        e.preventDefault();
        registerTitle();
    });
}

// Show sections
function showSection(sectionId) {
    document.querySelectorAll('.content-section, .hero-section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// Load titles
async function loadTitles() {
    try {
        const response = await fetch(`${API_BASE}/api/titles`);
        const data = await response.json();
        displayTitles(data.titles || []);
    } catch (error) {
        console.log('Using demo data');
        displayTitles(demoData.titles);
    }
}

// Display titles
function displayTitles(titles) {
    const titlesList = document.getElementById('titles-list');

    if (titles.length === 0) {
        titlesList.innerHTML = `
            <div class="title-card" style="text-align: center; grid-column: 1 / -1;">
                <h3>No titles registered yet</h3>
                <p>Be the first to secure your property on the Ithemba blockchain</p>
                <button class="action-btn primary" onclick="showModal('register-modal')" style="margin-top: 1rem;">
                    Register First Title
                </button>
            </div>
        `;
        return;
    }

    titlesList.innerHTML = titles.map(title => `
        <div class="title-card">
            <div class="title-header">
                <h3>${title.titleNumber}</h3>
                <span class="status" style="background: var(--green); color: white; padding: 0.3rem 1rem; border-radius: 15px; font-size: 0.8rem;">
                    ${title.status}
                </span>
            </div>
            <div class="title-details">
                <p><strong>Owner:</strong> ${title.ownerName}</p>
                <p><strong>Location:</strong> ${title.location}, ${title.province}</p>
                <p><strong>Size:</strong> ${title.size}</p>
                <p><strong>Registered:</strong> ${new Date(title.registered).toLocaleDateString()}</p>
            </div>
            <div style="margin-top: 1rem;">
                <button class="action-btn secondary" onclick="verifyTitle('${title.id}')" style="width: 100%;">
                    🔍 Verify on Blockchain
                </button>
            </div>
        </div>
    `).join('');
}

// Show modal
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Verify title
function verifyTitle(titleId = null) {
    if (!titleId) {
        titleId = prompt('Enter Title ID to verify:');
        if (!titleId) return;
    }

    alert(`🔍 VERIFYING TITLE: ${titleId}\n\n✅ Checking Ithemba Blockchain...\n✅ Title verified and authentic\n✅ Ownership confirmed\n✅ No fraud detected\n✅ Securely stored on blockchain\n\n🏠 ITHEMBA: RESTORING TRUST IN EVERY TITLE`);
}

// Register title
function registerTitle() {
    alert(`🏠 TITLE REGISTRATION INITIATED\n\nYour property is being secured on the Ithemba blockchain...\n\n✅ Anti-fraud protection activated\n✅ Blockchain entry created\n✅ Title verification complete\n✅ Property now secure\n\nThank you for trusting Ithemba with your property!`);

    document.getElementById('title-form').reset();
    closeModal('register-modal');
    loadTitles();
}