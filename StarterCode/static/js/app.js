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
        // select object for metadata
        var metadata = data.metadata
        console.log(metadata)
        // filter the data so that it matches the sample
        var filtersample = metadata.filter(row => row.id == sample);
        // take the first sample
        var result = filtersample[0];
        console.log(result)
        // use d3 and get the id for metadata
        var demoinfo = d3.select("#sample-metadata");
        // remove the existing data in html so that it doesnt add
        demoinfo.html("");
        // add the key, value pair for each sample to the demoinfo chart
        Object.entries(result).forEach(([key,value])=>{
            demoinfo.append("p").text(`${key}: ${value}`)
        });
    });
};
//metadatachart(944);

//build function for buildings all charts
function buildCharts(sample){
    d3.json("samples.json").then(data =>{
        var sampledata = data.samples

        var filtersample = sampledata.filter(row => row.id == sample);
        var result = filtersample[0];
        console.log(result)

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log(otu_ids)

        var barData =[{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0, 10).map(id=> `OTU ${id}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        Plotly.newPlot("bar",barData)

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


    })
}
//buildCharts(941)

function init(){
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then(data =>{
        var sampleNames = data.names

        sampleNames.forEach((sample)=>{
            dropdown.append("option").text(sample).property("value",sample)
        });

        var sampledata = sampleNames[0];
        buildCharts(sampledata);
        metadatachart(sampledata);
    });
};

function optionChanged(newsample){
    metadatachart(newsample);
    buildCharts(newsample);
}

init()
