/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
exports.GetDistance = (lat1, long1, lat2, long2) =>
  FindDistance(lat1, long1, lat2, long2);

function FindDistance(lat1, long1, lat2, long2) {
  const R = 6378137;
  const dLat = rad(lat2 - lat1);
  const dLong = rad(long2 - long1);
  // eslint-disable-next-line max-len
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d / 1000;
}

function rad(x) {
  return (x * Math.PI) / 180;
}
