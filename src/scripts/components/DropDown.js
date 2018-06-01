import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const modalRoot = document.body;

class DropDownModal extends React.Component{
  constructor(props) {
        super(props);
        let divElement =  document.createElement('div');
        divElement.className = "dropdown-overlay";
    this.el =divElement;
  }

  componentDidMount() {
    
     modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
     modalRoot.removeChild(this.el);
  }
  
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
    
}

export default class DropDown extends React.Component {
    
    constructor(props) {
        super(props);
        this.state= {show : false ,
                     rect : {top : 0,left :0 ,right : 0,bottom : 0,width:0 ,height :0}}
    }
    
    showHideDropDown(e){
        this.setState({show : !this.state.show ,rect  : e.currentTarget.getBoundingClientRect()});
    }
    
    renderListElements(){
        let options = this.props.options,
            dopeDownListItem = options.map((item,index)=>{
                if(item.itemType === "header"){
                    return this.headerComponent(item,index);
                }else if(item.itemType === "divider"){
                    return <div key={index} className="dropdown-list-divider"/>
                }else{
                    return this.itemComponent(item,index);                           
                }
            });
        return dopeDownListItem;
    }
    
    headerComponent(item,index){
        return <div className="dropdown-list-header" key={index} style={{height : this.props.itemheight}}>
                    {item.text}
                </div>
    }

    itemComponent(item,index){
        let selectedItems = this.props.selectedItems,
            checked= false,
            className= "dropdown-list-item",
            checkmarkClass ="checkmark";
        if(selectedItems.indexOf(item.key) !== -1){
            checkmarkClass = checkmarkClass+" checkmarkChecked";
        }
        
        if(item.disabled){
            className = className + " disableClass";
        }
        
        return <div className={className} key={index} style={{height : this.props.itemheight}} onClick={this.onSelect.bind(this,item)}>
                    {this.props.multiSelect ?
                     <span className ={checkmarkClass}></span> : <noscript/>}
                     <span className="itemtext">{item.text}</span>
                </div>
    }

    toggleOrAndOperator(flag){
        this.props.toggleOrAndOperator(flag);
    }
    
    renderCondition(){
        let orClassName ="radioCustom",
            andClassName ="radioCustom";
        if(this.props.flag){
            orClassName ="radioCustom radioCustomChecked";
            andClassName ="radioCustom";
        }else{
            orClassName ="radioCustom";
            andClassName ="radioCustom radioCustomChecked";
        }
        return  <div>
                    <label onClick = {this.toggleOrAndOperator.bind(this,true)}>
                        <span className={orClassName} >
                        </span><span className="radioTextClass"> Or</span>
                    </label>
                    <label onClick = {this.toggleOrAndOperator.bind(this,false)}>
                        <span className={andClassName}></span>
                        <span className="radioTextClass"> And</span>
                    </label>    
                </div>
    }

    disableClose(e){
        e.stopPropagation();
    }

    onSelect(item){
        let selectedItems = Object.assign([],this.props.selectedItems);
        if(!this.props.multiSelect){
            selectedItems = [item.key]
        }else{
            if(selectedItems.indexOf(item.key) === -1){
                selectedItems.push(item.key);
            }else{
                selectedItems.splice(selectedItems.indexOf(item.key),1)
            }
        }
        this.props.onSelect(selectedItems);
    }
   
    clearAllSelections(){
        this.props.onSelect([]);
    }

    renderDropDownBoby(){
        let rect = this.state.rect,
            style= {top : rect.top + rect.height,left : rect.left,width : this.props.width},
            dropdownClear = "dropdown-clear";
        if(this.props.selectedItems.length === 0){
            dropdownClear = dropdownClear + " disableClearSection"
        }
        return <DropDownModal>
                        <div className="dropdown-container" onClick={this.showHideDropDown.bind(this)}>
                            <div className="dropdown-container-relative" style={style} onClick={this.disableClose.bind(this)}>
                                <div className="dropdown-radio" style={{width : this.props.width}}>
                                     {this.renderCondition()}
                                </div>
                                <div className="dropdown-list" style={{width : this.props.width}}>
                                    {this.renderListElements()}
                                </div>
                                <div className = {dropdownClear} style={{width : this.props.width}} onClick={this.clearAllSelections.bind(this)}>
                                   <span className="iconClass">X</span>
                                   <span className="clearText">Clear</span>
                                </div>
                            </div>
                        </div>
                </DropDownModal>;
    }
   
    render() {
        return (
            <div className="dropdown" style={{width : this.props.width}}>
               <div className="dropDown-placeholder" onClick={this.showHideDropDown.bind(this)} style={{width : this.props.width}}>
                	{this.props.children}
                </div>
                {this.state.show ? this.renderDropDownBoby() : <noscript/>}
            </div>
        );
    }
}

DropDown.propTypes = {
    selectedItems : PropTypes.array,
    options: PropTypes.array,
    width : PropTypes.number,
    itemheight : PropTypes.number,
    multiSelect : PropTypes.bool,
    flag :  PropTypes.bool,
    onSelect : PropTypes.func.isRequired,
    toggleOrAndOperator : PropTypes.func.isRequired
};

DropDown.defaultProps = {
    options:  [],
    width : 100,
    itemheight : 30,
    multiSelect : false,
    selectedItems : [],
    flag : false
};
