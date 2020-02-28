function getMap() {
    return {
        map: {
            name: "KZ",
            defaultArea: {
                attrs: {
                    stroke: "#fff",
                    "stroke-width": 2
                }
            }
        },
        legend: {
            area: {
                title: "Unemployment Rate",
                slices: [
                    {
                      max: 4,
                      attrs: {
                        fill: "#99e063"
                      },
                      attrsHover: {
                        fill: "#b9e19a"
                      },
                      label: "<4%"
                    },
                    {
                        min: 4,
                        max: 5,
                        attrs: {
                            fill: "#d4f584"
                        },
                        attrsHover: {
                            fill: "#eafeba"
                        },
                        label: ""
                    },
                    {
                        min: 5,
                        max: 6,
                        attrs: {
                            fill: "#f7f78b"
                        },
                        attrsHover: {
                            fill: "#f8f8b2"
                        },
                        label: ""
                    },
                    {
                        min: 6,
                        max: 7,
                        attrs: {
                            fill: "#f1d064"
                        },
                        attrsHover: {
                            fill: "#f3de99"
                        },
                        label: ""
                    },
                    {
                        min: 7,
                        max: 8,
                        attrs: {
                            fill: "#ffab51"
                        },
                        attrsHover: {
                            fill: "#fcbc78"
                        },
                        label: ""
                    },
                    {
                        min: 8,
                        max: 10,
                        attrs: {
                            fill: "#ff5f2b"
                        },
                        attrsHover: {
                            fill: "#fb7f57"
                        },
                        label: ""
                    },
                    {
                        min: 10,
                        max: 12,
                        attrs: {
                            fill: "#e60000"
                        },
                        attrsHover: {
                            fill: "#fb4040"
                        },
                        label: ""
                    },
                    {
                        min: 12,
                        attrs: {
                            fill: "#b10014"
                        },
                        attrsHover: {
                            fill: "#c23a49"
                        },
                        label: ">12%"
                    }
                ]
            }
        },
        areas: {
            "AKM": {"attrs": {"href": "#"}},
            "AKT": {"attrs": {"href": "#"}},
            "ALM": {"attrs": {"href": "#"}},
            "ATY": {"attrs": {"href": "#"}},
            "KAR": {"attrs": {"href": "#"}},
            "KUS": {"attrs": {"href": "#"}},
            "KZY": {"attrs": {"href": "#"}},
            "MAN": {"attrs": {"href": "#"}},
            "PAV": {"attrs": {"href": "#"}},
            "SEV": {"attrs": {"href": "#"}},
            "VOS": {"attrs": {"href": "#"}},
            "YUZ": {"attrs": {"href": "#"}},
            "ZAP": {"attrs": {"href": "#"}},
            "ZHA": {"attrs": {"href": "#"}},
        }
      }
}

function getColor(rate) {
  if(rate < 4) {
    return "#99e063";
  } else if(rate >= 4 && rate < 5) {
    return "#d4f584";
  } else if(rate >= 5 && rate < 6) {
    return "#f7f78b";
  } else if(rate >= 6 && rate < 7) {
    return "#f1d064";
  } else if(rate >= 7 && rate < 8) {
    return "#ffab51";
  } else if(rate >= 8 && rate < 10) {
    return "#ff5f2b";
  } else if(rate >= 10 && rate < 12) {
    return "#e60000";
  } else if(rate >= 12) {
    return "#b10014";
  }
}

function getTooltip(region, rate) {
    var regionFriendlyStr = getRegionFriendlyStr(region);
    return {
        "content": "<span style=\"font-weight:bold;\">" + regionFriendlyStr + "<\/span><br \/>Unemp. Rate: " + rate + "%",
        "offset": {
          "left": 10,
          "top": 10 
        },
        "overflow": {
          "right": true,
          "bottom": true
        }
    }
}

function getRegionFriendlyStr(region) {
  switch(region) {
      case "AKM":
        return "Akmola";
      case "AKT":
        return "Aktobe";
      case "ALM":
        return "Almaty";
      case "ATY":
        return "Atyrau";
      case "KAR":
        return "Karaganda";
      case "KUS":
        return "Kustanai";
      case "KZY":
        return "Kyzylorda";
      case "MAN":
        return "Mangystau";
      case "PAV":
        return "Pavlodar";
      case "SEV":
        return "North Kazakhstan";
      case "VOS":
        return "East Kazakhstan";
      case "YUZ":
        return "South Kazakhstan";
      case "ZAP":
        return "West Kazakhstan";
      case "ZHA":
        return "Zhambyl";
      default:
        return "Unknown";
    }
}

function buildMaps(data) {
  var mapsEl = $("#maps");
  for(var row = 0; row < Math.ceil(data.length / 4); row++) {
    var rowEl = $("<div class='row'></div>");
    mapsEl.append(rowEl);
    for(var col = row * 4; col < Math.min((row + 1) * 4, data.length); col++) {
      var item = data[col];
      console.log(item);
      var container = $("<div class='three columns mapcontainer'><div class='year'><div class='circle' style='background:" + getColor(item['KZ']) + "'></div><span>" + item['year'] + "</span></div><div class='map'></div></div>");
      rowEl.append(container);

      var map = getMap();
      for(region in map.areas) {
        if(map.areas.hasOwnProperty(region)) {
          map.areas[region].value = item[region];
          map.areas[region].tooltip = getTooltip(region, item[region]);
        }
      }
      $(container).mapael(map);
    }
  }
}

$(function () {
  $.getJSON("js/data.json", function(data) {
      buildMaps(data);
  });
});