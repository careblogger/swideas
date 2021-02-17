window.onload = (function () {

    document.getElementById("pcode").onblur = function () {
        zipchange();
        return true;
    };
    document.getElementById("pcode").maxLength = 8;

    var selCountry = document.getElementById("country").value;
    var zip = document.getElementById("pcode").value;
    var uCountries = new Array("AT", "DK", "DE", "IT", "NL", "PT", "SK", "CH", "BE", "HR", "EE", "GR", "LV", "NO", "RO", "SI", "TR", "FI", "HU", "LT", "RO", "ES", "BG", "CZ", "FR", "PL", "SE", "LU", "EG", "MY", "KR", "IL", "SA", "AE", "NO", "TR", "RS", "AU", "NZ", "BR", "MX", "MA", "CO", "RU", "ME");
    var uPatternsCtr = new Array("PT");
    var uPatternsReg = new Array("9xxxxxx");
    var infoTxt_no_pay_on_delivery = "Wysy\u0142ka za pobraniem (p\u0142atno\u015b\u0107 przy odbiorze) nie jest dost\u0119pna w wybranym kraju.\n\nZa przesy\u0142k\u0119 mo\u017cesz zap\u0142aci\u0107 w nast\u0119pnym kroku kart\u0105 kredytow\u0105, przelewem bankowym lub przy u\u017cyciu systemu p\u0142atno\u015bci online.";
    //if(uCountries.indexOf(selCountry) == -1 ||
    //(uPatternsCtr.indexOf(selCountry) > -1 && pattern_match(uPatternsReg[uPatternsCtr.indexOf(selCountry)], zip))
    if (myIndexOf(uCountries, selCountry) == -1 ||
        (myIndexOf(uPatternsCtr, selCountry) > -1 && pattern_match(uPatternsReg[myIndexOf(uPatternsCtr, selCountry)], zip))
    ) {
        //alert(infoTxt_no_pay_on_delivery);
        if (document.getElementById("coddiv") != null) {
            document.getElementById("coddiv").style.color = "#bbbbbb";
            document.getElementById("codinp").disabled = true;
            document.getElementById("codinp").checked = false;
        }
    }
});
