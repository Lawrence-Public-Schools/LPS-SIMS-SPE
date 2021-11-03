/*----------------------------------------------------------
| FileName: 'lps_sims_spe.js'
| Description: JavaScript for LPS-SIMS-SPE plugin
|  + Originally located in spe.html - <script> block
|  :  migration may cause errors with PowerSchool DATs
| Author: Benjamin Houle
----------------------------------------------------------*/
window.onload = function() {
  checkDefaultInfo();
  checkStateStuNum();
  var dist = "~(f.table_info;table=Prefs;dothisfor=ALL;fn=value;field=Value;fieldtype=INT;query=([Prefs]Name.eq.districtnumber);fixlen=4,0,3)";
  var altNum = "~([Schools]Alternate_School_Number;nohtml)";
  var schoolNum = "~([Students]schoolID;nohtml)";
  var schCode = "";

  if (altNum != "" && altNum != "0") {
      if (altNum.length <= 4 ) {
          altNum = "0000" + altNum;
          schCode = dist + altNum.substring(altNum.length-4, altNum.length);
      } else {
          altNum = "00000000" + altNum;
          schCode = altNum.substring(altNum.length-8, altNum.length);
      }
  } else {
      if (schoolNum.length <= 4) {
          schoolNum = "0000" + schoolNum;
          schCode = dist + schoolNum.substring(schoolNum.length-4, schoolNum.length);
      } else {
          schoolNum = "00000000" + schoolNum;
          schCode = schoolNum.substring(schoolNum.length-8, schoolNum.length);
      }
  }
}

function checkDefaultInfo() {
  if (document.getElementById('enrollstatus').value == "04"
	&& (document.getElementById('futureplans').value == "500"
		|| document.getElementById('gradstatus').value == "00")
  ) {
    var errormsg1;
		document.getElementById('futureplans').value == "500" ? errormsg1 = " - DOE033 (Post Graduate Plans) must be set to something other than 500 \n" : errormsg1 = "";

    var errormsg2;
		document.getElementById('gradstatus').value == "00" ? errormsg2 = " - DOE037 (Graduate) must be set to something other than 00" : errormsg2 = "";

		alert("When DOE012 (Enrollment Status) is set to Graduated: \n" + errormsg1 + errormsg2 );
		closeLoading();
		return false;
	}

	if (document.getElementById('MA_SchoolCode').value == "" || document.getElementById('MA_AltEd').value == "") {
		if (document.getElementById('MA_SchoolCode').value == "") {
			var dist = "~(f.table_info;table=Prefs;dothisfor=ALL;fn=value;field=Value;fieldtype=INT;*Name=districtnumber;fixlen=4,0,3)";
			var altNum = "~([Schools]Alternate_School_Number;nohtml)";
			var schoolNum = "~([Students]schoolID;nohtml)";
			var schCode = "";
			if (altNum != "" && altNum != "0") {
				if (altNum.length <= 4 ) {
					altNum = '0000' + altNum;
					schCode = dist + altNum.substring(altNum.length-4, altNum.length);
				}	else {
					altNum = '00000000' + altNum;
					schCode = altNum.substring(altNum.length-8, altNum.length);
				}
      } else {
        if (schoolNum.length <= 4) {
          schoolNum = '0000' + schoolNum;
          schCode = dist + schoolNum.substring(schoolNum.length-4, schoolNum.length);
        } else {
          schoolNum = '00000000' + schoolNum;
          schCode = schoolNum.substring(schoolNum.length-8, schoolNum.length);
        }
			}
	    var MASchoolCode = document.getElementById('MA_SchoolCode');
			MASchoolCode.value = '' + schCode + '';
		}
		
    if (document.getElementById('MA_AltEd').value == "") {
			var MAAltEd = document.getElementById('MA_AltEd');
			MAAltEd.value = '00000000';
		}
	}
  return true;
}

function checkStateStuNum(ele) {
  document.getElementById('errormessage').innerHTML = "SASID must contain 10 numeric characters (0-9)";
	if (isNaN(ele.value)) {
    ele.value = "";	
  } else if (ele.value.length <= 10) {
		document.getElementById('errormessage').innerHTML = "";
	}
	return false;
}



