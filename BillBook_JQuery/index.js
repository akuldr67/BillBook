$(document).ready(function (){

const convertDate =(time) => {
    const date = new Date(time*1000);
    const newDate = `${date.getDate()} ${date.toLocaleString('default',{month: 'short'})} ${date.getFullYear()}`;
    return newDate;
}

$.fn.clearRightPanel = function(){
    $('.header').html("");
    $('.rightPanel__list').html("");
}

$.fn.clearModal = function(){
    $('.modal-content').html("");
}

const toggleModal = () => {
    $('.modal').toggleClass('show-modal');
}

const renderCustomerItem = (customer) => {
    $('.rightPanel__list').append(`
    <li>
            <div class = "customerInfoOne">
            <h3 class = "customerName"> ${customer.name} </h3>
            <h5 class = "customerNumber">Ph.: ${customer.contact} </h5>
            </div>
            <div class = "customerInfo">
                <p class = "customerMail"> ${customer.email} </p>
                <p class = "customerCreatedAt">Created: ${convertDate(customer.created_at)}</p>
            </div>
        </li>
    `);
}

const getCustomers = async () => {
    $.ajax({
        type: "GET",
        url: "https://rzp-training.herokuapp.com/team1/customers",
        success: function(result){
            console.log(result.items);
            const customerList = result.items;
            customerList.forEach(renderCustomerItem);
            return customerList;
        },
        error: function(){
            alert('Error in fetching Customers');
        }
    });
}

const getInvoices = async () => {
    $.ajax({
        type: "GET",
        url: "https://rzp-training.herokuapp.com/team1/invoices",
        success: function(result){
            console.log(result.items);
            const invoiceList = result.items;
            invoiceList.forEach(renderInvoiceItem);
            return invoiceList;
        },
        error: function(){
            alert('Error in fetching Invoices');
        }
    });
}

const renderInvoiceItem = (invoice) => {
    $('.rightPanel__list').append(`
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
    `);
}

const renderEntityItem = (item) => {
    $('.rightPanel__list').append(`
        <li>
            <div class = "itemInfo">
                <h5 class = "itemName"> ${item.name} </h5>
                <h5 class = "itemAmount"> ${item.amount/100} </h5>
                <h5 class = "itemCreatedAt"> ${convertDate(item.created_at)}</h5>
            </div>
            <div class = "itemInfoTwo">
                <p class = "itemDesc">${item.description}</p>
            </div>
        </li>
    `);
}


const getEntities = async () => {
    $.ajax({
        type: "GET",
        url: "https://rzp-training.herokuapp.com/team1/items",
        success: function(result){
            $('.rightPanel__list').append(`
                <div class = "itemInfoHeading">
                    <h4 class = "itemNameHeading"> Item Name</h4>
                    <h4 class = "itemAmountHeading"> Amount (in Rs.)</h4>
                    <h4 class = "itemCreatedHeading"> Added On</h4>
                </div>
            `);
            console.log(result.items);
            const EntityList = result.items;
            EntityList.forEach(renderEntityItem);
            return EntityList;
        },
        error: function(){
            alert('Error in fetching Items');
        }
    });
};

const submitCustomer = async () => {
    let newCustomer = {
        name: "",
        email: "",
        contact: ""
    };
    newCustomer.name = $('#NewCustomerName').val();
    newCustomer.email = $('#NewCustomerEmail').val();
    newCustomer.contact = $('#NewCustomerPhone').val();
    
    $.ajax({
        type: "POST",
        url: "https://rzp-training.herokuapp.com/team1/customers",
        data: JSON.stringify(newCustomer),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        success: function(res){
            console.log(res);
            alert('Customer Added Successfully');
            toggleModal();
            $.fn.clearRightPanel();
            renderCustomers();
        },
        error: function(error){
            console.log(error);
            alert('Unable to add Customer');
            toggleModal();
        }
    });
}

const addCustomer = () => {
    $.fn.clearModal();
    $('.modal-content').prepend( `
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
    `);
    toggleModal();
    $('.close-button').click(toggleModal);
    $('.customerSubmit').click(submitCustomer);
}

const renderCustomers = () => {
    $('.header').prepend(`
        <button class = "btn-customer">
            Add Customer
        </button>
        <button class = "customer-refresh">
            <ion-icon name = "refresh-outline"></ion-icon>
        </button>
    `);
    getCustomers();
    $('.customer-refresh').click(function() {
        $.fn.clearRightPanel();
        renderCustomers();
    });
    $('.btn-customer').click(addCustomer);
};

const submitItem = async () => {
    let newItem = {
        name: "",
        description: "",
        amount: "",
        currency: "INR"
    };
    newItem.name = $('#NewItemName').val();
    newItem.amount = $('#NewItemPrice').val();
    newItem.description = $('#NewItemDesc').val();

    $.ajax({
        type: "POST",
        url: "https://rzp-training.herokuapp.com/team1/items",
        data: JSON.stringify(newItem),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        success: function(res){
            console.log(res);
            alert('Item Added Successfully');
            toggleModal();
            $.fn.clearRightPanel();
            renderEntities();
        },
        error: function(error){
            console.log(error);
            alert('Unable to add Item');
            toggleModal();
        }
    });
}


const addItem = () => {
    $.fn.clearModal();
    $('.modal-content').prepend( `
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
    `);
    toggleModal();
    $('.close-button').click(toggleModal);
    $('.itemSubmit').click(submitItem);
}


const renderEntities = () => {
    $('.header').prepend(`
        <button class = "btn-item">
            Add Item
        </button>
        <button class = "entity-refresh">
            <ion-icon name = "refresh-outline"></ion-icon>
        </button>
    `);
    getEntities();
    $('.entity-refresh').click(function() {
        $.fn.clearRightPanel();
        renderEntities();
    });
    $('.btn-item').click(addItem);
};

const submitInvoice = () => {
    console.log('in submit invoice');
}

const addInvoice = () => {
    $.fn.clearModal();
    $('.modal-content').prepend( `
    <span class = "close-button"> &times; </span>
    <div class = "invoice-modal-data">
        <h3> New Invoice </h3>
        
    </div>
    `);
    toggleModal();
    $('.close-button').click(toggleModal);
    $('.invoiceSubmit').click(submitInvoice);
}

const renderInvoices = () => {
    $('.header').prepend(`
        <button class = "btn-invoice">
            Create Invoice
        </button>
        <button class = "invoice-refresh">
            <ion-icon name = "refresh-outline"></ion-icon>
        </button>
    `);
    getInvoices();
    $('.invoice-refresh').click(function() {
        $.fn.clearRightPanel();
        renderInvoices();
    });
    $('.btn-invoice').click(addInvoice);
};


$('#customer').click(function() {
    $.fn.clearRightPanel();
    renderCustomers();
});

$('#item').click(function() {
    $.fn.clearRightPanel();
    renderEntities();
});

$('#invoices').click(function() {
    $.fn.clearRightPanel();
    renderInvoices();
});


    console.log('hello');
    // init();
    renderCustomers();
});




// const DOMstrings = {
//     customer: '#customer',
//     header: '.header',
//     rightPanelList: '.rightPanel__list'
// };





