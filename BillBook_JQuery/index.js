$(document).ready(function (){
    console.log('hello');


$.fn.clearRightPanel = function(){
    $('.header').html("");
    $('.rightPanel__list').html("");
}

const renderCustomerItem = (customer) => {
    $('.rightPanel__list').append(`
    <li>
        <h3 class = "customerName"> ${customer.name} </h3>
        <div class = "customerInfo">
            <p class = "customerMail"> ${customer.email} </p>
            <h5 class = "customerNumber">Ph.: ${customer.contact} </h5>
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
};

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
};


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


const init = () => {
    console.log("hello");
    renderCustomers();
};

init();

});




// const DOMstrings = {
//     customer: '#customer',
//     header: '.header',
//     rightPanelList: '.rightPanel__list'
// };





