function myIndexOf(haystack, needle) {
    var out = -1;
    for (var $i = 0; $i < haystack.length; $i++) {

        if (needle == haystack[$i]) {
            out = $i;
        }

    }
    return out;
}

function pattern_match(rule, str) {
    str = str.replace(/[A-Za-z$-]/g, "");
    var match = true;
    if (str.length == rule.length) {
        for (var $i = 1; $i <= rule.length; $i++) {
            var str_l = str.substring(($i - 1), $i);
            var rule_l = rule.substring(($i - 1), $i);
            if (str_l != rule_l && rule_l != "x") {
                match = false;
            }
        }
    }
    else {
        match = false;
    }

    return match;
}

function ctry() {

    var uCountries = ["AT", "DK", "DE", "IT", "NL", "PT", "SK", "CH", "BE", "HR", "EE", "GR", "LV", "NO", "RO", "SI", "TR", "FI", "HU", "LT", "RO", "ES", "BG", "CZ", "FR", "PL", "SE", "LU", "EG", "MY", "KR", "IL", "SA", "AE", "NO", "TR", "RS", "AU", "NZ", "BR", "MX", "MA", "CO", "RU", "ME"];
    var uPatternsCtr = ["PT"];
    var uPatternsReg = ["9xxxxxx"];
    var eCountries = ["LU", "BG", "PL", "CH", "SE", "NO", "HR", "DK", "DE", "NL", "LT", "SI", "BE", "EE", "AT", "FI", "LV", "HU", "RO", "CZ", "ES", "GR", "IT", "FR", "SK", "VE", "IC"];
    var eCountriesZipReg = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    var ePrices = ["29 zł", "21 zł", "19 zł", "24 zł", "21 zł", "36 zł", "19 zł", "21 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "23 zł", "28 zł", "16 zł", "21 zł", "29 zł", "42 zł", "29 zł", "29 zł", "7 zł", "63 zł"];
    var zipCountries = ["PT", "GB", "PE"];
    var zipMaxLength = ["8", "8", "64"];
    var ccpCountries = ["GB", "IC", "CY"];
    var ccpPrices = ["96 zł", "63 zł", "63 zł"];

    var defaultZipLength = 6;

    var selCountry = document.getElementById("country").value;


    var infoTxt_no_pay_on_delivery = "Wysy\u0142ka za pobraniem (p\u0142atno\u015b\u0107 przy odbiorze) nie jest dost\u0119pna w wybranym kraju.\n\nZa przesy\u0142k\u0119 mo\u017cesz zap\u0142aci\u0107 w nast\u0119pnym kroku kart\u0105 kredytow\u0105, przelewem bankowym lub przy u\u017cyciu systemu p\u0142atno\u015bci online.";

    var infoTxt_extra_for_shipping = "Koszty przesy\u0142ki: ";

    //cod_payment
    codpayElement = document.getElementById("cod_pay_div");
    if (codpayElement != null) {

        //if(ccpCountries.indexOf(selCountry) >= 0 )
        if (myIndexOf(ccpCountries, selCountry) >= 0) {
            var ccpCountryId = myIndexOf(ccpCountries, selCountry);
            var infoTxt_cod_pay = "Firma kurierska dolicza _PARAM1_ do przesy\u0142ek pobraniowych";
            infoTxt_cod_pay = infoTxt_cod_pay.replace("_PARAM1_", ccpPrices[ccpCountryId]);
            //document.getElementById("cod_pay_div").innerText = infoTxt_cod_pay;
            if (document.all) {
                document.getElementById("cod_pay_div").innerText = infoTxt_cod_pay;
            } else {
                document.getElementById("cod_pay_div").textContent = infoTxt_cod_pay;
            }
        }
        else {
            //document.getElementById("cod_pay_div").innerText = "";
            if (document.all) {
                document.getElementById("cod_pay_div").innerText = "";
            } else {
                document.getElementById("cod_pay_div").textContent = "";
            }
        }
    }

    var zip = document.getElementById("pcode").value;


    //if(uCountries.indexOf(selCountry) == -1 ||
    //(uPatternsCtr.indexOf(selCountry) > -1 && pattern_match(uPatternsReg[uPatternsCtr.indexOf(selCountry)], zip))
    if (myIndexOf(uCountries, selCountry) == -1 ||
        (myIndexOf(uPatternsCtr, selCountry) > -1 && pattern_match(uPatternsReg[myIndexOf(uPatternsCtr, selCountry)], zip))
    ) {
        alert(infoTxt_no_pay_on_delivery);
        if (document.getElementById("coddiv") != null) {
            document.getElementById("coddiv").style.color = "#bbbbbb";
            document.getElementById("codinp").disabled = true;
            document.getElementById("codinp").checked = false;
        }
    } else {
        if (document.getElementById("coddiv") != null) {
            document.getElementById("coddiv").style.color = "#000000";
            document.getElementById("codinp").disabled = false;
        }
    }

    //var zipCountryId = zipCountries.indexOf(selCountry);
    var zipCountryId = myIndexOf(zipCountries, selCountry);
    if (zipCountryId > -1) {
        document.getElementById("pcode").maxLength = zipMaxLength[zipCountryId];
    } else {
        document.getElementById("pcode").maxLength = defaultZipLength;
    }

    //var eCountryId = eCountries.indexOf(selCountry);
    var eCountryId = myIndexOf(eCountries, selCountry);

    if (eCountryId > -1) {

        zip = zip.replace(/[A-Za-z$-]/g, "");
        var regexp = eCountriesZipReg[eCountryId];

        //if(pattern_match(regexp, zip) || regexp =="")
        //	alert(infoTxt_extra_for_shipping + ePrices[eCountryId]);

    }
}


function zipchange() {
    var uCountries = new Array("AT", "DK", "DE", "IT", "NL", "PT", "SK", "CH", "BE", "HR", "EE", "GR", "LV", "NO", "RO", "SI", "TR", "FI", "HU", "LT", "RO", "ES", "BG", "CZ", "FR", "PL", "SE", "LU", "EG", "MY", "KR", "IL", "SA", "AE", "NO", "TR", "RS", "AU", "NZ", "BR", "MX", "MA", "CO", "RU", "ME");
    var uPatternsCtr = new Array("PT");
    var uPatternsReg = new Array("9xxxxxx");
    var eCountries = new Array("LU", "BG", "PL", "CH", "SE", "NO", "HR", "DK", "DE", "NL", "LT", "SI", "BE", "EE", "AT", "FI", "LV", "HU", "RO", "CZ", "ES", "GR", "IT", "FR", "SK", "VE", "IC");
    var eCountriesZipReg = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
    var ePrices = new Array("29 zł", "21 zł", "19 zł", "24 zł", "21 zł", "36 zł", "19 zł", "21 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "29 zł", "23 zł", "28 zł", "16 zł", "21 zł", "29 zł", "42 zł", "29 zł", "29 zł", "7 zł", "63 zł");
    var zipCountries = new Array("PT", "GB", "PE");
    var zipMaxLength = new Array("8", "8", "64");
    var ccpCountries = new Array("GB", "IC", "CY");
    var ccpPrices = new Array("96 zł", "63 zł", "63 zł");

    var defaultZipLength = 6;

    var selCountry = document.getElementById("country").value;
    var infoTxt_no_pay_on_delivery = "Wysy\u0142ka za pobraniem (p\u0142atno\u015b\u0107 przy odbiorze) nie jest dost\u0119pna w wybranym kraju.\n\nZa przesy\u0142k\u0119 mo\u017cesz zap\u0142aci\u0107 w nast\u0119pnym kroku kart\u0105 kredytow\u0105, przelewem bankowym lub przy u\u017cyciu systemu p\u0142atno\u015bci online.";

    var infoTxt_extra_for_shipping = "Koszty przesy\u0142ki: ";

    //cod_payment
    codpayElement = document.getElementById("cod_pay_div");


    var zip = document.getElementById("pcode").value;


    //if(uCountries.indexOf(selCountry) == -1 ||
    //(uPatternsCtr.indexOf(selCountry) > -1 && pattern_match(uPatternsReg[uPatternsCtr.indexOf(selCountry)], zip))
    if (myIndexOf(uCountries, selCountry) == -1 ||
        (myIndexOf(uPatternsCtr, selCountry) > -1 && pattern_match(uPatternsReg[myIndexOf(uPatternsCtr, selCountry)], zip))
    ) {
        if (document.getElementById("coddiv") != null) {
            document.getElementById("coddiv").style.color = "#bbbbbb";
            document.getElementById("codinp").disabled = true;
            document.getElementById("codinp").checked = false;
        }
    } else {
        if (document.getElementById("coddiv") != null) {
            document.getElementById("coddiv").style.color = "#000000";
            document.getElementById("codinp").disabled = false;
        }
    }

    //var zipCountryId = zipCountries.indexOf(selCountry);
    var zipCountryId = myIndexOf(zipCountries, selCountry);
    if (zipCountryId > -1) {
        document.getElementById("pcode").maxLength = zipMaxLength[zipCountryId];
    } else {
        document.getElementById("pcode").maxLength = defaultZipLength;
    }

    //var eCountryId = eCountries.indexOf(selCountry);
    var eCountryId = myIndexOf(eCountries, selCountry);
    if (eCountryId > -1) {

        zip = zip.replace(/[A-Za-z$-]/g, "");
        var regexp = eCountriesZipReg[eCountryId];

        //if(pattern_match(regexp, zip))
        //	alert(infoTxt_extra_for_shipping + ePrices[eCountryId]);

    }
}
	