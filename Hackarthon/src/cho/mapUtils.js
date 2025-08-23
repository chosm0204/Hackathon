// 지도의 위도/경도 범위와 이미지 크기에 맞게 조정하세요.
// 이 값들은 Heongimg.jpg의 실제 지도 범위에 따라 달라집니다.
const mapBounds = {
  latMin: 37.38,
  latMax: 37.42,
  lngMin: 126.91,
  lngMax: 126.97,
};

const mapDimensions = {
  width: 1000,
  height: 800,
};

export const convertCoordsToPixels = (lat, lng) => {
  const { latMin, latMax, lngMin, lngMax } = mapBounds;
  const { width, height } = mapDimensions;

  const latNorm = (lat - latMin) / (latMax - latMin);
  const lngNorm = (lng - lngMin) / (lngMax - lngMin);

  const x = lngNorm * width;
  const y = (1 - latNorm) * height;

  return { top: y, left: x };
};
