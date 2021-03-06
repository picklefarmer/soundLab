import Ember from 'ember';
const barTypes = ['meter','measure','part'];
export default function(val){

	let current = barTypes.indexOf(this.get('song.barType'));

	val = current+val


	if(val > 2 || val < 0){
    if(val > 2){
      this.set('song.isEdit',true)
    }else{
			if(this.get('song.pause')){
				this.toggleProperty('song.pause')
			}else{
				this.toggleProperty('song.pause')
				Ember.run(this.get('song'),'clock',this.get('song.beat'))
			}
		}
		return 	
	}else if(val === 0){
		this.set('song.isBeat',true)
	}else{
		this.set('song.isBeat',false)
	}
	if(val === 2){
		this.set('song.isPart',true)
    if(!this.get('song.pause')){
        this.set('song.selected.index',0)
    }
	}else{
		this.set('song.isPart',false)
	}
	this.set('song.barType',barTypes[val]) 

};
