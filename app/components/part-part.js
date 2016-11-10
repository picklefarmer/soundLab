export default Ember.Component.extend({
  classNameBindings:['highlight:selected','active:hit','isRest:rest','isNote:note'],
  tagName:"li",
  beatType:Ember.computed('beatMap.[]','index',function(){
					console.log('beatType')
    return this.get('beatMap')[this.get('index')]
  }),
  	measure:Ember.computed('index',{
		get(){
			var measure = this.get('index').toString()

			if(	measure[1] ){
				return measure
			}

			return "0"+measure
		}
	}),

  //isRest:Ember.computed.equal('beatType','r'),
  isRest:Ember.computed.equal('beatType',0),
  //isNote:Ember.computed.equal('beatType','b'),
  isNote:Ember.computed.equal('beatType',1),

	willRender(){
    this.set('active',Ember.computed.equal('boundValue',this.get('index')))
  },
  click(){
    this.set('boundValue',this.get('index'))
  }
});
