htPunctuation = {};
listStaticSuffix = {};
listStaticPrefix = {};
listHelpNotation = {};

var InrToWordConverter = function() {

};

function Initialize() {
    InrToWordConverter.LoadStaticPrefix();
    InrToWordConverter.LoadStaticSuffix();
    InrToWordConverter.LoadHelpofNotation();
};

function ConvertToWord(inpval) {
    Initialize();
    var val=parseFloat(inpval).toFixed(2);
    var value = val.toString();
    //console.log(value);
    if (value) {
        var tokens = value.split(".");
        var rsPart = "";
        var psPart = "";
        if (tokens.length === 2) {
            rsPart = String.trim(tokens[0]) || "0";
            psPart = String.trim(tokens[1]) || "0";
        } else if (tokens.length === 1) {
            rsPart = String.trim(tokens[0]) || "0";
            psPart = "0";
        } else {
            rsPart = "0";
            psPart = "0";
        }

        htPunctuation = {};
        var rsInWords = InrToWordConverter.ConvertToWordInternal(rsPart) || "Zero";
        var psInWords = InrToWordConverter.ConvertToWordInternal(psPart) || "Zero";

        var result = "";
        if (parseInt(psPart) === 0) {
            result = rsInWords + " Only.";
        } else {
            result = rsInWords + "and " + psInWords + " Paisa Only.";
        }
        return result;
    }
};

InrToWordConverter.ConvertToWordInternal = function(value) {
    var convertedString = "";
    if (!(value.toString().length > 40)) {
        if (InrToWordConverter.IsNumeric(value.toString())) {
            try {
                var strValue = InrToWordConverter.Reverse(value);
                switch (strValue.length) {
                    case 1:
                        if (parseInt(strValue.toString()) > 0) {
                            convertedString = InrToWordConverter.GetWordConversion(value);
                        } else {
                            convertedString = "Zero ";
                        }
                        break;
                    case 2:
                        convertedString = InrToWordConverter.GetWordConversion(value);
                        break;
                    default:
                        InrToWordConverter.InsertToPunctuationTable(strValue);
                        InrToWordConverter.ReverseHashTable();
                        convertedString = InrToWordConverter.ReturnHashtableValue();
                        break;
                }
            } catch (exception) {
                convertedString = "Unexpected Error Occured <br/>";
            }
        } else {
            convertedString = "Please Enter Numbers Only, Decimal Values Are not supported";
        }
    } else {
        convertedString = "Please Enter Value in Less Then or Equal to 40 Digit";
    }
    return convertedString;
};

InrToWordConverter.IsNumeric = function(valueInNumeric) {
    var isFine = true;
    valueInNumeric = valueInNumeric || "";
    var len = valueInNumeric.length;
    for (var i = 0; i < len; i++) {
        var ch = valueInNumeric[i];
        if (!(ch >= '0' && ch <= '9')) {
            isFine = false;
            break;
        }
    }
    return isFine;
};

InrToWordConverter.ReturnHashtableValue = function() {
    var strFinalString = "";
    var keysArr = [];
    for (var key in htPunctuation) {
        keysArr.push(key);
    }
    for (var i = keysArr.length - 1; i >= 0; i--) {
        var hKey = keysArr[i];
        if (InrToWordConverter.GetWordConversion((htPunctuation[hKey]).toString()) !== "") {
            strFinalString = strFinalString + InrToWordConverter.GetWordConversion((htPunctuation[hKey]).toString()) + InrToWordConverter.StaticPrefixFind((hKey).toString());
        }
    }
    return strFinalString;
};

InrToWordConverter.ReverseHashTable = function() {
    var htTemp = {};
    for (var key in htPunctuation) {
        var item = htPunctuation[key];
        htTemp[key] = InrToWordConverter.Reverse(item.toString());
    }
    htPunctuation = {};
    htPunctuation = htTemp;
};

InrToWordConverter.InsertToPunctuationTable = function(strValue) {
    htPunctuation[1] = strValue.substr(0, 3).toString();
    var j = 2;
    for (var i = 3; i < strValue.length; i = i + 2) {
        if (strValue.substr(i).length > 0) {
            if (strValue.substr(i).length >= 2) {
                htPunctuation[j] = strValue.substr(i, 2).toString();
            } else {
                htPunctuation[j] = strValue.substr(i, 1).toString();
            }
        } else {
            break;
        }
        j++;

    }
};

InrToWordConverter.Reverse = function(strValue) {
    var reversed = "";
    for (var i in strValue) {
        var ch = strValue[i];
        reversed = ch + reversed;
    }
    return reversed;
};

InrToWordConverter.GetWordConversion = function(inputNumber) {
    var toReturnWord = "";
    if (inputNumber.length <= 3 && inputNumber.length > 0) {
        if (inputNumber.length === 3) {
            if (parseInt(inputNumber.substr(0, 1)) > 0) {
                toReturnWord = toReturnWord + InrToWordConverter.StaticSuffixFind(inputNumber.substr(0, 1)) + "Hundred ";
            }

            var tempString = InrToWordConverter.StaticSuffixFind(inputNumber.substr(1, 2));

            if (tempString === "") {
                toReturnWord = toReturnWord + InrToWordConverter.StaticSuffixFind(inputNumber.substr(1, 1) + "0");
                toReturnWord = toReturnWord + InrToWordConverter.StaticSuffixFind(inputNumber.substr(2, 1));
            }
            toReturnWord = toReturnWord + tempString;
        }
        if (inputNumber.length === 2) {
            var tempString = InrToWordConverter.StaticSuffixFind(inputNumber.substr(0, 2));
            if (tempString === "") {
                toReturnWord = toReturnWord + InrToWordConverter.StaticSuffixFind(inputNumber.substr(0, 1) + "0");
                toReturnWord = toReturnWord + InrToWordConverter.StaticSuffixFind(inputNumber.substr(1, 1));
            }
            toReturnWord = toReturnWord + tempString;
        }
        if (inputNumber.length === 1) {
            toReturnWord = toReturnWord + InrToWordConverter.StaticSuffixFind(inputNumber.substr(0, 1));
        }

    }
    return toReturnWord;
};

InrToWordConverter.StaticSuffixFind = function(numberKey) {
    var valueFromNumber = "";
    for (var key in listStaticSuffix) {
        if (String.trim(key.toString()) === String.trim(numberKey)) {
            valueFromNumber = listStaticSuffix[key].toString();
            break;
        }
    }
    return valueFromNumber;
};

InrToWordConverter.StaticPrefixFind = function(numberKey) {
    var valueFromNumber = "";
    for (var key in listStaticPrefix) {
        if (String.trim(key) === String.trim(numberKey)) {
            valueFromNumber = listStaticPrefix[key].toString();
            break;
        }
    }
    return valueFromNumber;
};

InrToWordConverter.StaticHelpNotationFind = function(numberKey) {
    var helpText = "";
    for (var key in listHelpNotation) {
        if (String.trim(key.toString()) === String.trim(numberKey)) {
            helpText = listHelpNotation[key].toString();
            break;
        }
    }
    return helpText;
};

InrToWordConverter.LoadStaticPrefix = function() {
    listStaticPrefix[2] = "Thousand ";
    listStaticPrefix[3] = "Lakh ";
    listStaticPrefix[4] = "Crore ";
    listStaticPrefix[5] = "Arab ";
    listStaticPrefix[6] = "Kharab ";
    listStaticPrefix[7] = "Neel ";
    listStaticPrefix[8] = "Padma ";
    listStaticPrefix[9] = "Shankh ";
    listStaticPrefix[10] = "Maha-shankh ";
    listStaticPrefix[11] = "Ank ";
    listStaticPrefix[12] = "Jald ";
    listStaticPrefix[13] = "Madh ";
    listStaticPrefix[14] = "Paraardha ";
    listStaticPrefix[15] = "Ant ";
    listStaticPrefix[16] = "Maha-ant ";
    listStaticPrefix[17] = "Shisht ";
    listStaticPrefix[18] = "Singhar ";
    listStaticPrefix[19] = "Maha-singhar ";
    listStaticPrefix[20] = "Adant-singhar ";
};

InrToWordConverter.LoadStaticSuffix = function() {
    listStaticSuffix[1] = "One ";
    listStaticSuffix[2] = "Two ";
    listStaticSuffix[3] = "Three ";
    listStaticSuffix[4] = "Four ";
    listStaticSuffix[5] = "Five ";
    listStaticSuffix[6] = "Six ";
    listStaticSuffix[7] = "Seven ";
    listStaticSuffix[8] = "Eight ";
    listStaticSuffix[9] = "Nine ";
    listStaticSuffix[10] = "Ten ";
    listStaticSuffix[11] = "Eleven ";
    listStaticSuffix[12] = "Twelve ";
    listStaticSuffix[13] = "Thirteen ";
    listStaticSuffix[14] = "Fourteen ";
    listStaticSuffix[15] = "Fifteen ";
    listStaticSuffix[16] = "Sixteen ";
    listStaticSuffix[17] = "Seventeen ";
    listStaticSuffix[18] = "Eighteen ";
    listStaticSuffix[19] = "Nineteen ";
    listStaticSuffix[20] = "Twenty ";
    listStaticSuffix[30] = "Thirty ";
    listStaticSuffix[40] = "Fourty ";
    listStaticSuffix[50] = "Fifty ";
    listStaticSuffix[60] = "Sixty ";
    listStaticSuffix[70] = "Seventy ";
    listStaticSuffix[80] = "Eighty ";
    listStaticSuffix[90] = "Ninty ";
};

InrToWordConverter.LoadHelpofNotation = function() {
    listHelpNotation[2] = "=1,000 (3 Trailing Zeros)";
    listHelpNotation[3] = "=1,00,000 (5 Trailing Zeros)";
    listHelpNotation[4] = "=1,00,00,000 (7 Trailing Zeros)";
    listHelpNotation[5] = "=1,00,00,00,000 (9 Trailing Zeros)";
    listHelpNotation[6] = "=1,00,00,00,00,000 (11 Trailing Zeros)";
    listHelpNotation[7] = "=1,00,00,00,00,00,000 (13 Trailing Zeros)";
    listHelpNotation[8] = "=1,00,00,00,00,00,00,000 (15 Trailing Zeros)";
    listHelpNotation[9] = "=1,00,00,00,00,00,00,00,000 (17 Trailing Zeros)";
    listHelpNotation[10] = "=1,00,00,00,00,00,00,00,00,000 (19 Trailing Zeros)";
    listHelpNotation[11] = "=1,00,00,00,00,00,00,00,00,00,000 (21 Trailing Zeros)";
    listHelpNotation[12] = "=1,00,00,00,00,00,00,00,00,00,00,000 (23 Trailing Zeros)";
    listHelpNotation[13] = "=1,00,00,00,00,00,00,00,00,00,00,00,000 (25 Trailing Zeros)";
    listHelpNotation[14] = "=1,00,00,00,00,00,00,00,00,00,00,00,00,000 (27 Trailing Zeros)";
    listHelpNotation[15] = "=1,00,00,00,00,00,00,00,00,00,00,00,00,00,000 (29 Trailing Zeros)";
    listHelpNotation[16] = "=1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000 (31 Trailing Zeros)";
    listHelpNotation[17] = "=1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000 (33 Trailing Zeros)";
    listHelpNotation[18] = "=1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000 (35 Trailing Zeros)";
    listHelpNotation[19] = "=1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000 (37 Trailing Zeros)";
    listHelpNotation[20] = "=1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000 (39 Trailing Zeros)";
};
if (!String.trim) {
    String.trim = function(str) {
        var result = "";
        var firstNonWhiteSpaceFound = false;
        var startIndex = -1;
        var endIndex = -1;
        if (str) {
            for (var i = 0; i < str.length; i++) {
                if (firstNonWhiteSpaceFound === false) {
                    if (str[i] === ' ' || str[i] === '\t') {
                        continue;
                    } else {
                        firstNonWhiteSpaceFound = true;
                        startIndex = i;
                        endIndex = i;
                    }
                } else {
                    if (str[i] === ' ' || str[i] === '\t') {
                        continue;
                    } else {
                        endIndex = i;
                    }
                }
            }
            if (startIndex !== -1 && endIndex !== -1) {
                result = str.slice(startIndex, endIndex + 1);
            }
        }
        return result;
    };
}

module.exports.numbertowords = ConvertToWord;