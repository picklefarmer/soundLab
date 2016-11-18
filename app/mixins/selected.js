import Ember from 'ember';
import SetIndex from '../mixins/functions/index';
import hexCrunch from '../mixins/functions/hexcrunch';

var offset =  10,
		scale		= 36,
		x				= 67,
		y				= 50,
		yFactor = offset+(scale/2),
		xFactor	=	offset/2 + (scale/2);

export default Ember.Mixin.create({
	
	partNames:Ember.computed('content.@each.name',function(){
			//this.getEach('name')
			let names = this.getEach('name');
			console.log('name', names)
			return names

	}),

	partInstance:Ember.computed('composition','compIndex',function(){
		let {compIndex,composition}	= this.getProperties('compIndex','composition'),
				c			= composition.objectAt(compIndex);

		console.error( c, 'partInstance')
				return c[0]!==undefined? c[0]:c
	}),

	part:Ember.computed('compIndex','partInstance',function(_){
		_ =this.objectAt(this.get('partInstance'));
			console.error(_,this.get('partInstance'),'part')
			return _
	}),

	measure:Ember.computed('part','index','content.@each.notes',{
		get(){
			console.log(  'measure ' ) 
			if(this.get('compIndex') !== undefined){
				console.error(this.getProperties('index','part','compIndex','composition'),fretboard,'fretboard')
				let fretboard = this.get('part').fretboard.objectAt(this.get('index'));
				return fretboard
			}else{
				return this.objectAt(this.get('index'))
			}
		}
	}),

	measureLength:0,

	instance:Ember.computed('compIndex','composition.[]',function(){
		return this.get('composition').objectAt(this.get('compIndex')).objectAt(1)
	}),

	lyricInstance:Ember.computed('instance','parts',function(_){
		
			let compInstance = this.get('instance');

					return	this.get('part').lyrics.objectAt(compInstance)
	}),

	lyrics:Ember.computed('lyricInstance','index',{
		get(){
			//return this.get('part').
			return	this.get('lyricInstance')
		},
	}),

	compIndex:Ember.computed('composition.[]',{
		get(){
			if(this.get('composition')){
				return 0
			}			
		},
		set(_,index){

				_  = this.get('composition');
				if(index >= _.length){
					return 0
				}else if(index < 0){
					return _.length-1
				}
				
			return index	
		}
	}),

 	index:Ember.computed('content.[]',{
		get(){return 0},
		set:SetIndex
	}),


	fretboard:Ember.computed('measure.notes.[]',function(){
		console.error( 'fretbard refresh',this.get('index'))	
		 let fretboard=  this.get('part.fretboard')
							.getEach('notes');
					console.log('fretboard', fretboard)
		return fretboard.map( measure => {
								if(!measure.length){
									let argArr = [];
									Object.keys(measure).forEach( key => argArr[key] = measure[key])
									measure = argArr
								}
								return measure.map( (string,indx) => string.length?string.map( fret =>{
								if(fret){
									return [fret*x + xFactor, indx*y + yFactor,fret,indx]
								}
								}):false)
							})
/*
							.map( (string,idx) => string
								.map(beat=>[beat,idx])
								.filter( group => group[0])
								.map( ([note,id]) => [note*x + xFactor, id*y + yFactor,note,id])
							)
							*/

		
	}),

	fretMeasure:Ember.computed('index','fretboard',function(){
		 return this.get('fretboard').objectAt(this.get('index'))
	}),


})
