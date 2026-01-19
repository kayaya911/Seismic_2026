//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// stricter parsing and error handling
"use strict";

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// Filter Window Parameters ---------------------------------------------------------------------
function BaselineCorrection_Change() {
    // Declaration of variables
    let Indx = document.getElementById('BaselineCorrection').selectedIndex;
}
function FilterName_Change() {
    // Declaration of variables
    let FilterTable, Indx;

    // Get the index number of the FilterName
    Indx = document.getElementById('FilterName').selectedIndex;

    // Disable the FilterTable rows if no filtering is selected 
    if (Indx === 0) {
        document.getElementById('FilterType').disabled      = true;
        document.getElementById('FilterOrder').disabled     = true;
        document.getElementById('F1').disabled              = true;
        document.getElementById('F2').disabled              = true;
        document.getElementById('RippleSize').disabled      = true;
        document.getElementById('ZeroPhase').disabled       = true;
    }
    else {
        document.getElementById('FilterType').disabled      = false;
        document.getElementById('FilterOrder').disabled     = false;
        document.getElementById('F1').disabled              = false;
        document.getElementById('F2').disabled              = false;
        document.getElementById('RippleSize').disabled      = false;
        document.getElementById('ZeroPhase').disabled       = false;
    }

    // Display Maximum Ripplesize if Chebyshev-filter type is selected
    FilterTable = document.getElementById('FilterTable');
    if (Indx === 2) {
        FilterTable.rows[3].style.display = "table-row";
    }
    else {
        FilterTable.rows[3].style.display = "none";
    }
}
function FilterType_Change() {
    // Declaration of variables
    let FilterTable, Indx, F1, F2;

    // Get all filter paraeters
    Indx = document.getElementById('FilterType').selectedIndex;

    // Show F2 if Band-Pass is selected; otherwise, hide F2.
    FilterTable = document.getElementById('FilterTable');
    if      (Indx === 0) { FilterTable.rows[2].style.display = "none";      } 
    else if (Indx === 1) { FilterTable.rows[2].style.display = "none";      }
    else if (Indx === 2) { 
        F1 = Number(document.getElementById('F1').value);
        F2 = Number(document.getElementById('F2').value);
        if (F1>F2) { 
            document.getElementById('F1').value = F2;
            document.getElementById('F2').value = F1;
        }
        else if (F1 == F2) {
            document.getElementById('F2').value = F2 + 0.5;
        }
        FilterTable.rows[2].style.display = "table-row";
    }
}
function FilterOrder_Change() {
    // Filter order must be between zero and 8   (0 < FilterOrder <=8)
    // No changes are made in case of invalid entry.

    // Declaration of variables
    let x = document.getElementById('FilterOrder');

    if (Number(x.value) <= 0 || Number(x.value) > 12) {
        // Invalid entry.
        document.getElementById('FilterOrder').value = x.oldValue;
    }
    else {
        // Valid entry.
        document.getElementById('FilterOrder').value = String(Math.ceil(Number(x.value)));
    }
}
function F1_Change() {
    // Declaration of variables
    let x          = document.getElementById('F1');
    let F2         = Number(document.getElementById('F2').value);
    let FilterType = document.getElementById('FilterType').selectedIndex;

    // Make sure that the F1 cut-off frequency is between 0 < F1 < F2 < FNyquist
    if (Number(x.value) <= 0) {
        document.getElementById('F1').value = x.oldValue;
    }
    else if ((FilterType == 2) && (Number(x.value) >= F2)) {
        // Band-Pass filter 
        document.getElementById('F1').value = x.oldValue;
    }
    else {
        document.getElementById('F1').value        = String(Number(x.value));
        document.getElementById('F1').defaultValue = String(Number(x.value));
    }
}
function F2_Change() {

    // Declaration of variables
    let F1 = Number(document.getElementById('F1').value);
    let x  = document.getElementById('F2');

    // Make sure that the F2 cut-off corner frequency is between:  0 < F1 < F2 < FNyquist
    if (Number(x.value) <= 0) {
        document.getElementById('F2').value = x.oldValue;
    }
    else if ( Number(x.value) <= F1 ) {
        document.getElementById('F2').value = x.oldValue;
    }
    else {
        document.getElementById('F2').value        = String(Number(x.value));
        document.getElementById('F2').defaultValue = String(Number(x.value));
    }
}
function RippleSize_Change() {
    // Ripple Size (dB) is used for Chebyshev tyype of filter only
    // Ripple size must be greater than zero.
    let x = document.getElementById('RippleSize');

    if (Number(x.value) <= 0) {
        // Invalid entry
        document.getElementById('RippleSize').value = x.defaultValue;
    }
    else {
        // Valid entry
        document.getElementById('RippleSize').value        = String(Number(x.value));
        document.getElementById('RippleSize').defaultValue = String(Number(x.value));
    }
}
function ZeroPhase_Change() {

    if (document.getElementById("ZeroPhase").checked){
        // Do something
    }
    else {
        // Do something else
    }
}
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// SDOF Window Parameters -----------------------------------------------------------------------
function SDOF_AnalysisType() {

    // Declaration of variables
    let SDOF_Table, Indx;

    // Get the table that contains SDOF Analysis Parameters 
    SDOF_Table = document.getElementById('SDOF_Parameters_Table');

    // Get the index number of the SDOF_Analysis
    Indx = document.getElementById('SDOF_Analysis').selectedIndex;

    // Disable the FilterTable rows if no filtering is selected 
    if (Indx === 0) {
        SDOF_Table.rows[0].style.display  = "table-row";
        SDOF_Table.rows[1].style.display  = "table-row";
        SDOF_Table.rows[2].style.display  = "table-row";
        SDOF_Table.rows[3].style.display  = "table-row";
        SDOF_Table.rows[4].style.display  = "table-row";
        SDOF_Table.rows[5].style.display  = "table-row";
        SDOF_Table.rows[6].style.display  = "none";
        SDOF_Table.rows[7].style.display  = "none";
        SDOF_Table.rows[8].style.display  = "none";
        SDOF_Table.rows[9].style.display  = "none";
        SDOF_Table.rows[10].style.display = "none";
    } else if (Indx == 1) {
        SDOF_Table.rows[0].style.display  = "table-row";
        SDOF_Table.rows[1].style.display  = "table-row";
        SDOF_Table.rows[2].style.display  = "table-row";
        SDOF_Table.rows[3].style.display  = "table-row";
        SDOF_Table.rows[4].style.display  = "table-row";
        SDOF_Table.rows[5].style.display  = "table-row";
        SDOF_Table.rows[6].style.display  = "table-row";
        SDOF_Table.rows[7].style.display  = "table-row";
        SDOF_Table.rows[8].style.display  = "none";
        SDOF_Table.rows[9].style.display  = "none";
        SDOF_Table.rows[10].style.display = "none";
    } else if ((Indx == 2) || (Indx == 3) || (Indx == 4)) {
        SDOF_Table.rows[0].style.display  = "table-row";
        SDOF_Table.rows[1].style.display  = "table-row";
        SDOF_Table.rows[2].style.display  = "none";
        SDOF_Table.rows[3].style.display  = "none";
        SDOF_Table.rows[4].style.display  = "table-row";
        SDOF_Table.rows[5].style.display  = "table-row";
        SDOF_Table.rows[6].style.display  = "none";
        SDOF_Table.rows[7].style.display  = "none";
        SDOF_Table.rows[8].style.display  = "none";
        SDOF_Table.rows[9].style.display  = "none";
        SDOF_Table.rows[10].style.display = "none";
    } else if (Indx == 5) {
        SDOF_Table.rows[0].style.display  = "table-row";
        SDOF_Table.rows[1].style.display  = "table-row";
        SDOF_Table.rows[2].style.display  = "none";
        SDOF_Table.rows[3].style.display  = "none";
        SDOF_Table.rows[4].style.display  = "table-row";
        SDOF_Table.rows[5].style.display  = "table-row";
        SDOF_Table.rows[6].style.display  = "none";
        SDOF_Table.rows[7].style.display  = "none";
        SDOF_Table.rows[8].style.display  = "table-row";
        SDOF_Table.rows[9].style.display  = "table-row";
        SDOF_Table.rows[10].style.display = "table-row";
    }
}
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// Response Spectrum Window Parameters ----------------------------------------------------------
function ResSpec_AnalysisType() {   

    // Declaration of variables
    let ResSpec_Table1, ResSpec_Table2, Indx;

    // Get the table that contains Response Spectrum Analysis Parameters 
    ResSpec_Table1 = document.getElementById('ResSpec_Parameters_Table1');

    // Get the index number of the SDOF_Analysis
    Indx = document.getElementById('ResSpec_Analysis').selectedIndex;

    // Disable the FilterTable rows if no filtering is selected 
    if (Indx === 0) {
        ResSpec_Table1.rows[0].style.display  = "table-row";
        ResSpec_Table1.rows[1].style.display  = "table-row";
        ResSpec_Table1.rows[2].style.display  = "table-row";
        ResSpec_Table1.rows[3].style.display  = "table-row";
        ResSpec_Table1.rows[4].style.display  = "none";
        ResSpec_Table1.rows[5].style.display  = "none";
     } else if (Indx === 1) {
        ResSpec_Table1.rows[0].style.display  = "table-row";
        ResSpec_Table1.rows[1].style.display  = "table-row";
        ResSpec_Table1.rows[2].style.display  = "table-row";
        ResSpec_Table1.rows[3].style.display  = "table-row";
        ResSpec_Table1.rows[4].style.display  = "table-row";
        ResSpec_Table1.rows[5].style.display  = "table-row";
    }
}
function ResSpec_Damping_Change(x) {

    // Declaration of variables
    let ResSpec_Table2, DampinRatioNumber, i;

    // Round the value of the Ductility Count to ceil and convert to String 
    if (Number(x.value) <= 0 || Number(x.value) > 4) {
        x.value = x.oldValue;
    } else {
        x.value = String(Math.ceil(Number(x.value))); 
    }

    // Get the table that contains Response Spectrum Analysis Parameters 
    ResSpec_Table2 = document.getElementById('ResSpec_Parameters_Table2');

    // Number of Constant Ductility Count 
    DampinRatioNumber = Number(ResSpec_Table2.rows[1].cells[1].getElementsByTagName('input')[0].value);
    for (i = 2; i < DampinRatioNumber+2; i++) {
        ResSpec_Table2.rows[i].style.display  = "table-row"; 
    }
    for (i = DampinRatioNumber + 2; i <= 5; i ++) { 
        ResSpec_Table2.rows[i].style.display  = "none"; 
    }
}
function ResSpec_Ductility_Change(x) {

    // Declaration of variables
    let ResSpec_Table2, DispDuctNumber, i;

    // Round the value of the Ductility Count to ceil and convert to String 
    if (Number(x.value) <= 0 || Number(x.value) > 4) {
        x.value = x.oldValue;
    } else {
        x.value = String(Math.ceil(Number(x.value))); 
    }

    // Get the table that contains Response Spectrum Analysis Parameters 
    ResSpec_Table2 = document.getElementById('ResSpec_Parameters_Table2');

    // Number of Constant Ductility Count 
    DispDuctNumber = Number(ResSpec_Table2.rows[7].cells[1].getElementsByTagName('input')[0].value);
    for (i = 8; i < DispDuctNumber+8; i++) {
        ResSpec_Table2.rows[i].style.display  = "table-row"; 
    }
    for (i = DispDuctNumber + 8; i <= 11; i ++) { 
        ResSpec_Table2.rows[i].style.display  = "none"; 
    }
}
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// 


