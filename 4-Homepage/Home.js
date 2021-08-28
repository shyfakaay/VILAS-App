//Reference: https://developers.google.com/maps/documentation/javascript/geolocation

// Langkah 3: fungsi initialize untuk mempersiapkan peta

// function initialize() {
// var latlng = new google.maps.LatLng(-6.1744444, 106.8294444);
// var myOptions = {
//     zoom: 13,
//     center: latlng,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
// };

// var map = new google.maps.Map(document.getElementById("map"), myOptions);



//contoh banyak marker
//   map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 2,
//     center: new google.maps.LatLng(2.8, -187.3),
//     mapTypeId: "terrain",
//   });
//   const script = document.createElement("script");
//   script.src =
//     "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
//   document.getElementsByTagName("head")[0].appendChild(script);
// }

// const eqfeed_callback = function (results) {
//   for (let i = 0; i < results.features.length; i++) {
//     const coords = results.features[i].geometry.coordinates;
//     const latLng = new google.maps.LatLng(coords[1], coords[0]);
//     new google.maps.Marker({
//       position: latLng,
//       map: map,
//     });
//   }
// }



// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function openBottomSheet() {
  console.log('masuk sini ')
  const slideBottom = document.querySelector('.slide-in-bottom');
  // untuk menutup bottom sheet
  if (slideBottom.classList.contains('active')) {
    return slideBottom.classList.remove('active')
  }
  document.querySelector('.slide-in-bottom').classList.add('active');
}

function openUpSheet() {
  console.log('masuk sini ')
  const slideBottom = document.querySelector('.slide-up');
  // untuk menutup bottom sheet
  if (slideBottom.classList.contains('activeup')) {
    return slideBottom.classList.remove('activeup')
  }
  document.querySelector('.slide-up').classList.add('activeup');
}

let map, infoWindow;


function initMap() {
  const my_location = { lat: -6.1744444, lng: 106.8294444 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: my_location,
    zoom: 10,
  });

  const marker = new google.maps.Marker({
    position: my_location,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
  });

  const my_group = [
    [{ lat: -6.4, lng: 106.8186111 }, "Shyfaa"],
    [{ lat: -6.5971469, lng: 106.8060388 }, "Hanin"],
    [{ lat: -6.1780556, lng: 106.63 }, "Raissa"],
  ];

  const image =
    "https://img.icons8.com/doodle/48/000000/user-female-circle.png";

  my_group.forEach(([position, title], i) => {
    const marker_group = new google.maps.Marker({
      position,
      map,
      title: `${i + 1}. ${title}`,
      label: `${i + 1}`,
      optimized: false,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image,
    });
    // Add a click listener for each marker, and set up the info window.
    marker_group.addListener("click", () => {
      // console.log('masuk sini')
      // openBottomSheet()
      openUpSheet()
      infoWindow.close();
      infoWindow.setContent(marker_group.getTitle());
      infoWindow.open(marker_group.getMap(), marker_group);
    });
  });

  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

getLocation();

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log(latitude, longitude);
} 