var selectElem = document.getElementById('sel');
var selectElem2 = document.getElementById('sel2');

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
        data: sdodata,
        fill: false,
        borderColor: 'rgb(239,138,98)'
      },
      {
        label: "Census",
        data: censusdata,
        fill: false,
        borderColor: 'rgb(103,169,207)'
      }
    ],
      labels: startlabels,
    },
		options: {

      // Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide

			tooltips: {
			  callbacks: {
			    title: function(tooltipItem, data){
            display: false
          },
          label: function(tooltipItem, data) {
            if (selectElem2.value == 0){
              var label = commafy(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
            } else {
              var label = formatAsPercentage(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],2);
            }
            return label;
  			    },
			    /* afterLabel: function(tooltipItem, data) {
			      var sum = data.datasets.reduce((sum, dataset) => {
           	  return sum + dataset.data[tooltipItem.index];
             }, 0);
             var percent = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum * 100;
             percent = percent.toFixed(2); // make a nice string
             return data.datasets[tooltipItem.datasetIndex].label + ': ' + percent + '%';
			      var exp = '';
			      switch (tooltipItem.yLabel) {
			        case 'Transfer Payment':
			          exp = 'Aka Public Assistance to those under 60.  Includes Medicaid, EITC, SNAP, & Unemployment Insurance compensation.';
			          break;
			      }
			      return ['',exp];
			    } */
			  }
			},  
			scales: {
			  yAxes: [{
			    barPercentage: 1,
			    categoryPercentage: 0.5,
          ticks: {
			      callback: function(value, index, values) {
              if (selectElem2.value == 0){
			          return commafy(value);
              } else{
                return formatAsPercentage(value, 0);
              }
			      }
			    },
			  }],
			  xAxes: [{
			    
			    scaleLabel: {
			      display: true,
			      labelString: 'Age Groups'
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
				display: true,
				position: 'right',
			},
			title: {
				display: true,
				text: 'Age Comparison'
			}
		}
	});
			
};

selectElem.addEventListener('change', handler, false);
selectElem2.addEventListener('change', handler, false);

//selectElem.addEventListener('change', function() {
function handler(event){
  myLine.data.datasets.forEach(dataset => { 
    selectElemVal = getData(selectElem.value);
    seconddata = getData2();
    var sdodata = [];
    var censusdata = [];
    if (selectElem2.value == "0"){
      for (i in selectElemVal){
        sdodata.push(Number(selectElemVal[i].totalpopulation));
      }

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
    } else {
      var sdototalpop = 0;
      var censustotalpop = 0;
      var tempsdo = [];
      var tempcensus = [];
      for (i in selectElemVal){
        tempsdo.push(Number(selectElemVal[i].totalpopulation));
        sdototalpop += Number(selectElemVal[i].totalpopulation);
      }
      for (i in tempsdo){
        sdodata.push((tempsdo[i]/sdototalpop*100));
      }
      for (j in seconddata){
        if (seconddata[j].countyfips == selectElem.value){
          tempcensus.push(Number(seconddata[j].Age0));
          tempcensus.push(Number(seconddata[j].Age5));
          tempcensus.push(Number(seconddata[j].Age10));
          tempcensus.push(Number(seconddata[j].Age15));
          tempcensus.push(Number(seconddata[j].Age20));
          tempcensus.push(Number(seconddata[j].Age25));
          tempcensus.push(Number(seconddata[j].Age30));
          tempcensus.push(Number(seconddata[j].Age35));
          tempcensus.push(Number(seconddata[j].Age40));
          tempcensus.push(Number(seconddata[j].Age45));
          tempcensus.push(Number(seconddata[j].Age50));
          tempcensus.push(Number(seconddata[j].Age55));
          tempcensus.push(Number(seconddata[j].Age60));
          tempcensus.push(Number(seconddata[j].Age65));
          tempcensus.push(Number(seconddata[j].Age70));
          tempcensus.push(Number(seconddata[j].Age75));
          tempcensus.push(Number(seconddata[j].Age80));
          tempcensus.push(Number(seconddata[j].Age85));
          tempcensus.push(Number(seconddata[j].Age90));
          tempcensus.push(Number(seconddata[j].Age95));
        }   
      }
      for (j in tempcensus){
        censustotalpop += tempcensus[j];
      }
      for (j in tempcensus){
        console.log(censustotalpop);
        censusdata.push((tempcensus[j]/censustotalpop*100));
      }
    }

    if (dataset.label == "SDO"){
      dataset.data = sdodata;
    } else {
      dataset.data = censusdata;
    } 
  });
  
  window.myLine.update();
};


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

function formatAsPercentage(num, decimal) {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(num / 100);
}
