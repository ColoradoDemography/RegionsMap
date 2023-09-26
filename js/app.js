var selectElemCounty = document.getElementById('sel');
var selectElemSource = document.getElementById('sel2');
var selectElemStat = document.getElementById('sel3');
var drawElement = document.getElementById('drawbtn');
var srcCanvas = document.getElementById('canvas');

//Data urls
var bea_url = "https://gis.dola.colorado.gov/lookups/bea_jobs?county="
var mig_url = "https://gis.dola.colorado.gov/lookups/components?vars=netmigration&year=1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021&county="
var mig_reg_url = "https://gis.dola.colorado.gov/lookups/components_region?vars=netmigration&year=1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021&reg_num="

//function to create a white background for the canvas and convert to a png
function dlCanvas(){
  destinationCanvas = document.createElement("canvas");
  destinationCanvas.width = srcCanvas.width;
  destinationCanvas.height = srcCanvas.height;

  destCtx = destinationCanvas.getContext('2d');

  //create a rectangle with the desired color
  destCtx.fillStyle = "#FFFFFF";
  destCtx.fillRect(0,0,srcCanvas.width,srcCanvas.height);

  //draw the original canvas onto the destination canvas
  destCtx.drawImage(srcCanvas, 0, 0);
  var dt = destinationCanvas.toDataURL('image/png');
  this.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
};
downloadPNG.addEventListener('click', dlCanvas, false);

//$('select[multiple]').multiselect()

//change these to reflect Alamosa when making the annual update
var startlabels = ['1985','','','','','1990','','','','','2000','','','','','2005','','','','','2010','','','','','2015','','','','','2020','2021'];
var startcolors = ["#be66a2", "#65a620", "#7b6888", "#546e91", "#bca44a", "#5b388f", "#e98125", "#961a1a"];
var startdata = [992,1389,129,137,2078,695,756,436,0,0,992,1389,129,137,2078,695,756,436,0,0]; //Load Alamosa County manually for now
const jobyears = ['jobs_1985','jobs_1986','jobs_1987','jobs_1988','jobs_1989','jobs_1990','jobs_1991','jobs_1992','jobs_1993','jobs_1994','jobs_1995','jobs_1996','jobs_1997','jobs_1998','jobs_1999','jobs_2000',
'jobs_2001','jobs_2002','jobs_2003','jobs_2004','jobs_2005','jobs_2006','jobs_2007','jobs_2008','jobs_2009','jobs_2010','jobs_2011','jobs_2012','jobs_2013','jobs_2014','jobs_2015','jobs_2016','jobs_2017','jobs_2018','jobs_2019','jobs_2020','jobs_2021']

window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
  var firstdata = getDataJobs("0"); console.log(firstdata);
  var seconddata = getDataCountyMig("0");
  var thirddata = getDataRegionMig("0");
  
  var jobsData = [];
  //var censusdata = [];
  for (i in firstdata[0]){console.log(i);
    if (jobyears.indexOf(i) !== -1){
      jobsData.push(Number(firstdata[0].i)); ///figure this out
    }
  }
 console.log(jobsData);

	window.myLine = new Chart(ctx, {
		type: 'line',
		//data: lineChartData,
    
    data: {
      datasets:[{
        label: "Colorado",
        data: jobsData,
        fill: false,
        backgroundColor: 'rgb(239,138,98)',
        borderColor: 'rgb(239,138,98)'
      }/* ,
      {
        label: "Census",
        data: censusdata,
        fill: false,
        borderColor: 'rgb(103,169,207)'
      } */
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
            if (selectElemStat.value == 0){
              var label = commafy(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
            } else {
              var label = formatAsPercentage(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],2);
            }
            return label;
  			    },
			  }
			},  
			scales: {
			  yAxes: [{
			    barPercentage: 1,
			    categoryPercentage: 0.5,
          ticks: {
			      callback: function(value, index, values) {
              if (selectElemStat.value == 0){
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
				text: 'Job Change and Net Migration'
			}
		}
	});
			
};

//selectElemCounty.addEventListener('change', handler, false);
//selectElemSource.addEventListener('change', handler, false);
drawElement.addEventListener("click", handler);

//selectElemCountyaddEventListener('change', function() {
function handler(event){
  var chartDatasets = [];
  var selectedValues = $('#sel').val();
  
  
  myLine.data.datasets.forEach(dataset => { 
    for (let d = 0; d < myLine.data.datasets.length; i++){
      myLine.data.datasets.pop();
    }
    //console.log(selectElemCounty.value);
    
    //console.log(selectElemVal);
    seconddata = getDataCounty();
    for (let i = 0; i < selectedValues.length; i++){
      selectElemVal = getData(selectedValues[i]);
      
      var jobsData = [];
      var censusdata = [];
      if (selectElemSource.value == "0"){
        if (selectElemStat.value == "0"){
          for (j in selectElemVal){
            jobsData.push(Number(selectElemVal[j].totalpopulation));
          }
          //const dsColor = getRandomColor();
          const newDataset = {
            label: selectElemVal[0].county,
            backgroundColor: colorList[i],
            borderColor: colorList[i],
            fill: false,
            data: jobsData
          }
          console.log("Push");
          myLine.data.datasets.push(newDataset);
        } else { console.log("1");
          var sdototalpop = 0;
          var censustotalpop = 0;
          var tempsdo = [];
          var tempcensus = [];
          for (j in selectElemVal){
            tempsdo.push(Number(selectElemVal[j].totalpopulation));
            sdototalpop += Number(selectElemVal[j].totalpopulation);
          }
          console.log("tempsdo: " + tempsdo); console.log("sdototalpop " + sdototalpop);
          for (k in tempsdo){
            jobsData.push((tempsdo[k]/sdototalpop*100));
          }
        
          //const dsColor = getRandomColor();
          const newDataset = {
            label: selectElemVal[0].county,
            backgroundColor: colorList[i],
            borderColor: colorList[i],
            fill: false,
            data: jobsData
          }
          console.log("Push");
          myLine.data.datasets.push(newDataset);
      }
        //jobsData);
        //myLine.data.datasets[i].data.push(jobsData);
        /* for (j in seconddata){
          if (seconddata[j].countyfips == selectElemCountyvalue){
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
        } */
      } else {
      if (selectElemStat.value == "0"){
        for (j in seconddata){
          if (seconddata[j].countyfips == selectedValues[i]){
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

        //const dsColor = getRandomColor();
        const newDataset = {
          label: selectElemVal[0].county,
          backgroundColor: colorList[i],
          borderColor: colorList[i],
          fill: false,
          data: censusdata
        }
        console.log("Push");
        myLine.data.datasets.push(newDataset)
      }
       else{
        
        var censustotalpop = 0;
        var tempcensus = [];
        for (j in seconddata){
          if (seconddata[j].countyfips == selectedValues[i]){
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

        //const dsColor = getRandomColor();
        const newDataset = {
          label: selectElemVal[0].county,
          backgroundColor: colorList[i],
          borderColor: colorList[i],
          fill: false,
          data: censusdata
        }
console.log("Push");
        myLine.data.datasets.push(newDataset)
      
    }
  }
    //myLine.data.datasets.push(chartDatasets);
    //dataset.data = jobsData;
    }
  });
  //console.log(myLine.data.datasets);
  window.myLine.update();
};


function getDataJobs(fips) {
 var data = $.ajax({
   url: "https://gis.dola.colorado.gov/lookups/bea_jobs?county="+fips,
   dataType: 'json',
   async: false,
 });
   
  return data.responseJSON;
}

function getDataCountyMig(fips){
  var data = $.ajax({
    url: "https://gis.dola.colorado.gov/lookups/components?vars=netmigration&year=1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021&county="+fips,
    dataType: 'json',
    async: false,
  });

  return data.responseJSON;
}

function getDataRegionMig(fips){
  var data = $.ajax({
    url: "https://gis.dola.colorado.gov/lookups/components_region?vars=netmigration&year=1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021&reg_num="+fips,
    dataType: 'json',
    async: false,
  });

  return data.responseJSON;
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

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorList = ['#a50026','#313695','#f46d43','#74add1','#fee090','#f1b6da','#6a3d9a','#ff7f00','#b2df8a','#cab2d6'];
