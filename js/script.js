//datetime
function updateClock() {
    var clockElement = document.getElementById('hvn');
    var now = new Date();
    var daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    var dayOfWeek = daysOfWeek[now.getDay()]; // Lấy thứ từ 0 (Chủ nhật) đến 6 (Thứ bảy)
    // console.log(now.getDay());
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    var datenow = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();

    var datetime = dayOfWeek + ', ' + datenow + ' | ' + timeString;
    clockElement.innerHTML = datetime;
}

function updateClockContinuously() {
    updateClock();
    setInterval(updateClock, 1000); // Cập nhật đồng hồ mỗi giây
}

updateClockContinuously();



//location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocationInfo);
} else {
    console.log("Trình duyệt không hỗ trợ lấy vị trí của bạn.");
}

function getLocationInfo(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude, longitude)

    // Gửi yêu cầu HTTP để lấy thông tin địa lý từ tọa độ
    var request = new XMLHttpRequest();
    var url =
        "https://api.opencagedata.com/geocode/v1/json?q=" +
        latitude +
        "+" +
        longitude +
        "&key=ccc1378c63634a77aa8236af8db1f757";

    request.open("GET", url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            var city = response.results[0].components.city;
            var country = response.results[0].components.country;

            var locationElement = document.getElementById("location");
            locationElement.textContent = city + ", " + country;
        } else {
            console.log("Không thể lấy thông tin địa lý.");
        }
    };
    request.send();
}

//slider
$(document).ready(function () {
    var $slider = $('.slider');

    $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>'
    });

    // Hiển thị trang hiện tại của slider
    $slider.on('afterChange', function (event, slick, currentSlide) {
        var $currentSlideElement = $slider.find('.slick-current');

        // Lấy số trang hiện tại (dựa trên chỉ số của slide, bắt đầu từ 0)
        var currentPage = $currentSlideElement.data('slick-index') + 1;

        // Cập nhật nội dung trang hiện tại
        $('.current-slide').text('Trang hiện tại: ' + currentPage);
    });
});

function convertNumberToWords(number) {
    var units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    var powersOfTen = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];
  
    var words = '';
  
    if (number === 0) {
      return 'không';
    }
  
    if (number < 0) {
      words += 'âm ';
      number = Math.abs(number);
    }
  
    var chunks = [];
    while (number > 0) {
      chunks.push(number % 1000);
      number = Math.floor(number / 1000);
    }
  
    var numChunks = chunks.length;
    for (var i = numChunks - 1; i >= 0; i--) {
      var chunk = chunks[i];
  
      if (chunk === 0) {
        continue;
      }
  
      var chunkWords = '';
      var hundreds = Math.floor(chunk / 100);
      var tens = Math.floor((chunk % 100) / 10);
      var ones = chunk % 10;
  
      if (hundreds > 0) {
        chunkWords += units[hundreds] + ' trăm ';
      }
  
      if (tens === 0 && ones > 0) {
        chunkWords += 'lẻ ';
      }
  
      if (tens === 1 && ones > 0) {
        chunkWords += 'mười ';
      }
  
      if (tens > 1) {
        chunkWords += units[tens] + ' mươi ';
      }
  
      if (ones > 0 && tens !== 1) {
        chunkWords += units[ones] + ' ';
      }
  
      chunkWords += powersOfTen[i] + ' ';
      words += chunkWords;
    }
  
    return words.trim();
  }