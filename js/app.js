function fetchJSONFile(path, callback) {

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);

              for(var i=0; i< data.length; i++){
                
                for(key in data[i]){
                  if(key === 'fips' || key === 'ctype' ){
                    data[i][key] = parseInt(data[i][key]); 
                  } else if(key !== 'cname'){
                    data[i][key] = parseFloat(data[i][key]);
                  }
                }
                
              }
              
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

//fetchJSONFile("https://gis.dola.colorado.gov/lookups/base-analysis?all=yes", init);
fetchJSONFile("https://gis.dola.colorado.gov/lookups/sya?county=1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125&year=2020&choice=5yr", init);
https://api.census.gov/data/2010/dec/sf1?get=H001001,NAME&for=state:*

function init(data){
  
  sel.addEventListener('change', function(){
    var datastring = changedata(this.value,'yes');
    console.log(datastring);
    return datastring;
  });
  
  var select = document.getElementById('sel');
  var opt;
  var i;

  

  //load select control with options based on JSON data
  for(i=0;i<data.length;i=i+1){
    opt = document.createElement('option');
    opt.value = data[i].fips;
    opt.innerHTML = data[i].cname;
    select.appendChild(opt);
    
    //defaults to Otero
    if(data[i].fips == 89) {
        select.selectedIndex = i;
    }
    
  }



  function changedata(fips, redraw){

    for(i=0;i<data.length;i=i+1){

      //create 'other' bin
      var otheremp=0;
      var othercount=0;
      var otherstring="";
      var datastring=[];

      if(data[i].fips==fips){
        //console.log(data[i]);
        
        datastring.push(Number(data[i].total_basic_emp)-Number(data[i].ib_emp));
        
        
        //new entry
        // console.log(' ');
        // console.log(data[i].cname);
        // console.log(data[i]);
        // console.log(datastring);
        return(datastring);
      }
    }
  }

}
	  
	  
	  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var color = Chart.helpers.color;
		var lineChartData = {
			labels: ['Transfer Payment', 'Agriculture', 'Manufacturing', 'Mining', 'Government', 'Regional Service', 'Tourism', 'Commuter', 'Other Household', 'Retiree'],
			datasets: [{
				label: 'Dataset 1',
				backgroundColor: [
          "#961a1a",
          "#be66a2",
          "#7b6888",
          "#2484c1",
          "#65a620",
          "#bca44a",
          "#e98125",
          "#a05d56",
          "#546e91",
          "#5b388f",
          "#7d9058"
        ],
				borderColor: window.chartColors.black,
				borderWidth: .5,
				data: [randomScalingFactor(),randomScalingFactor()]
				// [
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor(),
 			// 		randomScalingFactor()
 			// 	]
			}
// 			, { Use if comparison is wanted
// 				label: 'Dataset 2',
// 				backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
// 				borderColor: window.chartColors.blue,
// 				data: [
// 					randomScalingFactor(),
// 					randomScalingFactor(),
// 					randomScalingFactor(),
// 					randomScalingFactor(),
// 					randomScalingFactor(),
// 					randomScalingFactor(),
// 					randomScalingFactor()
// 				]
// 			}
			]
		};

  //var datastring = changedata(89, 'no');
		
	
		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');

			window.myLine = new Chart(ctx, {
				type: 'line',
				data: lineChartData,
				options: {
					// Elements options apply to all of the options unless overridden in a dataset
					// In this case, we are setting the border of each horizontal bar to be 2px wide
					scales: {
					  yAxes: [{
					    barPercentage: 1,
					    categoryPercentage: 0.5
					  }]
					},
					elements: {
						rectangle: {
							borderWidth: 1,
						}
					},
					responsive: true,
					legend: {
						position: 'right',
					},
					title: {
						display: true,
						text: 'Base Industries'
					}
				}
			});
		};
