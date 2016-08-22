import Ember from 'ember';
var DEBUG;

export default Ember.Route.extend({
		song:Ember.inject.service(), 
		model:function(params){
		
			console.log( 'init , from isOnline song route model ', this.get('song'),params)
    

	  Ember.run(this,'autoplay',params.y)


			return params
		},
			//			params.y = [params.y.split("")][params.x] || params.y
    isAutoplay:false,

		autoplay(songName){

		let arg = "fetching clock! from song route",
//				songName = "showbury" ,//this.get('context.y'),
				song = this.get('song');

		console.log(songName,'model')
		console.log('clock from song')

		song.set('selected',songName)

		if(this.get('isAutoplay')){
				song.set('pause',true)
		}

		//Ember.run.next(song,'clock',arg)

		//		mrun(song, )

		
		},

		actions:{
				goEdit(){
						console.log('action bubbled correctly to route')
				},

			ride:function(x,y){

				this.router.replaceWith("song",{x:x,y:y})

			},
			loading:function(){	console.log ( "THIS _ IS _ LOADING" ) 

			}
		}
})
