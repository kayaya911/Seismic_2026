// mathJS library is with lowercase math.multiply()

// stricter parsing and error handling
"use strict";

async function Plotly_Graph_Update(ChNum) {
    // Decleration of variables 
    let traces, layout_update, LegendTitle
    
    let xLabel  = "<b><b>";
    let yLabel  = "<b>" + ChannelList[ChNum].TypeString + "   [" + ChannelList[ChNum].UnitString + "] <b>";  // This is what is stored in the ChannelList[]
    let y2Label = "<b>Phase<b>";

    let res     = GraphUnits(ChNum); 
    let Div_ID  = "PlotArea_ID_" + ChannelList[ChNum].Unique_ID;

    let Statictics_Peak_ID = "Statictics_Peak_ID_" + ChannelList[ChNum].Unique_ID;
    let Statictics_Mean_ID = "Statictics_Mean_ID_" + ChannelList[ChNum].Unique_ID;
    let Statictics_RMS_ID  = "Statictics_RMS_ID_" + ChannelList[ChNum].Unique_ID;

    // Get the existing traces in the Div_ID, then update it
    traces = document.getElementById(Div_ID).data;

    // Get the existing layout in the Div_ID, then update it
    layout_update = document.getElementById(Div_ID).layout;
    layout_update = {
        xaxis  : { zeroline: false, automargin: true, tickfont: { size: 15 },                    linecolor: 'black', linewidth: 1, mirror: true, title: {text: xLabel,  standoff: 5, font: {family: "Arial", size: 17} }, autorange: true },
        yaxis  : { zeroline: true,  automargin: true, tickfont: { size: 15 }, tickformat: '.2e', linecolor: 'black', linewidth: 1, mirror: true, title: {text: yLabel,  standoff: 5, font: {family: "Arial", size: 17} }, autorange: true },
        yaxis2 : { zeroline: false, automargin: true, tickfont: { size: 15 },                    linecolor: 'green', linewidth: 1, mirror: true, title: {text: y2Label, standoff: 5, font: {family: "Arial", size: 17} }, autorange: true, overlaying: 'y', side: 'right', showticklabels: true },
    };

    // Update Graph for this channel
    if (PageNo == 0) {

        // Update Filter row, BaseLine row and GraphUnit row in table 
        // document.getElementById(FilterType_ID).innerHTML        = "";
        // document.getElementById(BaseLine_ID).innerHTML          = "";

        // document.getElementById(GraphUnitRow_ID).style.display  = "none";
        // document.getElementById(FilterRow_ID).style.display     = "none";
        // document.getElementById(BaseLineRow_ID).style.display   = "none";

        // document.getElementById(FilterType_ID).className        = "Plotly_Stat_Body_Td_Right";

        // Update trace for rawData
        traces[0].x = ChannelList[ChNum].time;
        traces[0].y = math.multiply((ChannelList[ChNum].ScaleFactor * res.ScaleFactor), ChannelList[ChNum].data);

        // Update the Statistics of RawData in table - scaled to user-specified unit
        StatTableUpdate(ChannelList[ChNum], res);

        // Legen Title
        LegendTitle = "(Ch-" + ChNum + ") (" +  ChannelList[ChNum].Orientation  + ") (" + Number(ChannelList[ChNum].FSamp).toFixed(3).toString() + " Hz)";
        
        // Update trace infomation
        traces[0].visible = true;
        traces[0].opacity = 1.00;
        traces[0].line    = {color: 'blue', width: 1.50, dash: 'solid' };
        traces[0].name    = 'Raw Data<br>' + ChannelList[ChNum].FileName +'<br>'+ LegendTitle;
        
        traces[1].visible = false;
        traces[1].opacity = 0.35;
        traces[1].line    = {color: 'grey', width: 1.00, dash: 'solid' };
        traces[1].name    = '<b>Filtered Data<b>';

        traces[2].visible = false;
        traces[2].opacity = 0.35;
        traces[2].line    = {color: 'grey', width: 1.00, dash: 'solid' };
        traces[2].name    = '<b>Phase<b>';

        // Update y axis of Graph
        layout_update.yaxis.title.text      = res.yLabel;   // This is the unit that user wants to see on the graph.
        layout_update.yaxis2.showticklabels = false;
        layout_update.yaxis2.title.text     = "";
    }

    
    //-------------------------------------------------------------------------------------------------------------------------
    // Update the graph in the DIV -------------------------------------------------------------------------------------------
    Plotly.update(Div_ID, traces, layout_update);

    
    //-------------------------------------------------------------------------------------------------------------------------
    // Updates all statictical (peak, Mean, RMS) values in the Statictics Table -----------------------------------------------
    function StatTableUpdate(Channel, res) {
        // Decleration of Variables
        let Unit_List, Indx_Acc, Indx_Vel, Indx_Disp;

        // Update Statistics
        if (PageNo == 0) {
            // Update Statistics for Raw Data
            document.getElementById( Statictics_Peak_ID ).innerHTML = (Channel.Peak * res.ScaleFactor).toPrecision(4);
            document.getElementById( Statictics_Mean_ID ).innerHTML = (Channel.Mean * res.ScaleFactor).toPrecision(4);
            document.getElementById( Statictics_RMS_ID  ).innerHTML = (Channel.RMS  * res.ScaleFactor).toPrecision(4);

        }
        else if (PageNo == 1) {
            // Filtered Data Statistics
            document.getElementById( Statictics_Peak_ID ).innerHTML = (Channel.Results.Filter.Peak * res.ScaleFactor).toPrecision(4);
            document.getElementById( Statictics_Mean_ID ).innerHTML = (Channel.Results.Filter.Mean * res.ScaleFactor).toPrecision(4);
            document.getElementById( Statictics_RMS_ID  ).innerHTML = (Channel.Results.Filter.RMS  * res.ScaleFactor).toPrecision(4);

            // Update Filter Info on table 
            let FilterInfo = ChannelList[ChNum].Results.Filter.FilterName_String;
            if (FilterInfo.toUpperCase() == ("None").toUpperCase()) {
                document.getElementById(FilterType_ID).innerHTML    = FilterInfo;
                document.getElementById(FilterRow_ID).style.display = "table-row";
                document.getElementById(FilterType_ID).className    = "Plotly_Stat_Body_Td_Right";
            }
            else {
                if (ChannelList[ChNum].Results.Filter.ErrorMessage != undefined) {
                    document.getElementById(FilterType_ID).innerHTML    =  ChannelList[ChNum].Results.Filter.ErrorMessage;
                    document.getElementById(FilterRow_ID).style.display = "table-row";
                    document.getElementById(FilterType_ID).className    = "Plotly_Stat_Body_Td_Right_Red";
                }
                else {
                    FilterInfo += " " + ChannelList[ChNum].Results.Filter.FilterType_String;
                    FilterInfo += " " + ChannelList[ChNum].Results.Filter.FilterBand;
                    document.getElementById(FilterType_ID).innerHTML    = FilterInfo;
                    document.getElementById(FilterRow_ID).style.display = "table-row";
                    document.getElementById(FilterType_ID).className    = "Plotly_Stat_Body_Td_Right";
                }
            }

            // Update Baseline Correction Info on table
            let BaseLineInfo = ChannelList[ChNum].Results.Filter.BaselineCorrection_String; 
            document.getElementById(BaseLine_ID).innerHTML        = BaseLineInfo;
            document.getElementById(BaseLineRow_ID).style.display = "table-row";

            // Get the list of Units for this channel
            Unit_List = UnitList(Channel.Unit);
        }
        else if (PageNo == 2) {
            // Integral Statistics

            Indx_Acc  = document.getElementById("Int_Acceleration").checked;
            Indx_Vel  = document.getElementById("Int_Velocity").checked;
            Indx_Disp = document.getElementById("Int_Displacement").checked;
            
            if (Indx_Acc) {
                document.getElementById( Statictics_Peak_ID ).innerHTML = (Channel.Peak * res.ScaleFactor).toPrecision(4);
                document.getElementById( Statictics_Mean_ID ).innerHTML = (Channel.Mean * res.ScaleFactor).toPrecision(4);
                document.getElementById( Statictics_RMS_ID  ).innerHTML = (Channel.RMS  * res.ScaleFactor).toPrecision(4);

                // Get the list of Units for this channel
                Unit_List = UnitList(Channel.Unit);

            }
            else if (Indx_Vel) {
                document.getElementById( Statictics_Peak_ID ).innerHTML = (Channel.Results.Integral.Peak_Vel * res.ScaleFactor).toPrecision(4);
                document.getElementById( Statictics_Mean_ID ).innerHTML = (Channel.Results.Integral.Mean_Vel * res.ScaleFactor).toPrecision(4);
                document.getElementById( Statictics_RMS_ID  ).innerHTML = (Channel.Results.Integral.RMS_Vel  * res.ScaleFactor).toPrecision(4);

                // Get the list of Units for this channel
                Unit_List = UnitList(4);
            }
            else if (Indx_Disp) {
                document.getElementById( Statictics_Peak_ID ).innerHTML = (Channel.Results.Integral.Peak_Disp * res.ScaleFactor).toPrecision(4);
                document.getElementById( Statictics_Mean_ID ).innerHTML = (Channel.Results.Integral.Mean_Disp * res.ScaleFactor).toPrecision(4);
                document.getElementById( Statictics_RMS_ID  ).innerHTML = (Channel.Results.Integral.RMS_Disp  * res.ScaleFactor).toPrecision(4);

                // Get the list of Units for this channel
                Unit_List = UnitList(8);
            }

            // Update Integral-Info on table 
            let IntegralInfo = Channel.Results.Integral.FilterName_String;
            if (IntegralInfo.toUpperCase() == ("None").toUpperCase()) {
                document.getElementById(FilterType_ID).innerHTML    = IntegralInfo;
                document.getElementById(FilterRow_ID).style.display = "table-row";
                document.getElementById(FilterType_ID).className    = "Plotly_Stat_Body_Td_Right";
                document.getElementById(GraphUnitRow_ID).style.display = "table-row";
            }
            else {
                if (Channel.Results.Integral.ErrorMessage != undefined) {
                    document.getElementById(FilterType_ID).innerHTML    =  Channel.Results.Integral.ErrorMessage;
                    document.getElementById(FilterRow_ID).style.display = "table-row";
                    document.getElementById(FilterType_ID).className    = "Plotly_Stat_Body_Td_Right_Red";
                    document.getElementById(GraphUnitRow_ID).style.display = "table-row";
                }
                else {
                    IntegralInfo += " " + Channel.Results.Integral.FilterType_String;
                    IntegralInfo += " " + Channel.Results.Integral.FilterBand;
                    document.getElementById(FilterType_ID).innerHTML    = IntegralInfo;
                    document.getElementById(FilterRow_ID).style.display = "table-row";
                    document.getElementById(FilterType_ID).className    = "Plotly_Stat_Body_Td_Right";
                    document.getElementById(GraphUnitRow_ID).style.display = "table-row";
                }
            }

            // Update Baseline Correction Info on table
            let BaseLineInfo = Channel.Results.Integral.BaselineCorrection_String;
            document.getElementById(BaseLine_ID).innerHTML        = BaseLineInfo;
            document.getElementById(BaseLineRow_ID).style.display = "table-row";

        }

    }
    

}

async function Create_Plotly_Graph(Container_Id, Channel) {

    // This function create a new div-element that contains the Plotly-graph and the InforDiv 

    //Decleration of variables 
    let SubContainer, PlotlyDiv, InfoDiv, Span1, Span2, Table, Span2_Info

    // Create a div-element that will contain the following two  div-elements
    // The first div-element is to host Plotly-graph
    // The second div-element is to host Info-table
    SubContainer = document.createElement('div');
    SubContainer.setAttribute('id',    'Div_ID_' + Channel.Unique_ID);
    SubContainer.setAttribute('class', 'Plotly_Main_Container'      );

    // The first div-element Plotly graph
    PlotlyDiv           = document.createElement('div');
    PlotlyDiv.setAttribute('id',    'PlotArea_ID_' + Channel.Unique_ID);
    PlotlyDiv.setAttribute('class', 'Plotly_Div');

    // The second div-element Info-div
    InfoDiv = document.createElement('div');
    InfoDiv.setAttribute('class', 'Plotly_Info_Div');

    // InfoDiv contains 3 elements (2 spans element and 2 table element)
    Span1 = document.createElement('span');
    Span1.setAttribute('class', 'Plotly_Span_Title');
    Span1.innerHTML = Channel.FileName;

    Span2 = document.createElement('span');
    Span2.setAttribute('class', 'Plotly_Span_ChannelInfo');
    Span2_Info  = "(Ch-" + Channel.ChNum + ") (" +  Channel.Orientation  + ") (" + Number(Channel.FSamp).toFixed(3).toString() + " Hz)";
    Span2.innerHTML = Span2_Info;

    // Create a Table
    // wait for Info_Table() to be resolved and continue with the rest of the code
    Table = await Info_Table(Channel);

    InfoDiv.appendChild(Span1);
    InfoDiv.appendChild(Span2);
    InfoDiv.appendChild(Table);

    // Append the two div-elements to SubContainer
    SubContainer.appendChild(PlotlyDiv);
    SubContainer.appendChild(InfoDiv);

    // Apend the SubContainer to the main-container
    document.getElementById(Container_Id).appendChild(SubContainer);
    
    // Create new Plotly graph using the PlotlyDiv element
    // wait for Create_NewGraph() to be resolved and continue with the rest of the code 
    await Create_NewGraph(PlotlyDiv, Channel);

    // Change the legend text for trace1 (raw-data)
    Plotly.restyle(PlotlyDiv, { name: Channel.FileName +'<br>'+ Span2_Info }, [0]);

}

async function Create_NewGraph(Div_ID, Channel) {

    // This function creates a new Plotly grapgs with traces.
    // The first traces is filled with the raw-data of the channel.
    // Other two traces are left emty for use in other pages such as to plot filtered-data or itegrated-data (velocity, displacment)

    // Declaration of variables
    let traces=[], trace1, trace2, trace3, layout, config;
    let yLabel  = "<b>" + Channel.TypeString + "   [" + Channel.UnitString + "] <b>";
    let y2Label = "<b><b>";
    let xLabel  = "<b><b>";

    // Define Traces (Total of 3 Traces per graph)
    trace1 = {
        x             : Channel.time,
        y             : math.multiply(Channel.ScaleFactor, Channel.data),
        mode          : 'lines',
        type          : 'scatter',
        yaxis         : "y1",
        name          : '<b>Raw Data<b>',                              // Legend name
        opacity       : 1.0,
        visible       : true,                                          // Show this trace
        line          : {color: 'blue', width: 1.00, dash: 'solid' },
        showlegend    : true,
    };
    trace2 = {
        x             : [],
        y             : [],                                            // Empty Array
        mode          : 'lines',
        type          : 'scatter',
        yaxis         : "y1",
        name          : '<b>Filtered Data<b>',  // Legend name
        opacity       : 1.0,
        visible       : false,   // Hide this trace
        line          : {color: 'red', width: 1.00, dash: 'solid' },
        showlegend    : false,
    };
    trace3 = {
        x             : [],
        y             : [],                                            // Empty Array
        mode          : 'lines',
        type          : 'scatter',
        yaxis         : "y2",
        name          : '<b>Phase<b>',  // Legend name
        opacity       : 1.0,
        visible       : false,   // Hide this trace
        line          : {color: 'green', width: 1.00, dash: 'solid' },
        showlegend    : false,
    };
    traces.push(trace1);
    traces.push(trace2);
    traces.push(trace3);

    // Define Layout
    layout = {
        xaxis           : { zeroline: false, automargin: true, tickfont: { size: 15 },                    linecolor: 'black', linewidth: 1, mirror: true, title: {text: xLabel,  standoff: 5, font: {family: "Arial", size: 17} }, autorange: true },
        yaxis           : { zeroline: true,  automargin: true, tickfont: { size: 15 }, tickformat: '.2e', linecolor: 'black', linewidth: 1, mirror: true, title: {text: yLabel,  standoff: 5, font: {family: "Arial", size: 17} }, autorange: true },
        yaxis2          : { zeroline: false, automargin: true, tickfont: { size: 15 },                    linecolor: 'black', linewidth: 1, mirror: true, title: {text: y2Label, standoff: 5, font: {family: "Arial", size: 17} }, autorange: true, overlaying: 'y', side: 'right', showticklabels: false },
        plot_bgcolor    : '#ffffff', 
        paper_bgcolor   : '#ffffff',
        legend          : { x: 0.0, y:1, xanchor: 'left', yanchor: 'top', orientation: 'v', font: {size: 8, weight: 700}, xref: 'paper',  yref: 'paper',  bordercolor: 'black', borderwidth: 0.3 },
        autosize        : true,
        margin          : {t: 20, r:20, b:5, l:5},
        shapes          : [],
    };

    config = {
        responsive              : true,
        displayModeBar          : true,    // show-hide floating toolbar all together 
        modeBarButtonsToRemove  : [],
        displaylogo             : false,   // Romoves the Ployly logo from toolbar
        useResizeHandler        : true,    // Enables Plotly's resize event listener
        showTips                : false,
        scrollZoom              : false,   // Enable mouse wheel zooming
    }
    // Display using Plotly
    Plotly.newPlot(Div_ID, traces, layout, config).then( function(gd) {
        // Get the ModeBar element
        var modeBar = gd.querySelector('.modebar');

        // Hide ModeBar initially
        modeBar.style.display = 'none';
        
        // Add mouse event listeners to the graph div
        gd.addEventListener('mouseenter', function() {
            modeBar.style.display = 'block';
        });

        gd.addEventListener('mouseleave', function() {
            modeBar.style.display = 'none';
        });
    });

}

async function Info_Table(Channel) {

    let Tabel, Table_Body, row, cell, opt;
    let Statictics_Peak_ID, Statictics_Mean_ID, Statictics_RMS_ID;
    let FilterType_ID, FilterRow_ID, BaseLine_ID, BaseLineRow_ID, FilterResp_ID, GraphUnitRow_ID,FilterFFT_ID;
    let Span, input, div1, div2, label, Unit_List, j, Unit_Cell_ID, Unit_Plot_ID, select;

    Statictics_Peak_ID    = "Statictics_Peak_ID_" + Channel.Unique_ID;
    Statictics_Mean_ID    = "Statictics_Mean_ID_" + Channel.Unique_ID;
    Statictics_RMS_ID     = "Statictics_RMS_ID_" + Channel.Unique_ID;

    GraphUnitRow_ID       = "GraphUnitRow_ID_" + Channel.Unique_ID;
    Unit_Cell_ID          = "Unit_Cell_ID_" + Channel.Unique_ID;
    BaseLine_ID           = "BaseLine_ID" + Channel.Unique_ID;
    BaseLineRow_ID        = "BaseLineRow_ID" + Channel.Unique_ID;
    FilterType_ID         = "FilterType_ID_" + Channel.Unique_ID;
    FilterRow_ID          = "FilterRow_ID_" + Channel.Unique_ID;
    FilterResp_ID         = "FilterResp_ID_" + Channel.Unique_ID;
    FilterFFT_ID          = "FilterFFT_ID_" + Channel.Unique_ID;
    
    // Create a table and tabelBody
    Tabel = document.createElement('table');
    Tabel.setAttribute('class', 'Plotly_Stat_Table')
    Table_Body = document.createElement('tbody');
    Table_Body.setAttribute('class', '')
    Tabel.appendChild(Table_Body);

    // Create a new row for Peak-value
    row = Tabel.insertRow(-1);
    row.setAttribute('class', '');
    cell = row.insertCell(0);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Left');
    cell.innerHTML = "Peak";
    cell = row.insertCell(1);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Right');
    cell.setAttribute('id', Statictics_Peak_ID);
    cell.innerHTML = Channel.Peak.toPrecision(4);

    // Create a new row for Mean-value
    row = Tabel.insertRow(-1);
    row.setAttribute('class', '');
    cell = row.insertCell(0);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Left');
    cell.innerHTML = "Mean";
    cell = row.insertCell(1);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Right');
    cell.setAttribute('id', Statictics_Mean_ID);
    cell.innerHTML = Channel.Mean.toPrecision(4);  

    // Create a new row for RMS-value
    row = Tabel.insertRow(-1);
    row.setAttribute('class', '');
    cell = row.insertCell(0);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Left');
    cell.innerHTML = "RMS";
    cell = row.insertCell(1);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Right');
    cell.innerHTML = Channel.RMS.toPrecision(4);
    cell.setAttribute('id', Statictics_RMS_ID);

    // Create a new row for Graph-Unit
    row = Tabel.insertRow(-1);
    row.setAttribute('class', '');
    row.setAttribute('id', GraphUnitRow_ID);
    //row.style.display = "none";
    cell = row.insertCell(0);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Left');
    cell.innerHTML = "Graph Unit";
    
    Unit_List      = UnitList(TypeAndUnit(Channel.TypeAndUnits).Unit);
    Unit_Plot_ID   = "Unit_Plot_ID_" + Channel.Unique_ID;
    select  = document.createElement('select');
    select.setAttribute("id", Unit_Plot_ID);
    select.setAttribute('class', 'form-select form-select-sm');
    for (j = 0; j < Unit_List.Units.length; j++) {
        opt = document.createElement("option");
        opt.value = Unit_List.Units[j];
        opt.text = Unit_List.Units[j];
        select.add(opt, null);
    }
    select.setAttribute('onchange', 'Plotly_Graph_Update('+ Channel.ChNum + ')' );
    select.selectedIndex = Unit_List.UnitNum.indexOf(Channel.Unit) ;
    cell = row.insertCell(1);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Right');
    cell.setAttribute('id', Unit_Cell_ID);
    cell.appendChild(select);

    // Create a new row for Baseline
    row = Tabel.insertRow(-1);
    row.setAttribute('class', '');
    row.setAttribute('id', BaseLineRow_ID);
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Left');
    cell.innerHTML = "Baseline";
    cell = row.insertCell(1);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Right');
    cell.innerHTML = '';
    cell.id        = BaseLine_ID;
    
    // Create a new row for Filter and FFT
    Span = document.createElement('span');
    Span.setAttribute('class', 'Filter_Div_Span');
    Span.textContent = 'Filter';
    input = document.createElement('input');
    input.setAttribute('class', 'toggle');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', FilterResp_ID);
    input.setAttribute('onclick', 'FilterResponse(this)');
    label = document.createElement('label');
    label.setAttribute('for', FilterResp_ID);
    label.setAttribute('class', "toggle-label");
    div1 = document.createElement('div');
    div1.setAttribute('class', "Filter_Div");
    div1.appendChild(Span);
    div1.appendChild(input);
    div1.appendChild(label);

    Span = document.createElement('span');
    Span.setAttribute('class', 'Filter_Div_Span');
    Span.textContent = 'FFT';
    input = document.createElement('input');
    input.setAttribute('class', 'toggle');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', FilterFFT_ID);
    input.setAttribute('onclick', 'FilterResponse(this)');
    label = document.createElement('label');
    label.setAttribute('for', FilterFFT_ID);
    label.setAttribute('class', "toggle-label");
    div2 = document.createElement('div');
    div2.setAttribute('class', "Filter_Div");
    div2.appendChild(Span);
    div2.appendChild(input);
    div2.appendChild(label);

    row = Tabel.insertRow(-1);
    row.setAttribute('class', '');
    row.setAttribute('id', FilterRow_ID);
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Left');
    cell.appendChild(div1);
    cell.appendChild(div2);
    cell = row.insertCell(1);
    cell.setAttribute('class', 'Plotly_Stat_Body_Td_Right');
    cell.innerHTML = "";
    cell.id        = FilterType_ID;

    return Tabel;
}