import Ember from 'ember';
const hue = new chroma.scale('Spectral').domain([0,8])

export default Ember.Component.extend({
  song:Ember.inject.service(),
	tagName:"ul",
  attributeBindings:['style'],
  style:Ember.computed('song.isToneToHue',function(){
    let style = 'background-image:linear-gradient(90deg';
    if(this.get('song.isToneToHue')){
      for(var i = 0; i < 8; i++){
        style+=","+hue(i)+" "+i+"0%"  
      }

      style+=")"

      return style
    }
  }),
	classNames:["sidebar","scroll"],
  timeSignature:Ember.computed('song.division',{get(){

    var arr = [],
        count = this.get('song.division');

    while(count){
      arr.unshift(count)
        count--
    }
    return arr
  
  }}),
    
    //["|","-","|","-","|","-","|","-"]
	/*
	options:Ember.inject.service(),
	willRender(){
		var element = this.get('element'),
				ctx     = element.getContext('2d'),
				width = Ember.$(document)[0].body.offsetWidth;
				element.width = width/2;
				this.set('options.meterBar',ctx)
	}	
	*/
});
