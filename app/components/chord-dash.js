import Ember from 'ember';
import Clock from '../mixins/clock';
//import Acts from './instances/chordActions';

var debug, debug2;

export default Ember.Component.extend({

  options:Ember.inject.service(),
  verticalTab:Ember.computed.bool('song.verticalTab'),
  song:Ember.inject.service(),
  tagName:"ul",
  classNames:['sidebar','chordBank'],
	classNameBindings:['isEditing:chord-edit'],
	model:Ember.computed('song.chords',{
		get(){
			return this.get('song.chords')//[[6,5,4]]
		}
	}),

	selectedBinding:"song.chordSelected",
	selectionBinding:"song.chordSelection",
	differenceBinding:"song.chordDifference",
	lowBinding:"song.chordLow",
	isEditingBinding:"song.chordEditFlag",

 	actions:{
		sendSelection(){
       this.set('selected',Ember.copy(this.get('selection')))
         console.log('selected from edit dash',this.get('selected'))
		},
		selector({chord:selection,difference,low}){
			console.log ("action selector",selection)
          var isEditing = this.get('isEditing')
			if(this.get('selection')===selection){
                if(isEditing){
                    console.log(this.get('isEditing'))
    //                this.toggleProperty('isEditing')
                    console.log(this.get('isEditing'))
                }
                this.set('selection',null)
			/*	this.setProperties({'selection': null,
                                    'selected'	:null,
							   	   	'difference':null,
									'low':null})
                                   */
			}else{
				this.setProperties({selection:selection,
							   	   	difference:difference.length,
							   	   	low:low})
                if(isEditing){
                    this.send('sendSelection')
								}
			}
		},
		toggleSelected(string,fret){
		
			let arr = this.get('selected');
			
			if(arr[string] === fret){
				fret = [undefined]
				if( (string === 0) || (string === arr.length-1) ){
					fret = null
				}
			}else{
				fret = [fret]
			}
			arr.replace(string,1,fret) 	
		
		},
		appendToSelectedCol(string,fret){
			console.log ("select col",string,fret)
			var arr = this.get('selected');

			if(string<0){
				arr.replace(0,0,[fret])
			}else{
				arr.replace(string-1,1,[arr[string-1],fret])	
			}
		},
		appendToSelected(string,fret,offset){
			console.log ("select append",string,fret,offset)
			var arr = this.get('selected');
			if(fret === 0){ 
				this.set('selected', arr.map(function(idx){return idx+2}))		
				fret = 1
			}
			arr.replace(string,1,[fret])	
			
		}
	}

});
