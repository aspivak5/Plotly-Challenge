// retreive data and show in console 
function retreiveData() {
    d3.json("samples.json").then(data=> {
        console.log(data)
    });
    };
retreiveData()

//create a function for demographic info
function metadatachart(sample){
    d3.json("samples.json").then(data=>{
        // select object to build demo info
        var metadata = data.metadata
        console.log(metadata)
        // filter the data so that it matches the sample
        var filtersample = metadata.filter(row => row.id == sample);
        // take the first sample
        var result = filtersample[0];
        console.log(result)
        // use d3 and get the id for metadata
        var demoinfo = d3.select("#sample-metadata");
        // remove the existing data in html so that it doesnt add on top of eachother
        demoinfo.html("");
        // add the key, value pair for each sample to the demoinfo chart
        Object.entries(result).forEach(([key,value])=>{
            demoinfo.append("p").text(`${key}: ${value}`)
        });
    });
};
//metadatachart(944);

//build function for buildings all charts
function createCharts(sample){
    d3.json("samples.json").then(data =>{
        // select the object with the data to build charts with 
        var sampledata = data.samples
        // filter the data so that it matches the sample
        var filtersample = sampledata.filter(row => row.id == sample);
        // take the first sample
        var result = filtersample[0];
        console.log(result)
        // assign the keys to own variable 
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log(otu_ids)
        //build hbar chart
        var barData =[{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0, 10).map(id=> `OTU ${id}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        Plotly.newPlot("bar",barData)
        // build bubble chart
        var bubbleData =[{
            x: otu_ids,
            y:sample_values,
            mode: "markers",
            marker: {size:sample_values, color:otu_ids,colorscale:"Portland"},
            text: otu_labels
        }];
        var bubbleLayout = {
            xaxis:{title:"OTU ID"}
        }
        Plotly.newPlot("bubble", bubbleData,bubbleLayout)
    
        //build gauge chart

        //select the object with the data to build gaugechart
        var metadata = data.metadata
        var filterwfreq = metadata.filter(row => row.id == sample);
        var resultwfreq = filterwfreq[0]
        var wfreq = resultwfreq.wfreq

        var gaugedata = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wfreq,
              title: { text:  "Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 10] },
                steps: [
                  { range: [0, 5], color: "cyan" },
                  { range: [5, 10], color: "royalblue" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: wfreq
                }
              }
            }
          ];
          
          var gaugelayout = { width: 500, height: 450, margin: {t: 0, b: 0  }};
          Plotly.newPlot('gauge', gaugedata, gaugelayout);
  

    })
}
//buildCharts(941)

// create an init function to run all code
function init(){
    // use d3 to select the dropdownmenu
    var dropdown = d3.select("#selDataset");
    // use d3 to grab the object thats going to be used
    d3.json("samples.json").then(data =>{
        var sampleNames = data.names
        // add each sample to their own option tag 
        sampleNames.forEach((sample)=>{
            dropdown.append("option").text(sample).property("value",sample)
        });
        // build charts with the sample data
        var sampledata = sampleNames[0];
        createCharts(sampledata);
        metadatachart(sampledata);
    });
};

//create function that will build a new chart whenever a new sample is selected
function optionChanged(newsample){
    metadatachart(newsample);
    createCharts(newsample);
}

init()
