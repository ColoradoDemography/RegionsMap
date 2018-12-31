var selectElem = document.getElementById('sel');

var startlabels = ['Transfer Payment', 'Agriculture', 'Manufacturing', 'Government', 'Regional Service', 'Tourism', 'Retiree'];
var startcolors = ["#961a1a", "#be66a2", "#7b6888", "#65a620", "#bca44a", "#e98125", "#5b388f"];
var startdata = [263,1045,84,1451,2041,810,790]; //Load Alamosa County manually for now

selectElem.addEventListener('change', function() {
  horizontalBarChartData.datasets.forEach(function(dataset) {
    console.log(selectElem.value);
    selectElemVal = getData(selectElem.value);
    //console.log(selectElemVal);
    var total=Number(selectElemVal[0].total_basic_emp)-Number(selectElemVal[0].ib_emp);
    var minval=0.01;
    var otheremp=0;
    var othertext = "*Other includes: ";
    window.myHorizontalBar.options.title.text = selectElem.options[selectElem.selectedIndex].text + " Base Industries, 2017";
    horizontalBarChartData.labels = [];
    dataset.backgroundColor = [];
    dataset.data = [];
    dataPercent = [];
    //Transfer Payment
    if((selectElemVal[0].other_hhd_emp/total)>minval){  
      horizontalBarChartData.labels.push("Transfer Payment");
      dataset.backgroundColor.push("#961a1a");
      dataset.data.push(selectElemVal[0].other_hhd_emp);
      dataPercent.push(((selectElemVal[0].other_hhd_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].other_hhd_emp;
      othertext += "Transfer Payment, ";
    }
    //Agriculture
    if ((selectElemVal[0].agri_emp/total) > 0.40){
    	if((selectElemVal[0].ag_prod_emp/total)>0){
      	horizontalBarChartData.labels.push("Agriculture Production");
    	  dataset.backgroundColor.push("#985282");
    	  dataset.data.push(selectElemVal[0].ag_prod_emp);
    	  dataPercent.push(((selectElemVal[0].ag_prod_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].ag_inputs_emp/total)>0){
    	  horizontalBarChartData.labels.push("Agriculture Inputs");
    	  dataset.backgroundColor.push("#AB5C92");
    	  dataset.data.push(selectElemVal[0].ag_inputs_emp);
    	  dataPercent.push(((selectElemVal[0].ag_inputs_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].ag_proc_trade_emp + selectElemVal[0].ag_proc_emp)>0){
    	  horizontalBarChartData.labels.push("Agriculture Other");
      	dataset.backgroundColor.push("#be66a2");
    	  dataset.data.push(selectElemVal[0].ag_proc_trade_emp + selectElemVal[0].ag_proc_emp);
    	  dataPercent.push((((selectElemVal[0].ag_proc_trade_emp + selectElemVal[0].ag_proc_emp)/total)*100).toFixed(2));
    	}
    } else if ((selectElemVal[0].agri_emp/total) > minval){
    	horizontalBarChartData.labels.push("Agriculture");
    	dataset.backgroundColor.push("#be66a2");
    	dataset.data.push(selectElemVal[0].agri_emp);
    	dataPercent.push(((selectElemVal[0].ag_prod_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].agri_emp;
      othertext += "Agriculture, ";
    }
    //Mining
    if((selectElemVal[0].mining_emp/total)>minval){
      horizontalBarChartData.labels.push("Mining");
      dataset.backgroundColor.push("#2484c1");
      dataset.data.push(selectElemVal[0].mining_emp);
      dataPercent.push(((selectElemVal[0].mining_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].mining_emp;
      othertext += "Mining, ";
    }
    //Manufacturing
    if((selectElemVal[0].manuf_emp/total)>minval){
      horizontalBarChartData.labels.push("Manufacturing");
      dataset.backgroundColor.push("#7b6888");
      dataset.data.push(selectElemVal[0].manuf_emp);
      dataPercent.push(((selectElemVal[0].manuf_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].manuf_emp;
      othertext += "Manufacturing, ";
    }
    //Government
    if((selectElemVal[0].govt_emp/total)>minval){
      horizontalBarChartData.labels.push("Government");
      dataset.backgroundColor.push("#65a620");
      dataset.data.push(selectElemVal[0].govt_emp);
      dataPercent.push(((selectElemVal[0].govt_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].govt_emp;
      othertext += "Government, ";
    }
    //Regional Service
    if((selectElemVal[0].regl_serv_emp/total)>minval){
      horizontalBarChartData.labels.push("Regional Service");
      dataset.backgroundColor.push("#bca44a");
      dataset.data.push(selectElemVal[0].regl_serv_emp);
      dataPercent.push(((selectElemVal[0].regl_serv_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].regl_serv_emp;
      othertext += "Regional Service, ";
    }
    //Tourism
    if ((selectElemVal[0].tourism_emp/total) > 0.40){
    	if((selectElemVal[0].resorts_emp/total)>0){
    	  horizontalBarChartData.labels.push("Tourism: Resort");
    	  dataset.backgroundColor.push("#BA671E");
    	  dataset.data.push(selectElemVal[0].resorts_emp);
    	  dataPercent.push(((selectElemVal[0].resorts_emp/total)*100).toFixed(2));
    	}
      if((selectElemVal[0].second_home_emp/total)>0){
    	  horizontalBarChartData.labels.push("Tourism: 2nd Home");
    	  dataset.backgroundColor.push("#D27421");
    	  dataset.data.push(selectElemVal[0].second_home_emp);
    	  dataPercent.push(((selectElemVal[0].second_home_emp/total)*100).toFixed(2));
    	}
    	if((selectElemVal[0].tour_serve_emp + selectElemVal[0].trans_emp)>0){
    	  horizontalBarChartData.labels.push("Tourism: Other");
    	  dataset.backgroundColor.push("#e98125");
    	  dataset.data.push(selectElemVal[0].tour_serve_emp + selectElemVal[0].trans_emp);
    	  dataPercent.push((((selectElemVal[0].tour_serve_emp + selectElemVal[0].trans_emp)/total)*100).toFixed(2));
    	}
    } else if ((selectElemVal[0].tourism_emp/total) > minval){
      horizontalBarChartData.labels.push("Tourism");
      dataset.backgroundColor.push("#e98125");
      dataset.data.push(selectElemVal[0].tourism_emp);
      dataPercent.push(((selectElemVal[0].tourism_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].tourism_emp;
      othertext += "Tourism, ";
    }
    //Commuter
    if((selectElemVal[0].commuter_emp/total)>minval){
      horizontalBarChartData.labels.push("Commuter");
      dataset.backgroundColor.push("#a05d56");
      dataset.data.push(selectElemVal[0].commuter_emp);
      dataPercent.push(((selectElemVal[0].commuter_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].commuter_emp;
      othertext += "Commuter, ";
    }
    //Other Household
    if((selectElemVal[0].other_inc_emp/total)>minval){
      horizontalBarChartData.labels.push("Other Household");
      dataset.backgroundColor.push("#546e91");
      dataset.data.push(selectElemVal[0].other_inc_emp);
      dataPercent.push(((selectElemVal[0].other_inc_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].other_inc_emp;
      othertext += "Other Household, ";
    }
    //Retiree
    if((selectElemVal[0].retiree_emp/total)>minval){
      horizontalBarChartData.labels.push("Retiree");
      dataset.backgroundColor.push("#5b388f");
      dataset.data.push(selectElemVal[0].retiree_emp);
      dataPercent.push(((selectElemVal[0].retiree_emp/total)*100).toFixed(2));
    } else {
      otheremp = otheremp + selectElemVal[0].retiree_emp;
      othertext += "Retiree, ";
    }
    //Other
    if(otheremp>0){
      horizontalBarChartData.labels.push("Other*");
      dataset.backgroundColor.push("black");
      dataset.data.push(otheremp);
      dataPercent.push(((otheremp/total)*100).toFixed(2));
      othertext = othertext.substring(0,othertext.length-2);
      document.getElementById('other').innerHTML = othertext;
      console.log(othertext);
    } else {document.getElementById('other').innerHTML = '';}
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
            // var total = 0;
            // for (i = 0; i < data.datasets.length; i++) {
            //   total += data.datasets[i].data[tooltipItem.datasetIndex];
            // }
            // console.log(data.datasets.length);
            // var percentage = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / total * 100;
            // percentage = percentage.toFixed(2);
                  var dataset = data.datasets[tooltipItem.datasetIndex];
      //calculate the total of this data set
      var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue;
      });
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
				text: 'Alamosa Base Industries, 2017'
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
