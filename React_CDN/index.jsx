

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            tabs: ['customer','item','invoice'],
            currentTab: 0,
            loading: false,
        };

        this.renderHeader = this.renderHeader.bind(this);
        this.renderData = this.renderData.bind(this);
        this.customerClick = this.customerClick.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.invoicesClick = this.invoicesClick.bind(this);
        this.showLoading = this.showLoading.bind(this);
    }

    componentDidMount() {
        try{
            fetch('https://rzp-training.herokuapp.com/team1/customers')
                .then(res => res.json())
                .then(json => this.setState({data: json.items},()=>{console.log(this.state)}));
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

    renderHeader(){
        const tab = this.state.currentTab;
        const tabName = this.state.tabs[tab];
        return (
            <div className = 'HeaderSecond'>
                <button className = {`btn-${tabName}`}>
                    Add {tabName}
                </button>
                <button className = {`${tabName}-refresh`}>
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
            return this.state.data.map(item => {
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
            });
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
        this.setState({loading: true});
        this.setState({currentTab:0});
        try{
            fetch('https://rzp-training.herokuapp.com/team1/customers')
                .then(res => res.json())
                .then(json => this.setState({data: json.items},()=>{console.log(this.state);
                this.setState({loading: false});
                }));
        }catch(error){
            console.log('error in fetching customers');
            console.log(error);
            this.setState({loading: false});
        }
    }

    itemClick(){
        this.setState({loading: true});
        this.setState({currentTab:1});
        try{
            fetch('https://rzp-training.herokuapp.com/team1/items')
                .then(res => res.json())
                .then(json => this.setState({data: json.items},()=>{console.log(this.state);
                this.setState({loading: false});
                }));
        }catch(error){
            console.log('error in fetching items');
            console.log(error);
            this.setState({loading: false});
        }
    }

    invoicesClick(){
        this.setState({loading: true});
        this.setState({currentTab:2});
        try{
            fetch('https://rzp-training.herokuapp.com/team1/invoices')
                .then(res => res.json())
                .then(json => this.setState({data: json.items},()=>{console.log(this.state);
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

    render() {

        return (
            <div className="app">
                <div className="container">
                    <div className="left__panel">
                        <ul className="entity__list">
                            <div className="entity__name" id = "customer" onClick={()=> this.customerClick()}>
                                <li> Customer </li>
                            </div>
                            <div className="entity__name" id = "item" onClick={()=> this.itemClick()}>
                                <li> Item </li>
                            </div>
                            <div className="entity__name" id = "invoices" onClick={()=> this.invoicesClick()}>
                                <li> Invoices </li>
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
                <div className = "modal">
                    <div className = "modal-content">
                    </div>
                </div>
            </div>
        );
    }
}