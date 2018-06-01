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
                              

    render() {
        var features = [];
        return (
          <div className='main'>
           <DropDown    options={this.state.data} 
                        selectedItems ={this.state.selectedItems}
                        multiSelect={true}
                        width = {200}
                        flag ={this.state.flag}
                        toggleOrAndOperator = {this.toggleOrAndOperator.bind(this)}
                        onSelect ={this.onSelect.bind(this)}>
                {this.state.selectedItems.length === 0 ? "Select Values" : this.state.selectedItems.join(',')}
            </DropDown>
          </div>
        );
    }
}