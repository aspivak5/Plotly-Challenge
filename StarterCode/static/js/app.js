// retreive data and show in console 
function retreiveData() {
    d3.json("samples.json").then(data=> {
        console.log(data)
    });
    };
retreiveData();

function metadatachart(sample){
    d3.json("samples.json").then(data=>{
        var metadata = data.metadata
        console.log(metadata)

        var filtersample = metadata.filter(row => row.id == sample);
        var result = filtersample[0];
        console.log(result)

        var demoinfo = d3.select("#sample-metadata");

        demoinfo.html("");

        Object.entries(result).forEach(([key,value])=>{
            demoinfo.append("p").text(`${key}: ${value}`)
        });
    });
};
metadatachart(944);

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


    })
}
buildCharts(941)
