
const DOMstrings = {
    customer: '#customer',
    header: '.header',
    rightPanelList: '.rightPanel__list'
};

const clearRightPanel = () => {
    document.querySelector(DOMstrings.header).innerHTML='';
    document.querySelector(DOMstrings.rightPanelList).innerHTML='';
};

const clearModal = () => {
    document.querySelector('.modal-content').innerHTML = '';
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

const toggleModal = () => {
        document.querySelector('.modal').classList.toggle('show-modal');
}

const submitCustomer = async (event) => {
    // console.log(event.target.parentNode);
    let newCustomer = {
        name: "",
        email: "",
        contact: ""
    };
    newCustomer.name = document.getElementById('NewCustomerName').value;
    newCustomer.email = document.getElementById('NewCustomerEmail').value;
    newCustomer.contact = document.getElementById('NewCustomerPhone').value;

    try{
        const result = await fetch('https://rzp-training.herokuapp.com/team1/customers',{
            method: "POST",
            body: JSON.stringify(newCustomer),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            console.log(res.status);
            if(res.status === 200){
                alert('Customer Added Successfully');
            }else{
                alert('Unable to add Customer');
            }
            toggleModal();
            clearRightPanel();
            renderCustomers();
        });
    }catch (error){
        console.log(error);
        alert('Unable to add Customer');
        toggleModal();
    };
};

const addCustomer = () => {
    clearModal();
    const markup = `
    <span class = "close-button"> &times; </span>
    <div class = "customer-modal-data">
        <h2 class = "customer-modal-heading"> New Customer</h2>
            <table class = "addCustomerTable">
            <tr>
            <td> <label for= "NewCustomerName"> Name </label> <br>
            <input type = "text" id = "NewCustomerName" name = "NewCustomerName" />
            </td>
            <td>
            <label for = "NewCustomerPhone"> Phone </label> <br>
            <input type = "text" id = "NewCustomerPhone" name = "NewCustomerPhone" /> 
            </td>
            </tr>
            <tr>
            <td> <label for= "NewCustomerEmail"> Email </label> <br>
            <input type = "text" id = "NewCustomerEmail" name = "NewCustomerEmail" />
            </td>
            <td>
            <button class = "customerSubmit"> Save Customer </button>
            </td>
            </tr>
            </table>
    </div>
    `;
    document.querySelector('.modal-content').insertAdjacentHTML('afterbegin',markup);
    toggleModal();
    document.querySelector('.close-button').addEventListener('click',toggleModal);
    document.querySelector('.customerSubmit').addEventListener('click',submitCustomer);
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
    document.querySelector('.btn-customer').addEventListener('click',addCustomer);
};

const submitItem = async (event) => {
    let newItem = {
        name: "",
        description: "",
        amount: "",
        currency: "INR"
    };
    newItem.name = document.getElementById('NewItemName').value;
    newItem.amount = document.getElementById('NewItemPrice').value*100;
    newItem.description = document.getElementById('NewItemDesc').value;

    try{
        const result = await fetch('https://rzp-training.herokuapp.com/team1/items',{
            method: "POST",
            body: JSON.stringify(newItem),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            console.log(res.status);
            if(res.status === 200){
                alert('Item Added Successfully');
            }else{
                alert('Unable to add Item');
            }
            toggleModal();
            clearRightPanel();
            renderEntities();
        });
    }catch (error){
        console.log(error);
        alert('Unable to add Item');
        toggleModal();
    };
};

const addItem = () => {
    clearModal();
    const markup = `
    <span class = "close-button"> &times; </span>
    <div class = "item-modal-data">
        <h2 class = "item-modal-heading"> New Item</h2>
        <label for = "NewItemName"> Name </label> <br/>
        <input type = "text" id = "NewItemName" name = "NewItemName" /> <br/>
        <label for = "NewItemPrice"> Price (in Rs.)</label> <br/>
        <input type = "text" id = "NewItemPrice" name = "NewItemPrice" /> <br/>
        <label for = "NewItemDesc"> Description </label> <br/>
        <textarea type = "text" id = "NewItemDesc" name = "NewItemDesc" /> </textarea> <br/>
        <button class = "itemSubmit"> Save Item </button>
    </div>
    `;
    document.querySelector('.modal-content').insertAdjacentHTML('afterbegin',markup);
    toggleModal();
    document.querySelector('.close-button').addEventListener('click',toggleModal);
    document.querySelector('.itemSubmit').addEventListener('click',submitItem);
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
    document.querySelector('.btn-item').addEventListener('click',addItem);
};

const addInvoice = () => {
    clearModal();
    const markup = `
    <span class = "close-button"> &times; </span>
    <div class = "invoice-modal-data">
        <h3> hello in invoice modal</h3>
    </div>
    `;
    document.querySelector('.modal-content').insertAdjacentHTML('afterbegin',markup);
    toggleModal();
    document.querySelector('.close-button').addEventListener('click',toggleModal);
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
    document.querySelector('.btn-invoice').addEventListener('click',addInvoice);
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


// window.onclick = function(event){
//     console.log('here');
//     console.log(event);
//     console.log(document.getElementsByClassName('.modal'));
//     if(event.target == document.getElementsByClassName('.modal')){
//         console.log(here);
//         toggleModal();
//     }
// }