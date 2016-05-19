import Ember from 'ember';

export function typeOf(val,controller) {
		let value = Ember.typeOf(val),
        component = "";

				switch(value){
            case 'number' : component   = "option-set";     break;
            case 'string' : component   = "rgb-pallet";     break;
            case 'array'  : component   = "select-range";   break;
            case 'object' : component   = "select-set";     break;
            default       : component   = "boolean-switch"; break;
        }
          
    	  console.log(component,"component")
    return component

}

export default Ember.Helper.helper(typeOf);
