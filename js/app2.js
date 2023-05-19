var selectElem = document.getElementById('sel');

//change these to reflect Alamosa when making the annual update
var startlabels = ['0 to 4', '5 to 9', '10 to 14', '15 to 19', '20 to 24', '25 to 29', '30 to 34', '35 to 39', '40 to 44', '45 to 49', '50 to 54', '55 to 59', '60 to 64', '65 to 69', '70 to 74', '75 to 79', '80 to 84', '85 to 89', '90 to 94', '95 to 99'];
var startcolors = ["#be66a2", "#65a620", "#7b6888", "#546e91", "#bca44a", "#5b388f", "#e98125", "#961a1a"];
var startdata = [992,1389,129,137,2078,695,756,436,0,0,992,1389,129,137,2078,695,756,436,0,0]; //Load Alamosa County manually for now

window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
  var firstdata = getData(1);
  var seconddata = getData2();
  
  var sdodata = [];
  var censusdata = [];
  for (i in firstdata){
    sdodata.push(Number(firstdata[i].totalpopulation));
  }
  //console.log(sdodata);
  for (j in seconddata){
    if (seconddata[j].countyfips == 1){
      censusdata.push(Number(seconddata[j].Age0));
      censusdata.push(Number(seconddata[j].Age5));
      censusdata.push(Number(seconddata[j].Age10));
      censusdata.push(Number(seconddata[j].Age15));
      censusdata.push(Number(seconddata[j].Age20));
      censusdata.push(Number(seconddata[j].Age25));
      censusdata.push(Number(seconddata[j].Age30));
      censusdata.push(Number(seconddata[j].Age35));
      censusdata.push(Number(seconddata[j].Age40));
      censusdata.push(Number(seconddata[j].Age45));
      censusdata.push(Number(seconddata[j].Age50));
      censusdata.push(Number(seconddata[j].Age55));
      censusdata.push(Number(seconddata[j].Age60));
      censusdata.push(Number(seconddata[j].Age65));
      censusdata.push(Number(seconddata[j].Age70));
      censusdata.push(Number(seconddata[j].Age75));
      censusdata.push(Number(seconddata[j].Age80));
      censusdata.push(Number(seconddata[j].Age85));
      censusdata.push(Number(seconddata[j].Age90));
      censusdata.push(Number(seconddata[j].Age95));
    }
    
  }
	window.myLine = new Chart(ctx, {
		type: 'line',
		//data: lineChartData,
    
    data: {
      datasets:[{
        label: "SDO",
        data: sdodata
      },
      {
        label: "Census",
        data: censusdata
      }
    ],
      labels: startlabels,
    },
		options: {

      // Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide

			tooltips: {
			  callbacks: {
			    label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            label += ': ';
            label += commafy(Math.round(tooltipItem.xLabel));
            var dataset = data.datasets[tooltipItem.datasetIndex];
      //calculate the total of this data set
            var total = 0;
            for(var i in dataset.data) {
              total += Math.round(dataset.totalpopulation[i]); 
            }
      //get the current items value
            var currentValue = dataset.data[tooltipItem.index];
      //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);
              label += ', ';
              label += percentage;
              label += '% of population in county';
              return label;
  			    },
			    afterLabel: function(tooltipItem, data) {
			     // var sum = data.datasets.reduce((sum, dataset) => {
        //   	  return sum + dataset.data[tooltipItem.index];
        //     }, 0);
        //     var percent = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum * 100;
        //     percent = percent.toFixed(2); // make a nice string
        //     return data.datasets[tooltipItem.datasetIndex].label + ': ' + percent + '%';
			      var exp = '';
			      switch (tooltipItem.yLabel) {
			        case 'Transfer Payment':
			          exp = 'Aka Public Assistance to those under 60.  Includes Medicaid, EITC, SNAP, & Unemployment Insurance compensation.';
			          break;
			      }
			      return ['',exp];
			    }
			  }
			},  
			scales: {
			  yAxes: [{
			    barPercentage: 1,
			    categoryPercentage: 0.5
			  }],
			  xAxes: [{
			    ticks: {
			      callback: function(value, index, values) {
			        return commafy(value);
			      }
			    },
			    scaleLabel: {
			      display: true,
			      labelString: 'Employees'
			    }
			  }]
			},
			elements: {
				rectangle: {
					borderWidth: 1,
				}
			},
			responsive: false,
			legend: {
				display: false,
				position: 'right',
			},
			title: {
				display: true,
				text: 'Age Comparison'
			}
		}
	});
			
};

selectElem.addEventListener('change', function() {
  //var firstdata = getData(selectElem.value);
  //var reloaddata = [];
  //for (i in firstdata){
  //  reloaddata.push(Number(firstdata[i].totalpopulation));
  //}
  //data = getData(selectElem.value);
  myLine.data.datasets.forEach(dataset => {
    //console.log(selectElem.value);
    //if (selectElem.value > 200){selectElemV = selectElem.value.slice(-2)}else{selectElemV = selectElem.value};
    //console.log(selectElemV);
    selectElemVal = getData(selectElem.value);
    seconddata = getData2();
    console.log(selectElemVal);
    var sdodata = [];
    var censusdata = []
    for (i in selectElemVal){
      sdodata.push(Number(selectElemVal[i].totalpopulation));
    }

    //dataset.data = sdodata;

    for (j in seconddata){
      if (seconddata[j].countyfips == selectElem.value){
        censusdata.push(Number(seconddata[j].Age0));
        censusdata.push(Number(seconddata[j].Age5));
        censusdata.push(Number(seconddata[j].Age10));
        censusdata.push(Number(seconddata[j].Age15));
        censusdata.push(Number(seconddata[j].Age20));
        censusdata.push(Number(seconddata[j].Age25));
        censusdata.push(Number(seconddata[j].Age30));
        censusdata.push(Number(seconddata[j].Age35));
        censusdata.push(Number(seconddata[j].Age40));
        censusdata.push(Number(seconddata[j].Age45));
        censusdata.push(Number(seconddata[j].Age50));
        censusdata.push(Number(seconddata[j].Age55));
        censusdata.push(Number(seconddata[j].Age60));
        censusdata.push(Number(seconddata[j].Age65));
        censusdata.push(Number(seconddata[j].Age70));
        censusdata.push(Number(seconddata[j].Age75));
        censusdata.push(Number(seconddata[j].Age80));
        censusdata.push(Number(seconddata[j].Age85));
        censusdata.push(Number(seconddata[j].Age90));
        censusdata.push(Number(seconddata[j].Age95));
      }
      
    }

    if (dataset.label == "SDO"){
      dataset.data = sdodata;
    } else {
      dataset.data = censusdata;
    }
    //dataset.data = censusdata;
    //var total=Number(selectElemVal[0].total_basic_emp)-Number(selectElemVal[0].ib_emp);
    /* var minval=0.01;
    var otheremp=0;
    var othertext = "*Other includes: ";
    window.myLine.options.title.text = selectElem.options[selectElem.selectedIndex].text + " 5 Year Age Ranges";
    lineChartData.labels = [];
    dataset.backgroundColor = [];
    dataset.data = selectElemVal;//[]; */
    
    //dataPercent = [];
    
    //Agriculture
    /* if ((selectElemVal[0].agri_emp/total) > 0.40){
    	if((selectElemVal[0].ag_prod_emp/total)>0){
      	lineChartData.labels.push("Agriculture Production");
    	  dataset.backgroundColor.push("#985282");
    	  dataset.data.push(Number(selectElemVal[0].ag_prod_emp));
    	  //dataPercent.push(((selectElemVal[0].ag_prod_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].ag_inputs_emp/total)>0){
    	  lineChartData.labels.push("Agriculture Inputs");
    	  dataset.backgroundColor.push("#AB5C92");
    	  dataset.data.push(Number(selectElemVal[0].ag_inputs_emp));
    	  //dataPercent.push(((selectElemVal[0].ag_inputs_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].ag_proc_trade_emp + selectElemVal[0].ag_proc_emp)>0){
    	  lineChartData.labels.push("Agriculture Other");
      	dataset.backgroundColor.push("#be66a2");
    	  dataset.data.push(Number(selectElemVal[0].ag_proc_trade_emp) + Number(selectElemVal[0].ag_proc_emp));
    	  //dataPercent.push((((selectElemVal[0].ag_proc_trade_emp + selectElemVal[0].ag_proc_emp)/total)*100).toFixed(2));
    	}
    } else if ((selectElemVal[0].agri_emp/total) > minval){
    	lineChartData.labels.push("Agriculture");
    	dataset.backgroundColor.push("#be66a2");
    	dataset.data.push(Number(selectElemVal[0].agri_emp));
    	//dataPercent.push(((selectElemVal[0].ag_prod_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].agri_emp);
      othertext += "Agriculture, ";
    }*/
   

  });
  
  window.myLine.update();
});

https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=2020&choice=5yr

function getData(fips) {
  /* var url = "https://gis.dola.colorado.gov/lookups/sya?county="+fips+"&year=2020&choice=5yr";
  if (fips = "0"){
    console.log("True");
    url = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=2020&choice=5yr";
  } */ 
  var data = $.ajax({
   url: "https://gis.dola.colorado.gov/lookups/sya?county="+fips+"&year=2020&choice=5yr",
   dataType: 'json',
   async: false,

   });
   
  return data.responseJSON;
 
}

function getData2(){
  var data = $.ajax({
    url: "data/censusage.json",
    dataType: 'json',
    async: false,
 
    });
    return data.responseJSON;
    //console.log("2nd " + data.responseJSON[1].county);
}

/* var lineChartData = {
	labels: startlabels,
	datasets: [{
		label: 'Population',
		backgroundColor: startcolors,
		borderColor: window.chartColors.black,
		borderWidth: .5,
    fill: false,
		data: startdata
	}]
	
}; */
		

		


function commafy(nStr) {
    var x, x1, x2, rgx;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function alphanum(a, b) {
  function chunkify(t) {
    var tz = [], x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  var aa = chunkify(a);
  var bb = chunkify(b);

  for (x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else return (aa[x] > bb[x]) ? 1 : -1;
    }
  }
  return aa.length - bb.length;
}
