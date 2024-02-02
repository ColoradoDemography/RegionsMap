colors={};
  colors.selected="rgb(237,248,177)";
  colors.standard="rgb(166,206,227)";

    /*Width and height*/
    var w = 700;
    var h = 520;

    /*projection specific to Colorado*/
    var projection = d3.geo.transverseMercator()
        .translate([(w / 2) - 10, (h / 2) - 15])
        .scale(6500)
        .rotate([105.63, -39.18, 0])
        .center([0, 0]);

    /*Define path generator*/
    var path = d3.geo.path()
        .projection(projection);

    /*Create SVG element*/
    var svg = d3.select("#svgcontainer")
        .append("svg")
        .attr("id", "statesvg")
        .attr("width", w)
        .attr("height", h);

    /*create group element, add map*/
    var map = svg.append("svg:g")
        .attr("id", "map")
        .style("filter", "url(#dropshadow)"); /*adds shadow to the state from definition in svgdefs*/

    /*create group element for labels (created after map, so that it draws on top of map)*/
    var labels = svg.append("svg:g")
        .attr("id", "labels");


    /*Load in GeoJSON data*/
    d3.json("/geojson/County.geojson", function(json) {

        /*Bind data and create one path per GeoJSON feature*/
        map.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-width", "0.5px")
            .style("stroke", "rgb(150,150,150)")
            .style("fill", colors.standard)
            .classed("county", true);

        /*add label for each feature*/
        labels.selectAll("text")
            .data(json.features)
            .enter()
            .append("text")
            .attr("class", "place-label")
            .attr("text-anchor", "middle")
            .attr("text-rendering", "optimizeLegibility")
            .text(function(d) {
                return d.properties.NAME;
            })
            .attr("x", function(d) {
                return projection([d.properties.x, d.properties.y])[0];
            })
            .attr("y", function(d) {
                return projection([d.properties.x, d.properties.y])[1];
            })
            .attr("dy", function(d){ if(d.properties.NAME==="Broomfield") {return "-.7em"} });

        var insertLinebreaks = function(d) {
            var el = d3.select(this);
            var words = d.properties.NAME.split('|');
            el.text('');

            for (var i = 0; i < words.length; i++) {
                var tspan = el.append('tspan').text(words[i]);
                if (i > 0)
                    tspan.attr('x', projection([d.properties.x, d.properties.y])[0]).attr('dy', '10');
            }
        };

        svg.selectAll('text').each(insertLinebreaks);

    });

    var viewresults = document.getElementById('countiesSelected');

    viewresults.onclick = function() {
        listnames();
    };

    function getSelectValues(select) {
        var result = [];
        var options = select && select.options;
        var opt;

        for (var i = 0, iLen = options.length; i < iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        return result;
    }

    function listnames() {
        var selectedCounties = getSelectValues(countiesSelected);
        var countylist = "";

        switch (selectedCounties[0]) {
            case "1":
                countylist = "Logan, Morgan, Phillips, Sedgwick, Washington, Yuma";
                break;
            case "2":
                countylist = "Larimer, Weld";
                break;
            case "3":
                countylist = "Adams, Arapahoe, Boulder, Broomfield, Clear Creek, Denver, Douglas, Gilpin, Jefferson";
                break;
            case "4":
                countylist = "El Paso, Park, Teller";
                break;
            case "5":
                countylist = "Cheyenne, Elbert, Kit Carson, Lincoln";
                break;
            case "6":
                countylist = "Baca, Bent, Crowley, Kiowa, Otero, Prowers";
                break;
            case "7":
                countylist = "Pueblo";
                break;
            case "8":
                countylist = "Alamosa, Conejos, Costilla, Mineral, Rio Grande, Saguache";
                break;
            case "9":
                countylist = "Archuleta, Dolores, La Plata, Montezuma, San Juan";
                break;
            case "10":
                countylist = "Delta, Gunnison, Hinsdale, Montrose, Ouray, San Miguel";
                break;
            case "11":
                countylist = "Garfield, Mesa, Moffat, Rio Blanco";
                break;
            case "12":
                countylist = "Eagle, Grand, Jackson, Pitkin, Routt, Summit";
                break;
            case "13":
                countylist = "Chaffee, Custer, Fremont, Lake";
                break;
            case "14":
                countylist = "Huerfano, Las Animas";
                break;
            case "15":
                countylist = "Chaffee, Clear Creek, Custer, Fremont, Gilpin, Huerfano, Lake, Las Animas, Park";
                break;
            case "16":
                countylist = "Baca, Bent, Cheyenne, Crowley, Elbert, Kiowa, Kit Carson, Lincoln, Logan, Morgan, Otero, Phillips, Prowers, Sedgwick, Washington, Yuma";
                break;
            case "17":
                countylist = "Adams, Arapahoe, Boulder, Broomfield, Denver, Douglas, El Paso, Jefferson, Larimer, Pueblo, Teller, Weld";
                break;
            case "18":
                countylist = "Alamosa, Conejos, Costilla, Mineral, Rio Grande, Saguache";
                break;
            case "19":
                countylist = "Archuleta, Delta, Dolores, Eagle, Garfield, Grand, Gunnison, Hinsdale, Jackson, La Plata, Mesa, Moffat, Montezuma, Montrose, Ouray, Pitkin, Rio, Blanco, Routt, San Juan, San Miguel, Summit";
                break;
            case "20":
                countylist = "Adams, Arapahoe, Broomfield, Denver, Douglas, Jefferson";
                break;
            case "21":
                countylist = "Adams, Arapahoe, Boulder, Broomfield, Denver, Douglas, Jefferson";
                break;
            case "22":
                countylist = "Adams, Arapahoe, Boulder, Broomfield, Denver, Douglas, Jefferson, Weld";
                break;
            case "23":
                countylist = "Adams, Arapahoe, Broomfield, Clear Creek, Denver, Douglas, Elbert, Gilpin, Jefferson, Park";
                break;
        }

        document.getElementById("countylist").innerHTML = countylist;



        d3.selectAll(".county").style("fill", function(d) {
            return colorcounties(d, selectedCounties[0]);
        });




    }

    function colorcounties(county, region) {
        var carray = get_region_array(region);

        for (var i = 0; i < carray.length; i++) {
            if (county.properties.GEOID === carray[i]) {
                return colors.selected;
            }
        }

        return colors.standard;
    }

    function get_region_array(region) {
        if (region === "1") {
            return ["08075", "08087", "08095", "08115", "08121", "08125"];
        }
        if (region === "2") {
            return ["08069", "08123"];
        }
        if (region === "3") {
            return ["08001", "08005", "08013", "08014", "08019", "08031", "08035", "08047", "08059"];
        }
        if (region === "4") {
            return ["08041", "08093", "08119"];
        }
        if (region === "5") {
            return ["08017", "08039", "08063", "08073"];
        }
        if (region === "6") {
            return ["08009", "08011", "08025", "08061", "08089", "08099"];
        }
        if (region === "7") {
            return ["08101"];
        }
        if (region === "8") {
            return ["08003", "08021", "08023", "08079", "08105", "08109"];
        }
        if (region === "9") {
            return ["08007", "08033", "08067", "08083", "08111"];
        }
        if (region === "10") {
            return ["08029", "08051", "08053", "08085", "08091", "08113"];
        }
        if (region === "11") {
            return ["08045", "08077", "08081", "08103"];
        }
        if (region === "12") {
            return ["08037", "08049", "08057", "08097", "08107", "08117"];
        }
        if (region === "13") {
            return ["08015", "08027", "08043", "08065"];
        }
        if (region === "14") {
            return ["08055", "08071"];
        }
        if (region === "15") {
            return ["08015", "08019", "08027", "08043", "08047", "08055", "08065", "08071", "08093"];
        }
        if (region === "16") {
            return ["08009", "08011", "08017", "08025", "08039", "08061", "08063", "08073", "08075", "08087", "08089", "08095", "08099", "08115", "08121", "08125"];
        }
        if (region === "17") {
            return ["08001", "08005", "08013", "08014", "08031", "08035", "08041", "08059", "08069", "08101", "08119", "08123"];
        }
        if (region === "18") {
            return ["08003", "08021", "08023", "08079", "08105", "08109"];
        }
        if (region === "19") {
            return ["08007", "08029", "08033", "08037", "08045", "08049", "08051", "08053", "08057", "08067", "08077", "08081", "08083", "08085", "08091", "08097", "08103", "08107", "08111", "08113", "08117"];
        }
        if (region === "20") {
            return ["08001", "08005", "08014", "08031", "08035", "08059"];
        }
        if (region === "21") {
            return ["08001", "08005", "08013", "08014", "08031", "08035", "08059"];
        }
        if (region === "22") {
            return ["08001", "08005", "08013", "08014", "08031", "08035", "08059", "08123"];
        }
        if (region === "23") {
            return ["08001", "08005", "08014", "08019", "08031", "08035", "08039", "08047", "08059", "08093"];
        }

        return [];
    }

        /*wait for d3 to catch up to the rest of the program*/
    setTimeout(function(){
      listnames();
    }, 500);
