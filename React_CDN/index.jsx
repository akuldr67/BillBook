

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            tabs: ['customer','item','invoice'],
            currentTab: 0,
            loading: false,
            isModalOpen: false,
        };


        this.NewCustomerName = React.createRef();
        this.NewCustomerPhone = React.createRef();
        this.NewCustomerEmail = React.createRef();
        this.NewItemName = React.createRef();
        this.NewItemPrice = React.createRef();
        this.NewItemDesc = React.createRef();


        this.renderHeader = this.renderHeader.bind(this);
        this.renderData = this.renderData.bind(this);
        this.customerClick = this.customerClick.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.invoiceClick = this.invoiceClick.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addData = this.addData.bind(this);
        this.showModal = this.showModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.submitCustomer = this.submitCustomer.bind(this);
        this.submitItem = this.submitItem.bind(this);
    }

    componentDidMount() {
        this.setState({loading:true});
        try{
            fetch('https://rzp-training.herokuapp.com/team1/customers')
                .then(res => res.json())
                .then(json => this.setState({data: json.items, loading:false}));
        }catch(error){
            console.log('error in fetching customers');
            console.log(error);
        }
    }

    convertDate =(time) => {
        const date = new Date(time*1000);
        const newDate = `${date.getDate()} ${date.toLocaleString('default',{month: 'short'})} ${date.getFullYear()}`;
        return newDate;
    
    }

    refresh(){
        // this.setState(this.state);
        const tab = this.state.currentTab;
        if(tab === 0) this.customerClick();
        else if(tab === 1) this.itemClick();
        else this.invoiceClick();
    }

    renderHeader(){
        const tab = this.state.currentTab;
        const tabName = this.state.tabs[tab];
        return (
            <div className = 'HeaderSecond'>
                <button className = {`btn-${tabName}`} onClick = {() => { this.addData() } }>
                    Add {tabName}
                </button>
                <button className = {`${tabName}-refresh`} onClick= {this.refresh} >
                    <ion-icon name = "refresh-outline"></ion-icon>
                </button>
            </div>
        );
    }

    renderData(){
        const tab = this.state.currentTab;
        if(tab===0){
            return this.state.data.map(customer => {
                return (
                <li key={customer.id}>
                    <div className = "customerInfoOne">
                    <h3 className = "customerName"> {customer.name} </h3>
                    <h5 className = "customerNumber">Ph.: {customer.contact} </h5>
                    </div>
                    <div className = "customerInfo">
                        <p className = "customerMail"> {customer.email} </p>
                        <p className = "customerCreatedAt">Created: {this.convertDate(customer.created_at)}</p>
                    </div>
                </li>)
            });
        } 
        
        else if(tab===1){
            return (
                <div className = "item-react">
                    <div className = "itemInfoHeading">
                        <h4 className = "itemNameHeading"> Item Name</h4>
                        <h4 className = "itemAmountHeading"> Amount (in Rs.)</h4>
                        <h4 className = "itemCreatedHeading"> Added On</h4>
                    </div>
                    {this.state.data.map(item => {
                    return (
                        <li key={item.id}>
                            <div className = "itemInfo">
                                <h5 className = "itemName"> {item.name} </h5>
                                <h5 className = "itemAmount"> {item.amount/100} </h5>
                                <h5 className = "itemCreatedAt"> {this.convertDate(item.created_at)}</h5>
                            </div>
                            <div className = "itemInfoTwo">
                                <p className = "itemDesc">{item.description}</p>
                            </div>
                        </li>)
                    })}
                </div>
            );
        }
        
        else if(tab===2){
            return this.state.data.map(invoice => {
                return (
                    <li key={invoice.id}>
                        <h3 className = "invoiceCustomerName"> Customer: {invoice.customer_details.name} </h3>
                        <div className = "invoiceHeading">
                            <h4 className = "invoiceHeadingItemName"> Item Name </h4>
                            <h4 className = "invoiceHeadingQuantity"> Item Quantity </h4>
                            <h4 className = "invoiceHeadingAmount"> Amount (in Rs.) </h4>
                        </div>
                        {invoice.line_items.map(invoiceItem => {
                            return (
                            <div className = "invoiceInfo">
                                <h5 className = "invoiceItemName"> {invoiceItem.name} </h5>
                                <h5 className = "invoiceQuantity"> {invoiceItem.quantity} </h5>
                                <h5 className = "invoiceAmount"> {invoiceItem.amount/100} </h5>
                            </div>
                            )
                        })}
                    </li>)
            });
        }
        return '';
    }

    customerClick(){
        this.setState({loading: true, currentTab:0});
        try{
            fetch('https://rzp-training.herokuapp.com/team1/customers')
                .then(res => res.json())
                .then(json => this.setState({data: json.items},()=>{
                this.setState({loading: false});
                }));
        }catch(error){
            console.log('error in fetching customers');
            console.log(error);
            this.setState({loading: false});
        }
    }

    itemClick(){
        this.setState({loading: true, currentTab:1});
        try{
            fetch('https://rzp-training.herokuapp.com/team1/items')
                .then(res => res.json())
                .then(json => this.setState({data: json.items},()=>{
                this.setState({loading: false});
                }));
        }catch(error){
            console.log('error in fetching items');
            console.log(error);
            this.setState({loading: false});
        }
    }

    invoiceClick(){
        this.setState({loading: true, currentTab:2});
        try{
            fetch('https://rzp-training.herokuapp.com/team1/invoices')
                .then(res => res.json())
                .then(json => this.setState({data: json.items},()=>{
                this.setState({loading: false});
                }));
        }catch(error){
            console.log('error in fetching invoices');
            console.log(error);
            this.setState({loading: false});
        }
    }

    showLoading(){
        return(<div className="loading">Loading...</div>);
    }

    toggleModal(){
        this.setState({isModalOpen: false});
    }

    submitCustomer(){
        let newCustomer = {
            name: this.NewCustomerName.current.value,
            email: this.NewCustomerEmail.current.value,
            contact: this.NewCustomerPhone.current.value
        };
        try{
            fetch('https://rzp-training.herokuapp.com/team1/customers',{
                method: "POST",
                body: JSON.stringify(newCustomer),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(res => {
                this.toggleModal();
                if(res.status === 200){
                    alert('Customer Added Successfully');
                }else{
                    alert('Unable to add Customer');
                }
                this.refresh();
            });
        }catch (error){
            console.log(error);
            alert('Unable to add Customer');
            this.toggleModal();
        };
    }

    submitItem(){
        let newItem = {
            name: this.NewItemName.current.value,
            description: this.NewItemDesc.current.value,
            amount: this.NewItemPrice.current.value*100,
            currency: "INR"
        };
        try{
            fetch('https://rzp-training.herokuapp.com/team1/items',{
                method: "POST",
                body: JSON.stringify(newItem),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(res => {
                this.toggleModal();
                if(res.status === 200){
                    alert('Item Added Successfully');
                }else{
                    alert('Unable to add Item');
                }
                this.refresh();
            });
        }catch (error){
            console.log(error);
            alert('Unable to add Item');
            this.toggleModal();
        };
    }

    showModal(){
        const tab = this.state.currentTab;
        if(tab === 0){
            return (
                <div className = 'modal-react'>
                    <span className = "close-button" onClick={this.toggleModal}> &times; </span>
                    <div className = "customer-modal-data">
                        <h2 className = "customer-modal-heading"> New Customer</h2>
                            <table className = "addCustomerTable">
                                <tbody>
                                    <tr>
                                    <td> <label htmlFor= "NewCustomerName"> Name </label> <br />
                                    <input type = "text" id = "NewCustomerName" name = "NewCustomerName" ref = {this.NewCustomerName} />
                                    </td>
                                    <td>
                                    <label htmlFor = "NewCustomerPhone"> Phone </label> <br />
                                    <input type = "text" id = "NewCustomerPhone" name = "NewCustomerPhone" ref = {this.NewCustomerPhone}/> 
                                    </td>
                                    </tr>
                                    <tr>
                                    <td> <label htmlFor= "NewCustomerEmail"> Email </label> <br />
                                    <input type = "text" id = "NewCustomerEmail" name = "NewCustomerEmail" ref = {this.NewCustomerEmail}/>
                                    </td>
                                    <td>
                                    <button className = "customerSubmit" onClick={this.submitCustomer}> Save Customer </button>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            );
        }
        
        else if(tab === 1){
            return (
                <div className='modal-react'>
                    <span className = "close-button" onClick={this.toggleModal}> &times; </span>
                    <div className = "item-modal-data">
                        <h2 className = "item-modal-heading"> New Item</h2>
                        <label htmlFor = "NewItemName"> Name </label> <br/>
                        <input type = "text" id = "NewItemName" name = "NewItemName" ref = {this.NewItemName} /> <br/>
                        <label htmlFor = "NewItemPrice"> Price (in Rs.)</label> <br/>
                        <input type = "text" id = "NewItemPrice" name = "NewItemPrice" ref = {this.NewItemPrice} /> <br/>
                        <label htmlFor = "NewItemDesc"> Description </label> <br/>
                        <textarea type = "text" id = "NewItemDesc" name = "NewItemDesc" ref = {this.NewItemDesc}/> <br/>
                        <button className = "itemSubmit" onClick = {this.submitItem}> Save Item </button>
                    </div>
                </div>
            );
        }
        
        else if(tab === 2){
            return(
                <div className = 'modal-react'>
                    <span className = "close-button" onClick={this.toggleModal}> &times; </span>
                    <div className = "invoice-modal-data">
                        <h3> New Invoice </h3>
                        <div className = "invoice-modal-sections">
                            <div className = "invoice-modal-section1">
                                <div className = "invoice-section1-customer">
                                    <p>Bill to</p>
                                    <textarea defaultValue = 'name, phone and address' /> 
                                </div>
                                <div className = "invoice-section1-dates">
                                    <table className = "invoice-modal-dates-table">
                                        <tbody>
                                            <tr>
                                            <td>
                                            <label htmlFor = "invoiceIssuedAt"> Issued At </label> <br/>
                                            <input type = "text" id = "invoiceIssuedAt" name = "invoiceIssuedAt" /> 
                                            </td>
                                            <td>
                                            <label htmlFor = "invoiceDueDate"> Due Date </label> <br/>
                                            <input type = "text" id = "invoiceDueDate" name = "invoiceDueDate" /> 
                                            </td>
                                            </tr>
                                            <tr>
                                            <td>
                                            <label htmlFor = "invoiceNo"> Invoice Number </label> <br/>
                                            <input type = "text" id = "invoiceNo" name = "invoiceNo" /> 
                                            </td>
                                            <td>
                                            <label htmlFor = "invoiceRefNo"> Ref Number </label> <br/>
                                            <input type = "text" id = "invoiceRefNo" name = "invoiceRefNo" /> 
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className = "invoice-modal-section2">
                                <table className = "invoice-modal-items-table">
                                    <tbody>
                                        <tr>
                                            <th className = "invoice-modal-items">Items</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Amount</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className = "invoice-modal-addItem"> Add item </button>
                            </div>
                            <div className = "invoice-modal-section3">
                                <div className = "invoice-section3-notes">
                                    <p>Notes</p>
                                    <textarea defaultValue = 'Notes... ' />
                                </div>
                                <div className = "invoice-section3-amounts">
                                    <table className = "invoice-modal-amounts-table">
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return '';
    }

    addData(){
        this.setState({isModalOpen: true});
    }

    render() {

        return (
            <div className="app">
                <div className="container">
                    <div className="left__panel">
                        <ul className="entity__list">
                            <div className="entity__name" id = "customer" onClick={()=> this.customerClick()}>
                                <li key = 'Customer'> Customer </li>
                            </div>
                            <div className="entity__name" id = "item" onClick={()=> this.itemClick()}>
                                <li key = 'Item'> Item </li>
                            </div>
                            <div className="entity__name" id = "invoices" onClick={()=> this.invoiceClick()}>
                                <li key = 'Invoice'> Invoices </li>
                            </div>
                        </ul>
                    </div>
                    <div className="right__panel">
                        <div className="header">
                            {this.renderHeader()}
                        </div>
                        <div className = "rightPanel__data">
                            <ul className = "rightPanel__list">
                                {this.state.loading? this.showLoading():this.renderData()}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className = {this.state.isModalOpen? 'modal show-modal':'modal'}>
                    <div className = "modal-content">
                        {this.state.isModalOpen? this.showModal():''}
                    </div>
                </div>
            </div>
        );
    }
}