"use strict";
$(document).ready(() => {
  $.ajax({
    url: "/headlines",
    success: (result) => {
      $("#headlines").html("");
      let mapElem = "<div class ='container-fluid';'><div class= 'row'>";
      result.forEach(
        ({ country, countryCode, hName, title, publishedAt, url }, index) => {
          mapElem += `<div class = "col"><label>${title}.</label> From: <label><a href="${url}" target = "_blank">${hName}</a></label> Country:<label>${country} (${countryCode})</label><div class='map' id='mapid${index}'></div></div>`;
        }
      );
      $("#headlines").html(mapElem);
      result.forEach(({ lat, lon }, index) => {
        var map = L.map(`mapid${index}`).setView([lat, lon], 10);
        L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            maxZoom: 10,
            minZoom: 10,
            id: "mapbox/streets-v11",
            tileSize: 512, //512
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoiYXJpa21pciIsImEiOiJja2VvM2RpNHIwMDhzMnRtemZpMmtqcTc0In0.GRCt4uIbe8SGl9RRaV3_ag",
          }
        ).addTo(map);
        var circle = L.circle([lat, lon], {
          color: "black",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 800,
        }).addTo(map);
      });
    },
  });

  //SearchForm
  $("#searchForm").submit((e) => {
    e.preventDefault();
    let search = $("#search").val();
    $.ajax({
      url: `/search?query=${search}`,
      success: (result) => {
        $("#result").html("");
        let tableElem =
          "<table id='resultTable' class = 'highlight' cellspacing='60px'><tr><th>Headline</th><th>Source</th><th>Published Date</th><th>Hosting Country</th></tr>";
        result.forEach(
          //table table-dark table-striped
          ({ country, countryCode, hName, title, publishedAt, url }) => {
            tableElem += `<tr>
                
                <td><a href="${url}" target="_blank">${title}</a></td>
                <td>${hName}</td>
                <td>${publishedAt}</td>
                <td>${country} (${countryCode})</td>
                </tr>`;
          }
        );
        tableElem += "</table>";
        $("#result").html(tableElem);
      },
    });
  });
});
