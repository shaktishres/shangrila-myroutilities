 _ropani = 0;
 _paisa = 0;
 _dam = 0;
 _aana = 0;

 function toRopaniBase() {
 	var me = this,
 		temp_paisa = 0,
 		temp_aana = 0,
 		temp_ropani = 0;

 	//Convert To paisa
 	temp_paisa = ((me._dam / 4) + me._paisa).toFixed(4);
 	//Convert To Aana
 	temp_aana = ((temp_paisa / 4) + me._aana).toFixed(4);
 	//Convert To Ropani
 	temp_ropani = ((temp_aana / 16) + me._ropani).toFixed(4);
 	return temp_ropani;
 }

 function RopaniBase(r1, r2) {
 	temp = new RopaniBase();
 	var addVal = 0;
 	temp.Dam = r1._dam + r2._dam;
 	if (temp._dam >= 4) {
 		temp._dam = temp.__dam - 4;
 		addVal = 1;
 	} else
 		addVal = 0;

 	temp._paisa = r1._paisa + r2._paisa + addVal;
 	if (temp._paisa >= 4) {
 		temp._paisa = temp._paisa - 4;
 		addVal = 1;
 	} else
 		addVal = 0;

 	temp.Aana = r1._aana + r2._aana + addVal;
 	if (temp._aana >= 16) {
 		temp._aana = temp._aana - 16;
 		addVal = 1;
 	} else
 		addVal = 0;

 	temp.Ropani = r1._ropani + r2._ropani + addVal;
 	return temp;
 }

 function CompareTo(other) {
 	var me = this;
 	if (toRopaniBase() == other.toRopaniBase())
 		return 0;
 	else if (toRopaniBase() > other.toRopaniBase())
 		return 1;
 	else
 		return -1;
 }