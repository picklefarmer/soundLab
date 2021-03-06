import Ember from 'ember';
import Part	from './delete/deletePart';
import Beat	from './delete/deleteBeat';
import Measure from './delete/deleteMeasure';
export default function(index){
  if(this.get('song.isPart')){
		Part.call(this,this.get('compIndex'))
  }else if( !this.get('song.isBeat')){
		Measure.call(this,index)
	}else{
		Beat.call(this,this.get('song.beat'))
	}
}
