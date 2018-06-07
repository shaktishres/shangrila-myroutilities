	_bigha = 0;
	_kattha = 0;
	_dhur = 0;
	_kanwa = 0;
	_kanwain = 0;
	LAND_AREA_SHOW_KANWA = 0;

	function toKatthaBase() {
		var me = this,
			temp_dhur = 0,
			temp_kattha = 0,
			temp_kanwa = 0;

		temp_kanwa = (_kanwain / 16) + me._kanwa;
		temp_dhur = (temp_kanwa / 16) + me._dhur;
		temp_kattha = (temp_dhur / 20) + me._kattha;

		if (me._bigha !== 0) {
			temp_kattha = me._bigha * 20 + temp_kattha;
		}
		return temp_kattha;
	}

	function toBighaBase() {
		var me = this,
			temp_kanwa = 0,
			temp_dhur = 0,
			temp_kattha = 0,
			temp_bigha = 0;
		temp_kanwa = (me._kanwain / 16) + me._kanwa;
		temp_dhur = (temp_kanwa / 16) + me._dhur;
		temp_kattha = (temp_dhur / 20) + me._kattha;
		temp_bigha = (temp_kattha / 20) + me._bigha;

		return temp_bigha;
	}

	function KhatthaBase(r1, r2) {
		temp = new KhatthaBase();
		var addVal = 0;

		temp.Kanwain = r1.Kanwain + r2.Kanwain;
		if (temp.Kanwain >= 4) {
			temp.Kanwain = temp.Kanwain - 4;
			addVal = 1;
		} else {
			addVal = 0;
		}
		temp.Kanwa = r1.Kanwa + r2.Kanwa;
		if (temp.Kanwa >= 4) {
			temp.Kanwa = temp.Kanwa - 4;
			addVal = 1;
		} else
			addVal = 0;

		temp.Dhur = r1.Dhur + r2.Dhur + addVal;
		if (temp.Dhur >= 20) {
			temp.Dhur = temp.Dhur - 20;
			addVal = 1;
		} else
			addVal = 0;

		temp.Kattha = r1.Kattha + r2.Kattha + addVal;
		if (temp.Kattha >= 20) {
			temp.Kattha = temp.Kattha - 20;
			addVal = 1;
		} else
			addVal = 0;

		temp.Bigha = r1.Bigha + r2.Bigha + addVal;
		return temp;
	}

	function ToString() {
		var me = this,
			retStr; // = new String();
		retStr.concat(me._bigha.toString('0'));
		retStr.concat("-");
		retStr.concat(me._kattha.toString('0'));
		retStr.concat("-");

		if (LAND_AREA_SHOW_KANWA.toString() == '0') {
			if (me._kanwa > 0) {
				retStr.Append("-");
				retStr.Append(_kanwa.toString("0"));
			}
			if (me._kanwain > 0) {
				retStr.concat("-");
				retStr.concat(me._kanwain.toString("0.00"));
			}
		} else {
			retStr.concat("-");
			retStr.concat(me._kanwa.toString("0"));
			retStr.concat("-");
			retStr.concat(me._kanwain.toString("0"));
		}
		return retStr.toString();
	}

	function ToBigaKathaDhur(argument) {
		var me = this,
			retStr; // = new String();
		retStr.concat(me._bigha.toString("0"));
		retStr.concat("-");
		retStr.concat(me._kattha.toString("0"));
		retStr.concat("-");
		retStr.concat(Math.trunc(me._dhur).toString("0"));
		//--Commented Since Kanwain included
		if (LAND_AREA_SHOW_KANWA.toString() == '0') {
			var _dhurInitial = (me._dhur.toString("0.00")).toFixed(2),
				_dhurTmp = Math.trunc(me._dhur),
				_kanwaTmp = (_dhurInitial - _dhurTmp);

			if (_kanwaTmp == 0.025) {
				retStr.concat("1/4");
			} else if (_kanwaTmp == 0.50) {
				retStr.concat("1/2");
			} else if (_kanwaTmp == 0.75) {
				retStr.concat("3/4");
			} else {
				var newval = [];
				newval = _kanwaTmp.toString().split('.');
				var SecVal;
				if (newval.length > 1) {
					SecVal = newval[1];
				} else {
					SecVal = "00";
				}
				retStr.concat("." + SecVal);
			}
		} else {
			retStr.concat("-");
			retStr.concat(me._kanwa.toString("0"));
			retStr.concat("-");
			retStr.concat(me._kanwain.toString("0.00"));
		}
		return retStr.toString();
	}

	function ToBigaKathaDhurKanwain() {
		var me = this,
			retStr; // = new String();

		//retStr.Remove(0, retStr.Length);
		retStr.concat(me._bigha.toString("0"));
		retStr.concat("-");
		retStr.concat(me._kattha.toString("0"));
		retStr.concat("-");
		retStr.concat(Math.trunc(me._dhur).toString("0"));

		var _dhurInitial = (_dhur.toString()).toFixed(2),
			_dhurTmp = Math.trunc(me._dhur),
			_kanwaTmp = _dhurInitial - _dhurTmp;

		if (_kanwaTmp == 0.25) {
			retStr.concat("1/4");
		} else if (_kanwaTmp == 0.50) {
			retStr.concat("1/2");
		} else if (_kanwaTmp == 0.75) {
			retStr.concat("3/4");
		} else {
			var newval = [];
			newval = _kanwaTmp.toString().split('.');
			var SecVal;
			if (newval.Length > 1) {
				SecVal = newval[1];
			} else {
				SecVal = "00";
			}
			retStr.concat("." + SecVal);
		}

		return retStr.toString();
	}

	function CompareTo(other) {
		if (toKatthaBase() == other.toKatthaBase())
			return 0;
		else if (toKatthaBase() > other.toKatthaBase())
			return 1;
		else
			return -1;
	}