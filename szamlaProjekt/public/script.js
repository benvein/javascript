const apiBase = '';

const billForm = document.getElementById('bill-form');
const billsTableBody = document.querySelector('#bills-table tbody');
const cancelBtn = document.getElementById('cancel-btn');

const sellerForm = document.getElementById('seller-form');
const sellersTableBody = document.querySelector('#sellers-table tbody');
const sellerCancelBtn = document.getElementById('seller-cancel-btn');

const buyerForm = document.getElementById('buyer-form');
const buyersTableBody = document.querySelector('#buyers-table tbody');
const buyerCancelBtn = document.getElementById('buyer-cancel-btn');

let editingBillId = null;
let editingSellerId = null;
let editingBuyerId = null;

async function fetchSellers() {
    const res = await fetch(apiBase + '/sellers');
    if (!res.ok) {
        alert('Failed to fetch sellers');
        return;
    }
    const sellers = await res.json();
    renderSellers(sellers);
    populateSellerDropdown(sellers);
}

function renderSellers(sellers) {
    sellersTableBody.innerHTML = '';
    sellers.forEach(seller => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${seller.id}</td>
            <td>${seller.name}</td>
            <td>${seller.taxNumber}</td>
            <td>
                <button data-id="${seller.id}" class="edit-seller-btn">Edit</button>
                <button data-id="${seller.id}" class="delete-seller-btn">Delete</button>
            </td>
        `;
        sellersTableBody.appendChild(tr);
    });
    attachSellerEventListeners();
}

function populateSellerDropdown(sellers) {
    const sellerSelect = document.getElementById('sellerId');
    sellerSelect.innerHTML = '<option value="">Select Seller</option>';
    sellers.forEach(seller => {
        const option = document.createElement('option');
        option.value = seller.id;
        option.textContent = seller.name;
        sellerSelect.appendChild(option);
    });
}

function attachSellerEventListeners() {
    document.querySelectorAll('.edit-seller-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            startEditSeller(id);
        });
    });
    document.querySelectorAll('.delete-seller-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            deleteSeller(id);
        });
    });
}

async function startEditSeller(id) {
    const res = await fetch(apiBase + `/sellers/${id}`);
    if (!res.ok) {
        alert('Failed to fetch seller details');
        return;
    }
    const seller = await res.json();
    editingSellerId = seller.id;
    document.getElementById('seller-id').value = seller.id;
    document.getElementById('seller-name').value = seller.name;
    document.getElementById('seller-taxNumber').value = seller.taxNumber;
    sellerCancelBtn.style.display = 'inline';
}

async function deleteSeller(id) {
    if (!confirm('Are you sure you want to delete this seller?')) return;
    const res = await fetch(apiBase + `/sellers/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        alert('Failed to delete seller');
        return;
    }
    fetchSellers();
    fetchBills();
}

sellerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const sellerData = {
        name: document.getElementById('seller-name').value,
        taxNumber: document.getElementById('seller-taxNumber').value
    };
    let res;
    if (editingSellerId) {
        res = await fetch(apiBase + `/sellers/${editingSellerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sellerData)
        });
    } else {
        res = await fetch(apiBase + '/sellers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sellerData)
        });
    }
    if (!res.ok) {
        alert('Failed to save seller');
        return;
    }
    editingSellerId = null;
    sellerForm.reset();
    sellerCancelBtn.style.display = 'none';
    fetchSellers();
});

sellerCancelBtn.addEventListener('click', () => {
    editingSellerId = null;
    sellerForm.reset();
    sellerCancelBtn.style.display = 'none';
});

async function fetchBuyers() {
    const res = await fetch(apiBase + '/buyers');
    if (!res.ok) {
        alert('Failed to fetch buyers');
        return;
    }
    const buyers = await res.json();
    renderBuyers(buyers);
    populateBuyerDropdown(buyers);
}

function renderBuyers(buyers) {
    buyersTableBody.innerHTML = '';
    buyers.forEach(buyer => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${buyer.id}</td>
            <td>${buyer.name}</td>
            <td>${buyer.taxNumber}</td>
            <td>
                <button data-id="${buyer.id}" class="edit-buyer-btn">Edit</button>
                <button data-id="${buyer.id}" class="delete-buyer-btn">Delete</button>
            </td>
        `;
        buyersTableBody.appendChild(tr);
    });
    attachBuyerEventListeners();
}

function populateBuyerDropdown(buyers) {
    const buyerSelect = document.getElementById('buyerId');
    buyerSelect.innerHTML = '<option value="">Select Buyer</option>';
    buyers.forEach(buyer => {
        const option = document.createElement('option');
        option.value = buyer.id;
        option.textContent = buyer.name;
        buyerSelect.appendChild(option);
    });
}

function attachBuyerEventListeners() {
    document.querySelectorAll('.edit-buyer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            startEditBuyer(id);
        });
    });
    document.querySelectorAll('.delete-buyer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            deleteBuyer(id);
        });
    });
}

async function startEditBuyer(id) {
    const res = await fetch(apiBase + `/buyers/${id}`);
    if (!res.ok) {
        alert('Failed to fetch buyer details');
        return;
    }
    const buyer = await res.json();
    editingBuyerId = buyer.id;
    document.getElementById('buyer-id').value = buyer.id;
    document.getElementById('buyer-name').value = buyer.name;
    document.getElementById('buyer-taxNumber').value = buyer.taxNumber;
    buyerCancelBtn.style.display = 'inline';
}

async function deleteBuyer(id) {
    if (!confirm('Are you sure you want to delete this buyer?')) return;
    const res = await fetch(apiBase + `/buyers/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        alert('Failed to delete buyer');
        return;
    }
    fetchBuyers();
    fetchBills();
}

buyerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const buyerData = {
        name: document.getElementById('buyer-name').value,
        taxNumber: document.getElementById('buyer-taxNumber').value
    };
    let res;
    if (editingBuyerId) {
        res = await fetch(apiBase + `/buyers/${editingBuyerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buyerData)
        });
    } else {
        res = await fetch(apiBase + '/buyers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buyerData)
        });
    }
    if (!res.ok) {
        alert('Failed to save buyer');
        return;
    }
    editingBuyerId = null;
    buyerForm.reset();
    buyerCancelBtn.style.display = 'none';
    fetchBuyers();
});

buyerCancelBtn.addEventListener('click', () => {
    editingBuyerId = null;
    buyerForm.reset();
    buyerCancelBtn.style.display = 'none';
});

async function fetchBills() {
    const res = await fetch(apiBase + '/bills');
    if (!res.ok) {
        alert('Failed to fetch bills');
        return;
    }
    const bills = await res.json();
    renderBills(bills);
}

function renderBills(bills) {
    billsTableBody.innerHTML = '';
    bills.forEach(bill => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${bill.id}</td>
            <td>${bill.sellerName || bill.sellerId}</td>
            <td>${bill.buyerName || bill.buyerId}</td>
            <td>${bill.billNumber}</td>
            <td>${bill.date}</td>
            <td>${bill.dateOfCompletion}</td>
            <td>${bill.dueDate}</td>
            <td>${bill.totalAmount}</td>
            <td>${bill.tax}</td>
            <td>
                <button data-id="${bill.id}" class="edit-btn">Edit</button>
                <button data-id="${bill.id}" class="delete-btn">Delete</button>
            </td>
        `;
        billsTableBody.appendChild(tr);
    });
    attachBillEventListeners();
}

function attachBillEventListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            startEditBill(id);
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            deleteBill(id);
        });
    });
}

async function startEditBill(id) {
    const res = await fetch(apiBase + `/bills/${id}`);
    if (!res.ok) {
        alert('Failed to fetch bill details');
        return;
    }
    const bill = await res.json();
    editingBillId = bill.id;
    document.getElementById('bill-id').value = bill.id;
    document.getElementById('sellerId').value = bill.sellerId;
    document.getElementById('buyerId').value = bill.buyerId;
    document.getElementById('billNumber').value = bill.billNumber;
    document.getElementById('date').value = bill.date;
    document.getElementById('dateOfCompletion').value = bill.dateOfCompletion;
    document.getElementById('dueDate').value = bill.dueDate;
    document.getElementById('totalAmount').value = bill.totalAmount;
    document.getElementById('tax').value = bill.tax;
    cancelBtn.style.display = 'inline';
}

async function deleteBill(id) {
    if (!confirm('Are you sure you want to delete this bill?')) return;
    const res = await fetch(apiBase + `/bills/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        alert('Failed to delete bill');
        return;
    }
    fetchBills();
}

billForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const billData = {
        sellerId: parseInt(document.getElementById('sellerId').value),
        buyerId: parseInt(document.getElementById('buyerId').value),
        billNumber: document.getElementById('billNumber').value,
        date: document.getElementById('date').value,
        dateOfCompletion: document.getElementById('dateOfCompletion').value,
        dueDate: document.getElementById('dueDate').value,
        totalAmount: parseFloat(document.getElementById('totalAmount').value),
        tax: parseFloat(document.getElementById('tax').value)
    };
    let res;
    if (editingBillId) {
        res = await fetch(apiBase + `/bills/${editingBillId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(billData)
        });
    } else {
        res = await fetch(apiBase + '/bills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(billData)
        });
    }
    if (!res.ok) {
        alert('Failed to save bill');
        return;
    }
    editingBillId = null;
    billForm.reset();
    cancelBtn.style.display = 'none';
    fetchBills();
});

cancelBtn.addEventListener('click', () => {
    editingBillId = null;
    billForm.reset();
    cancelBtn.style.display = 'none';
});

fetchSellers();
fetchBuyers();
fetchBills();
