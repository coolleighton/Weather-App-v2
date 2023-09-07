fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15", {
  mode: "cors",
})
  .then(function (response) {
    return response;
  })
  .then(function (response) {
    console.log(response);
  });
