import Vue from "vue";
import {
  Button,
  Message,
  Pagination,
  Carousel,
  CarouselItem
} from "element-ui";

Vue.use(Button);
Vue.use(Pagination);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.prototype.$message = Message;
