import Ember from 'ember';

export default Ember.Route.extend({
  actions:{
    updateUrl(){
      console.error('hello there')
    }
  }
/*


	init(){


		let arg = "fetching clock! from song/edit/route",
		song = this.get('song'),
		mrun = Ember.run;


		console.log(this.get('song.clock'),'clock from edit')


		mrun(song,'clock',arg)
		//		mrun(song, )

		
	}*/
});
