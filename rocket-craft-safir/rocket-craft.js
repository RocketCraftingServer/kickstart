import { Safir, On, T } from "safir";
import RocketCraftingLayout from "./layouts/rocket-crafting-account";
import MyHeader from "./layouts/heder";

let app = new Safir();

On("app.trans.update", () => {
  app.translate.update()
})

On("app.ready", () => {
  /**
   * @description
   * If you put http://localhost then you 
   * need to run rocketCreftingServer on local mashine.
   * You can use also `http://maximumroulette.com`
   */
  app.loadComponent(new MyHeader('my-header'));
  app.loadVanillaComp("vanilla-components/footer.html");

  let apiDomain = 'https://maximumroulette.com';
  // let apiDomain = 'http://localhost';
  app.loadComponent(new RocketCraftingLayout(apiDomain), 'bg-transparent');

  document.body.classList.add('funnyBg2');
});

window.app = app;
