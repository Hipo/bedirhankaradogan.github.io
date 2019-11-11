function dateDiffAsDay(d1, d2) {
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000));
}

function formatDate(date) {
  var formattedDate = new Date(date);
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  //Bedo was here
  var dayNames = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11st",
    "12nd",
    "13rd",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st"
  ];

  // made by Tolga(space before dayNames)
  return monthNames[formattedDate.getMonth()] + "<br/>" + dayNames[formattedDate.getDate() - 1];
}

function loadEvents(events){
  var eventHtml = "";

  events.forEach(function (event) {
    if (event.slots) {
      var eventDate = new Date(event.date);
      var now = new Date();
      var dateDiff = dateDiffAsDay(now, eventDate);
      var eventItemClassName = ''
      
      if (dateDiff > 7) {
        eventItemClassName = "page-body-week-list-item-next-weeks";
      } else if (dateDiff >0) {
        eventItemClassName = "page-body-week-list-item-this-week";
      } else {
        eventItemClassName= ""
      }
      eventHtml += `
        <div class="page-body-week-list-item ${eventItemClassName}">
          <div class="page-body-week-list-item-cell page-body-week-list-item-talk-list-cell">
      `;

      event.slots.forEach(function (slot) {
        eventHtml += `
            <div class="page-body-week-list-item-talk-list-item">
              <div class="page-body-week-list-item-talk-list-item-cell">
                <a class="page-body-week-list-item-talk-list-item-cell-icon-link-disabled" target="_blank">
                  <img src="images/video.png" class="page-body-week-list-item-talk-list-item-cell-icon" alt="Zoom icon">
                </a>
              </div>

              <div class="page-body-week-list-item-talk-list-item-cell">
                <a class="page-body-week-list-item-talk-list-item-cell-icon-link-disabled}" target="_blank">
                  <img src="images/presentation.png" class="page-body-week-list-item-talk-list-item-cell-icon" alt="Zoom icon">
                </a>
              </div>

              <div class="page-body-week-list-item-talk-list-item-cell">
                <p class="page-body-week-list-item-talk-list-item-cell-talk-name">
                  ${slot.user.first_name} ${slot.user.last_name}
                </p>
              </div>
            </div>
        `;
      });

      eventHtml += `
          </div>
          <div class="page-body-week-list-item-cell page-body-week-list-item-date-cell">
            ${formatDate(event.date)}
          </div>
        </div>
      `;
    }
  });
  document.getElementById("page-body").innerHTML = eventHtml;
  document.getElementsByClassName("page-body-week-list-item-this-week")[0].scrollIntoView({
    behavior:"smooth",
    block:"center"
  })
}
