
App.SongService = Em.ObjectProxy.extend(App.UpdateMethods,{
    content:function(){
      var online = this.get('onLine')?"firebase":"local"
  
      return this.get(online)
    }.property('onLine'),
   
    onLine:false,
  
    meter:function(){
      return ~~((60/(this.get('tempo')))*1000) 
    }.property('tempo'),
  
    bpm:320,
  
    tempo:function(_,__){
      return 2264 - this.get('bpm')
    }.property('bpm'),
  
    pause:false,
  
    cacheNotes:[[]],
  
    clock:function(){
      if(this.pause){ 
           this.incrementProperty('selected.index')
           Em.run.later(this,'clock',this.get('tempo'))    
      }
    }.observes('pause'),
  
    volume:function(_,I,II){
      console.log(_,I,II)
      this.set('webaudio.masterVolumeObserver',I)
      return I || .5

    }.property(),
    chordSelection:function(_,I){
      console.log(I)
      return I 
    }.property(),
    webaudio:Em.inject.service() 
})
