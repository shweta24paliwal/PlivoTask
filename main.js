

var selectedCountries = [];
var sliderValue = 0;
var outboundPrice = 0.0050;
var inboundPrice = 0.0025;

//map script
var map = AmCharts.makeChart("mapdiv", {
  "type": "map",
  "theme": "light",
  "projection": "eckert3",
  "dataProvider": {
    "map": "worldLow",
    "getAreasFromMap": true
  },
  "zoomControl": {
    "zoomControlEnabled": false,
    "homeButtonEnabled": false
  },
  "areasSettings": {
    "color": "#E8EAF1",
	"colorSolid": "#2BB301",
	"selectedColor": "#2BB031",
	"outlineColor": "#FFFFFF",
	"rollOverColor": "#BFE7C1",
	"rollOverOutlineColor": "#000000",
    "selectable": true
  },
  /**
   * Add click event to track country selection/unselection
   */
  "listeners": [{
    "event": "clickMapObject",
    "method": function(e) {
      
      // Ignore any click not on area
      if (e.mapObject.objectType !== "MapArea")
        return;
      
      var area = e.mapObject;
      
      // Toggle showAsSelected
      area.showAsSelected = !area.showAsSelected;
      e.chart.returnInitialColor(area);
      
      // Update the list
      var countries = getSelectedCountries();
      renderSelectedCountriesTag(countries);
    }
  }]
});

//Country selection with tags
function getSelectedCountries() {
  selectedCountries = [];
  for(var i = 0; i < map.dataProvider.areas.length; i++) {
    if(map.dataProvider.areas[i].showAsSelected)
      selectedCountries.push({title: map.dataProvider.areas[i].title, id: map.dataProvider.areas[i].id});
  }
  return selectedCountries;
}

function renderSelectedCountriesTag(countries) {

	document.getElementById("selectedCountries").innerHTML = "" 

	for (var i = countries.length - 1; i >= 0; i--) {
		console.log(countries[i]);
		var country =  countries[i];
		var tag = document.createElement("div");
		tag.classList.add("country-tag");
		tag.classList.add("mid-font");

		

		var text = document.createElement("span");
		text.innerText = country.title;

		var image = document.createElement("img");
		image.setAttribute('data-id',  country.id);
        image.src = "../Plivo project/close.svg";

        tag.appendChild(text);
        tag.appendChild(image);	

        document.getElementById("selectedCountries").appendChild(tag);
     	   
	}
}


// country tags
var countriesDiv = document.getElementById("selectedCountries");
countriesDiv.onclick = function(event) {
  let target = event.target; 
  if (target.tagName != 'IMG') return; 

  var mapObject  = map.getObjectById(target.dataset.id);
  
  map.clickMapObject(mapObject);
};

//slider range value
var rangeInput = document.getElementById("slider");
rangeInput.oninput = function(){
	sliderValue = this.value;


	if(sliderValue > 2000){
		document.getElementById("contact-btn").style.display = "inline-block";
		document.getElementById("pricing-btn").style.display = "none"
	}
	else{
		document.getElementById("contact-btn").style.display = "none";
		document.getElementById("pricing-btn").style.display = "inline-block"
	}

	var sendCheckbox = document.getElementById("option-1");
	var receiveCheckbox = document.getElementById("option-2");

	if (sendCheckbox.checked === true) {
		var price = outboundPrice * selectedCountries.length * sliderValue;
		document.getElementById('outBoundPrice').innerText = '$' + price.toFixed(4);
	}

	if (receiveCheckbox.checked === true) {
		var price = inboundPrice * selectedCountries.length * sliderValue;
		document.getElementById('inBoundPrice').innerText = '$' + price.toFixed(4);	
	}	
}

//showing calcultor div
function getEstimate(){
	var calculator = document.getElementById("calculator");

	var sendCheckbox = document.getElementById("option-1");
	var receiveCheckbox = document.getElementById("option-2");
	
	if((selectedCountries.length > 0) && (sendCheckbox.checked === true || receiveCheckbox.checked === true)){
		calculator.style.display = "block";
		calculator.scrollIntoView();

		if (sendCheckbox.checked !== true) {
			document.getElementById("outBoundCtn").style.display = "none";	
			document.getElementById("inBoundCtn").style.borderLeft = "none";	
		}
	
		if (receiveCheckbox.checked !== true) {
			document.getElementById("inBoundCtn").style.display = "none";

		}

	}
	else{
		alert("Please select Countries and SMS options");
	}

}


//contact form
function contactForm(){
	var contactBox = document.getElementById("contact-form");
	if(contactBox.style.display === ""){
		contactBox.style.display = "block";
		contactBox.scrollIntoView();
	}
	else{
		contactBox.style.display = "none";
	}
}