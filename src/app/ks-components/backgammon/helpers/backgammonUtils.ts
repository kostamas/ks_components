export const isOverlap = (x, y, targetX, targetY, width, height) => {
  return x >= targetX && x <= targetX + width && y > targetY && y <= targetY + height;
}

export const distance = (x1,x2,y1,y2)=>  Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2)* (y1 - y2));


