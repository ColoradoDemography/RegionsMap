var selectElem = document.getElementById('sel');

var startlabels = ['Agriculture', 'Government', 'Manufacturing', 'Regional Service', 'Retiree', 'Tourism', 'Transfer Payment'];
var startcolors = ["#be66a2", "#65a620", "#7b6888", "#bca44a", "#5b388f", "#e98125", "#961a1a"];
var startdata = [1045,1451,84,2041,790,810,263]; //Load Alamosa County manually for now

selectElem.addEventListener('change', function() {
  horizontalBarChartData.datasets.forEach(function(dataset) {
    //console.log(selectElem.value);
    selectElemVal = getData(selectElem.value);
    //console.log(selectElemVal);
    var total=Number(selectElemVal[0].total_basic_emp)-Number(selectElemVal[0].ib_emp);
    var minval=0.01;
    var otheremp=0;
    var othertext = "*Other includes: ";
    window.myHorizontalBar.options.title.text = selectElem.options[selectElem.selectedIndex].text + " Base Industries, 2018";
    horizontalBarChartData.labels = [];
    dataset.backgroundColor = [];
    dataset.data = [];
    //dataPercent = [];
    
    //Agriculture
    if ((selectElemVal[0].agri_emp/total) > 0.40){
    	if((selectElemVal[0].ag_prod_emp/total)>0){
      	horizontalBarChartData.labels.push("Agriculture Production");
    	  dataset.backgroundColor.push("#985282");
    	  dataset.data.push(Number(selectElemVal[0].ag_prod_emp));
    	  //dataPercent.push(((selectElemVal[0].ag_prod_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].ag_inputs_emp/total)>0){
    	  horizontalBarChartData.labels.push("Agriculture Inputs");
    	  dataset.backgroundColor.push("#AB5C92");
    	  dataset.data.push(Number(selectElemVal[0].ag_inputs_emp));
    	  //dataPercent.push(((selectElemVal[0].ag_inputs_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].ag_proc_trade_emp + selectElemVal[0].ag_proc_emp)>0){
    	  horizontalBarChartData.labels.push("Agriculture Other");
      	dataset.backgroundColor.push("#be66a2");
    	  dataset.data.push(Number(selectElemVal[0].ag_proc_trade_emp) + Number(selectElemVal[0].ag_proc_emp));
    	  //dataPercent.push((((selectElemVal[0].ag_proc_trade_emp + selectElemVal[0].ag_proc_emp)/total)*100).toFixed(2));
    	}
    } else if ((selectElemVal[0].agri_emp/total) > minval){
    	horizontalBarChartData.labels.push("Agriculture");
    	dataset.backgroundColor.push("#be66a2");
    	dataset.data.push(Number(selectElemVal[0].agri_emp));
    	//dataPercent.push(((selectElemVal[0].ag_prod_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].agri_emp);
      othertext += "Agriculture, ";
    }
    //Commuter
    if((selectElemVal[0].commuter_emp/total)>minval){
      horizontalBarChartData.labels.push("Commuter");
      dataset.backgroundColor.push("#a05d56");
      dataset.data.push(Number(selectElemVal[0].commuter_emp));
      //dataPercent.push(((selectElemVal[0].commuter_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].commuter_emp);
      othertext += "Commuter, ";
    }
    //Government
    if((selectElemVal[0].govt_emp/total)>minval){
      horizontalBarChartData.labels.push("Government");
      dataset.backgroundColor.push("#65a620");
      dataset.data.push(Number(selectElemVal[0].govt_emp));
      //dataPercent.push(((selectElemVal[0].govt_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + NumberselectElemVal[0].govt_emp);
      othertext += "Government, ";
    }
    //Manufacturing
    if((selectElemVal[0].manuf_emp/total)>minval){
      horizontalBarChartData.labels.push("Manufacturing");
      dataset.backgroundColor.push("#7b6888");
      dataset.data.push(Number(selectElemVal[0].manuf_emp));
      //dataPercent.push(((selectElemVal[0].manuf_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].manuf_emp);
      othertext += "Manufacturing, ";
    }
    //Mining
    if((selectElemVal[0].mining_emp/total)>minval){
      horizontalBarChartData.labels.push("Mining");
      dataset.backgroundColor.push("#2484c1");
      dataset.data.push(Number(selectElemVal[0].mining_emp));
      //dataPercent.push(((selectElemVal[0].mining_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].mining_emp);
      othertext += "Mining, ";
    }
     //Other Household
    if((selectElemVal[0].other_inc_emp/total)>minval){
      horizontalBarChartData.labels.push("Other Household");
      dataset.backgroundColor.push("#546e91");
      dataset.data.push(Number(selectElemVal[0].other_inc_emp));
      //dataPercent.push(((selectElemVal[0].other_inc_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].other_inc_emp);
      othertext += "Other Household, ";
    }
    //Regional Service
    if((selectElemVal[0].regl_serv_emp/total)>minval){
      horizontalBarChartData.labels.push("Regional Service");
      dataset.backgroundColor.push("#bca44a");
      dataset.data.push(Number(selectElemVal[0].regl_serv_emp));
      //dataPercent.push(((selectElemVal[0].regl_serv_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].regl_serv_emp);
      othertext += "Regional Service, ";
    }
    //Retiree
    if((selectElemVal[0].retiree_emp/total)>minval){
      horizontalBarChartData.labels.push("Retiree");
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
    	  horizontalBarChartData.labels.push("Tourism: Resort");
    	  dataset.backgroundColor.push("#BA671E");
    	  dataset.data.push(Number(selectElemVal[0].resorts_emp));
    	  //dataPercent.push(((selectElemVal[0].resorts_emp/total)*100).toFixed(2));
    	}
      if((selectElemVal[0].second_home_emp/total)>0){
    	  horizontalBarChartData.labels.push("Tourism: 2nd Home");
    	  dataset.backgroundColor.push("#D27421");
    	  dataset.data.push(Number(selectElemVal[0].second_home_emp));
    	  //dataPercent.push(((selectElemVal[0].second_home_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].tour_serve_emp + selectElemVal[0].trans_emp)>0){
    	  horizontalBarChartData.labels.push("Tourism: Other");
    	  dataset.backgroundColor.push("#e98125");
    	  dataset.data.pushNumber((selectElemVal[0].tour_serve_emp) + Number(selectElemVal[0].trans_emp));
    	  //dataPercent.push((((selectElemVal[0].tour_serve_emp + selectElemVal[0].trans_emp)/total)*100).toFixed(2));
    	}
    } else if ((selectElemVal[0].tourism_emp/total) > minval){
      horizontalBarChartData.labels.push("Tourism");
      dataset.backgroundColor.push("#e98125");
      dataset.data.push(Number(selectElemVal[0].tourism_emp));
      //dataPercent.push(((selectElemVal[0].tourism_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].tourism_emp);
      othertext += "Tourism, ";
    }
    
    //Transfer Payment
    if((selectElemVal[0].other_hhd_emp/total)>minval){  
      horizontalBarChartData.labels.push("Transfer Payment");
      dataset.backgroundColor.push("#961a1a");
      dataset.data.push(Number(selectElemVal[0].other_hhd_emp));
      //dataPercent.push(((selectElemVal[0].other_hhd_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + Number(selectElemVal[0].other_hhd_emp);
      othertext += "Transfer Payment, ";
    }
    //Other
    if(otheremp>0){
      horizontalBarChartData.labels.push("Other*");
      dataset.backgroundColor.push("black");
      dataset.data.push(Number(otheremp));
      //dataPercent.push(((otheremp/total)*100).toFixed(2));
      othertext = othertext.substring(0,othertext.length-2);
      document.getElementById('other').innerHTML = othertext;
      console.log(othertext);
    } else {
      document.getElementById('other').innerHTML = '';
    }

  });
  
  window.myHorizontalBar.update();
});



function getData(fips) {

  var data = $.ajax({
   url: "https://gis.dola.colorado.gov/lookups/base-analysis?county="+fips,
   dataType: 'json',
   async: false,

   });

  return data.responseJSON;
 
}


var horizontalBarChartData = {
	labels: startlabels,
	datasets: [{
		label: 'Employees',
		backgroundColor: startcolors,
		borderColor: window.chartColors.black,
		borderWidth: .5,
		data: startdata
	}]
	
};
		

		
window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');

	window.myHorizontalBar = new Chart(ctx, {
		type: 'horizontalBar',
		data: horizontalBarChartData,
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
              total += Math.round(dataset.data[i]); 
            }
      //get the current items value
            var currentValue = dataset.data[tooltipItem.index];
      //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);
              label += ', ';
              label += percentage;
              label += '% of jobs in county';
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
			        case 'Agriculture':
			          exp = 'Activities related to and supporting agricultural production & processing.';
			          break;
			        case 'Agriculture Inputs':
			          exp = 'Goods and services such as fertilizer, seeds or equipment used in agriculture production.';
			          break;
			        case 'Agriculture Production':
			          exp = 'Raising crops and livestock for sale.';
			          break;
			        case 'Agriculture Other':
			          exp = 'Activities that add value to ag products and prepares/transports them for market.';
			          break;
			        case 'Mining':
			          exp = 'Mining operations and mining support.  Includes support activities for oil & gas drilling.';
			          break;
			        case 'Manufacturing':
			          exp = 'Activities related to manufacturing, except agricultural processing.';
			          break;
			        case 'Government':
			          exp = 'State & Federal government employment, including Higher Ed & military.';
			          break;
			        case 'Regional Service':
			          exp = 'Provide services to surrounding region & the nation such as health care, computer systems design, architecture, and transportation.';
			          break;
			        case 'Tourism':
			          exp = 'Activities related to tourism and industries that benefit from the spending of tourists and 2nd homeowners.';
			          break;
			        case 'Tourism: Resort':
			          exp = 'Ski and summer resorts, National Parks, amusement parks, scenic railways and accommodations at hotels, VRBO and campgrounds.';
			          break;
			        case 'Tourism: 2nd Home':
			          exp = 'The construction and upkeep of second homes and condominiums and fees paid to property management, maintenance, landscaping and cleaning services.';
			          break;
			        case 'Tourism: Other':
			          exp = 'Other activities related to tourism and industries that benefit from the spending of tourists such as eating, drinking and transportation.';
			          break;
			        case 'Commuter':
			          exp = 'Jobs in the local area that are supported by the earnings of commuters working outside the county or region.';
			          break;
			        case 'Retiree':
			          exp = 'Employment associated with the spending of retirees fixed income or savings.  Includes social security, disability and Medicare expenditures.';
			          break;
			        case 'Other Household':
			          exp = 'Jobs supported by unearned income: dividends, interest & rent.';
			          break;
			        case 'Other':
			          exp = 'See footer for small industries listed as other.';
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
				text: 'Alamosa Base Industries, 2018'
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
