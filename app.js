// declare a variable to hold the value where the Id data should be directed to 
var idSelect = d3.select("#selDataset");

//Select json data file samples
d3.json("samples.json").then((data) => {
    
    console.log(data)

    // set variable to reflect values from the array of names
    var name_data = data.names;

        // iterate through the values within the array
        name_data.forEach((name, index) => {

            // append the option html tags 
            var name_selection = idSelect.append("option");

            // apppend the name (ID) from the list as text, to the option element which is used for dropdown tags
            name_selection.text(name);

            // bind the data with the index value from the id/name selection to its corresponding value attribute
            name_selection.attr("value",`${index}`); 
        });
        });

// initialize the function to create the bar chart

function initBar() {
    d3.json("samples.json").then((data) => {
        
        // select the beginning of the index of the sample data (index 0, id 940)
        var selectObject = Object.values(data.samples[0])

        // set x values 
        var initX = selectObject[2]
        // chose the first ten values to display 
        var sliceX = initX.slice(0, 10);
        //reverse x values to fit horizontal bar requirements 
        var valuesX = sliceX.reverse()

        // set y values as the OTU values
        var initY = selectObject[1]
        // chose the first ten values to display 
        var sliceY = initY.slice(0, 10);
        //reverse y values to fit requirements 
        var valuesY = sliceY.reverse()

        // map the OTU values to a usable string
        var axisY = valuesY.map(item => `OTU ${item}`)

        // map the hover labels based on index location of 3 
        var hoverLabel = selectObject[3]
        var hoverLabelSlice = hoverLabel.slice(0, 10);
        var hoverValue = hoverLabelSlice.reverse()

        // create the trace for plotting 
        var trace = {
          x: valuesX,
          y: axisY,
          text: hoverValue,
          type: "bar",
          orientation: "h"
        };
      
        var data = [trace];
      
        Plotly.newPlot("bar", data);
      });
};

initBar();

// create function to create bubble chart 

function initBubble() {
    d3.json("samples.json").then((data) => {
        
        // select the beginning of the index of the sample data (index 0, id 940)
        var selectObject = Object.values(data.samples[0])

        // set x values, referring to index 1 
        var initX = selectObject[1]

        // set y values based on index of 2, which is the OTU values
        var initY = selectObject[2]

        // set the marker size to the data from index of 2
        var markerSize = selectObject[2]

        // set the colors based on the index of 1 
        var colorSchema = selectObject[1]

        // set the labels based on the index of 3
        var label = selectObject[3]

        // Create trace
        var trace = {
          x: initX,
          y: initY,
          text: label,
          mode: "markers",
          marker: {
              size: markerSize,
              color: colorSchema
          }
        };

        // add title to the x axis
        var layout = {
            xaxis: {title: "OTU ID"},
        }
      
        var data = [trace];
      
        Plotly.newPlot("bubble", data, layout);
      });
}

initBubble();

// initialize the panel as the demographic information panel 

function initPanel() {
    d3.json("samples.json").then((data) => {
        
        // set variables hold the keys and values from first object in the data array  
        var sample_keys = Object.keys(data.metadata[0]);
        var sample_values = Object.values(data.metadata[0]);

        // select the demographic info from the panel 
        var addList = d3.select("#sample-metadata");

        // loop through the 7 values which reflects the length ot the key values in the array
        for (var i = 0; i < 7; i++) {
            var nameSelection = addList.append("ul");
            nameSelection.text(`${sample_keys[i]}: ${sample_values[i]}`);
        };

      });

};

initPanel();

// update the default display panel after certain values are selected 

idSelect.on("change", optionChanged);

  function selectOption () {
  
  // select the property value from the dropdown 
  var selectedOption = idSelect.property('value');

  // pull data from samples.data json file
  d3.json("samples.json").then((data) => {
        
  // only append data based on the filtered data which is set by the user selection aka selectedOption
  selectedKey = Object.keys(data.metadata[selectedOption]);
  selectedValue = Object.values(data.metadata[selectedOption]);

  var addList = d3.select("#sample-metadata");

  addList.html("");

        // loop through the 7 values which reflects the length ot the key values in the array
        for (var i = 0; i < 7; i++) {
            var nameSelection = addList.append("ul");
            nameSelection.text(`${selectedKey[i]}: ${selectedValue[i]}`);
        };

})};
