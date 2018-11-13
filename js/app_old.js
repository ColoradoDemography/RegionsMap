
  /* OPEN JAVASCRIPT CONSOLE TO SEE LOGIC NOTES IN REALTIME    */

  var datayear = "2016";


/* description is in the name */
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

//load all the data, call init when it's done
fetchJSONFile("https://gis.dola.colorado.gov/lookups/base-analysis?all=yes", init);



function init(data){
  
  sel.addEventListener('change', function(){
    changedata(this.value,'yes');
  });
  
  console.log(data);
  
var select = document.getElementById('sel');
var opt;
var i;
var pie;
var config={};
var min_pie_val=0.02;
var updatefooter="";
  
  var color_transfer= "#961a1a" ;
  var color_agr="#be66a2"   ;
    var color_ag_prod="#985282"   ;
    var color_ag_inp="#AB5C92"   ;
  var color_manu="#7b6888"   ;
  var color_mining="#2484c1"   ;
  var color_gov="#65a620"   ;
  var color_reg_serv="#bca44a"   ;
  var color_tour="#e98125"   ;
    var color_tour_resort="#BA671E"   ;
    var color_tour_home="#D27421"   ;
  var color_commute="#a05d56"   ;
  var color_oth_hh="#546e91"  ;
  var color_retiree="#5b388f"  ;
  var color_other="#7d9058"   ;
  
  
  
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
  
  

  //pie properties (ALL!) most are left as defaults
config={
	header: {
		title: {
			text:    "Otero Base Industries, " + datayear,
			color:    "#333333",
			fontSize: 36,
			font:     "arial"
		},
		subtitle: {
			text: " ",
			color:    "#666666",
			fontSize: 14,
			font:     "arial"
		},
		location: "top-center",
		titleSubtitlePadding: 8
	},
	footer: {
		text: 	  "",
		color:    "#666666",
		fontSize: 14,
		font:     "arial",
		location: "left"
	},
	size: {
		canvasHeight: 600,
		canvasWidth: 800,
		pieInnerRadius: 0,
		pieOuterRadius: null
	},
	data: {
		sortOrder: "none",
		smallSegmentGrouping: {
			enabled: false,
			value: 1,
			valueType: "percentage",
			label: "Other",
			color: "#cccccc"
		},

		// REQUIRED! This is where you enter your pie data; it needs to be an array of objects
		// of this form: { label: "label", value: 1.5, color: "#000000" } - color is optional
		content: []
	},
	labels: {
		outer: {
			format: "label",
			hideWhenLessThanPercentage: null,
			pieDistance: 30
		},
		inner: {
			format: "percentage",
			hideWhenLessThanPercentage: 4
		},
		mainLabel: {
			color: "#555555",
			font: "arial",
			fontSize: 20
		},
		percentage: {
			color: "#dddddd",
			font: "arial",
			fontSize: 16,
			decimalPlaces: 0
		},
		value: {
			color: "#cccc44",
			font: "arial",
			fontSize: 10
		},
		lines: {
			enabled: true,
			style: "curved",
			color: "segment" // "segment" or a hex color
		}
	},
	effects: {
		load: {
			effect: "default", // none / default
			speed: 1000
		},
		pullOutSegmentOnClick: {
			effect: "bounce", // none / linear / bounce / elastic / back
			speed: 300,
			size: 10
		},
		highlightSegmentOnMouseover: true,
		highlightLuminosity: -0.2
	},
	tooltips: {
		enabled: false,
		type: "placeholder", // caption|placeholder
		string: "3423423",
		placeholderParser: null,
		styles: {
			fadeInSpeed: 250,
			backgroundColor: "#000000",
			backgroundOpacity: 0.5,
			color: "#efefef",
			borderRadius: 2,
			font: "arial",
			fontSize: 10,
			padding: 4
		}
	},

	misc: {
		colors: {
			background: 'white', // transparent
			segments: [
				"#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a",
				"#e98125", "#d0743c", "#635222",				
        "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a",
				"#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
				"#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e",
				"#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
				"#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c",
				"#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
				"#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b",
				"#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
			],
			segmentStroke: "#ffffff"
		},
		gradient: {
			enabled: true,
			percentage: 99,
			color: "#000000"
		},
		canvasPadding: {
			top: 30,
			right: 5,
			bottom: 5,
			left: 5
		},
		pieCenterOffset: {
			x: 0,
			y: 0
		},
		cssPrefix: null
	},
	callbacks: {
		onload: changetitle,
		onMouseoverSegment: null,
		onMouseoutSegment: null,
		onClickSegment: null
	}
};

  
  //a bit of a hack.  title and footer are changed after the chart is reloaded.  problems with updatepie method on svg text in IE and Safari.  Issue filed.
  function changetitle(){
       
        document.getElementById('p0_footer').setAttribute("x", "10");
        document.getElementById('p0_footer').setAttribute("fill", "#666666"  ); 

              //add chart outline after reload
  d3.select('svg').append("rect")
    .attr("width",800) 
    .attr("height",600)     
    .style({'fill':'white','fill-opacity':'0','stroke-width': 1,'stroke':'dimgrey'});
    

  }  
  
  //called by onchange event on select dropdown.  'redraw' parameter only refused (by setting to 'no') on initial load .
  function changedata(fips, redraw){


      for(i=0;i<data.length;i=i+1){
 
        //create 'other' bin
        var otheremp=0;
        var othercount=0;
        var otherstring="";

    if(data[i].fips==fips){
    
      
      var total=Number(data[i].total_basic_emp)-Number(data[i].ib_emp);
      
      
      //new entry
      console.log(' ');
      console.log(data[i].cname);      

      config.header.title.text = data[i].cname + " Base Industries, " + datayear,
      
      config.data.content=[];
      

      if((data[i].other_hhd_emp/total) > min_pie_val){
        config.data.content.push({ label:'Transfer Payment', value: data[i].other_hhd_emp, color: color_transfer });
      }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].other_hhd_emp>0){          
            console.log('Transfer Payment included in other'); 
            othercount=othercount+1;
            otheremp=otheremp+Number(data[i].other_hhd_emp);
            otherstring=otherstring+" Transfer Payment,";
          }else{
            console.log('Transfer Payment = 0');
          }
      }  
      
           
      if((data[i].agri_emp/total) > min_pie_val){
        
        if((data[i].agri_emp/total) > 0.40){
          console.log('Agriculture BIG');
          config.data.content.push({ label:'Agr. Production', value: data[i].ag_prod_emp, color: color_ag_prod });
          config.data.content.push({ label:'Agr. Inputs', value: data[i].ag_inputs_emp, color: color_ag_inp });
          config.data.content.push({ label:'Agr. Other', value: (Number(data[i].ag_proc_trade_emp)+Number(data[i].ag_proc_emp)), color: color_agr });
        }else{
          config.data.content.push({ label:'Agriculture', value: data[i].agri_emp, color: color_agr });
        }
        

      }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].agri_emp>0){          
            console.log('Agriculture included in other');   
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].agri_emp);
            otherstring=otherstring+" Agriculture,";
          }else{
            console.log('Agriculture = 0');
          }
        
        
      }  
      
      //change to a true condition to see data on mining and manufacturing as a double check
      if(true==false){
        //mining & manufacturing variable tests
        console.log(((data[i].mining_emp/total)<min_pie_val));
        console.log(((data[i].mining_emp/total)));      
        console.log(((data[i].manuf_emp/total)<min_pie_val));
        console.log(((data[i].manuf_emp/total)));      
        console.log((((data[i].manuf_emp+data[i].mining_emp)/total)>0.05));
        console.log((((data[i].manuf_emp+data[i].mining_emp)/total)));  
      }


      
      if( ( ((data[i].mining_emp/total)<min_pie_val) || ((data[i].manuf_emp/total)<min_pie_val) ) && (((data[i].manuf_emp+data[i].mining_emp)/total)>0.03) ){
        //combine mining and manufacturing.  Use name of whichever value is larger
        if(data[i].manuf_emp>data[i].mining_emp){
          config.data.content.push({ label:'Manufacturing', value: (data[i].manuf_emp+data[i].mining_emp), color: color_manu });
        }else{
          config.data.content.push({ label:'Mining', value: (data[i].manuf_emp+data[i].mining_emp), color: color_mining });          
        }
        console.log('mining '+(data[i].mining_emp/total)+' combined into manufacturing '+(data[i].manuf_emp/total));
      }else{
        if((data[i].manuf_emp/total) > min_pie_val){
          config.data.content.push({ label:'Manufacturing', value: data[i].manuf_emp, color: color_manu });
        }else{
          //only include into other bin if there is something to include (ie not zero);          
          if(data[i].manuf_emp>0){
            console.log('Manufacturing included in other');
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].manuf_emp);
            otherstring=otherstring+" Manufacturing,";
          }else{
            console.log('Manufacturing = 0');
          }
        }
        if((data[i].mining_emp/total) > min_pie_val){
          config.data.content.push({ label:'Mining', value: data[i].mining_emp, color: color_mining });
        }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].mining_emp>0){          
            console.log('Mining included in other'); 
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].mining_emp);
            otherstring=otherstring+" Mining,";
          }else{
            console.log('Mining = 0');
          }
        }
      }
      
      if((data[i].govt_emp/total) > min_pie_val){
        config.data.content.push({ label:'Government', value: data[i].govt_emp, color: color_gov });
      }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].govt_emp>0){          
            console.log('Government included in other');    
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].govt_emp);
            otherstring=otherstring+" Government,";
          }else{
            console.log('Government = 0');
          }
      }
      
      if((data[i].regl_serv_emp/total) > min_pie_val){
        config.data.content.push({ label:'Regional Service', value: data[i].regl_serv_emp, color: color_reg_serv });
      }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].regl_serv_emp>0){          
            console.log('Regional Service included in other');     
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].regl_serv_emp);
            otherstring=otherstring+" Regional Service,";
          }else{
            console.log('Regional Service = 0');
          }
      }
      
      if((data[i].tourism_emp/total) > min_pie_val){
        
                
        if((data[i].tourism_emp/total) > 0.40){
          console.log('Tourism BIG');
          config.data.content.push({ label:'Tourism: Resort', value: data[i].resorts_emp, color: color_tour_resort });
          config.data.content.push({ label:'Tourism: 2nd Home', value: data[i].second_home_emp, color: color_tour_home });
          config.data.content.push({ label:'Tourism: Other', value: (Number(data[i].tour_serv_emp)+Number(data[i].trans_emp)), color: color_tour });
        }else{
          config.data.content.push({ label:'Tourism', value: data[i].tourism_emp, color: color_tour });
        }
        
        
        

      }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].tourism_emp>0){          
            console.log('Tourism included in other');         
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].tourism_emp);
            otherstring=otherstring+" Tourism,";
          }else{
            console.log('Tourism = 0');
          }
      }      
      
      if(data[i].commuter_emp>0){
        if((data[i].commuter_emp/total) > min_pie_val){
          config.data.content.push({ label:'Commuter', value: data[i].commuter_emp, color: color_commute });  
        }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].commuter_emp>0){
            console.log('commuting included in other');
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].commuter_emp);
            otherstring=otherstring+" Commuter,";          
          }else{
            console.log('Commuting <= 0');
          }
        }
 
      }else{
        console.log('commuter negative - suppressed');
      }

      
      if((data[i].other_inc_emp/total) > min_pie_val){
        config.data.content.push({ label:'Other Household', value: data[i].other_inc_emp, color: color_oth_hh });
      }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].other_inc_emp>0){          
            console.log('Other Household included in other');  
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].other_inc_emp);
            otherstring=otherstring+" Other Household,";
          }else{
            console.log('Other Household = 0');
          }
      }      
      
      
      if((data[i].retiree_emp/total) > min_pie_val){
        config.data.content.push({ label:'Retiree', value: data[i].retiree_emp, color: color_retiree });
      }else{
          //only include into other bin if there is something to include (ie not zero);
          if(data[i].retiree_emp>0){          
            console.log('Retiree');       
            othercount=othercount+1;            
            otheremp=otheremp+Number(data[i].retiree_emp);
            otherstring=otherstring+" Retiree,";
          }else{
            console.log('Retiree = 0');
          }
      }     
      
      
      //if anything in 'other' bin
      if(othercount>0){
        
        if(othercount==1){
          //exactly 1 other
          
            //trim comma
            otherstring=otherstring.substring(0, otherstring.length - 1);
            //trim beginning whitespace
            otherstring=otherstring.substring(1, otherstring.length);
          
          
          //dont display at all if not significant amount
          if((otheremp/total)>0.005){
            //significant value: revert back
            var newcolor="black";
            if(otherstring=="Transfer Payment"){newcolor=color_transfer;}
            if(otherstring=="Agriculture"){newcolor=color_agr;}
            if(otherstring=="Manufacturing"){newcolor=color_manu;}
            if(otherstring=="Mining"){newcolor=color_mining;} 
            if(otherstring=="Government"){newcolor=color_gov;}
            if(otherstring=="Regional Service"){newcolor=color_reg_serv;}
            if(otherstring=="Tourism"){newcolor=color_tour;}
            if(otherstring=="Commuter"){newcolor=color_commute;}       
            if(otherstring=="Other Household"){newcolor=color_oth_hh;}
            if(otherstring=="Retiree"){newcolor=color_retiree;}
               
            config.data.content.push({ label: otherstring, value: otheremp, color: newcolor });  
          
            console.log("Revert, No Other");
            updatefooter = "";
            config.footer.text = updatefooter;
            config.footer.color = "#ffffff";
          }else{
            console.log(otherstring + ' was ignored due to low value');
            updatefooter = "";
            config.footer.text = updatefooter;
            config.footer.color = "#ffffff";
          }

          
          
        }else{
          //more than 1 'other'
          console.log('"other" raw = '+otheremp+', total = '+(otheremp/total));
          if((otheremp/total)>0.01){
            config.data.content.push({ label:'Other*', value: otheremp, color: color_other });  
            
            //preview Other Notes string
            console.log("*Other includes: "+otherstring.substring(0, otherstring.length - 1));
            updatefooter = "*Other includes: "+otherstring.substring(0, otherstring.length - 1);
            config.footer.text = updatefooter;
            config.footer.color = "#ffffff";
            
          }else{
            console.log('other bin too small to show');
            updatefooter = "";
            config.footer.text = updatefooter;
            config.footer.color = "#ffffff";
          }


          
        }
        

      }else{
        //No Other Data
        console.log("No Other");
        updatefooter = "";
        config.footer.text = updatefooter;
        config.footer.color = "#ffffff";
      }
      
      
      //console.log(config.data.content);
      
    
      
      if(redraw==='yes'){
        
        //regular method - works fine on data
        pie.updateProp("data.content", config.data.content);

        //workaround for SVG text elements.  change property in config object.  but wait til chart is loaded to update actual SVG.
        var titletext = document.getElementById('p0_title');
        titletext.textContent=config.header.title.text;
        var footertext = document.getElementById('p0_footer');
        footertext.textContent=config.footer.text;        



      }
      
    }
    
  }
        

    
  }
    
  //go time:  kicks off app by loading OTERO
  changedata(89, 'no');
  pie = new d3pie("pie", config); 

}
