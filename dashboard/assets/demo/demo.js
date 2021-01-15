//import lineStats from "lineChart.json";

type = ['primary', 'info', 'success', 'warning', 'danger'];



demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDocChart: function() {
    chartColor = "#FFFFFF";



  },

  initDashboardPageCharts: function() {


    dLivechartConfig = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true

    };



    //var ctx = document.getElementById("chartLinePurple").getContext("2d");


    readTextFile('http://bttscan.xyz/lineChart_dlive.json', function(text_BTT_Holders)
  {
    data_json = JSON.parse(text_BTT_Holders);
    console.log(data_json['labels']);


    var chart_labels = data_json['labels'];
    var chart_data = data_json['datasets'][0]['data'];
    var chart_data_dist = data_json['datasets'][1]['data'];
    var chart_data_BTTStaked = data_json['datasets'][2]['data'];
    var chart_data_USDT_Dist = data_json['datasets'][3]['data'];
    var ctx = document.getElementById("chartBig1").getContext('2d');

    var total = 0;
    for(var i = chart_data.length-60; i < chart_data.length; i++) {
      total += chart_data[i];
    }
    var apr_avg = parseFloat((total /60).toFixed(2));
    console.log(apr_avg);

    var total = 0;
    for(var i = chart_data_dist.length-60; i < chart_data_dist.length; i++) {
      total += chart_data_dist[i];
    }
    var bttDist_avg = parseFloat((total / 60).toFixed(2));
    console.log(bttDist_avg);

    var total = 0;
    for(var i = chart_data_USDT_Dist.length-60; i < chart_data_USDT_Dist.length; i++) {
      total += chart_data_USDT_Dist[i];
    }
    var usdtDist_avg = parseFloat((total / 60).toFixed(2));
    console.log(usdtDist_avg);


    var total_BTT_Staked = chart_data_BTTStaked[chart_data_BTTStaked.length-1]
    console.log(total_BTT_Staked);

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "APR",
          fill: false,
          backgroundColor: gradientStroke,
          borderColor: '#d68800',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#fbb12e',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#fbb12e',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 2,
          data: chart_data,
        }]
      },
      options: dLivechartConfig,

    };


    var myChart_BTT_Holders = new Chart(ctx, config);
    document.getElementById('apr_per').innerHTML = "APR Avg (last 60d): " + apr_avg +" %";
    $("#0").click(function() {
      var data = myChart_BTT_Holders.config.data;
      data.datasets[0].data = chart_data;
      data.datasets[0].label = "APR"
      data.labels = chart_labels;
      //myChart_BTT_Holders.config.scaleStepWidth = 140;
      console.log("Selected 0");
      document.getElementById('apr_per').innerHTML = "APR Avg (last 60d): " + apr_avg +" %";
      myChart_BTT_Holders.update();

    });
    $("#1").click(function() {
      //var chart_data = [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130];
      var data = myChart_BTT_Holders.config.data;
      data.datasets[0].data = chart_data_dist;
      data.datasets[0].label = "BTT Dist"
      data.labels = chart_labels;
      //myChart_BTT_Holders.config.scaleStepWidth = 50;
      console.log("Selected 1");
      document.getElementById('apr_per').innerHTML = "BTT Dist Avg (last 60d): " + bttDist_avg + "M";
      myChart_BTT_Holders.update();
    });

    $("#2").click(function() {
      //var chart_data = [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130];
      var data = myChart_BTT_Holders.config.data;
      data.datasets[0].data = chart_data_USDT_Dist;
      data.datasets[0].label = "USDT Distributed"
      data.labels = chart_labels;
      console.log("Selected 3");
      document.getElementById('apr_per').innerHTML = "USDT Dist Avg (last 60g) " + usdtDist_avg + "K";
      myChart_BTT_Holders.update();
    });

    $("#3").click(function() {
      //var chart_data = [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130];
      var data = myChart_BTT_Holders.config.data;
      data.datasets[0].data = chart_data_BTTStaked;
      data.datasets[0].label = "Total Staked BTT"
      data.labels = chart_labels;
      console.log("Selected 2");
      document.getElementById('apr_per').innerHTML = "Total Staked BTT: " + total_BTT_Staked + "B";
      myChart_BTT_Holders.update();
    });
  });

  readTextFile('http://bttscan.xyz/lineChartPartners.json', function(text_dlivePartners)
{
  data_json = JSON.parse(text_dlivePartners);
  console.log(data_json['labels']);


  var chart_labels = data_json['labels'];
  var chart_data = data_json['datasets'][0]['data'];
  var chart_data_dist = data_json['datasets'][1]['data'];
  var chart_data_BTTStaked = data_json['datasets'][2]['data'];

  var total = 0;
  console.log("LEN: " + chart_data.length)
  for(var i = chart_data.length-20; i < chart_data.length; i++) {
    console.log(chart_data[i])

    total += chart_data[i];
  }
  var apr_avg = parseFloat((total / 20).toFixed(2));
  console.log(apr_avg);

  var total = 0;
  for(var i = chart_data_dist.length-20; i < chart_data_dist.length; i++) {
    total += chart_data_dist[i];
  }
  var bttDist_avg = parseFloat((total / 20).toFixed(2));
  console.log(bttDist_avg);

  var total_BTT_Staked = chart_data_BTTStaked[chart_data_BTTStaked.length-1]
  console.log(total_BTT_Staked);



  var ctx = document.getElementById("chartBig2").getContext('2d');

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
  gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
  gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
  var config = {
    type: 'line',
    data: {
      labels: chart_labels,
      datasets: [{
        label: "APR",
        fill: false,
        backgroundColor: gradientStroke,
        borderColor: '#d68800',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#fbb12e',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#fbb12e',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 2,
        data: chart_data,
      }]
    },
    options: dLivechartConfig,

  };

  var myChart_BTT_Holders = new Chart(ctx, config);
  document.getElementById('apr_per_partners').innerHTML = "APR Avg (last 20d): " + apr_avg +" %";
  $("#4").click(function() {
    var data = myChart_BTT_Holders.config.data;
    data.datasets[0].data = chart_data;
    data.datasets[0].label = "APR"
    data.labels = chart_labels;
    //myChart_BTT_Holders.config.scaleStepWidth = 140;
    console.log("Selected 4");
    document.getElementById('apr_per_partners').innerHTML = "APR Avg (last 20d): " + apr_avg +" %";
    myChart_BTT_Holders.update();

  });
  $("#5").click(function() {
    //var chart_data = [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130];
    var data = myChart_BTT_Holders.config.data;
    data.datasets[0].data = chart_data_dist;
    data.datasets[0].label = "BTT Dist"
    data.labels = chart_labels;
    //myChart_BTT_Holders.config.scaleStepWidth = 50;
    console.log("Selected 5");
    document.getElementById('apr_per_partners').innerHTML = "BTT Dist Avg (last 20d): " + bttDist_avg + "M";
    myChart_BTT_Holders.update();
  });

  $("#6").click(function() {
    //var chart_data = [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130];
    var data = myChart_BTT_Holders.config.data;
    data.datasets[0].data = chart_data_BTTStaked;
    data.datasets[0].label = "Total Staked BTT"
    data.labels = chart_labels;
    console.log("Selected 6");
    document.getElementById('apr_per_partners').innerHTML = "Total Staked BTT: " + total_BTT_Staked + "B";
    myChart_BTT_Holders.update();
  });
});


  },


  showNotification: function(from, align) {
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "tim-icons icon-bell-55",
      message: "Welcome to <b>Black Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      type: type[color],
      timer: 8000,
      placement: {
        from: from,
        align: align
      }
    });
  }

};

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    crossOrigin: null
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
