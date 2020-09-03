
const DOMstrings = {
    customer: '#customer',
    header: '.header',
    rightPanelList: '.rightPanel__list'
};

const clearRightPanel = () => {
    document.querySelector(DOMstrings.header).innerHTML='';
    document.querySelector(DOMstrings.rightPanelList).innerHTML='';
};

 const getCustomers = async () => {
    
    // get customers through api call
    try{
    const result = await fetch('https://rzp-training.herokuapp.com/team1/customers');
    const customerListEntity = await result.json();
    const customerList = customerListEntity.items;
    console.log(customerList);
    return customerList;
    } catch(error){
        console.log('error in fetching customers');
        console.log(error);
    }
    
    
    //return customers array
    //for test
    const cust = [];
    return cust;
};


const renderCustomerItem = customer => {
    const markup = `
        <li>
            <h3 class = "customerName"> ${customer.name} </h3>
            <div class = "customerInfo">
                <p class = "customerMail"> ${customer.email} </p>
                <h5 class = "customerNumber">Ph.: ${customer.contact} </h5>
            </div>
        </li>
    `;
    document.querySelector(DOMstrings.rightPanelList).insertAdjacentHTML('beforeend',markup);
};

const renderCustomerList = () => {
    let customers;

    getCustomers().then(data => {
        customers = data;
        customers.forEach(renderCustomerItem);
    });
};

const getEntities = async () => {
    try{
        const result = await fetch('https://rzp-training.herokuapp.com/team1/items');
        const EntityListComplete = await result.json();
        console.log(EntityListComplete);
        const EntityList = EntityListComplete.items;
        return EntityList;
        } catch(error){
            console.log('error in fetching items');
            console.log(error);
    }

    //for test
    const items = [];
    return items;
};

const renderEntityItem = item => {
    const markup = `
        <li>
            <div class = "itemInfo">
                <h5 class = "itemName"> ${item.name} </h5>
                <h5 class = "itemAmount"> ${item.amount/100} </h5>
            </div>
        </li>
    `;
    document.querySelector(DOMstrings.rightPanelList).insertAdjacentHTML('beforeend',markup);
};

const renderEntityList = () => {
    let items;

    getEntities().then(data => {
        items = data;
        const markup = `
        <div class = "itemInfoHeading">
            <h4 class = "itemNameHeading"> Item Name</h4>
            <h4 class = "itemAmountHeading"> Amount (in Rs.)</h4>
        </div>
        `;
        document.querySelector(DOMstrings.rightPanelList).insertAdjacentHTML('beforeend',markup);
        items.forEach(renderEntityItem);
    });
}

const getInvoices = async () => {
    try{
        const result = await fetch('https://rzp-training.herokuapp.com/team1/invoices');
        const invoiceListEntity = await result.json();
        console.log(invoiceListEntity);
        const invoiceList = invoiceListEntity.items;
        return invoiceList;
        } catch(error){
            console.log('error in fetching invoices');
            console.log(error);
    }

    //for test
    const invoices = [];
    return invoices;
};

const renderInvoiceItem = invoice => {
    const markup = `
        <li>
            <h3 class = "invoiceCustomerName"> Customer: ${invoice.customer_details.name} </h3>
            <div class = "invoiceHeading">
                <h4 class = "invoiceHeadingItemName"> Item Name </h4>
                <h4 class = "invoiceHeadingQuantity"> Item Quantity </h4>
                <h4 class = "invoiceHeadingAmount"> Amount (in Rs.) </h4>
            </div>
            <div class = "invoiceInfo">
            ${invoice.line_items.map(invoiceItem => {
                return `<h5 class = "invoiceItemName"> ${invoiceItem.name} </h5>
                <h5 class = "invoiceQuantity"> ${invoiceItem.quantity} </h5>
                <h5 class = "invoiceAmount"> ${invoiceItem.amount/100} </h5>
                </div>
                <div class = "invoiceInfo">
                `;
            }).join("")}
            </div>
        </li>
    `;
    document.querySelector(DOMstrings.rightPanelList).insertAdjacentHTML('beforeend',markup);
};

const renderInvoiceList = () => {
    let invoices;

    getInvoices().then(data => {
        invoices = data;
        invoices.forEach(renderInvoiceItem);
    });
}

const renderCustomers = () => {
    const markup = `
        <button class = "btn-customer">
            Add Customer
        </button>
        <button class = "customer-refresh">
            <ion-icon name = "refresh-outline"></ion-icon>
        </button>
    `;
    document.querySelector(DOMstrings.header).insertAdjacentHTML('afterbegin',markup);
    renderCustomerList();
    document.querySelector('.customer-refresh').addEventListener('click',() => {
        clearRightPanel();
        renderCustomers();
    });
};

const renderEntities = () => {
    const markup = `
        <button class = "btn-item">
            Add Item
        </button>
        <button class = "entity-refresh">
            <ion-icon name = "refresh-outline"></ion-icon>
        </button>
    `;
    document.querySelector(DOMstrings.header).insertAdjacentHTML('afterbegin',markup);
    renderEntityList();
    document.querySelector('.entity-refresh').addEventListener('click',() => {
        clearRightPanel();
        renderEntities();
    });
};

const renderInvoices = () => {
    const markup = `
        <button class = "btn-invoice">
            Create Invoice
        </button>
        <button class = "invoice-refresh">
            <ion-icon name = "refresh-outline"></ion-icon>
        </button>
    `;
    document.querySelector(DOMstrings.header).insertAdjacentHTML('afterbegin',markup);
    renderInvoiceList();
    document.querySelector('.invoice-refresh').addEventListener('click',() => {
        clearRightPanel();
        renderInvoices();
    });
};

document.querySelector('#customer').addEventListener('click', () => {
    clearRightPanel();
    renderCustomers();
});

document.querySelector('#item').addEventListener('click',() => {
    clearRightPanel();
    renderEntities();
});

document.querySelector('#invoices').addEventListener('click',() => {
    clearRightPanel();
    renderInvoices();
});


const init = () => {
    console.log("hello");
    renderCustomers();
};

init();