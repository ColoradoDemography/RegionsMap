var selectElem = document.getElementById('sel');

//change these to reflect Alamosa when making the annual update
var startlabels = ['0 to 4', '5 to 9', '10 to 14', '15 to 19', '20 to 24', '25 to 29', '30 to 34', '35 to 39', '40 to 44', '45 to 49', '50 to 54', '55 to 59', '60 to 64', '65 to 69', '70 to 74', '75 to 79', '80 to 84', '85 to 89', '90 to 94', '95 to 99'];
var startcolors = ["#be66a2", "#65a620", "#7b6888", "#546e91", "#bca44a", "#5b388f", "#e98125", "#961a1a"];
var startdata = [992,1389,129,137,2078,695,756,436,0,0,992,1389,129,137,2078,695,756,436,0,0]; //Load Alamosa County manually for now

selectElem.addEventListener('change', function() {
  lineChartData.datasets.forEach(function(dataset) {
    console.log(selectElem.value);
    //if (selectElem.value > 200){selectElemV = selectElem.value.slice(-2)}else{selectElemV = selectElem.value};
    //console.log(selectElemV);
    selectElemVal = getData(selectElem.value);
    console.log(selectElemVal);
    //var total=Number(selectElemVal[0].total_basic_emp)-Number(selectElemVal[0].ib_emp);
    var minval=0.01;
    var otheremp=0;
    var othertext = "*Other includes: ";
    window.myLine.options.title.text = selectElem.options[selectElem.selectedIndex].text + " 5 Year Age Ranges";
    lineChartData.labels = [];
    dataset.backgroundColor = [];
    dataset.data = [];
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
    }
    //Commuter
    if((selectElemVal[0].commuter_emp/total)>minval){
      lineChartData.labels.push("Commuter");
      dataset.backgroundColor.push("#a05d56");
      dataset.data.push(Number(selectElemVal[0].commuter_emp));
      //dataPercent.push(((selectElemVal[0].commuter_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].commuter_emp);
      othertext += "Commuter, ";
    }
    //Government
    if((selectElemVal[0].govt_emp/total)>minval){
      lineChartData.labels.push("Government");
      dataset.backgroundColor.push("#65a620");
      dataset.data.push(Number(selectElemVal[0].govt_emp));
      //dataPercent.push(((selectElemVal[0].govt_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].govt_emp);
      othertext += "Government, ";
    }
    //Manufacturing
    if((selectElemVal[0].manuf_emp/total)>minval){
      lineChartData.labels.push("Manufacturing");
      dataset.backgroundColor.push("#7b6888");
      dataset.data.push(Number(selectElemVal[0].manuf_emp));
      //dataPercent.push(((selectElemVal[0].manuf_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].manuf_emp);
      othertext += "Manufacturing, ";
    }
    //Mining
    if((selectElemVal[0].mining_emp/total)>minval){
      lineChartData.labels.push("Mining");
      dataset.backgroundColor.push("#2484c1");
      dataset.data.push(Number(selectElemVal[0].mining_emp));
      //dataPercent.push(((selectElemVal[0].mining_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].mining_emp);
      othertext += "Mining, ";
    }
     //Other Household
    if((selectElemVal[0].other_inc_emp/total)>minval){
      lineChartData.labels.push("Other Household");
      dataset.backgroundColor.push("#546e91");
      dataset.data.push(Number(selectElemVal[0].other_inc_emp));
      //dataPercent.push(((selectElemVal[0].other_inc_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].other_inc_emp);
      othertext += "Other Household, ";
    }
    //Regional Service
    if((selectElemVal[0].regl_serv_emp/total)>minval){
      lineChartData.labels.push("Regional Service");
      dataset.backgroundColor.push("#bca44a");
      dataset.data.push(Number(selectElemVal[0].regl_serv_emp));
      //dataPercent.push(((selectElemVal[0].regl_serv_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].regl_serv_emp);
      othertext += "Regional Service, ";
    }
    //Retiree
    if((selectElemVal[0].retiree_emp/total)>minval){
      lineChartData.labels.push("Retiree");
      dataset.backgroundColor.push("#5b388f");
      dataset.data.push(Number(selectElemVal[0].retiree_emp));
      //dataPercent.push(((selectElemVal[0].retiree_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].retiree_emp);
      othertext += "Retiree, ";
    }
    //Tourism
    if ((selectElemVal[0].tourism_emp/total) > 0.40){
    	if((selectElemVal[0].resorts_emp/total)>0){
    	  lineChartData.labels.push("Tourism: Resort");
    	  dataset.backgroundColor.push("#BA671E");
    	  dataset.data.push(Number(selectElemVal[0].resorts_emp));
    	  //dataPercent.push(((selectElemVal[0].resorts_emp/total)*100).toFixed(2));
    	}
      if((selectElemVal[0].second_home_emp/total)>0){
    	  lineChartData.labels.push("Tourism: 2nd Home");
    	  dataset.backgroundColor.push("#D27421");
    	  dataset.data.push(Number(selectElemVal[0].second_home_emp));
    	  //dataPercent.push(((selectElemVal[0].second_home_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].tour_serve_emp + selectElemVal[0].trans_emp)>0){
    	  lineChartData.labels.push("Tourism: Other");
    	  dataset.backgroundColor.push("#e98125");
    	  dataset.data.pushNumber((selectElemVal[0].tour_serve_emp) + Number(selectElemVal[0].trans_emp));
    	  //dataPercent.push((((selectElemVal[0].tour_serve_emp + selectElemVal[0].trans_emp)/total)*100).toFixed(2));
    	}
    } else if ((selectElemVal[0].tourism_emp/total) > minval){
      lineChartData.labels.push("Tourism");
      dataset.backgroundColor.push("#e98125");
      dataset.data.push(Number(selectElemVal[0].tourism_emp));
      //dataPercent.push(((selectElemVal[0].tourism_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].tourism_emp);
      othertext += "Tourism, ";
    }
    
    //Transfer Payment
    if((selectElemVal[0].other_hhd_emp/total)>minval){  
      lineChartData.labels.push("Transfer Payment");
      dataset.backgroundColor.push("#961a1a");
      dataset.data.push(Number(selectElemVal[0].other_hhd_emp));
      //dataPercent.push(((selectElemVal[0].other_hhd_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].other_hhd_emp);
      othertext += "Transfer Payment, ";
    }
    //Other
    if(otheremp>0){
      lineChartData.labels.push("Other*");
      dataset.backgroundColor.push("black");
      dataset.data.push(Number(otheremp));
      //dataPercent.push(((otheremp/total)*100).toFixed(2));
      othertext = othertext.substring(0,othertext.length-2);
      document.getElementById('other').innerHTML = othertext;
      console.log(othertext);
    } else {
      document.getElementById('other').innerHTML = '';
    } */

  });
  
  window.myLine.update();
});

https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=2020&choice=5yr

function getData(fips) {
  var url = "https://gis.dola.colorado.gov/lookups/sya?county="+fips+"&year=2020&choice=5yr";
  if (fips = "0"){
    console.log("True");
    url = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=2020&choice=5yr";
  } 
  console.log(url);
  var data = $.ajax({
   url: url,
   dataType: 'json',
   async: false,

   });
   console.log(data.responseJSON);
  return data.responseJSON;
 
}


var lineChartData = {
	labels: startlabels,
	datasets: [{
		label: 'Population',
		backgroundColor: startcolors,
		borderColor: window.chartColors.black,
		borderWidth: .5,
    fill: false,
		data: startdata
	}]
	
};
		

		
window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');

	window.myLine = new Chart(ctx, {
		type: 'line',
		data: lineChartData,
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
