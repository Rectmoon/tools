import { log } from "./log"

function getDirection($element, event) {
  var w = $element.width(),
    h = $element.height(),
    x = (event.pageX - $element.offset().left - w / 2) * (w > h ? h / w : 1),
    y = (event.pageY - $element.offset().top - h / 2) * (h > w ? w / h : 1)
  return Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4
}
