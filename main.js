let dailyCurrent = [];
let weeklyCurrent = [];
let monthlyCurrent = [];

let dailyPrevious = [];
let weeklyPrevious = [];
let monthlyPrevious = [];

let heading = [];

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      heading.push(element.title);

      dailyCurrent.push(element.timeframes.daily.current);
      dailyPrevious.push(element.timeframes.daily.previous);

      weeklyCurrent.push(element.timeframes.weekly.current);
      weeklyPrevious.push(element.timeframes.weekly.previous);

      monthlyCurrent.push(element.timeframes.monthly.current);
      monthlyPrevious.push(element.timeframes.monthly.previous);
    });
  })
  .then(() => {
    let current = document.querySelectorAll(".current");
    let previous = document.querySelectorAll(".previous");
    let title = document.querySelectorAll(".heading");

    for (i = 0; i <= current.length - 1; i++) {
      current[i].innerHTML = `${weeklyCurrent[i]}hrs`;
      previous[i].innerHTML = `Last Week - ${weeklyPrevious[i]}hrs`;
      title[i].innerHTML = `${heading[i]}`;
    }
  });

const dataNav = document.querySelectorAll(".btn");

dataNav.forEach((e) => {
  e.addEventListener("click", () => {
    dataNav.forEach((d) => {
      d.classList.remove("color");
      e.classList.add("color");
    });

    let duration = e.innerHTML;

    let currentValue = document.querySelectorAll(".current");
    let previousValue = document.querySelectorAll(".previous");
    let range = document.querySelectorAll(".range");
    let current;
    let previous;

    switch (duration) {
      case "Daily":
        current = dailyCurrent;
        previous = dailyPrevious;
        range = "Yesterday -";
        break;

      case "Weekly":
        current = weeklyCurrent;
        previous = weeklyPrevious;
        range = "Last Week -";
        break;

      case "Monthly":
        current = monthlyCurrent;
        previous = monthlyPrevious;
        range = "Last Month -";

        break;
    }

    for (i = 0; i <= currentValue.length - 1; i++) {
      currentValue[i].innerHTML = ` ${current[i]}hrs`;
      previousValue[i].innerHTML = ` ${range} ${previous[i]}hrs`;
    }
  });
});
