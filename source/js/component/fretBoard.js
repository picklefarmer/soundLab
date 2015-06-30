App.FretBoardComponent = Em.Component.extend({

  names:['backView','frontView','centerView'],
  classNames:['tablet'],


  playNotes:function(){
      var chord =  this.get('song.selected.measure');
      console.log(this.get('song.selected.measure'),chord,"log of measure")
      if(!chord)return
        chord = chord.notes
//     console.log('tempChord',chord.toString())
     var 	x = 67
          y = 50
          offset = 18,
          rate = 24,
      	  tempo = ~~(this.get('song.tempo')/50),
          scale = 36,
         // note = this.get('tones.tone'),
          note = this.get('tones'),
          tempChord = this.get('song.cacheNotes'),
          index = ~~this.get('song.selected.index').toString(),
          ctx =  this.get('options.frontView');
          rate = ~~(tempo/2)-1;

//    this.set('song.measure.debug',[tempo,rate].toString())
          //
     ctx.clearRect(0,0,1400,300)
     note.setEach('freq',0)
     note.setEach('ctx.gain.value',0.1)
     //     console.log("premap",chord) 
  
          chord = chord.map((e,f) => { 
                  if(e){
                    note.objectAt(f).set('freq',e)
                    return  [ offset+(e*x)+scale/2,
                              offset/2+(y*f)+scale/2
                            ]
                  }else{note.objectAt(f).pause()}
                  }).filter(e => e?e:false)
      this.set('song.cacheNotes',chord)

//      //console.log('postPut',chord,this.get('song.cacheNotes'),this.get('song.measure.notes'))

		 	for(var l = 0; l <rate; l++){	
				Em.run.later(this,(l)=>{
          window.requestAnimationFrame(()=>{
            tempChord.map(([fret,string]) => ctx.clearRect(fret-scale/2,string-scale/2,scale,scale))
              if(this.get('song.selected.index') === index){
//            console.log(index,this.get('song.index'))
	  			  	ctx.beginPath()
          	        chord.map(([fret,string]) => {  
                        ctx.arc(fret,	string,	((scale/2)/rate)*l,	0,2*Math.PI)
                        ctx.closePath();
                       })
				    	ctx.fill()
			      }
          })
        },l,(Math.sin(60/l)+1)*l*tempo)
        //tempo*l);
			}
  },
  playSwitch:function(){
    var proxy  = this.get('song.selected.isFulfilled');

    if(proxy){
      this.addObserver('song.selected.measure.notes.@each',this.playNotes) 
      Em.run.next(()=>{console.log( `play switch ${true}` , this.get('song.selected.measure'))})
    }else if(!proxy){
      console.log( `play switch ${false}` ) 
      this.removeObserver('song.selected.measure.notes.@each',this.playNotes) 
    }
  }.observes('song.selected.isFulfilled'),
 
	pushNote:function(e){
				var f = Em.run(this,"mouseFormat",e);
	      var measure = this.get('song.measure');
        
    console.log('this is firing')
     Em.run(this.get('song'),this.get('song.content.update'),f)
	},

	pushChord(e){
console.log('pushChord')
    var arr = this.get('song.chordSelection'),
        [x,y] = [this.get('cacheX'),this.get('cacheY')],
        low = this.get('song.chordLow'),
        diffX = ~~((this.get('song.chordDifference')/2) -.5),
				diffY = ~~(arr.length/2),
        theArr = arr.map(e => e - low + x - diffX),
        measure = this.get('song.selected.measure.notes');

    while(y--){
      theArr.unshift(0)
    }
    while(diffY--){
      theArr.shift()
    }
    while(theArr.length < 6){
      theArr.push(0)
    }
    theArr = theArr.slice(0,6)

    console.log(theArr.toString(),measure)

    theArr = theArr.map( ( e , f ) => e ? e : ( measure[f] || 0 )) 

    console.log(theArr.toString(),measure)

    console.log('is firing')
    Em.run( this.get('song') ,this.get('song.content.update'),  theArr  )

	},
/*
	editPush:function(notes){
				var pos =  this.get('song.score')[this.get('song.index')],name = Object.keys(notes)[0];
		//		console.log( this.get('song.score'),pos,"index: " +  this.get('song.index') , notes ) 
				if(pos){
					if(!pos[name]){
						//console.log( "add" ,name,notes[name]) 				
						pos[name] = notes[name]
						Em.run(this,'dot',notes[name][0],name,notes[name][1])
		
					}else{
						//console.log( "remove" + name ) 
		//				Em.run(this,'dot',notes[name][0],name,notes[name][1],true)
						Em.run(this,'erase',67*notes[name][0],50*name,'frontView')
		
		//				Em.run(this,'dot',pos[name][0],name,pos[name][1],true)
						Em.run(this,'erase',67*pos[name][0],50*name,'frontView')
		
						delete pos[name]
					}
				}else{
					this.get('song.score').push(notes)}
//					console.log(this.get('song.score'),pos,name) 
					//Em.run(this,'dot',notes[name][0],name,notes[name][1],true)
					Em.run(this,'erase',67*notes[name][0],50*name)
		},
   */
	chordTemp:[],
  tempChord:[],

	chordHover:function(e){
			var arr = this.get('song.chordSelection'),
				low = this.get('song.chordLow'),
		[  x , y  ]	= Em.run(this,"mouseFormat",e);

			if( (x !== this.get('cacheX')) || ( y !==this.get('cacheY')) ){
			
				this.setProperties({cacheX:x,cacheY:y }) 
			console.log(x,y,"cache",arr)	
				var diffX = ~~((this.get('song.chordDifference')/2) -.5);
				var diffY = ~~(arr.length/2);
				
			////console.log(diffX,diffY,this.get('controller.difference'))
		/*
       chord = chord.map((e,f) => { 
                  if(e){
                    note.objectAt(f).set('freq',e)
                    return  [ offset+(e*x)+scale/2,
                              offset/2+(y*f)+scale/2
                            ]
                  }else{note.objectAt(f).pause()}
                  }).filter(e => e?e:false)
    */
				arr = arr.map((fret,string)=>{
					fret-=low;
					fret+=x;	
					string+=y;					
					fret-=diffX;
					string-=diffY;
					fret*=67;
					string*=50;
					return [fret,string]
				})
				Em.run(this,'dotChord',arr)
			}
		},
		
	dotChord(chord){
				
			var offset = 18,
				scale = 36,
				l = 8,
        chordTemp = this.get('chordTemp'),
				ctx = this.get('options.centerView');
			
      chordTemp.map(([fret,string]) => ctx.clearRect(fret+scale/2,string,scale,scale+offset))
      //chordTemp.map(([fret,string]) => ctx.clearRect(fret-scale/2,string-scale/2,scale,scale))
      /*
			for(var [x,y] of this.get('chordTemp')){

				Em.run(this,"erase",x+8,y+8,'options.centerView')
			}
			
			*/
        ctx.globalCompositeOperation = "source-over"
				ctx.globalAlpha=.5
				ctx.fillStyle = "white" 
			
 /* 
        ctx.beginPath()
    	        chord.map(([fret,string]) => {  
                   ctx.arc(fret,	string,	((scale/2)/rate)*l,	0,2*Math.PI)
                   ctx.closePath();
                       })
				  	ctx.fill()
*/
				for(var [x,y] of chord){
					ctx.beginPath()
					ctx.arc(offset+x+scale/2,
						offset/2+y+scale/2,
						((scale/2)/8)*l,
						0,2*Math.PI)
					ctx.fill();
				}
				this.set('chordTemp',chord)
				ctx.globalAlpha=1
	},

	clear:function(ctx='options.frontView'){
				this.get(ctx).clearRect(0,0,1400,300)
		},
	volume:.25,

  mouseMoveBinding:"mouseSelection",
	mouseSelection:function(){
    console.log ( 'moving')
  	if(this.get('song.chordSelection'))
				return this.get('chordOverlay')
	  		return null
	}.property('song.chordSelection'),
	
  chordOverlay(e){
		Em.run.throttle(this,'chordHover',e,2)
	},
	
  click(e){
		if(this.get('song.chordSelection')){
			Em.run.once(this,'pushChord',e)
		}else{
			Em.run.once(this,'pushNote',e)
		}
	},
	
  mouseLeave:function(){
		if(this.get('song.chordSelection')){
			Em.run.once(this.get('options'),'clear')
	  }
	},

	mouseFormat(E){
		//console.log( this.get('element').offsetTop,"OFFSETTOP") 
		var [ x , y ]=[ E.offsetX == undefined ? E.pageX - (this.get('element').offsetLeft +40): E.offsetX,
			   			E.offsetY == undefined ? E.pageY - (this.get('element').offsetTop): E.offsetY];
		
			E = [ x , y ]=[~~((x-10)/(1472/23)),~~((y-5)/(300/6))];
		return E
	},

  tones:Em.inject.service(),  
  globalKeydown:Em.inject.service(),	

	didInsertElement(){
    this.get('song.measure')
	  $(document).keydown(e => Em.run(this,this.get('globalKeydown.begin'),e))
	},

  willDestroyElement(){
    $(document).off('keydown')
  },

})
		
