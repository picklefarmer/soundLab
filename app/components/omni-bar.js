import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
  beatMask:[
    '\u2160',  
    '\u2161',  
    '\u2162',  
    '\u2163',  
    '\u2164',  
    '\u2165',  
    '\u2166',  
    '\u2167',  
    '\u2168',  
    '\u2169',  
    '\u216a',  
    '\u216b'
  ],
  left:{
		stepLeft:			{name:"\u25c0",	type:"action"},
  },
  right:{
    stepRight:		{name:"\u25b6", type:"action"},
		barType:{type:"select", name:{
						'meter'   :"\uD83D\uDCCF",
						'measure' :"\uD83D\uDCD0",
						'part'    :"\u2604",		
      }
		},

  }


});
