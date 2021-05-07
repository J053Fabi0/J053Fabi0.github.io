const csv = require("csv-parser");
const fs = require("fs");
const { SesionCliente } = require("./database");

const results = [];

fs.createReadStream("e.csv")
  .pipe(csv())
  .on("data", (data) => {
    const session_cliente = {
      device_mac: data.device_mac,
      branch_office: +data.branch_office,
      month_tz: +data.month_tz,
      day_tz: +data.day_tz,
      day_of_week_tz: data.day_of_week_tz,
      hour_tz: +data.hour_tz,
      conection_date: new Date(
        `2016-${data.month_tz <= 9 ? "0" : ""}${data.month_tz}-${data.day_tz <= 9 ? "0" : ""}${data.day_tz}` +
          `T${data.hour_tz <= 9 ? "0" : ""}${data.hour_tz}:00:00Z`
      ),
      visitor: data.visitor === "true",
      tiempodeses: +data.tiempodeses,
    };

    results.push(session_cliente);
  })
  .on("end", async () => {
    const pushBulk = (toPush) =>
      new Promise((res) => {
        let pushed = 0;
        const whenPushed = () => {
          if (++pushed === toPush.length) res();
        };

        for (const data of toPush)
          SesionCliente.create(data)
            // .then((res) => console.log(res.id))
            .catch((err) => console.log(err))
            .finally(() => whenPushed());
      });

    const numberOfItemsToPushAtOnce = 100;
    for (let i = 0; i < results.length; i += numberOfItemsToPushAtOnce) {
      await pushBulk(results.slice(i, i + numberOfItemsToPushAtOnce));
      console.log(i);
    }
  });
