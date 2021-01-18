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
    

    })
}
