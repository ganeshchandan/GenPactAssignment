import React from 'react';
import DropDown from './DropDown';

export default class Home extends React.Component {

    constructor(){
        super();
        this.state= {data : [
              { key: 'Header2', text: 'Fruits',itemType : "header"},
              { key: 'Apple', text: 'apple' },
              { key: 'Banana', text: 'banana' },
              { key: 'Orange', text: 'orange', disabled: true },
              { key: 'Grape', text: 'grape', disabled: true },
              { key: 'divider_1', text: '-',itemType : "divider"},
              { key: 'Header3', text: 'Lanuages',itemType : "header"},
              { key: 'English', text: 'english' },
              { key: 'French', text: 'french' },
              { key: 'Germany', text: 'germany' },
            ],
            selectedItems :[],
            flag : true       
            }
       
    }
    
    onSelect(selectedItems){
        this.setState({selectedItems : selectedItems});
    }
    
    toggleOrAndOperator(flag){
        this.setState({flag : flag})
    }
    
    displaySelectedValue(){
    	let selectedItems = this.state.selectedItems,
    		dispalyText = "";
    	if(selectedItems.length === 1){
    		dispalyText=  selectedItems.join(',');
    	}else{
    		dispalyText = selectedItems[0]+" (+"+(selectedItems.length - 1)+")";
    	}
    	return 	<div>
    				<div>
    					<span className="tickSign">&#10003;</span>
    					<span>{dispalyText}</span>
    		   		</div>
    		   		<span className="downArrow"></span>
    		   	</div>
    }
                              
    render() {
        var features = [];
        return (
          <div className='main'>
           <DropDown    options={this.state.data} 
                        selectedItems ={this.state.selectedItems}
                        multiSelect={true}
                        width = {300}
                        flag ={this.state.flag}
                        toggleOrAndOperator = {this.toggleOrAndOperator.bind(this)}
                        onSelect ={this.onSelect.bind(this)}>
                {this.state.selectedItems.length === 0 ? <div><span>Select Values</span><span className="downArrow"></span> </div>: this.displaySelectedValue()}
            </DropDown>
          </div>
        );
    }
}
