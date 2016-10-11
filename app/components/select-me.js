import Ember from 'ember';
import Keydown from '../mixins/keydown';

export default Ember.Component.extend(Keydown,{
  content:[],
  tagName:"select",
  actions:{
    updateSelected(value){
      this.set('selection',value)
    }
  },
  willRender(){
    this.set('selected',this.get('selection'))
  },
  change(val){
    console.log('beginning',val.target.value)
    this.send('updateSelected',val.target.value)
  },

});
